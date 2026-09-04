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
 * to high-definition 736x for crisp, universally reliable display without 403 errors.
 */
export function getHighResPinterestUrl(url: string): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('pinimg.com')) return url;

  // Upgrade 236x, 474x, 564x to 736x (736x is universally accessible without 403 Forbidden)
  return url
    .replace(/\/236x\//, '/736x/')
    .replace(/\/474x\//, '/736x/')
    .replace(/\/564x\//, '/736x/');
}

/**
 * Extracts a clean, specific venue or landmark name from activity titles.
 * Strips action verbs ("Visit", "Explore", "Dinner at", etc.) so Pinterest searches
 * are strictly accurate to the actual place.
 */
export function cleanPlaceName(rawTitle: string): string {
  if (!rawTitle || typeof rawTitle !== 'string') return '';
  let clean = rawTitle.replace(/\([^)]*\)/g, '').trim();

  const prefixes = [
    /^(visit|explore|discover|tour of|tour|stop at|stop by|wander around|stroll through|walk around|stroll along|scenic walk along|check-in at|check into|arrive at|departure from|head to|head towards)\s+/i,
    /^(breakfast at|lunch at|dinner at|coffee at|drinks at|tea at|tasting at|dine at|relax at|eat at|snack at)\s+/i,
    /^(morning walk in|evening stroll at|afternoon at|night out in|sunrise hike at|sunset from|sunrise at)\s+/i,
    /^(take the|ride the|board the|train to|subway to|metro to|bus to)\s+/i,
  ];

  for (const p of prefixes) {
    clean = clean.replace(p, '').trim();
  }

  return clean;
}

/**
 * Detects generic or non-specific activities that should NOT be searched on Pinterest
 * (e.g. hotel check-in, unpack, subway transit) to prevent inaccurate random imagery.
 */
export function isGenericPlace(title: string): boolean {
  if (!title || title.length < 3) return true;
  const lower = title.toLowerCase().trim();
  const genericWords = [
    'hotel', 'accommodation', 'hostel', 'resort', 'check in', 'check-in', 'checkout', 'check out',
    'rest', 'relax', 'unpack', 'pack bags', 'airport', 'flight', 'arrival', 'departure',
    'subway', 'metro', 'train station', 'bus station', 'transit', 'transfer',
    'breakfast', 'lunch', 'dinner', 'free time', 'leisure time', 'stroll'
  ];
  return genericWords.some(w => lower === w || lower === `${w}s`);
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
 * Uses an anonymous proxy search pipeline with strict place relevance filtering.
 */
export async function scrapePinterestPins(
  rawQuery: string,
  options: PinterestScrapeOptions = {}
): Promise<PinterestPin[]> {
  const {
    limit = 3,
    timeoutMs = 2500,
    forceFresh = false,
  } = options;

  if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
    return [];
  }

  // Clean query: strictly (place name city) for accurate Pinterest place picture matching
  const cleanPlace = cleanPlaceName(rawQuery);
  if (isGenericPlace(cleanPlace)) {
    return [];
  }

  const sanitized = cleanPlace
    .replace(/\([^)]*\)/g, '')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const searchQuery = `${sanitized} site:pinterest.com`;
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

    // Step 3: Parse and sanitize Pinterest Pins with STRICT PLACE RELEVANCE
    const parsedPins: PinterestPin[] = [];
    const seenUrls = new Set<string>();

    // Meaningful keywords from place query (tokens >= 3 letters)
    const placeTokens = sanitized
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 3 && !['the', 'and', 'for', 'with'].includes(t));

    // Banned non-place aesthetic/spam keywords
    const spamKeywords = [
      'outfit', 'clothing', 'what to wear', 'fashion', 'wallpaper', 'lockscreen',
      'aesthetic wallpaper', 'bullet journal', 'quote', 'quotes', 'inspirational',
      'drawing', 'clipart', 'vector', 'infographic', 'packing list', 'flyer',
      'costume', 'coloring', 'sketch'
    ];

    for (const item of rawResults) {
      const imgUrl = item.image;
      const pageUrl = item.url || '';
      const rawTitle = item.title || '';

      // Validate Pinterest affiliation
      const isPinImg = imgUrl && imgUrl.includes('pinimg.com');
      const isPinterestPage = pageUrl.includes('pinterest.com');

      if (!isPinImg && !isPinterestPage) continue;

      const fullText = `${rawTitle} ${pageUrl}`.toLowerCase();

      // Filter out irrelevant fashion, quotes, drawings, or wallpapers
      if (spamKeywords.some((w) => fullText.includes(w))) continue;

      // Ensure pin has at least one distinct keyword matching the target place
      if (placeTokens.length > 0) {
        const hasKeywordMatch = placeTokens.some((token) => fullText.includes(token));
        if (!hasKeywordMatch) continue; // Skip pins that don't match the place name
      }

      const highResUrl = getHighResPinterestUrl(imgUrl);

      // Use high-definition CDN proxy from Bing/DuckDuckGo for 100% reliable image delivery without 403 Forbidden
      const reliableCdnUrl = item.thumbnail && item.thumbnail.includes('bing.net')
        ? item.thumbnail.replace('&pid=Api', '&pid=Api&w=800&h=600&c=7')
        : (item.thumbnail || highResUrl);

      if (seenUrls.has(reliableCdnUrl)) continue;
      seenUrls.add(reliableCdnUrl);

      const pinId = extractPinId(pageUrl) || String(item.image_token || Math.random().toString(36).slice(2));
      const cleanTitle = cleanPinTitle(rawTitle || sanitized);

      parsedPins.push({
        id: pinId,
        title: cleanTitle || sanitized,
        description: rawTitle || '',
        imageUrl: reliableCdnUrl,
        thumbnailUrl: item.thumbnail || reliableCdnUrl,
        originalImageUrl: highResUrl,
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

  const cleanTitle = cleanPlaceName(title);
  if (isGenericPlace(cleanTitle)) return null;

  const cleanCity = (city || '').replace(/\([^)]*\)/g, '').trim();
  // Exact user specification: search on Pinterest to be (place name city)
  const query = `${cleanTitle} ${cleanCity}`.trim();

  try {
    const pins = await scrapePinterestPins(query, {
      limit: 3,
      timeoutMs: 2500,
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

  const cleanTitle = cleanPlaceName(title);
  if (isGenericPlace(cleanTitle)) return [];

  const cleanCity = (city || '').replace(/\([^)]*\)/g, '').trim();
  const query = `${cleanTitle} ${cleanCity}`.trim();

  try {
    const pins = await scrapePinterestPins(query, {
      limit: 3,
      timeoutMs: 2500,
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
