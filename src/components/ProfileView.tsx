import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Sparkles, 
  RefreshCw, 
  Settings, 
  Heart, 
  ShieldCheck, 
  Award,
  Globe,
  Compass
} from 'lucide-react';
import { TripPlan, TravelDNA, TripPreferences } from '../types';
import { WashiTape, PushPin, PassportStamp } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';

interface ProfileViewProps {
  tripPlan: TripPlan;
  travelDNA: TravelDNA | null;
  onOpenDNAOnboarding: () => void;
  onNewTrip: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  tripPlan,
  travelDNA,
  onOpenDNAOnboarding,
  onNewTrip,
}) => {
  const destination = tripPlan.destination;
  const completedStopsCount = tripPlan.days.flatMap((d) => d.schedule).filter((s) => s.completed).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Travel DNA Passport Booklet Card */}
      <div className="relative bg-[#FFFDF9] border-4 border-[#2D241E] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Washi Tapes */}
        <div className="absolute -top-3 left-8">
          <WashiTape color="gold" rotation={-3} />
        </div>
        <div className="absolute -top-3 right-8">
          <WashiTape color="coral" rotation={4} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest font-black text-stone-400 block mb-1">
              OFFICIAL TRAVELER PASSPORT & IDENTITY
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#2D241E] font-cozy-serif">
              {travelDNA?.archetype.title || 'Curious Explorer'}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#FF7A59] italic mt-0.5">
              "{travelDNA?.archetype.tagline || 'Wandering the earth with wide-open eyes'}"
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <PassportStamp
              city="PASSPORT"
              label="VERIFIED"
              color="navy"
              rotation={5}
              size="md"
            />
          </div>
        </div>

        {/* Sensory Dial Metrics */}
        {travelDNA && (
          <div className="mt-6 pt-5 border-t-2 border-[#EFE5D8] space-y-4">
            <h3 className="text-xs font-black uppercase text-stone-400 tracking-wider">
              Sensory DNA Balance:
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#FAF4EA] p-3.5 rounded-2xl border border-[#EFE5D8]">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Alley Curiosity</span>
                <span className="text-xl font-black text-[#FF7A59] font-mono">{travelDNA.sensoryScores.curiosity}%</span>
              </div>
              <div className="bg-[#FAF4EA] p-3.5 rounded-2xl border border-[#EFE5D8]">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Gastronomy</span>
                <span className="text-xl font-black text-[#F59E0B] font-mono">{travelDNA.sensoryScores.culinary}%</span>
              </div>
              <div className="bg-[#FAF4EA] p-3.5 rounded-2xl border border-[#EFE5D8]">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Heritage Lore</span>
                <span className="text-xl font-black text-[#10B981] font-mono">{travelDNA.sensoryScores.culture}%</span>
              </div>
              <div className="bg-[#FAF4EA] p-3.5 rounded-2xl border border-[#EFE5D8]">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Pace Rhythm</span>
                <span className="text-xl font-black text-[#8B5CF6] font-mono capitalize">{travelDNA.preferredRhythm}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenDNAOnboarding();
                }}
                className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-[#2D241E] text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer border border-stone-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recalibrate Travel DNA</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TRAVEL PROFILE & TRIP SETTINGS */}
      <div className="max-w-2xl mx-auto">
        {/* Active Trip Passport Sheet */}
        <div className="postcard-card p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#2D241E] font-cozy-serif">
              Current Voyage Manifest
            </h3>
            <span className="text-[11px] font-mono font-bold text-stone-500">
              {tripPlan.days.length} Days Itinerary
            </span>
          </div>

          <div className="space-y-2 text-xs font-medium text-stone-700">
            <div className="flex justify-between py-1.5 border-b border-stone-200">
              <span className="text-stone-500 font-bold">Primary Destination</span>
              <span className="font-black text-[#2D241E]">{destination}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-200">
              <span className="text-stone-500 font-bold">Occasion / Theme</span>
              <span className="font-black text-[#2D241E]">{tripPlan.occasion}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-200">
              <span className="text-stone-500 font-bold">Travelers</span>
              <span className="font-black text-[#2D241E]">
                {tripPlan.travelersCount} Traveler{tripPlan.travelersCount > 1 ? 's' : ''} ({tripPlan.travelerType})
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-200">
              <span className="text-stone-500 font-bold">Budget & Pace</span>
              <span className="font-black text-[#2D241E]">{tripPlan.budget} • {tripPlan.pace}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-200">
              <span className="text-stone-500 font-bold">Visited Stops Stamped</span>
              <span className="font-black text-[#FF7A59] font-mono">{completedStopsCount} Stamped</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('medium');
                onNewTrip();
              }}
              className="w-full bg-[#FF7A59] hover:bg-[#FF6040] text-white text-xs font-black py-2.5 rounded-xl shadow-xs transition-all cursor-pointer border-b-2 border-[#E05030]"
            >
              Plan Another Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
