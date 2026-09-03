export type CategoryType = 'place' | 'food' | 'activity' | 'transport';
export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';
export type BudgetLevel = 'Budget' | 'Moderate' | 'Luxury';
export type TravelPace = 'Relaxed' | 'Balanced' | 'Fast';

export interface TransportDetail {
  mode: 'walk' | 'subway' | 'bus' | 'taxi' | 'train' | 'ferry' | 'car';
  route: string;
  duration: string;
  cost?: string;
}

export interface FoodDetail {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: string;
  recommendedDishes?: string[];
  priceRange: string;
  reservationNeeded?: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type PhotoSourceType = 'pinterest' | 'official_website' | 'tripadvisor' | 'heritage_archive' | 'tourism_board';

export interface AlternativePhoto {
  url: string;
  source: string;
  caption: string;
  sourceType?: PhotoSourceType;
  pinUrl?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  timeSlot: TimeSlot;
  title: string;
  category: CategoryType;
  description: string;
  location: string;
  duration: string;
  costEstimate?: string;
  tips?: string;
  coordinates?: Coordinates;
  imageUrl?: string;
  photos?: string[]; // The best 3 photos of the place from Pinterest
  photoCaption?: string;
  photoSource?: string;
  photoSourceType?: PhotoSourceType;
  officialWebsiteUrl?: string;
  tripAdvisorUrl?: string;
  alternativePhotos?: AlternativePhoto[];
  googleMapsUrl?: string;
  transportDetail?: TransportDetail;
  foodDetail?: FoodDetail;
  completed?: boolean;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  summary: string;
  schedule: ScheduleItem[];
}

export interface TransportationGuide {
  overview: string;
  recommendedPasses: string;
  metroBusTips: string;
  airportTransfer: string;
  rideSharing?: string;
}

export interface CurrencyAndCostEstimate {
  currency: string;
  estimatedTotalPerPerson: string;
  breakdown: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface DailyWeatherForecast {
  date: string;
  dayIndex: number;
  dayName: string;
  dayOfWeek: string;
  formattedDate: string;
  weatherCode: number;
  condition: string;
  iconName: 'Sun' | 'CloudSun' | 'Cloud' | 'CloudRain' | 'CloudDrizzle' | 'CloudLightning' | 'CloudSnow' | 'Wind';
  tempMaxC: number;
  tempMinC: number;
  tempAvgC: number;
  tempMaxF: number;
  tempMinF: number;
  tempAvgF: number;
  precipitationChance: number;
  advice: string;
}

export interface FiveDayWeatherForecastData {
  destination: string;
  startDate: string;
  endDate: string;
  isRealtime: boolean;
  source: string;
  days: DailyWeatherForecast[];
  averageRangeC: { min: number; max: number; avg: number };
  averageRangeF: { min: number; max: number; avg: number };
}

export interface TripPlan {
  id?: string;
  destination: string;
  occasion: string;
  durationDays: number;
  startDate?: string;
  endDate?: string;
  travelersCount: number;
  travelerType: string;
  budget: BudgetLevel;
  pace: TravelPace;
  overview: string;
  weatherSummary: string;
  weatherForecast?: FiveDayWeatherForecastData;
  currencyAndCostEstimate: CurrencyAndCostEstimate;
  transportationGuide: TransportationGuide;
  packingAndPrepTips: string[];
  days: DayPlan[];
  sources?: GroundingSource[];
  createdAt?: string;
  quotaExceeded?: boolean;
  quotaNotice?: string;
  homeBase?: string;
  homeBaseCoords?: Coordinates;
  morningDepartureTime?: string;
  eveningReturnTime?: string;
}

export interface TripPreferences {
  destination: string;
  occasion: string;
  durationDays: number;
  startDate?: string;
  endDate?: string;
  homeBase?: string;
  homeBaseCoords?: Coordinates;
  morningDepartureTime?: string;
  eveningReturnTime?: string;
  travelersCount: number;
  travelerType: string;
  budget: BudgetLevel;
  pace: TravelPace;
  dietary: string[];
  interests: string[];
  specialRequirements: string;
  mustHaveInterests?: string[];
  avoidInterests?: string[];
}

export type NavigationTab = 'home' | 'map' | 'plan' | 'journal' | 'profile';

export interface TravelArchetype {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  quote: string;
  dominantTraits: string[];
  color: string;
  stampBg: string;
}

export interface TravelDNA {
  archetype: TravelArchetype;
  sensoryScores: {
    curiosity: number; // 0-100
    culinary: number;
    culture: number;
    relaxation: number;
    spontaneity: number;
  };
  preferredRhythm: 'gentle' | 'balanced' | 'fast';
  passions: string[];
  collectedStampsCount: number;
}

export interface JournalMemory {
  id: string;
  dayIndex: number;
  itemId?: string;
  title: string;
  location: string;
  date: string;
  photoUrl?: string;
  caption?: string;
  userNote?: string;
  stampCity?: string;
  stampColor?: string;
  weatherEmoji?: string;
  washiStyle?: 'coral' | 'mint' | 'gold';
  rotation?: number;
}

export interface CompassSuggestion {
  id: string;
  type: 'weather' | 'route' | 'golden_hour' | 'tip' | 'photo';
  title: string;
  message: string;
  actionText?: string;
  actionType?: 'switch_items' | 'navigate' | 'view_photo' | 'dismiss';
}
