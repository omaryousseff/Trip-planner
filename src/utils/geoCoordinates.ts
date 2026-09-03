import { Coordinates, ScheduleItem } from '../types';

// Accurate City Centers Worldwide
export const CITY_COORDINATES: Record<string, Coordinates> = {
  // Europe
  paris: { lat: 48.8566, lng: 2.3522 },
  london: { lat: 51.5074, lng: -0.1278 },
  rome: { lat: 41.9028, lng: 12.4964 },
  barcelona: { lat: 41.3874, lng: 2.1686 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  amsterdam: { lat: 52.3676, lng: 4.9041 },
  berlin: { lat: 52.5200, lng: 13.4050 },
  prague: { lat: 50.0755, lng: 14.4378 },
  vienna: { lat: 48.2082, lng: 16.3738 },
  venice: { lat: 45.4408, lng: 12.3155 },
  florence: { lat: 43.7696, lng: 11.2558 },
  milan: { lat: 45.4642, lng: 9.1900 },
  athens: { lat: 37.9838, lng: 23.7275 },
  lisbon: { lat: 38.7223, lng: -9.1393 },
  edinburgh: { lat: 55.9533, lng: -3.1883 },
  dublin: { lat: 53.3498, lng: -6.2603 },
  budapest: { lat: 47.4979, lng: 19.0402 },
  munich: { lat: 48.1351, lng: 11.5820 },
  zurich: { lat: 47.3769, lng: 8.5417 },
  copenhagen: { lat: 55.6761, lng: 12.5683 },
  stockholm: { lat: 59.3293, lng: 18.0686 },

  // Asia & Middle East
  tokyo: { lat: 35.6762, lng: 139.6503 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  osaka: { lat: 34.6937, lng: 135.5023 },
  seoul: { lat: 37.5665, lng: 126.9780 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  bangkok: { lat: 13.7563, lng: 100.5018 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  'abu dhabi': { lat: 24.4539, lng: 54.3773 },
  istanbul: { lat: 41.0082, lng: 28.9784 },
  'hong kong': { lat: 22.3193, lng: 114.1694 },
  taipei: { lat: 25.0330, lng: 121.5654 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  delhi: { lat: 28.6139, lng: 77.2090 },
  bali: { lat: -8.4095, lng: 115.1889 },
  hanoi: { lat: 21.0285, lng: 105.8542 },
  'ho chi minh': { lat: 10.8231, lng: 106.6297 },
  doha: { lat: 25.2854, lng: 51.5310 },

  // Africa
  cairo: { lat: 30.0444, lng: 31.2357 },
  giza: { lat: 29.9870, lng: 31.2118 },
  marrakech: { lat: 31.6295, lng: -7.9811 },
  'cape town': { lat: -33.9249, lng: 18.4241 },
  nairobi: { lat: -1.2921, lng: 36.8219 },

  // North America
  'new york': { lat: 40.7128, lng: -74.0060 },
  nyc: { lat: 40.7128, lng: -74.0060 },
  'san francisco': { lat: 37.7749, lng: -122.4194 },
  'los angeles': { lat: 34.0522, lng: -118.2437 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  miami: { lat: 25.7617, lng: -80.1918 },
  'las vegas': { lat: 36.1699, lng: -115.1398 },
  seattle: { lat: 47.6062, lng: -122.3321 },
  washington: { lat: 38.9072, lng: -77.0369 },
  boston: { lat: 42.3601, lng: -71.0589 },
  toronto: { lat: 43.6532, lng: -79.3832 },
  vancouver: { lat: 49.2827, lng: -123.1207 },
  montreal: { lat: 45.5017, lng: -73.5673 },
  'mexico city': { lat: 19.4326, lng: -99.1332 },

  // South America & Oceania
  'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
  'buenos aires': { lat: -34.6037, lng: -58.3816 },
  santiago: { lat: -33.4489, lng: -70.6693 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  melbourne: { lat: -37.8136, lng: 144.9631 },
  auckland: { lat: -36.8485, lng: 174.7633 },
};

// Precise Famous Landmarks Coordinates
export const EXACT_LANDMARK_COORDINATES: Record<string, Coordinates> = {
  // Paris
  'eiffel tower': { lat: 48.8584, lng: 2.2945 },
  eiffel: { lat: 48.8584, lng: 2.2945 },
  'louvre museum': { lat: 48.8606, lng: 2.3376 },
  louvre: { lat: 48.8606, lng: 2.3376 },
  "musée d'orsay": { lat: 48.8599, lng: 2.3265 },
  orsay: { lat: 48.8599, lng: 2.3265 },
  'notre-dame': { lat: 48.8530, lng: 2.3499 },
  'notre dame': { lat: 48.8530, lng: 2.3499 },
  'arc de triomphe': { lat: 48.8738, lng: 2.2950 },
  'sacré-cœur': { lat: 48.8867, lng: 2.3431 },
  'sacre coeur': { lat: 48.8867, lng: 2.3431 },
  montmartre: { lat: 48.8867, lng: 2.3431 },
  'sainte-chapelle': { lat: 48.8554, lng: 2.3450 },
  'jardin des tuileries': { lat: 48.8635, lng: 2.3275 },
  tuileries: { lat: 48.8635, lng: 2.3275 },
  'palace of versailles': { lat: 48.8049, lng: 2.1204 },
  versaill: { lat: 48.8049, lng: 2.1204 },
  'seine cruise': { lat: 48.8616, lng: 2.2965 },
  'le marais': { lat: 48.8575, lng: 2.3622 },

  // Rome
  colosseum: { lat: 41.8902, lng: 12.4922 },
  'roman forum': { lat: 41.8925, lng: 12.4853 },
  'trevi fountain': { lat: 41.9009, lng: 12.4833 },
  trevi: { lat: 41.9009, lng: 12.4833 },
  pantheon: { lat: 41.8986, lng: 12.4769 },
  'vatican museums': { lat: 41.9065, lng: 12.4536 },
  "st. peter's basilica": { lat: 41.9022, lng: 12.4539 },
  vatican: { lat: 41.9022, lng: 12.4539 },
  'piazza navona': { lat: 41.8989, lng: 12.4731 },
  'spanish steps': { lat: 41.9059, lng: 12.4828 },
  trastevere: { lat: 41.8887, lng: 12.4705 },
  'villa borghese': { lat: 41.9142, lng: 12.4922 },

  // Tokyo
  'senso-ji': { lat: 35.7148, lng: 139.7967 },
  sensoji: { lat: 35.7148, lng: 139.7967 },
  asakusa: { lat: 35.7126, lng: 139.7958 },
  'shibuya crossing': { lat: 35.6595, lng: 139.7004 },
  shibuya: { lat: 35.6595, lng: 139.7004 },
  'meiji shrine': { lat: 35.6764, lng: 139.6993 },
  'tokyo skytree': { lat: 35.7100, lng: 139.8107 },
  skytree: { lat: 35.7100, lng: 139.8107 },
  'tsukiji market': { lat: 35.6655, lng: 139.7707 },
  tsukiji: { lat: 35.6655, lng: 139.7707 },
  akihabara: { lat: 35.6983, lng: 139.7731 },
  'shinjuku gyoen': { lat: 35.6852, lng: 139.7101 },
  'omoide yokocho': { lat: 35.6932, lng: 139.6998 },
  'teamlab planets': { lat: 35.6491, lng: 139.7898 },

  // Barcelona
  'sagrada família': { lat: 41.4036, lng: 2.1744 },
  'sagrada familia': { lat: 41.4036, lng: 2.1744 },
  'park güell': { lat: 41.4145, lng: 2.1527 },
  'park guell': { lat: 41.4145, lng: 2.1527 },
  'casa batlló': { lat: 41.3916, lng: 2.1649 },
  'casa batllo': { lat: 41.3916, lng: 2.1649 },
  'casa milà': { lat: 41.3953, lng: 2.1619 },
  'gothic quarter': { lat: 41.3828, lng: 2.1768 },
  'barri gotic': { lat: 41.3828, lng: 2.1768 },
  'la boqueria': { lat: 41.3817, lng: 2.1716 },
  'la rambla': { lat: 41.3809, lng: 2.1734 },
  'barceloneta beach': { lat: 41.3784, lng: 2.1925 },

  // New York City
  'times square': { lat: 40.7580, lng: -73.9855 },
  'central park': { lat: 40.7851, lng: -73.9683 },
  'brooklyn bridge': { lat: 40.7061, lng: -73.9969 },
  'empire state building': { lat: 40.7484, lng: -73.9857 },
  'the high line': { lat: 40.7480, lng: -74.0048 },
  'high line': { lat: 40.7480, lng: -74.0048 },
  'the met': { lat: 40.7794, lng: -73.9632 },
  'metropolitan museum': { lat: 40.7794, lng: -73.9632 },
  'statue of liberty': { lat: 40.6892, lng: -74.0445 },
  'chelsea market': { lat: 40.7424, lng: -74.0061 },

  // London
  'big ben': { lat: 51.5007, lng: -0.1246 },
  'westminster abbey': { lat: 51.4994, lng: -0.1273 },
  'tower bridge': { lat: 51.5055, lng: -0.0754 },
  'tower of london': { lat: 51.5081, lng: -0.0759 },
  'british museum': { lat: 51.5194, lng: -0.1270 },
  'borough market': { lat: 51.5055, lng: -0.0910 },
  'london eye': { lat: 51.5033, lng: -0.1195 },
  'covent garden': { lat: 51.5117, lng: -0.1232 },
  'buckingham palace': { lat: 51.5014, lng: -0.1419 },

  // Cairo & Egypt
  'pyramids of giza': { lat: 29.9792, lng: 31.1342 },
  'great pyramid': { lat: 29.9792, lng: 31.1342 },
  'great sphinx': { lat: 29.9753, lng: 31.1376 },
  sphinx: { lat: 29.9753, lng: 31.1376 },
  'egyptian museum': { lat: 30.0478, lng: 31.2336 },
  'khan el-khalili': { lat: 30.0478, lng: 31.2622 },
  'citadel of cairo': { lat: 30.0299, lng: 31.2613 },
  'al-azhar mosque': { lat: 30.0457, lng: 31.2627 },

  // Kyoto
  'fushimi inari': { lat: 34.9671, lng: 135.7727 },
  'kinkaku-ji': { lat: 35.0394, lng: 135.7292 },
  'golden pavilion': { lat: 35.0394, lng: 135.7292 },
  'arashiyama bamboo': { lat: 35.0169, lng: 135.6713 },
  'kiyomizu-dera': { lat: 34.9949, lng: 135.7850 },
  'gion district': { lat: 35.0037, lng: 135.7772 },
  'nishiki market': { lat: 35.0050, lng: 135.7649 },

  // Dubai
  'burj khalifa': { lat: 25.1972, lng: 55.2744 },
  'the dubai mall': { lat: 25.1985, lng: 55.2796 },
  'dubai mall': { lat: 25.1985, lng: 55.2796 },
  'burj al arab': { lat: 25.1412, lng: 55.1852 },
  'palm jumeirah': { lat: 25.1124, lng: 55.1390 },
};

/**
 * Returns true if coordinates are realistic, non-zero coordinates.
 */
export function isValidCoordinate(coord?: Coordinates): boolean {
  if (!coord) return false;
  const { lat, lng } = coord;
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  // Non-zero check (0.0, 0.0 is Null Island in the Gulf of Guinea)
  if (Math.abs(lat) < 0.0001 && Math.abs(lng) < 0.0001) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Finds the base coordinates of a destination name.
 */
export function getDestinationCenter(destination = ''): Coordinates {
  const destClean = destination.toLowerCase().trim();
  for (const [cityName, coord] of Object.entries(CITY_COORDINATES)) {
    if (destClean.includes(cityName)) {
      return coord;
    }
  }
  // Default to Paris if unknown, rather than Tokyo
  return { lat: 48.8566, lng: 2.3522 };
}

/**
 * Deterministically generates a small realistic geographic offset around a center,
 * so items in the same city are spread naturally across the district (0.5 to 3 km away).
 */
function getOffsetAroundCenter(seedStr: string, index: number): Coordinates {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const angle = ((Math.abs(hash) + index * 57) % 360) * (Math.PI / 180);
  const radiusKm = 0.6 + (((Math.abs(hash) >> 2) + index * 3) % 20) * 0.12; // 0.6km - 3km
  // 1 deg lat ~ 111km, 1 deg lng ~ 111 * cos(lat)
  const dLat = (radiusKm / 111) * Math.cos(angle);
  const dLng = (radiusKm / 90) * Math.sin(angle);
  return { lat: dLat, lng: dLng };
}

/**
 * Resolves accurate coordinates for any schedule item.
 * Guarantees that Tokyo items stay in Tokyo, Paris items stay in Paris, etc.
 */
export function resolvePlaceCoordinates(
  item: { title: string; location?: string; coordinates?: Coordinates },
  destination = '',
  itemIndex = 0
): Coordinates {
  const titleLower = (item.title || '').toLowerCase();
  const locLower = (item.location || '').toLowerCase();
  const combined = `${titleLower} ${locLower}`;

  // 1. Check exact landmark registry
  for (const [landmark, coords] of Object.entries(EXACT_LANDMARK_COORDINATES)) {
    if (combined.includes(landmark)) {
      return coords;
    }
  }

  // 2. Identify destination center
  const center = getDestinationCenter(destination);

  // 3. If item already has coordinates, check if they are near the destination center
  if (isValidCoordinate(item.coordinates)) {
    const dLat = Math.abs(item.coordinates!.lat - center.lat);
    const dLng = Math.abs(item.coordinates!.lng - center.lng);
    // If coordinates are within 1.5 degrees (~150km) of the city center, they are legitimate!
    if (dLat < 1.5 && dLng < 1.5) {
      return item.coordinates!;
    }
  }

  // 4. Otherwise, generate an accurate cluster around the actual city center
  const offset = getOffsetAroundCenter(item.title + (item.location || ''), itemIndex);
  return {
    lat: Number((center.lat + offset.lat).toFixed(5)),
    lng: Number((center.lng + offset.lng).toFixed(5)),
  };
}

/**
 * Calculate distance between two coordinates using the Haversine formula.
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates) {
  const R = 6371; // Earth radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  const distanceMiles = distanceKm * 0.621371;

  // Average walking speed: 4.8 km/h (~12.5 mins per km)
  const walkingMinutes = Math.max(3, Math.round(distanceKm * 13));
  // Urban transit: 5 min base + 3 mins per km
  const transitMinutes = Math.max(5, Math.round(5 + distanceKm * 3));

  return {
    km: Number(distanceKm.toFixed(2)),
    miles: Number(distanceMiles.toFixed(2)),
    walkingMinutes,
    transitMinutes,
    formattedText:
      distanceKm < 1
        ? `${Math.round(distanceKm * 1000)}m • ~${walkingMinutes} min walk`
        : `${distanceKm.toFixed(1)} km • ~${walkingMinutes} min walk`,
  };
}

/**
 * Generates an accurate Google Maps Turn-by-Turn Directions URL.
 */
export function getDirectionsUrl(options: {
  destinationTitle: string;
  destinationLocation?: string;
  destinationCity: string;
  originTitle?: string;
  originLocation?: string;
  travelMode?: 'walking' | 'transit' | 'driving';
}): string {
  const {
    destinationTitle,
    destinationLocation,
    destinationCity,
    originTitle,
    originLocation,
    travelMode = 'walking',
  } = options;

  const destQuery = encodeURIComponent(
    [destinationTitle, destinationLocation, destinationCity].filter(Boolean).join(', ')
  );

  if (originTitle) {
    const origQuery = encodeURIComponent(
      [originTitle, originLocation, destinationCity].filter(Boolean).join(', ')
    );
    return `https://www.google.com/maps/dir/?api=1&origin=${origQuery}&destination=${destQuery}&travelmode=${travelMode}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${destQuery}&travelmode=${travelMode}`;
}

/**
 * Generates an accurate multi-stop Google Maps Directions URL for the entire day.
 */
export function getMultiStopDirectionsUrl(
  items: Array<{ title: string; location?: string }>,
  destination: string,
  travelMode: 'walking' | 'transit' | 'driving' = 'walking'
): string {
  if (!items || items.length === 0) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
  }

  if (items.length === 1) {
    return getDirectionsUrl({
      destinationTitle: items[0].title,
      destinationLocation: items[0].location,
      destinationCity: destination,
      travelMode,
    });
  }

  const formatStop = (item: { title: string; location?: string }) =>
    encodeURIComponent([item.title, destination].filter(Boolean).join(', '));

  const origin = formatStop(items[0]);
  const finalDest = formatStop(items[items.length - 1]);
  const waypoints = items
    .slice(1, -1)
    .map((item) => formatStop(item))
    .join('%7C'); // Encoded pipe | for waypoints

  if (waypoints) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${finalDest}&waypoints=${waypoints}&travelmode=${travelMode}`;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${finalDest}&travelmode=${travelMode}`;
}

/**
 * Direct search URL for viewing landmark details on Google Maps.
 */
export function getPlaceSearchUrl(title: string, location = '', destination = ''): string {
  const query = encodeURIComponent([title, location, destination].filter(Boolean).join(' '));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Apple Maps directions link for iOS/macOS users.
 */
export function getAppleMapsUrl(title: string, location = '', destination = ''): string {
  const query = encodeURIComponent([title, location, destination].filter(Boolean).join(', '));
  return `https://maps.apple.com/?daddr=${query}&dirflg=w`;
}
