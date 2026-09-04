import { DailyWeatherForecast, FiveDayWeatherForecastData } from '../types';

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function formatDateISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateISO(isoStr: string): Date {
  const parts = isoStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d, 12, 0, 0);
  }
  return new Date();
}

export function formatDisplayDate(d: Date): { dayOfWeek: string; formattedDate: string } {
  const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { dayOfWeek, formattedDate };
}

export function getWeatherConditionInfo(code: number): {
  condition: string;
  iconName: DailyWeatherForecast['iconName'];
  advice: string;
} {
  // WMO Weather interpretation codes
  if (code === 0) {
    return {
      condition: 'Clear Sky',
      iconName: 'Sun',
      advice: 'Bright & sunny! Sunglasses, hat, and sunscreen recommended.',
    };
  }
  if (code === 1) {
    return {
      condition: 'Mainly Clear',
      iconName: 'Sun',
      advice: 'Crisp, bright skies — ideal for panoramic viewpoints.',
    };
  }
  if (code === 2) {
    return {
      condition: 'Partly Cloudy',
      iconName: 'CloudSun',
      advice: 'Pleasant sightseeing weather with intermittent soft breezes.',
    };
  }
  if (code === 3) {
    return {
      condition: 'Overcast',
      iconName: 'Cloud',
      advice: 'Gentle, diffuse daylight — perfect for street & shrine photography.',
    };
  }
  if (code === 45 || code === 48) {
    return {
      condition: 'Misty / Fog',
      iconName: 'Cloud',
      advice: 'Atmospheric morning mist; wear non-slip footwear.',
    };
  }
  if (code >= 51 && code <= 55) {
    return {
      condition: 'Light Drizzle',
      iconName: 'CloudDrizzle',
      advice: 'Light intermittent mist; a compact travel umbrella is handy.',
    };
  }
  if (code === 56 || code === 57) {
    return {
      condition: 'Freezing Drizzle',
      iconName: 'CloudSnow',
      advice: 'Chilly drizzle; warm waterproof outerwear is key.',
    };
  }
  if (code >= 61 && code <= 65) {
    return {
      condition: code === 65 ? 'Heavy Rain' : 'Moderate Rain',
      iconName: 'CloudRain',
      advice: code === 65
        ? 'Steady rain; great time for covered arcades, museums, and cozy tea shops.'
        : 'Rain showers expected; carry an umbrella and water-resistant footwear.',
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      condition: 'Snowfall',
      iconName: 'CloudSnow',
      advice: 'Snow flurries; wear thermal base layers and insulated boots.',
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      condition: 'Passing Showers',
      iconName: 'CloudRain',
      advice: 'Scattered showers between sunny breaks; keep an umbrella close.',
    };
  }
  if (code >= 85 && code <= 86) {
    return {
      condition: 'Snow Showers',
      iconName: 'CloudSnow',
      advice: 'Intermittent snow showers; gloves and scarf recommended.',
    };
  }
  if (code >= 95) {
    return {
      condition: 'Thunderstorm',
      iconName: 'CloudLightning',
      advice: 'Thunderstorm activity; schedule indoor dining and galleries.',
    };
  }

  return {
    condition: 'Mild & Fair',
    iconName: 'CloudSun',
    advice: 'Comfortable seasonal weather for leisurely exploration.',
  };
}

/**
 * Seasonal fallback climate database for famous global destinations
 */
const SEASONAL_CLIMATES: Record<string, { baseHighC: number[]; baseLowC: number[]; avgRainChance: number[] }> = {
  tokyo: {
    baseHighC: [10, 11, 14, 19, 23, 26, 29, 31, 27, 22, 17, 12],
    baseLowC: [2, 3, 6, 11, 16, 20, 24, 25, 22, 16, 10, 5],
    avgRainChance: [20, 25, 35, 40, 45, 55, 45, 35, 50, 40, 30, 20],
  },
  kyoto: {
    baseHighC: [9, 10, 14, 20, 25, 28, 32, 33, 29, 23, 17, 12],
    baseLowC: [1, 2, 5, 10, 15, 20, 24, 25, 21, 14, 8, 3],
    avgRainChance: [25, 30, 40, 45, 45, 60, 50, 40, 50, 35, 30, 25],
  },
  paris: {
    baseHighC: [7, 8, 12, 16, 20, 23, 25, 25, 21, 16, 11, 8],
    baseLowC: [3, 3, 5, 8, 11, 14, 16, 16, 13, 10, 6, 4],
    avgRainChance: [35, 30, 30, 35, 35, 30, 30, 30, 30, 35, 40, 40],
  },
  rome: {
    baseHighC: [12, 13, 16, 19, 24, 28, 31, 31, 27, 22, 17, 13],
    baseLowC: [4, 5, 7, 9, 13, 17, 20, 20, 17, 13, 9, 5],
    avgRainChance: [30, 30, 25, 25, 20, 15, 10, 15, 25, 35, 40, 35],
  },
  london: {
    baseHighC: [9, 9, 12, 15, 18, 21, 23, 23, 20, 16, 12, 9],
    baseLowC: [4, 4, 6, 7, 10, 13, 15, 15, 13, 10, 7, 5],
    avgRainChance: [40, 35, 35, 35, 35, 35, 30, 35, 35, 40, 45, 40],
  },
  newyork: {
    baseHighC: [4, 6, 11, 17, 22, 27, 30, 29, 25, 18, 13, 7],
    baseLowC: [-3, -2, 2, 7, 13, 18, 21, 21, 17, 10, 5, 0],
    avgRainChance: [30, 30, 35, 35, 35, 35, 35, 35, 30, 30, 30, 30],
  },
};

/**
 * Fallback synthesizer that produces realistic, coherent 5-day weather data
 */
export function generateSeasonalForecast(
  destination: string,
  startDateStr?: string
): FiveDayWeatherForecastData {
  const cleanDest = destination.trim() || 'Tokyo, Japan';
  const start = startDateStr ? parseDateISO(startDateStr) : new Date();
  const monthIdx = start.getMonth(); // 0-11

  // Detect matching climate profile
  const destLower = cleanDest.toLowerCase();
  let climate = SEASONAL_CLIMATES.tokyo;
  for (const key of Object.keys(SEASONAL_CLIMATES)) {
    if (destLower.includes(key)) {
      climate = SEASONAL_CLIMATES[key];
      break;
    }
  }

  const baseHigh = climate.baseHighC[monthIdx];
  const baseLow = climate.baseLowC[monthIdx];
  const baseRain = climate.avgRainChance[monthIdx];

  // Coherent daily weather variations
  const weatherCodesPool = [0, 1, 2, 2, 3, 80, 61];
  const days: DailyWeatherForecast[] = [];

  let sumMaxC = 0;
  let sumMinC = 0;

  for (let i = 0; i < 5; i++) {
    const curDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = formatDateISO(curDate);
    const { dayOfWeek, formattedDate } = formatDisplayDate(curDate);

    // Day variance: deterministic slight wobble
    const wobble = Math.sin(i * 1.5 + curDate.getDate()) * 2.2;
    const maxC = Math.round((baseHigh + wobble) * 10) / 10;
    const minC = Math.round((baseLow + wobble * 0.7) * 10) / 10;
    const avgC = Math.round(((maxC + minC) / 2) * 10) / 10;

    sumMaxC += maxC;
    sumMinC += minC;

    // Pick weather code
    const code = baseRain > 40 && i === 2 ? 61 : weatherCodesPool[(i + curDate.getDate()) % weatherCodesPool.length];
    const { condition, iconName, advice } = getWeatherConditionInfo(code);

    const rainVariance = Math.round(Math.min(95, Math.max(5, baseRain + (i % 2 === 0 ? 10 : -10))));

    days.push({
      date: dateStr,
      dayIndex: i + 1,
      dayName: `Day ${i + 1}`,
      dayOfWeek,
      formattedDate,
      weatherCode: code,
      condition,
      iconName,
      tempMaxC: maxC,
      tempMinC: minC,
      tempAvgC: avgC,
      tempMaxF: celsiusToFahrenheit(maxC),
      tempMinF: celsiusToFahrenheit(minC),
      tempAvgF: celsiusToFahrenheit(avgC),
      precipitationChance: rainVariance,
      advice,
    });
  }

  const overallMaxC = Math.round(Math.max(...days.map((d) => d.tempMaxC)));
  const overallMinC = Math.round(Math.min(...days.map((d) => d.tempMinC)));
  const overallAvgC = Math.round((sumMaxC + sumMinC) / 10);

  const overallMaxF = celsiusToFahrenheit(overallMaxC);
  const overallMinF = celsiusToFahrenheit(overallMinC);
  const overallAvgF = celsiusToFahrenheit(overallAvgC);

  const endDate = days[days.length - 1].date;

  return {
    destination: cleanDest,
    startDate: days[0].date,
    endDate,
    isRealtime: false,
    source: 'Curated Seasonal Climate Model',
    days,
    averageRangeC: { min: overallMinC, max: overallMaxC, avg: overallAvgC },
    averageRangeF: { min: overallMinF, max: overallMaxF, avg: overallAvgF },
  };
}

/**
 * Resolves 5-day weather forecast using server proxy and Open-Meteo
 */
export async function fetch5DayWeatherForecast(
  destination: string,
  startDateStr?: string
): Promise<FiveDayWeatherForecastData> {
  const cleanDest = destination.trim();
  const safeStart = startDateStr || formatDateISO(new Date());

  // Tier 1: Try server API route
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const res = await fetch(
      `${baseUrl}/api/weather?destination=${encodeURIComponent(cleanDest)}&startDate=${encodeURIComponent(safeStart)}`
    );
    if (res.ok) {
      const data: FiveDayWeatherForecastData = await res.json();
      if (data && data.days && data.days.length > 0) {
        return data;
      }
    }
  } catch (err) {
    // Continue to client direct fetch
  }

  // Tier 2: Direct Open-Meteo Geocoding + Forecast API (CORS friendly, keyless)
  try {
    const citySearch = cleanDest.split(',')[0].replace(/\([^)]*\)/g, '').trim();
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(citySearch)}&count=1`;
    const geoRes = await fetch(geoUrl);

    if (geoRes.ok) {
      const geoJson = await geoRes.json();
      if (geoJson.results && geoJson.results.length > 0) {
        const { latitude, longitude, name, country } = geoJson.results[0];

        // Format dates
        const start = parseDateISO(safeStart);
        const end = new Date(start.getTime() + 4 * 24 * 60 * 60 * 1000);
        const startFormatted = formatDateISO(start);
        const endFormatted = formatDateISO(end);

        // Fetch forecast
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${startFormatted}&end_date=${endFormatted}`;
        const weatherRes = await fetch(weatherUrl);

        if (weatherRes.ok) {
          const wJson = await weatherRes.json();
          if (wJson.daily && wJson.daily.time && wJson.daily.time.length >= 5) {
            const days: DailyWeatherForecast[] = [];
            const times: string[] = wJson.daily.time;
            const codes: number[] = wJson.daily.weathercode;
            const maxs: number[] = wJson.daily.temperature_2m_max;
            const mins: number[] = wJson.daily.temperature_2m_min;
            const rains: number[] = wJson.daily.precipitation_probability_max || [];

            let sumMax = 0;
            let sumMin = 0;

            for (let i = 0; i < 5; i++) {
              const dStr = times[i];
              const dDate = parseDateISO(dStr);
              const { dayOfWeek, formattedDate } = formatDisplayDate(dDate);
              const code = codes[i] ?? 1;
              const { condition, iconName, advice } = getWeatherConditionInfo(code);

              const maxC = Math.round(maxs[i] * 10) / 10;
              const minC = Math.round(mins[i] * 10) / 10;
              const avgC = Math.round(((maxC + minC) / 2) * 10) / 10;

              sumMax += maxC;
              sumMin += minC;

              days.push({
                date: dStr,
                dayIndex: i + 1,
                dayName: `Day ${i + 1}`,
                dayOfWeek,
                formattedDate,
                weatherCode: code,
                condition,
                iconName,
                tempMaxC: maxC,
                tempMinC: minC,
                tempAvgC: avgC,
                tempMaxF: celsiusToFahrenheit(maxC),
                tempMinF: celsiusToFahrenheit(minC),
                tempAvgF: celsiusToFahrenheit(avgC),
                precipitationChance: rains[i] ?? 15,
                advice,
              });
            }

            const overallMaxC = Math.round(Math.max(...days.map((d) => d.tempMaxC)));
            const overallMinC = Math.round(Math.min(...days.map((d) => d.tempMinC)));
            const overallAvgC = Math.round((sumMax + sumMin) / 10);

            return {
              destination: `${name}, ${country || cleanDest}`,
              startDate: days[0].date,
              endDate: days[days.length - 1].date,
              isRealtime: true,
              source: 'Live Open-Meteo Meteorological Service',
              days,
              averageRangeC: { min: overallMinC, max: overallMaxC, avg: overallAvgC },
              averageRangeF: {
                min: celsiusToFahrenheit(overallMinC),
                max: celsiusToFahrenheit(overallMaxC),
                avg: celsiusToFahrenheit(overallAvgC),
              },
            };
          }
        }
      }
    }
  } catch (err) {
    // Failover to seasonal model
  }

  // Tier 3: Robust Seasonal Climate Fallback
  return generateSeasonalForecast(cleanDest, safeStart);
}
