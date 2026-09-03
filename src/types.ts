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

export type PhotoSourceType = 'official_website' | 'tripadvisor' | 'heritage_archive' | 'tourism_board';

export interface AlternativePhoto {
  url: string;
  source: string;
  caption: string;
  sourceType?: PhotoSourceType;
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

export interface TripPlan {
  id?: string;
  destination: string;
  occasion: string;
  durationDays: number;
  travelersCount: number;
  travelerType: string;
  budget: BudgetLevel;
  pace: TravelPace;
  overview: string;
  weatherSummary: string;
  currencyAndCostEstimate: CurrencyAndCostEstimate;
  transportationGuide: TransportationGuide;
  packingAndPrepTips: string[];
  days: DayPlan[];
  sources?: GroundingSource[];
  createdAt?: string;
  quotaExceeded?: boolean;
  quotaNotice?: string;
}

export interface TripPreferences {
  destination: string;
  occasion: string;
  durationDays: number;
  travelersCount: number;
  travelerType: string;
  budget: BudgetLevel;
  pace: TravelPace;
  dietary: string[];
  interests: string[];
  specialRequirements: string;
}
