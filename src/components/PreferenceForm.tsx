import React, { useState, useRef } from 'react';
import { TripPreferences } from '../types';
import { WashiTape } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';
import { 
  CuteStarMascot, 
  CozyCompass, 
  SquigglyArrow, 
  CozyCamperVan, 
  CozyCapybara,
  PalmIslandOccasion,
  RingBoxOccasion,
  ScooterDuoOccasion,
  CoolGhostOccasion,
  FamilyBabyOccasion,
  HoneymoonRingOccasion,
  LuggageStackOccasion,
  DumplingBuddiesOccasion
} from './CozyIllustrations';
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  Coins, 
  Timer, 
  PenTool, 
  Compass as CompassIcon,
  Search,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Utensils,
  Landmark,
  Compass,
  AlertCircle
} from 'lucide-react';

interface PreferenceFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isLoading: boolean;
  onSelectSample: () => void;
}

// 8 Occasions matching IMG_0781.png exactly
const OCCASIONS = [
  {
    id: "Vacation / Leisure",
    label: "Vacation / Leisure",
    Icon: PalmIslandOccasion,
    desc: "Scenic & relaxing exploration"
  },
  {
    id: "Proposal / Romantic",
    label: "Proposal / Romantic",
    Icon: RingBoxOccasion,
    desc: "Intimate and unforgettable moments"
  },
  {
    id: "Adventure / Road Trip",
    label: "Adventure / Road Trip",
    Icon: ScooterDuoOccasion,
    desc: "Active discovery & scenic rides"
  },
  {
    id: "Solo Adventure",
    label: "Solo Adventure",
    Icon: CoolGhostOccasion,
    desc: "Independent, flexible & immersive"
  },
  {
    id: "Family with Kids",
    label: "Family with Kids",
    Icon: FamilyBabyOccasion,
    desc: "Kid-friendly pacing & joyful stops"
  },
  {
    id: "Honeymoon",
    label: "Honeymoon",
    Icon: HoneymoonRingOccasion,
    desc: "Dreamy vistas, luxury & dining"
  },
  {
    id: "Weekend Getaway",
    label: "Weekend Getaway",
    Icon: LuggageStackOccasion,
    desc: "Quick, efficient high-yield trip"
  },
  {
    id: "Friends Getaway",
    label: "Friends Getaway",
    Icon: DumplingBuddiesOccasion,
    desc: "Shared adventures & social dining"
  },
];

const QUICK_DESTINATIONS = [
  { name: "Tokyo", tag: "TOKYO 🗼", query: "Tokyo, Japan", pillClass: "bg-[#D7EED9] text-[#285A34] border-[#B8DEC0]" },
  { name: "Paris", tag: "PARIS 🗼", query: "Paris, France", pillClass: "bg-[#FFF6E9] text-[#544136] border-[#EADBCE]" },
  { name: "Rome", tag: "ROME 🏛️", query: "Rome, Italy", pillClass: "bg-[#FFF6E9] text-[#544136] border-[#EADBCE]" },
  { name: "Kyoto", tag: "KYOTO ⛩️", query: "Kyoto, Japan", pillClass: "bg-[#FFF6E9] text-[#544136] border-[#EADBCE]" },
  { name: "Barcelona", tag: "BARCELONA 🏖️", query: "Barcelona, Spain", pillClass: "bg-[#FFF6E9] text-[#544136] border-[#EADBCE]" },
  { name: "New York", tag: "NEW YORK 🗽", query: "New York City, USA", pillClass: "bg-[#FFF6E9] text-[#544136] border-[#EADBCE]" },
];

export type TagStatus = 'none' | 'selected' | 'must-have' | 'avoid';

export interface PreferenceTag {
  id: string;
  label: string;
  category: 'food' | 'culture' | 'action';
  iconEmoji: string;
  color: string;
  defaultStatus?: TagStatus;
  description: string;
}

export const PREFERENCE_CATEGORIES = [
  {
    id: 'food' as const,
    title: 'Food & Dining',
    shortTitle: 'Food & Dining',
    iconEmoji: '🍽️',
    description: 'Street food, fine dining, artisanal cafes & bakeries, and dietary focuses.',
    colorTheme: 'text-[#8C3415] bg-[#FFF2EB] border-[#FFD0BE]',
    activeTabClass: 'bg-[#FF7A59] text-white shadow-xs',
  },
  {
    id: 'culture' as const,
    title: 'Culture & Discovery',
    shortTitle: 'Culture & Discovery',
    iconEmoji: '🏛️',
    description: 'Iconic landmarks, museums, architecture, and secret local neighborhoods.',
    colorTheme: 'text-[#4F369E] bg-[#F3EEFF] border-[#D9CAFC]',
    activeTabClass: 'bg-[#7C5CBF] text-white shadow-xs',
  },
  {
    id: 'action' as const,
    title: 'Action & Leisure',
    shortTitle: 'Action & Leisure',
    iconEmoji: '🏄',
    description: 'Beaches, live sports, forest hikes, retail shopping, and onsen retreats.',
    colorTheme: 'text-[#126855] bg-[#E7F8F4] border-[#B9E9DC]',
    activeTabClass: 'bg-[#1D8E74] text-white shadow-xs',
  },
];

export const PREFERENCE_TAGS: PreferenceTag[] = [
  // 1. Food & Dining
  {
    id: 'Street Food & Markets',
    label: 'Street Food & Markets',
    category: 'food',
    iconEmoji: '🍢',
    color: 'bg-[#FFE2D6] text-[#782815] border-[#FFC2AF]',
    description: 'Night markets, skewer alleys, and bustling food halls'
  },
  {
    id: 'Fine Dining & Tasting',
    label: 'Fine Dining',
    category: 'food',
    iconEmoji: '🍷',
    color: 'bg-[#FDF2F4] text-[#8C2442] border-[#F8C8D6]',
    description: 'Chef tasting menus, wine pairings & premier culinary art'
  },
  {
    id: 'Cafes & Bakeries',
    label: 'Cafes & Bakeries',
    category: 'food',
    iconEmoji: '☕',
    color: 'bg-[#FFF6E5] text-[#78481A] border-[#FDE0A2]',
    description: 'Specialty pour-overs, artisanal pastries & matcha salons'
  },
  {
    id: 'Local Specialties',
    label: 'Local Specialties',
    category: 'food',
    iconEmoji: '🍜',
    color: 'bg-[#D7EED9] text-[#285A34] border-[#B8DEC0]',
    description: 'Iconic regional dishes unique to this destination'
  },
  {
    id: 'Dietary Focus: Halal',
    label: 'Dietary: Halal',
    category: 'food',
    iconEmoji: '🌙',
    color: 'bg-[#E0F8F6] text-[#13665F] border-[#B8EFEA]',
    description: 'Certified halal restaurants & Muslim-friendly menus'
  },
  {
    id: 'Dietary Focus: Vegan & Veg',
    label: 'Dietary: Vegan / Veg',
    category: 'food',
    iconEmoji: '🌱',
    color: 'bg-[#E2F7D8] text-[#266817] border-[#C3EEB0]',
    description: 'Plant-forward bistros, temple food & organic cafes'
  },
  {
    id: 'Dietary Focus: Gluten-Free',
    label: 'Dietary: Gluten-Free',
    category: 'food',
    iconEmoji: '🌾',
    color: 'bg-[#FFF0DF] text-[#7E4B14] border-[#FAD7AA]',
    description: 'Celiac-safe dining & grain-conscious options'
  },
  {
    id: 'Craft Cocktails & Bars',
    label: 'Craft Cocktails & Bars',
    category: 'food',
    iconEmoji: '🍸',
    color: 'bg-[#EBE7FD] text-[#453787] border-[#D4CBFA]',
    description: 'Hidden speakeasies, izakayas, and rooftop mixology'
  },

  // 2. Culture & Discovery
  {
    id: 'Iconic Landmarks',
    label: 'Iconic Landmarks',
    category: 'culture',
    iconEmoji: '🏛️',
    color: 'bg-[#FFB8A5] text-[#782310] border-[#FFA085]',
    defaultStatus: 'must-have',
    description: 'World-famous monuments, towers & essential sightlines'
  },
  {
    id: 'Museums & Art',
    label: 'Museums & Art',
    category: 'culture',
    iconEmoji: '🎨',
    color: 'bg-[#FFD9E3] text-[#7A2542] border-[#FFBACB]',
    description: 'Fine art galleries, interactive exhibitions & sculpture'
  },
  {
    id: 'Architecture & History',
    label: 'Architecture & History',
    category: 'culture',
    iconEmoji: '⛩️',
    color: 'bg-[#FFF3B0] text-[#6E5910] border-[#FBE67D]',
    description: 'Centuries-old heritage, historic temples & design feats'
  },
  {
    id: 'Hidden Local Gems',
    label: 'Hidden Local Gems',
    category: 'culture',
    iconEmoji: '🔍',
    color: 'bg-[#D8F3E5] text-[#1E5C3B] border-[#B4E5CB]',
    description: 'Intimate backstreets, artisan workshops & non-touristy pockets'
  },
  {
    id: 'Cultural Workshops',
    label: 'Cultural Workshops',
    category: 'culture',
    iconEmoji: '🍵',
    color: 'bg-[#FFEAD1] text-[#754412] border-[#FFD4A8]',
    description: 'Tea ceremonies, pottery, cooking & calligraphy classes'
  },
  {
    id: 'Photography Spots',
    label: 'Photography Spots',
    category: 'culture',
    iconEmoji: '📷',
    color: 'bg-[#EDE7E0] text-[#504439] border-[#DDD3C7]',
    description: 'Golden hour panoramas, neon alleys & cinematic vistas'
  },

  // 3. Action & Leisure
  {
    id: 'Beaches & Pools',
    label: 'Beaches & Pools',
    category: 'action',
    iconEmoji: '🏖️',
    color: 'bg-[#E0F4FF] text-[#115C8C] border-[#B8E3FF]',
    description: 'Coastal beach clubs, sunbathing & ocean swimming'
  },
  {
    id: 'Live Sports & Events',
    label: 'Live Sports & Events',
    category: 'action',
    iconEmoji: '🏀',
    color: 'bg-[#FFE5D4] text-[#8C3A0A] border-[#FFC8A3]',
    description: 'Arena basketball, soccer matches, baseball & lively sports bars'
  },
  {
    id: 'Nature & Outdoors',
    label: 'Nature & Outdoors',
    category: 'action',
    iconEmoji: '🌲',
    color: 'bg-[#D7EED9] text-[#285A34] border-[#B8DEC0]',
    description: 'National parks, mountain hiking, rivers & scenic gardens'
  },
  {
    id: 'Retail Shopping & Vintage',
    label: 'Retail Shopping',
    category: 'action',
    iconEmoji: '🛍️',
    color: 'bg-[#FFEAD1] text-[#754412] border-[#FFD4A8]',
    description: 'Flagship fashion, vintage thrift streets & local markets'
  },
  {
    id: 'Nightlife & Entertainment',
    label: 'Nightlife & Clubs',
    category: 'action',
    iconEmoji: '🪩',
    color: 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
    description: 'Live music venues, jazz cellars, rooftop lounges & dance clubs'
  },
  {
    id: 'Wellness & Spas / Onsen',
    label: 'Wellness & Spas',
    category: 'action',
    iconEmoji: '♨️',
    color: 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]',
    description: 'Thermal hot springs, traditional baths, saunas & massage retreats'
  },
];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({
  onSubmit,
  isLoading,
  onSelectSample,
}) => {
  const [destination, setDestination] = useState('');
  const [occasion, setOccasion] = useState('Vacation / Leisure');
  const [durationDays, setDurationDays] = useState(4);
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelerType, setTravelerType] = useState('Couple');
  const [budget, setBudget] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Fast'>('Balanced');
  
  // Tag states: 'none' | 'selected' | 'must-have' | 'avoid'
  const [tagStates, setTagStates] = useState<Record<string, TagStatus>>({
    'Iconic Landmarks': 'must-have',
    'Local Specialties': 'selected',
    'Museums & Art': 'selected',
    'Street Food & Markets': 'selected',
    'Architecture & History': 'selected',
  });

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [notes, setNotes] = useState('');

  // Long press timer & mobile double-tap ref
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleToggleTag = (id: string) => {
    triggerHaptic('light');
    setTagStates(prev => {
      const current = prev[id] || 'none';
      if (current === 'none') {
        return { ...prev, [id]: 'selected' };
      } else {
        const next = { ...prev };
        delete next[id];
        return next;
      }
    });
  };

  const handleSetMustHave = (id: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic('medium');
    setTagStates(prev => {
      const current = prev[id] || 'none';
      if (current === 'must-have') {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 'must-have' };
    });
  };

  const handleSetAvoid = (id: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic('strong');
    setTagStates(prev => {
      const current = prev[id] || 'none';
      if (current === 'avoid') {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 'avoid' };
    });
  };

  const handleTagPointerDown = (id: string) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    longPressTimerRef.current = setTimeout(() => {
      handleSetAvoid(id);
      longPressTimerRef.current = null;
    }, 550);
  };

  const handleTagPointerUp = (id: string) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
      
      // Check for double tap on touch
      const now = Date.now();
      if (lastTapRef.current && lastTapRef.current.id === id && now - lastTapRef.current.time < 350) {
        handleSetMustHave(id);
        lastTapRef.current = null;
      } else {
        lastTapRef.current = { id, time: now };
        handleToggleTag(id);
      }
    }
  };

  const handleTagPointerCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleSelectTravelerType = (type: string, count: number) => {
    setTravelerType(type);
    setTravelersCount(count);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setDestination('Tokyo, Japan');
    }

    const dietary = Object.entries(tagStates)
      .filter(([id, state]) => {
        const tag = PREFERENCE_TAGS.find(t => t.id === id);
        return tag?.category === 'food' && (state === 'selected' || state === 'must-have');
      })
      .map(([id]) => id);

    const interests = Object.entries(tagStates)
      .filter(([id, state]) => {
        const tag = PREFERENCE_TAGS.find(t => t.id === id);
        return tag?.category !== 'food' && (state === 'selected' || state === 'must-have');
      })
      .map(([id]) => id);

    const mustHaves = Object.entries(tagStates)
      .filter(([_, state]) => state === 'must-have')
      .map(([id]) => id);

    const avoids = Object.entries(tagStates)
      .filter(([_, state]) => state === 'avoid')
      .map(([id]) => id);

    // Enriched notes with explicit AI directives
    let combinedNotes = notes.trim();
    if (mustHaves.length > 0) {
      combinedNotes += (combinedNotes ? ' ' : '') + `[HIGH-PRIORITY MUST-HAVES: ${mustHaves.join(', ')}]`;
    }
    if (avoids.length > 0) {
      combinedNotes += (combinedNotes ? ' ' : '') + `[STRICTLY AVOID & FILTER OUT: ${avoids.join(', ')}]`;
    }

    onSubmit({
      destination: destination.trim() || 'Tokyo, Japan',
      occasion,
      durationDays,
      travelersCount,
      travelerType,
      budget,
      pace,
      dietary: dietary.length > 0 ? dietary : ['Local Specialties'],
      interests: interests.length > 0 ? interests : ['Iconic Landmarks'],
      mustHaveInterests: mustHaves,
      avoidInterests: avoids,
      specialRequirements: combinedNotes,
    });
  };

  const budgetOptions: { level: 'Budget' | 'Moderate' | 'Luxury'; label: string; desc: string }[] = [
    { level: 'Budget', label: 'Budget-Friendly', desc: 'Hostels, metro & street food' },
    { level: 'Moderate', label: 'Balanced Comfort', desc: 'Boutique hotels & great dining' },
    { level: 'Luxury', label: 'Luxury Splurge', desc: '5-star stays & premier dining' },
  ];

  const paceOptions: { pace: 'Relaxed' | 'Balanced' | 'Fast'; label: string; desc: string }[] = [
    { pace: 'Relaxed', label: 'Relaxed Flow', desc: 'Leisurely stops, 2-3 spots/day' },
    { pace: 'Balanced', label: 'Balanced Sightseeing', desc: 'Optimal pacing, 4-5 spots/day' },
    { pace: 'Fast', label: 'Fast & Packed', desc: 'High energy, maximize every hour' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* 1. TOP CORAL BANNER MATCHING IMG_0781.png */}
      <div 
        id="cozy-banner"
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#FFA085] via-[#FF7A59] to-[#FF6B6B] p-4 sm:p-5 text-white shadow-md border-2 border-[#FF6040]/30"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Smiling Yellow Star Mascot */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <CuteStarMascot className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-sm" />
            </div>
          </div>

          {/* Center: TRIP PLANNER (COZY EDITION) */}
          <div className="text-center flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-xs inline-flex items-center gap-2 flex-wrap justify-center font-cozy-serif">
              <span>TRIP PLANNER</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-xs">
                COZY EDITION
              </span>
            </h1>
          </div>

          {/* Right: HAND-CRAFTED SCHEDULING (Tilted stitched badge) */}
          <div className="shrink-0 hidden xs:block sm:block">
            <div className="stitched-badge px-3 py-1.5 rounded-xl rotate-[-2deg] shadow-xs hover:rotate-0 transition-transform">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#63452B] flex items-center gap-1">
                <span>✦</span>
                <span>HAND-CRAFTED SCHEDULING</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO TITLE: WHERE WILL YOUR NEXT JOURNEY TAKE YOU? */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <h2 className="font-cozy-serif text-2xl sm:text-3xl md:text-4xl text-[#2F241D] font-black tracking-tight text-center">
            WHERE WILL YOUR NEXT JOURNEY TAKE YOU?
          </h2>
          <div className="inline-block transform hover:rotate-12 transition-transform duration-300">
            <CozyCompass className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 font-medium max-w-md mx-auto">
          Tailored daily schedules with verified landmark photos, transit passes, walking routes, and budget estimates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 3. SEARCH BAR WITH CIRCULAR COMPASS BUTTON */}
        <div className="space-y-2.5">
          <div className="relative rounded-full bg-white border border-stone-200/90 shadow-sm p-1.5 pl-2 flex items-center focus-within:border-[#FF7A59] focus-within:ring-3 focus-within:ring-[#FF7A59]/20 transition-all">
            {/* Green circular compass needle button */}
            <div className="w-10 h-10 rounded-full bg-[#3F5E46] text-white flex items-center justify-center shrink-0 shadow-xs">
              <CompassIcon className="w-5 h-5 animate-pulse" />
            </div>

            <input
              id="input-destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where you traveling..."
              className="w-full px-3 py-2 text-stone-800 placeholder:text-stone-400 font-semibold text-sm sm:text-base bg-transparent border-none outline-none"
            />

            {destination && (
              <button
                type="button"
                onClick={() => setDestination('')}
                className="text-stone-400 hover:text-stone-600 px-3 text-xs font-bold"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (!destination) setDestination('Tokyo, Japan');
              }}
              className="px-4 py-2 bg-[#F3ECE0] hover:bg-[#EAE0D0] text-[#4A3B30] rounded-full text-xs font-bold transition-colors shrink-0 mr-1"
            >
              Explore
            </button>
          </div>

          {/* Below Search: Squiggly Arrow and Quick Destination Tags */}
          <div className="flex items-center gap-2 pl-4 sm:pl-8 flex-wrap">
            <SquigglyArrow className="w-7 h-7 text-stone-400 shrink-0 transform -rotate-12" />
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">Trending:</span>
            {QUICK_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                type="button"
                id={`btn-dest-${dest.name.toLowerCase()}`}
                onClick={() => setDestination(dest.query)}
                className={`text-xs font-black px-3.5 py-1 rounded-full border transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-2xs ${
                  destination.toLowerCase().includes(dest.name.toLowerCase())
                    ? 'bg-[#FF7A59] text-white border-[#FF6040] shadow-sm'
                    : dest.pillClass
                }`}
              >
                {dest.tag}
              </button>
            ))}
          </div>
        </div>

        {/* 4. "WHAT'S THE OCCASION?" CARD WITH 8 KAWAII ILLUSTRATED CARDS */}
        <div className="cozy-card p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#3E3025] tracking-wider uppercase flex items-center gap-2">
              <span>✦</span>
              <span>WHAT&apos;S THE OCCASION?</span>
            </h3>
            <span className="text-[11px] text-stone-500 font-bold bg-white/70 px-2.5 py-0.5 rounded-full border border-stone-200/60">
              Selected: <span className="text-[#FF7A59] font-black">{occasion}</span>
            </span>
          </div>

          {/* 8 Cards in 2 rows of 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {OCCASIONS.map((occ) => {
              const isSelected = occasion === occ.id;
              const OccIcon = occ.Icon;

              return (
                <button
                  key={occ.id}
                  type="button"
                  id={`occasion-${occ.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setOccasion(occ.id)}
                  className={`group relative rounded-2xl p-3.5 sm:p-4 text-center transition-all duration-200 flex flex-col items-center justify-between gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#FFE5DB] border-2 border-[#FF7A59] shadow-sm scale-[1.03]'
                      : 'bg-[#F4ECE1]/60 hover:bg-[#F4ECE1] border-transparent hover:border-stone-200/80 hover:scale-[1.01]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-[#FF7A59] text-white rounded-full p-0.5 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Kawaii SVG illustration */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform group-hover:scale-110">
                    <OccIcon className="w-full h-full drop-shadow-xs" />
                  </div>

                  {/* Title */}
                  <div className="space-y-0.5">
                    <div className="text-xs sm:text-[13px] font-black text-[#33241A] leading-tight">
                      {occ.label}
                    </div>
                    <div className="text-[10px] text-stone-500 line-clamp-1 font-medium hidden sm:block">
                      {occ.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. "DURATION" WINDING DOTTED TRAIL WITH RETRO CAMPER VAN */}
        <div className="cozy-card p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#3E3025] tracking-wider uppercase flex items-center gap-2">
              <span>✦</span>
              <span>DURATION</span>
            </h3>
            <span className="text-xs font-black text-[#FF7A59] bg-[#FFE2D6] px-3 py-1 rounded-full border border-[#FFC7B5]">
              {durationDays} {durationDays === 1 ? 'Day Trip' : 'Days Total'}
            </span>
          </div>

          {/* Interactive Dotted Trail with milestone stations & camper van */}
          <div className="relative py-8 px-2 sm:px-6">
            {/* SVG Connecting Trail */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 pointer-events-none">
              <div className="w-full border-b-2 border-dashed border-[#DFB277] relative" />
            </div>

            {/* Milestones 1d through 7d */}
            <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isActive = durationDays === day;
                return (
                  <div key={day} className="relative flex flex-col items-center">
                    {/* Speech bubble above the active day */}
                    {isActive && (
                      <div className="absolute -top-12 z-20 flex flex-col items-center animate-bounce">
                        <div className="bg-white rounded-xl px-2.5 py-1 shadow-sm border border-stone-200 text-xs font-black text-[#2D241E] whitespace-nowrap">
                          {day} {day === 1 ? 'Day' : 'Days'}
                        </div>
                        {/* Downward triangle tail */}
                        <div className="w-2 h-2 bg-white border-r border-b border-stone-200 transform rotate-45 -mt-1" />
                      </div>
                    )}

                    {/* Milestone Button Circle */}
                    <button
                      type="button"
                      id={`btn-duration-${day}d`}
                      onClick={() => setDurationDays(day)}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        isActive
                          ? 'bg-[#3D291F] text-white ring-4 ring-[#FFE17D] shadow-md scale-110'
                          : 'bg-[#FFFDF7] hover:bg-white text-[#5C483A] border-2 border-[#DFB277]/70 shadow-2xs hover:scale-105'
                      }`}
                    >
                      {day}d
                    </button>

                    {/* Cute Camper Van driving beside active milestone */}
                    {isActive && (
                      <div className="absolute -bottom-11 z-20 transition-all">
                        <CozyCamperVan className="w-14 h-9 sm:w-16 sm:h-10" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6. "NUMBER OF TRAVELERS" WITH EMBOSSED STEPPER & PRESET PILLS */}
        <div className="cozy-card p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#3E3025] tracking-wider uppercase flex items-center gap-2">
              <span>✦</span>
              <span>NUMBER OF TRAVELERS</span>
            </h3>
            <span className="text-xs font-bold text-stone-500">
              {travelerType}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Stepper with Embossed Center Circle */}
            <div className="flex items-center gap-3">
              {/* Minus Button */}
              <button
                type="button"
                id="btn-travelers-minus"
                onClick={() => setTravelersCount(prev => Math.max(1, prev - 1))}
                disabled={travelersCount <= 1}
                className="w-10 h-10 rounded-full bg-white hover:bg-stone-50 border border-stone-200 shadow-xs flex items-center justify-center text-stone-700 font-black disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Embossed circle with count */}
              <div className="w-14 h-14 rounded-full bg-[#F5ECE0] shadow-inner border border-stone-200/90 flex flex-col items-center justify-center text-xl font-black text-[#2D231B]">
                <span>{travelersCount}</span>
              </div>

              {/* Plus Button */}
              <button
                type="button"
                id="btn-travelers-plus"
                onClick={() => setTravelersCount(prev => Math.min(16, prev + 1))}
                disabled={travelersCount >= 16}
                className="w-10 h-10 rounded-full bg-white hover:bg-stone-50 border border-stone-200 shadow-xs flex items-center justify-center text-stone-700 font-black disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Quick Traveler Category Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { type: "Solo", count: 1 },
                { type: "Couple", count: 2 },
                { type: "Family", count: 4 },
                { type: "Friends", count: 4 },
              ].map((item) => {
                const isSelected = travelerType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    id={`btn-type-${item.type.toLowerCase()}`}
                    onClick={() => handleSelectTravelerType(item.type, item.count)}
                    className={`text-xs font-black px-4 py-2 rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D7EED9] text-[#285A34] border-[#B8DEC0] shadow-xs scale-105'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-[#F8F3EA]'
                    }`}
                  >
                    {item.type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7. "BUDGET" & "TRAVEL PACE" SIDE-BY-SIDE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Budget Card */}
          <div className="cozy-card p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-[#3E3025]">
              <div className="w-8 h-8 rounded-full bg-[#FFEAD1] text-[#9E5718] flex items-center justify-center shadow-2xs">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">BUDGET</h4>
                <div className="text-[11px] text-stone-500 font-medium">Lodging & dining style</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {budgetOptions.map((opt) => {
                const isSelected = budget === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setBudget(opt.level)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFE5DB] border-[#FF7A59] text-[#782310] font-black shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-600 font-bold hover:bg-[#FAF4EA]'
                    }`}
                  >
                    <div className="text-xs">{opt.label.split('-')[0]}</div>
                    <div className="text-[10px] text-stone-400 font-normal">
                      {opt.level === 'Budget' ? '$' : opt.level === 'Moderate' ? '$$' : '$$$'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Pace Card */}
          <div className="cozy-card p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-[#3E3025]">
              <div className="w-8 h-8 rounded-full bg-[#E0F9F7] text-[#009688] flex items-center justify-center shadow-2xs">
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">TRAVEL PACE</h4>
                <div className="text-[11px] text-stone-500 font-medium">Stops & schedule intensity</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {paceOptions.map((opt) => {
                const isSelected = pace === opt.pace;
                return (
                  <button
                    key={opt.pace}
                    type="button"
                    onClick={() => setPace(opt.pace)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D7EED9] border-[#B8DEC0] text-[#285A34] font-black shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-600 font-bold hover:bg-[#FAF4EA]'
                    }`}
                  >
                    <div className="text-xs">{opt.label.split(' ')[0]}</div>
                    <div className="text-[10px] text-stone-400 font-normal">
                      {opt.pace === 'Relaxed' ? 'Leisure' : opt.pace === 'Balanced' ? 'Balanced' : 'Fast'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 8. SPLIT PREFERENCE CATEGORIES (FOOD & DINING, CULTURE & DISCOVERY, ACTION & LEISURE) WITH CAROUSEL & WEIGHTED SELECTION */}
        <div 
          className="cozy-card p-5 sm:p-7 space-y-5 relative overflow-hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(e) => {
            if (!touchStartPosRef.current) return;
            const touch = e.changedTouches[0];
            const diffX = touch.clientX - touchStartPosRef.current.x;
            const diffY = touch.clientY - touchStartPosRef.current.y;
            touchStartPosRef.current = null;
            // Horizontal swipe detection (> 50px)
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
              if (diffX < 0 && activeCategoryIndex < PREFERENCE_CATEGORIES.length - 1) {
                // Swipe left -> Next
                triggerHaptic('medium');
                setActiveCategoryIndex(prev => prev + 1);
              } else if (diffX > 0 && activeCategoryIndex > 0) {
                // Swipe right -> Prev
                triggerHaptic('medium');
                setActiveCategoryIndex(prev => prev - 1);
              }
            }
          }}
        >
          {/* Top Washi Tape Accent */}
          <div className="flex justify-center -mt-6 sm:-mt-8 mb-1">
            <WashiTape color="coral" rotation={-1.5} width="w-28 sm:w-36" />
          </div>

          {/* Section Header & DNA Counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-stone-200/80">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-[#3E3025] tracking-wider uppercase flex items-center gap-2">
                <span className="text-[#FF7A59]">✦</span>
                <span>TRAVEL DNA PREFERENCES</span>
              </h3>
              <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                Organized by category • Double-tap for <strong className="text-[#B8860B]">Must-Have (⭐)</strong> • Long-press to <strong className="text-[#C53030]">Filter Out (✕)</strong>
              </p>
            </div>

            {/* Selection Tally */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(() => {
                const mustHavesCount = Object.values(tagStates).filter(s => s === 'must-have').length;
                const selectedCount = Object.values(tagStates).filter(s => s === 'selected').length;
                const avoidCount = Object.values(tagStates).filter(s => s === 'avoid').length;

                return (
                  <>
                    {mustHavesCount > 0 && (
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                        {mustHavesCount} Must-Have
                      </span>
                    )}
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-[#4A3E35] border border-stone-200">
                      {selectedCount + mustHavesCount} active
                    </span>
                    {avoidCount > 0 && (
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] flex items-center gap-1 shadow-2xs">
                        <X className="w-3 h-3 text-[#DC2626] stroke-[3]" />
                        {avoidCount} Avoided
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Interactive Gesture Guide Hint Banner */}
          <div className="bg-[#FAF7F0] border border-[#EADBCE] rounded-xl p-2.5 flex items-center justify-between text-[11px] text-[#5A4A3E]">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#FF7A59] shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-stone-400"></span> Tap: <strong>Select</strong></span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1 text-[#92400E]"><Star className="w-2.5 h-2.5 fill-[#F59E0B] text-[#F59E0B]" /> Double-Tap or ⭐: <strong>Must-Have</strong></span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1 text-[#991B1B]"><X className="w-2.5 h-2.5 text-[#DC2626] stroke-[3]" /> Long-Press or ✕: <strong>Filter Out</strong></span>
              </div>
            </div>
          </div>

          {/* Progressive Disclosure: Category Tabs Carousel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              {/* Category Carousel Switcher Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 overflow-x-auto no-scrollbar py-1">
                {PREFERENCE_CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategoryIndex === idx;
                  
                  // Count selections in this category
                  const catTags = PREFERENCE_TAGS.filter(t => t.category === cat.id);
                  const activeInCat = catTags.filter(t => {
                    const st = tagStates[t.id];
                    return st === 'selected' || st === 'must-have';
                  }).length;
                  const avoidInCat = catTags.filter(t => tagStates[t.id] === 'avoid').length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      id={`tab-category-${cat.id}`}
                      onClick={() => {
                        triggerHaptic('light');
                        setActiveCategoryIndex(idx);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer transform ${
                        isActive
                          ? `${cat.activeTabClass} scale-102 ring-2 ring-stone-800/10`
                          : 'bg-white text-stone-600 border border-stone-200 hover:bg-[#F8F4EB]'
                      }`}
                    >
                      <span className="text-sm">{cat.iconEmoji}</span>
                      <span>{cat.shortTitle}</span>
                      
                      {activeInCat > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          isActive ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {activeInCat}
                        </span>
                      )}

                      {avoidInCat > 0 && (
                        <span className={`text-[9px] px-1 rounded-full font-black ${
                          isActive ? 'bg-red-900/40 text-red-100' : 'bg-red-100 text-red-700'
                        }`}>
                          ✕{avoidInCat}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Carousel Arrow Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  id="btn-cat-carousel-prev"
                  disabled={activeCategoryIndex === 0}
                  onClick={() => {
                    triggerHaptic('medium');
                    setActiveCategoryIndex(prev => Math.max(0, prev - 1));
                  }}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
                  title="Previous Category"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="btn-cat-carousel-next"
                  disabled={activeCategoryIndex === PREFERENCE_CATEGORIES.length - 1}
                  onClick={() => {
                    triggerHaptic('medium');
                    setActiveCategoryIndex(prev => Math.min(PREFERENCE_CATEGORIES.length - 1, prev + 1));
                  }}
                  className="w-7 h-7 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
                  title="Next Category"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Category Description Note */}
            {(() => {
              const currentCat = PREFERENCE_CATEGORIES[activeCategoryIndex];
              return (
                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${currentCat.colorTheme}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{currentCat.iconEmoji}</span>
                    <span className="font-semibold">{currentCat.description}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider shrink-0 opacity-75">
                    Step {activeCategoryIndex + 1} of {PREFERENCE_CATEGORIES.length}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Tag Grid for Active Category with Double-Tap & Long-Press micro-interactions */}
          <div className="min-h-[140px] flex flex-wrap gap-2.5 items-start pt-1">
            {(() => {
              const currentCategory = PREFERENCE_CATEGORIES[activeCategoryIndex];
              const categoryTags = PREFERENCE_TAGS.filter(t => t.category === currentCategory.id);

              return categoryTags.map((tag) => {
                const status = tagStates[tag.id] || 'none';
                const isSelected = status === 'selected';
                const isMustHave = status === 'must-have';
                const isAvoid = status === 'avoid';

                return (
                  <div
                    key={tag.id}
                    className="relative group inline-flex"
                  >
                    <button
                      type="button"
                      id={`btn-pref-tag-${tag.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onPointerDown={() => handleTagPointerDown(tag.id)}
                      onPointerUp={() => handleTagPointerUp(tag.id)}
                      onPointerCancel={handleTagPointerCancel}
                      onDoubleClick={() => handleSetMustHave(tag.id)}
                      title={`${tag.label}: ${tag.description}\n(Double-click/tap for Must-Have, Long-press for Avoid)`}
                      className={`text-xs font-black px-3.5 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2 cursor-pointer select-none transform hover:-translate-y-0.5 active:translate-y-0 ${
                        isMustHave
                          ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B] shadow-sm ring-2 ring-[#F59E0B]/50 font-black'
                          : isAvoid
                          ? 'bg-[#FEE2E2] text-[#991B1B] border-[#EF4444] line-through opacity-85 shadow-2xs'
                          : isSelected
                          ? `${tag.color} shadow-xs ring-2 ring-[#FF7A59]/40 font-black`
                          : 'bg-white text-stone-700 border-stone-200/90 hover:bg-[#FAF5EC] hover:border-stone-300'
                      }`}
                    >
                      {/* Left icon status */}
                      <span className="text-sm shrink-0">{tag.iconEmoji}</span>

                      {/* Tag Label */}
                      <span className={`${isAvoid ? 'line-through text-red-800' : ''}`}>
                        {tag.label}
                      </span>

                      {/* Must-Have Badge or Checkmark */}
                      {isMustHave && (
                        <span className="flex items-center gap-0.5 bg-[#F59E0B] text-white text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-2xs">
                          <Star className="w-2.5 h-2.5 fill-white text-white" />
                          MUST-HAVE
                        </span>
                      )}

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 stroke-[3] text-stone-800" />
                      )}

                      {isAvoid && (
                        <span className="flex items-center gap-0.5 bg-[#DC2626] text-white text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-2xs">
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                          AVOID
                        </span>
                      )}
                    </button>

                    {/* Quick Micro-Action Buttons for desktop / direct touch accessibility */}
                    <div className="absolute -top-2 -right-2 hidden group-hover:flex items-center gap-0.5 z-10 bg-white/95 rounded-full p-0.5 shadow-md border border-stone-200">
                      {/* Must-Have Toggle Button */}
                      <button
                        type="button"
                        id={`btn-musthave-${tag.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        onClick={(e) => handleSetMustHave(tag.id, e)}
                        title={isMustHave ? "Remove Must-Have priority" : "Mark as MUST-HAVE priority (⭐)"}
                        className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                          isMustHave
                            ? 'bg-[#F59E0B] text-white'
                            : 'bg-stone-100 hover:bg-[#FEF3C7] text-stone-600 hover:text-[#92400E]'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${isMustHave ? 'fill-white' : ''}`} />
                      </button>

                      {/* Avoid Filter-Out Toggle Button */}
                      <button
                        type="button"
                        id={`btn-avoid-${tag.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        onClick={(e) => handleSetAvoid(tag.id, e)}
                        title={isAvoid ? "Remove Avoid filter" : "Filter out / strictly avoid this (✕)"}
                        className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                          isAvoid
                            ? 'bg-[#DC2626] text-white'
                            : 'bg-stone-100 hover:bg-[#FEE2E2] text-stone-600 hover:text-[#991B1B]'
                        }`}
                      >
                        <X className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Carousel Footer: Stepper Progress & Next Category Navigation */}
          <div className="pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {PREFERENCE_CATEGORIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setActiveCategoryIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeCategoryIndex === idx 
                      ? 'w-6 bg-[#FF7A59]' 
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  title={`Go to category ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-stone-400 font-bold ml-1">
                Category {activeCategoryIndex + 1} of {PREFERENCE_CATEGORIES.length}
              </span>
            </div>

            {/* Next / Previous Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {activeCategoryIndex > 0 && (
                <button
                  type="button"
                  id="btn-cat-prev-bottom"
                  onClick={() => {
                    triggerHaptic('medium');
                    setActiveCategoryIndex(prev => prev - 1);
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}

              {activeCategoryIndex < PREFERENCE_CATEGORIES.length - 1 ? (
                <button
                  type="button"
                  id="btn-cat-next-bottom"
                  onClick={() => {
                    triggerHaptic('medium');
                    setActiveCategoryIndex(prev => prev + 1);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#FF7A59] hover:bg-[#E96645] text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next: {PREFERENCE_CATEGORIES[activeCategoryIndex + 1].shortTitle}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-[#D7EED9] border border-[#B8DEC0] text-[#285A34] text-xs font-black flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>All Categories Reviewed</span>
                </div>
              )}
            </div>
          </div>

          {/* Must-Have Summary Tray across all categories */}
          {(() => {
            const mustHaves = Object.entries(tagStates).filter(([_, s]) => s === 'must-have').map(([id]) => id);
            if (mustHaves.length === 0) return null;

            return (
              <div className="p-3 bg-[#FEFBF2] border border-[#FDE68A] rounded-xl space-y-1.5">
                <div className="text-[11px] font-black text-[#92400E] flex items-center gap-1.5 uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>High-Priority Must-Have Experiences (⭐):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mustHaves.map(id => {
                    const tag = PREFERENCE_TAGS.find(t => t.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]"
                      >
                        <span>{tag?.iconEmoji || '⭐'}</span>
                        <span>{id}</span>
                        <button
                          type="button"
                          onClick={(e) => handleSetMustHave(id, e)}
                          title="Remove Must-Have"
                          className="hover:text-stone-900 cursor-pointer ml-0.5"
                        >
                          <X className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Strictly Avoided / Filtered Out Summary Tray */}
          {(() => {
            const avoids = Object.entries(tagStates).filter(([_, s]) => s === 'avoid').map(([id]) => id);
            if (avoids.length === 0) return null;

            return (
              <div className="p-3 bg-[#FFF5F5] border border-[#FECACA] rounded-xl space-y-1.5">
                <div className="text-[11px] font-black text-[#991B1B] flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Strictly Filtered Out & Avoided by AI (✕):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {avoids.map(id => {
                    const tag = PREFERENCE_TAGS.find(t => t.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]"
                      >
                        <span>{tag?.iconEmoji || '🚫'}</span>
                        <span className="line-through">{id}</span>
                        <button
                          type="button"
                          onClick={(e) => handleSetAvoid(id, e)}
                          title="Remove Avoid filter"
                          className="hover:text-stone-900 cursor-pointer ml-0.5"
                        >
                          <X className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 9. "NOTES" SPECIAL REQUIREMENTS TEXTAREA */}
        <div className="cozy-card p-5 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-[#3E3025]">
            <PenTool className="w-4 h-4 text-[#FF7A59]" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider">NOTES</h3>
          </div>
          <textarea
            id="input-special-notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g., Arriving by train at noon on Day 1. Looking for great coffee and photography spots."
            className="w-full p-3.5 bg-white rounded-2xl border border-stone-200 text-stone-800 text-xs sm:text-sm placeholder:text-stone-400 focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20 outline-none transition-all resize-none"
          />
        </div>

        {/* 10. BOTTOM ACTION AREA WITH CAPYBARA MASCOT MATCHING IMG_0781.png */}
        <div className="relative pt-2 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Magic badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF3D6] text-[#8C5E1E] border border-[#FDE0A2] text-xs font-black shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E5B80B]" />
                <span>LIVE TRAVEL MAGIC INSIDE</span>
              </div>

              {/* Sample Tokyo Trip Button */}
              <button
                type="button"
                id="btn-sample-journey"
                onClick={onSelectSample}
                className="px-5 py-3 rounded-full bg-[#FFFDF7] hover:bg-white text-[#523E30] font-black text-xs border border-stone-300 shadow-xs transition-transform transform hover:scale-105 cursor-pointer"
              >
                TOKYO JOURNEY SAMPLE
              </button>
            </div>

            {/* Primary Submit Button: MAKE IT MAGICAL! */}
            <button
              type="submit"
              id="btn-submit-cozy-plan"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFA085] via-[#FF7A59] to-[#FF6B6B] hover:opacity-95 text-white font-black text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 border-2 border-white/40 cursor-pointer disabled:opacity-60 transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>CRAFTING YOUR ITINERARY...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🌟</span>
                  <span>MAKE IT MAGICAL!</span>
                </>
              )}
            </button>
          </div>

          {/* Adorable Capybara with Backpack in the bottom-right corner */}
          <div className="hidden md:block absolute -bottom-8 right-0 pointer-events-none transform translate-x-4">
            <CozyCapybara className="w-24 h-28 drop-shadow-sm" />
          </div>
        </div>
      </form>
    </div>
  );
};
