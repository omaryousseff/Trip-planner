import { PhotoSourceType, AlternativePhoto } from '../types';

/**
 * Pinterest Scraped Pin Data Structure
 * Modeled after parse.bot and open web-scraping schemas
 */
export interface PinterestPin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  originalImageUrl?: string;
  pinUrl: string;
  sourceDomain?: string;
  pinner?: string;
  width?: number;
  height?: number;
}

export interface PinterestScrapeOptions {
  limit?: number;
  timeoutMs?: number;
  aestheticKeywords?: boolean;
  forceFresh?: boolean;
}

export interface PinterestPlacePhoto {
  url: string;
  caption: string;
  source: string;
  sourceType: PhotoSourceType;
  officialWebsiteUrl?: string;
  tripAdvisorUrl?: string;
  description: string;
  googleMapsUrl: string;
  pinId?: string;
  width?: number;
  height?: number;
  photos?: string[]; // Best 3 photos of the place
  alternativePhotos?: AlternativePhoto[]; // Photos 2 & 3
}

// In-memory cache for fast repeated queries (1 hour TTL)
interface CacheEntry {
  timestamp: number;
  pins: PinterestPin[];
}

const pinCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Promotes lower-resolution Pinterest CDN thumbnails (236x, 474x, 564x)
 * to high-definition 736x or originals for crisp display on polaroids and Retina displays.
 */
export function getHighResPinterestUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('pinimg.com')) return url;

  // Upgrade 236x, 474x, 564x to 736x
  return url
    .replace(/\/236x\//, '/736x/')
    .replace(/\/474x\//, '/736x/')
    .replace(/\/564x\//, '/736x/');
}

/**
 * Extracts a numeric or alphanumeric Pin ID from a Pinterest URL
 * e.g., https://www.pinterest.com/pin/401735229259232759/ -> 401735229259232759
 */
export function extractPinId(url: string): string {
  if (!url) return '';
  const match = url.match(/\/pin\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

/**
 * Clean up scraped Pin titles by removing extraneous site suffixes
 */
export function cleanPinTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  return rawTitle
    .replace(/\s*\|\s*Pinterest.*$/i, '')
    .replace(/\s*-\s*Pinterest.*$/i, '')
    .replace(/^Pin\s+on\s+[^|]+\|\s*/i, '')
    .replace(/^Pin\s+by\s+[^|]+\|\s*/i, '')
    .trim();
}

/**
 * Web-scraping engine that retrieves authentic Pinterest Pins without requiring API keys.
 * Uses an anonymous proxy search pipeline to bypass Cloudflare and CAPTCHA restrictions.
 */
export async function scrapePinterestPins(
  rawQuery: string,
  options: PinterestScrapeOptions = {}
): Promise<PinterestPin[]> {
  const {
    limit = 10,
    timeoutMs = 4000,
    aestheticKeywords = false, // Strictly use (place name city) for accurate place matching
    forceFresh = false,
  } = options;

  if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
    return [];
  }

  // Clean query: strictly (place name city) for accurate Pinterest place picture matching
  const sanitized = rawQuery
    .replace(/\([^)]*\)/g, '')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const queryWithMod = aestheticKeywords
    ? `${sanitized} travel`
    : sanitized;

  const searchQuery = `${queryWithMod} site:pinterest.com`;
  const cacheKey = searchQuery.toLowerCase();

  // Check in-memory cache
  if (!forceFresh && pinCache.has(cacheKey)) {
    const entry = pinCache.get(cacheKey)!;
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
      return entry.pins.slice(0, limit);
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Step 1: Obtain anonymous search session token (vqd)
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
    const tokenRes = await fetch(tokenUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });

    if (!tokenRes.ok) {
      throw new Error(`Session request returned status ${tokenRes.status}`);
    }

    const html = await tokenRes.text();
    const tokenMatch = html.match(/vqd=([a-zA-Z0-9_-]+)/) || html.match(/vqd="([a-zA-Z0-9_-]+)"/);
    const vqd = tokenMatch ? tokenMatch[1] : null;

    if (!vqd) {
      throw new Error('Could not acquire anonymous search token.');
    }

    // Step 2: Query image index specifically filtered to Pinterest
    const searchApiUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(
      searchQuery
    )}&o=json&p=1&s=0&u=bing&f=,,,&l=us-en&vqd=${encodeURIComponent(vqd)}`;

    const apiRes = await fetch(searchApiUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://duckduckgo.com/',
        Accept: 'application/json, text/javascript, */*; q=0.01',
      },
      signal: controller.signal,
    });

    if (!apiRes.ok) {
      throw new Error(`Image API request returned status ${apiRes.status}`);
    }

    const json = await apiRes.json();
    const rawResults: any[] = json.results || [];

    // Step 3: Parse and sanitize Pinterest Pins
    const parsedPins: PinterestPin[] = [];
    const seenUrls = new Set<string>();

    for (const item of rawResults) {
      const imgUrl = item.image;
      const pageUrl = item.url || '';

      // Validate Pinterest affiliation
      const isPinImg = imgUrl && imgUrl.includes('pinimg.com');
      const isPinterestPage = pageUrl.includes('pinterest.com');

      if (!isPinImg && !isPinterestPage) continue;

      const highResUrl = getHighResPinterestUrl(imgUrl);
      if (seenUrls.has(highResUrl)) continue;
      seenUrls.add(highResUrl);

      const pinId = extractPinId(pageUrl) || String(item.image_token || Math.random().toString(36).slice(2));
      const cleanTitle = cleanPinTitle(item.title || sanitized);

      parsedPins.push({
        id: pinId,
        title: cleanTitle || sanitized,
        description: item.title || '',
        imageUrl: highResUrl,
        thumbnailUrl: item.thumbnail || highResUrl,
        originalImageUrl: highResUrl.replace(/\/736x\//, '/originals/'),
        pinUrl: pageUrl.startsWith('http') ? pageUrl : `https://www.pinterest.com/pin/${pinId}/`,
        sourceDomain: 'pinterest.com',
        width: item.width || 736,
        height: item.height || 1050,
      });

      if (parsedPins.length >= limit) break;
    }

    // Cache the parsed pins
    if (parsedPins.length > 0) {
      pinCache.set(cacheKey, {
        timestamp: Date.now(),
        pins: parsedPins,
      });
    }

    return parsedPins;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.warn(`[Pinterest Scraper] Timeout after ${timeoutMs}ms for query: "${sanitized}"`);
    } else {
      console.warn(`[Pinterest Scraper] Scraping failed for query: "${sanitized}":`, err.message || err);
    }
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Formats scraped Pinterest photos specifically for travel itinerary cards and polaroids.
 * Enforces search format (place name city) and returns the best 3 photos of the place.
 */
export async function fetchPinterestPlacePhoto(
  title: string,
  location?: string,
  city?: string
): Promise<PinterestPlacePhoto | null> {
  if (!title || typeof title !== 'string') return null;

  const cleanTitle = title.replace(/\([^)]*\)/g, '').trim();
  const cleanCity = (city || '').replace(/\([^)]*\)/g, '').trim();
  // Exact user specification: search on Pinterest to be (place name city)
  const query = `${cleanTitle} ${cleanCity}`.trim();

  try {
    const pins = await scrapePinterestPins(query, {
      limit: 3,
      timeoutMs: 3800,
      aestheticKeywords: false,
    });

    if (pins.length > 0) {
      const topPin = pins[0];
      const allUrls = pins.map((p) => p.imageUrl);
      const alternativePhotos: AlternativePhoto[] = pins.slice(1).map((p, idx) => ({
        url: p.imageUrl,
        caption: p.title || `${cleanTitle} - View ${idx + 2}`,
        source: 'Pinterest',
        sourceType: 'pinterest',
        pinUrl: p.pinUrl,
      }));

      return {
        url: topPin.imageUrl,
        caption: topPin.title || title,
        source: 'Pinterest',
        sourceType: 'pinterest',
        officialWebsiteUrl: topPin.pinUrl,
        tripAdvisorUrl: topPin.pinUrl,
        description: topPin.description || `${cleanTitle} in ${cleanCity || 'destination'}`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${cleanTitle} ${location || ''} ${cleanCity}`.trim()
        )}`,
        pinId: topPin.id,
        width: topPin.width,
        height: topPin.height,
        photos: allUrls, // Up to best 3 photos of the place
        alternativePhotos,
      };
    }
  } catch (err) {
    console.warn('[Pinterest Scraper] fetchPinterestPlacePhoto error:', err);
  }

  return null;
}

/**
 * Returns an array of the best 3 PinterestPlacePhoto objects for a given place.
 */
export async function fetchPinterestPlacePhotos(
  title: string,
  location?: string,
  city?: string
): Promise<PinterestPlacePhoto[]> {
  if (!title || typeof title !== 'string') return [];

  const cleanTitle = title.replace(/\([^)]*\)/g, '').trim();
  const cleanCity = (city || '').replace(/\([^)]*\)/g, '').trim();
  const query = `${cleanTitle} ${cleanCity}`.trim();

  try {
    const pins = await scrapePinterestPins(query, {
      limit: 3,
      timeoutMs: 3800,
      aestheticKeywords: false,
    });

    return pins.map((pin) => ({
      url: pin.imageUrl,
      caption: pin.title || cleanTitle,
      source: 'Pinterest',
      sourceType: 'pinterest',
      officialWebsiteUrl: pin.pinUrl,
      tripAdvisorUrl: pin.pinUrl,
      description: pin.description || `${cleanTitle} in ${cleanCity}`,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${cleanTitle} ${location || ''} ${cleanCity}`.trim()
      )}`,
      pinId: pin.id,
      width: pin.width,
      height: pin.height,
    }));
  } catch (err) {
    console.warn('[Pinterest Scraper] fetchPinterestPlacePhotos error:', err);
    return [];
  }
}
