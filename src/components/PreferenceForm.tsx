import React, { useState } from 'react';
import { TripPreferences } from '../types';
import { 
  Compass, 
  Users, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Search, 
  Heart, 
  Coffee, 
  MapPin, 
  Sliders, 
  Clock, 
  Check, 
  Globe
} from 'lucide-react';

interface PreferenceFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isLoading: boolean;
  onSelectSample: () => void;
}

const POPULAR_DESTINATIONS = [
  "Tokyo, Japan",
  "Paris, France",
  "Rome, Italy",
  "Barcelona, Spain",
  "Kyoto, Japan",
  "New York City, USA",
  "Bali, Indonesia",
  "London, UK"
];

const OCCASIONS = [
  { id: "Vacation / Leisure", label: "Vacation / Leisure", icon: "🌴", desc: "Classic relaxing & scenic exploration" },
  { id: "Honeymoon / Romantic", label: "Honeymoon / Romantic", icon: "💍", desc: "Intimate dinners & memorable vistas" },
  { id: "Family with Kids", label: "Family with Kids", icon: "👨‍👩‍👧‍👦", desc: "Kid-friendly pacing & engaging stops" },
  { id: "Friends Getaway", label: "Friends Getaway", icon: "🥂", desc: "Social, nightlife & fun shared meals" },
  { id: "Solo Adventure", label: "Solo Adventure", icon: "🎒", desc: "Flexible, safe & authentic immersion" },
  { id: "Cultural & Heritage", label: "Cultural & Heritage", icon: "🏛️", desc: "Deep history, architecture & museums" },
  { id: "Foodie Exploration", label: "Foodie & Culinary", icon: "🍜", desc: "Markets, specialty restaurants & sweets" },
  { id: "Birthday / Anniversary", label: "Celebration / Milestone", icon: "✨", desc: "Special moments & elevated experiences" },
];

const TRAVELER_TYPES = [
  { id: "Solo", label: "Solo Traveler", defaultCount: 1 },
  { id: "Couple", label: "Couple", defaultCount: 2 },
  { id: "Family with Kids", label: "Family with Kids", defaultCount: 4 },
  { id: "Group of Friends", label: "Group of Friends", defaultCount: 4 },
  { id: "Colleagues / Team", label: "Colleagues / Team", defaultCount: 5 },
];

const DIETARY_OPTIONS = [
  "Local Specialties",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Seafood Lover",
  "Gluten-Free Friendly",
  "Street Food Enthusiast",
  "Fine Dining"
];

const INTEREST_OPTIONS = [
  "Iconic Landmarks",
  "Museums & Art",
  "Parks & Nature",
  "Shopping & Markets",
  "Nightlife & Speakeasies",
  "Photography Spots",
  "Hidden Neighborhoods",
  "Architecture & Design"
];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({
  onSubmit,
  isLoading,
  onSelectSample,
}) => {
  const [destination, setDestination] = useState('');
  const [occasion, setOccasion] = useState('Vacation / Leisure');
  const [durationDays, setDurationDays] = useState(3);
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelerType, setTravelerType] = useState('Couple');
  const [budget, setBudget] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [pace, setPace] = useState<'Relaxed' | 'Balanced' | 'Fast'>('Balanced');
  const [dietary, setDietary] = useState<string[]>(['Local Specialties']);
  const [interests, setInterests] = useState<string[]>(['Iconic Landmarks', 'Hidden Neighborhoods']);
  const [specialRequirements, setSpecialRequirements] = useState('');

  const toggleDietary = (item: string) => {
    setDietary(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleInterest = (item: string) => {
    setInterests(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination: destination.trim(),
      occasion,
      durationDays,
      travelersCount,
      travelerType,
      budget,
      pace,
      dietary,
      interests,
      specialRequirements,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Destination section */}
      <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
        <label htmlFor="destination-input" className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF6B6B]" />
            Where are you traveling?
          </span>
          <span className="text-xs font-bold text-stone-400 normal-case tracking-normal">City, region, or country</span>
        </label>
        
        <div className="relative mb-3">
          <input
            id="destination-input"
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Tokyo, Paris, Rome, Barcelona, Kyoto, London..."
            className="w-full px-4 py-3.5 pl-11 bg-[#FFF8F0] border-2 border-stone-200 rounded-2xl text-[#1A1A1A] font-semibold placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/40 focus:border-[#FF6B6B] transition-all text-base"
          />
          <Search className="w-5 h-5 text-[#FF6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick destination suggestion chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-black uppercase text-stone-400 mr-1 tracking-wider">Trending:</span>
          {POPULAR_DESTINATIONS.map((dest) => (
            <button
              key={dest}
              type="button"
              id={`trending-dest-${dest.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setDestination(dest)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                destination === dest
                  ? 'bg-[#FF6B6B] border-[#EE5253] text-white font-black shadow-xs'
                  : 'bg-[#FFF8F0] border-stone-200 text-stone-700 hover:bg-[#FFE8D6] font-bold'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion & Trip Vibe */}
      <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
        <label className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#FF6B6B]" />
            What is the occasion?
          </span>
          <span className="text-xs font-bold text-stone-400 normal-case tracking-normal">Curates atmosphere & activities</span>
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {OCCASIONS.map((occ) => {
            const isSelected = occasion === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                id={`occasion-${occ.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setOccasion(occ.id)}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#FFF8F0] border-2 border-[#FF6B6B] border-b-4 border-b-[#EE5253] shadow-sm'
                    : 'bg-stone-50 border-stone-200 hover:border-[#FF6B6B]/40 hover:bg-[#FFF8F0]/70'
                }`}
              >
                <span className="text-2xl mb-1.5">{occ.icon}</span>
                <span className={`text-sm font-black leading-tight ${isSelected ? 'text-[#FF6B6B]' : 'text-stone-900'}`}>
                  {occ.label}
                </span>
                <span className="text-[11px] text-stone-500 font-medium mt-1 line-clamp-2 leading-snug">
                  {occ.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration & Group Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Duration */}
        <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4ECDC4]" />
              Duration (Days)
            </label>
            <span className="text-xs font-black text-[#2D2D2D] bg-[#FFD93D] px-3 py-1 rounded-full border-b-2 border-[#E5B80B]">
              {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>

          <input
            id="duration-slider"
            type="range"
            min="1"
            max="14"
            step="1"
            value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
            className="w-full accent-[#FF6B6B] cursor-pointer h-2.5 bg-stone-200 rounded-lg mb-4"
          />

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 5, 7, 10, 14].map((d) => (
              <button
                key={d}
                type="button"
                id={`duration-chip-${d}`}
                onClick={() => setDurationDays(d)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-black transition-all ${
                  durationDays === d
                    ? 'bg-[#FF6B6B] text-white shadow-xs border-b-2 border-[#EE5253]'
                    : 'bg-[#FFF8F0] text-stone-700 hover:bg-[#FFE8D6] border border-stone-200'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {/* Travelers Count & Type */}
        <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4ECDC4]" />
              Who is traveling?
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-decrease-travelers"
                onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                className="w-8 h-8 rounded-xl bg-[#FFF8F0] hover:bg-[#FFE8D6] border border-[#FF6B6B]/30 flex items-center justify-center text-[#FF6B6B] font-black text-base shadow-xs"
              >
                -
              </button>
              <span className="text-sm font-black text-stone-900 w-8 text-center">
                {travelersCount}
              </span>
              <button
                type="button"
                id="btn-increase-travelers"
                onClick={() => setTravelersCount(Math.min(16, travelersCount + 1))}
                className="w-8 h-8 rounded-xl bg-[#FFF8F0] hover:bg-[#FFE8D6] border border-[#FF6B6B]/30 flex items-center justify-center text-[#FF6B6B] font-black text-base shadow-xs"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {TRAVELER_TYPES.map((type) => {
              const isSelected = travelerType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  id={`traveler-type-${type.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => {
                    setTravelerType(type.id);
                    setTravelersCount(type.defaultCount);
                  }}
                  className={`text-xs p-2.5 rounded-xl border text-center font-black transition-all ${
                    isSelected
                      ? 'bg-[#4ECDC4] border-[#45B7AF] text-white border-b-2 border-b-[#45B7AF] shadow-xs'
                      : 'bg-[#FFF8F0] border-stone-200 text-stone-700 hover:bg-[#FFE8D6]'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Budget & Pace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget */}
        <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
          <label className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#FFD93D]" />
            Budget Preference
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'Budget', label: 'Budget', sub: 'Hostels, metro, street eats' },
              { id: 'Moderate', label: 'Balanced', sub: 'Comfortable hotels, casual dining' },
              { id: 'Luxury', label: 'Luxury', sub: 'Fine dining, private transit' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                id={`budget-${b.id.toLowerCase()}`}
                onClick={() => setBudget(b.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  budget === b.id
                    ? 'bg-[#FFF8F0] border-2 border-[#FFD93D] border-b-4 border-b-[#E5B80B] shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-sm font-black text-stone-900">{b.label}</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5 leading-tight">{b.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pace */}
        <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
          <label className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#A29BFE]" />
            Travel Pace
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'Relaxed', label: 'Relaxed', sub: '2-3 key stops, lazy lunches' },
              { id: 'Balanced', label: 'Balanced', sub: 'Steady flow, great highlights' },
              { id: 'Fast', label: 'Fast-Paced', sub: 'Action-packed, maximize sights' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                id={`pace-${p.id.toLowerCase()}`}
                onClick={() => setPace(p.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  pace === p.id
                    ? 'bg-[#F3F0FF] border-2 border-[#A29BFE] border-b-4 border-b-[#6C5CE7] shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-sm font-black text-stone-900">{p.label}</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5 leading-tight">{p.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dietary & Food Preferences */}
      <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
        <label className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#FF6B6B]" />
            Food & Dining Preferences
          </span>
          <span className="text-xs font-bold text-stone-400 normal-case">Select any that apply</span>
        </label>
        <p className="text-xs text-stone-500 font-medium mb-3">
          The app will tailor breakfast, lunch, dinner, and snack recommendations accordingly.
        </p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((item) => {
            const isSelected = dietary.includes(item);
            return (
              <button
                key={item}
                type="button"
                id={`dietary-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => toggleDietary(item)}
                className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-black transition-all ${
                  isSelected
                    ? 'bg-[#FFD93D] border-[#E5B80B] text-[#2D2D2D] border-b-2 border-b-[#E5B80B] shadow-xs'
                    : 'bg-[#FFF8F0] border-stone-200 text-stone-700 hover:bg-[#FFE8D6]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-[#2D2D2D]" />}
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interests & Activities */}
      <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
        <label className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#4ECDC4]" />
            Specific Interests & Activities
          </span>
          <span className="text-xs font-bold text-stone-400 normal-case">Personalize schedule</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((item) => {
            const isSelected = interests.includes(item);
            return (
              <button
                key={item}
                type="button"
                id={`interest-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => toggleInterest(item)}
                className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-black transition-all ${
                  isSelected
                    ? 'bg-[#4ECDC4] border-[#45B7AF] text-white border-b-2 border-b-[#45B7AF] shadow-xs'
                    : 'bg-[#FFF8F0] border-stone-200 text-stone-700 hover:bg-[#FFE8D6]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special requirements */}
      <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm">
        <label htmlFor="special-notes" className="block text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-2 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FF6B6B]" />
          Special Requests or Notes (Optional)
        </label>
        <textarea
          id="special-notes"
          rows={2}
          value={specialRequirements}
          onChange={(e) => setSpecialRequirements(e.target.value)}
          placeholder="e.g., Arriving by train at noon on Day 1, prefer walking whenever possible, need kid-accessible stroller routes..."
          className="w-full px-4 py-3 bg-[#FFF8F0] border-2 border-stone-200 rounded-2xl text-[#1A1A1A] font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/40 focus:border-[#FF6B6B] transition-all text-sm resize-none"
        />
      </div>

      {/* Grounding notice & submit action */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs text-[#2D2D2D] bg-[#FFF8F0] px-4 py-3 rounded-2xl border border-[#FF6B6B]/30 font-bold shadow-xs">
          <span className="flex items-center gap-2 text-stone-800">
            <Globe className="w-4 h-4 text-[#4ECDC4]" />
            Verified with real-time Google Search grounding
          </span>
          <span className="hidden sm:inline text-stone-500 font-medium">Current transit lines, open places & top food</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <button
            type="submit"
            id="btn-generate-trip"
            disabled={isLoading || !destination.trim()}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl font-black text-white bg-[#FF6B6B] hover:bg-[#EE5253] border-b-4 border-[#EE5253] active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-md shadow-[#FF6B6B]/25 flex items-center justify-center gap-2.5 text-base uppercase tracking-tight"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Architecting Detailed Schedule...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#FFD93D]" />
                <span>Create Detailed Trip Plan</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="btn-preview-sample"
            onClick={onSelectSample}
            disabled={isLoading}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl font-black text-[#2D2D2D] bg-[#FFD93D] hover:bg-[#F6C90E] border-b-4 border-[#E5B80B] active:translate-y-0.5 transition-all text-sm whitespace-nowrap uppercase tracking-tight shadow-sm"
          >
            Try Tokyo 3-Day Sample
          </button>
        </div>
      </div>
    </form>
  );
};
