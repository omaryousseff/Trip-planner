import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Navigation, 
  Train, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Sun, 
  Camera, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Building2,
  Star
} from 'lucide-react';
import { TripPlan, ScheduleItem } from '../types';
import { getDirectionsUrl, getPlaceSearchUrl } from '../utils/geoCoordinates';
import { WashiTape, PushPin, PassportStamp, triggerStampCelebration } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';

interface TodayCompanionViewProps {
  tripPlan: TripPlan;
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
  onToggleComplete: (dayIndex: number, itemId: string) => void;
  onOpenPhotoLightbox: (item: ScheduleItem) => void;
  onExitTodayMode?: () => void;
}

export const TodayCompanionView: React.FC<TodayCompanionViewProps> = ({
  tripPlan,
  activeDayIndex,
  onSelectDay,
  onToggleComplete,
  onOpenPhotoLightbox,
  onExitTodayMode,
}) => {
  const currentDay = tripPlan.days[activeDayIndex] || tripPlan.days[0];
  const items = currentDay.schedule;
  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / (items.length || 1)) * 100);

  // Find next uncompleted stop
  const nextItemIndex = items.findIndex((i) => !i.completed);
  const activeItem = nextItemIndex !== -1 ? items[nextItemIndex] : items[0];

  const destination = tripPlan.destination;

  return (
    <div className="space-y-6 pb-12">
      {/* Companion HUD Header */}
      <div className="relative bg-[#FFFDF9] border-4 border-[#2D241E] rounded-3xl p-5 sm:p-7 shadow-xl overflow-hidden">
        {/* Washi tapes on corners */}
        <div className="absolute -top-3 left-6">
          <WashiTape color="coral" rotation={-3} />
        </div>
        <div className="absolute -top-3 right-6">
          <WashiTape color="gold" rotation={2} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FF7A59] text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-2xs">
                Live Companion HUD
              </span>
              <span className="text-xs font-bold text-stone-500">
                Day {currentDay.dayNumber} of {tripPlan.durationDays}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif">
              Today in {destination}: {currentDay.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
              {currentDay.summary}
            </p>
          </div>

          {/* Quick day switcher dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs font-black text-stone-500">Switch Day:</label>
            <select
              value={activeDayIndex}
              onChange={(e) => {
                triggerHaptic('light');
                onSelectDay(Number(e.target.value));
              }}
              className="bg-[#FAF4EA] border-2 border-[#EFE5D8] rounded-xl px-3 py-1.5 text-xs font-black text-[#2D241E] focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59] cursor-pointer"
            >
              {tripPlan.days.map((day, idx) => (
                <option key={idx} value={idx}>
                  Day {day.dayNumber}: {day.title.slice(0, 20)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Day Progress bar with Stamp seal */}
        <div className="mt-5 pt-4 border-t-2 border-[#EFE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-xs font-black text-[#2D241E]">
              <span>Day Journey Progress</span>
              <span className="font-mono text-[#FF7A59]">
                {completedCount} / {items.length} Stops Stamped ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3.5 bg-[#FAF4EA] rounded-full overflow-hidden border border-[#EFE5D8] p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF7A59] to-[#285A34] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {completedCount === items.length && items.length > 0 && (
            <div className="shrink-0 animate-in zoom-in-95">
              <PassportStamp
                city={destination.slice(0, 10)}
                label="DAY COMPLETED"
                color="teal"
                rotation={-5}
                size="sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE / UP NEXT SPOTLIGHT CARD */}
      {activeItem && (
        <div className="relative bg-gradient-to-br from-[#FFF9EE] to-[#FFF3DF] border-4 border-[#FF7A59] rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FF7A59] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE17D]" />
            <span>Up Next On Your Path</span>
          </div>

          <div className="flex flex-col md:flex-row gap-5 items-start mt-2">
            {/* Polaroid Preview */}
            <div 
              onClick={() => onOpenPhotoLightbox(activeItem)}
              className="w-full md:w-56 shrink-0 polaroid-card cursor-pointer group transform hover:rotate-0 transition-all duration-300 ease-out hover:scale-[1.02] -rotate-1"
            >
              <div className="relative h-44 rounded-sm overflow-hidden bg-stone-900">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {activeItem.time}
                </div>
              </div>
              <div className="pt-2 text-center">
                <p className="font-handwritten text-lg font-bold text-stone-900 leading-tight truncate">
                  {activeItem.title}
                </p>
                <p className="text-[10px] text-stone-500 truncate">
                  {activeItem.photoSource || 'Original Verified Photo'}
                </p>
              </div>
            </div>

            {/* Stop Information & Quick Navigation */}
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-xs font-black text-[#FF7A59] uppercase tracking-wider">
                  Target Stop: {activeItem.category}
                </span>
                <h2 className="text-2xl font-black text-[#2D241E] font-cozy-serif">
                  {activeItem.title}
                </h2>
                <div className="flex items-center gap-1 text-xs text-stone-600 font-semibold mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
                  <span>{activeItem.location}, {destination}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeItem.description}
              </p>

              {activeItem.tips && (
                <div className="bg-white/80 border border-[#FFE17D] rounded-xl p-2.5 text-xs text-stone-800">
                  <span className="font-black text-[#FF7A59]">Insider Tip: </span>
                  <span>{activeItem.tips}</span>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={getDirectionsUrl({
                    destinationTitle: activeItem.title,
                    destinationLocation: activeItem.location,
                    destinationCity: destination,
                    travelMode: 'walking',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF7A59] hover:bg-[#FF6040] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all border-b-2 border-[#E05030]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Walking Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <a
                  href={getDirectionsUrl({
                    destinationTitle: activeItem.title,
                    destinationLocation: activeItem.location,
                    destinationCity: destination,
                    travelMode: 'transit',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#285A34] hover:bg-[#1E4327] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all border-b-2 border-[#1E4327]"
                >
                  <Train className="w-4 h-4" />
                  <span>Transit Route</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    triggerStampCelebration();
                    onToggleComplete(activeDayIndex, activeItem.id);
                  }}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-[#2D241E] font-black text-xs py-2.5 px-4 rounded-xl border-2 border-stone-300 shadow-2xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#285A34]" />
                  <span>Mark as Stamped / Visited</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TODAY'S TACTILE SCRAPBOOK TIMELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#2D241E] font-cozy-serif flex items-center gap-2">
            <span>Today's Full Sequence</span>
            <span className="text-xs font-bold font-mono text-stone-500">
              ({items.length} stops)
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isCompleted = item.completed;
            const isWalkingActive = activeItem?.id === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isCompleted
                    ? 'bg-[#F2EFE9] border-[#DFD7CC] opacity-80'
                    : isWalkingActive
                    ? 'bg-white border-[#FF7A59] shadow-md ring-2 ring-[#FF7A59]/20'
                    : 'bg-[#FFFDF9] border-[#EAE0D0] hover:border-[#DFB277]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCompleted) triggerStampCelebration();
                      else triggerHaptic('light');
                      onToggleComplete(activeDayIndex, item.id);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-[#285A34] border-[#285A34] text-white shadow-xs'
                        : 'border-stone-400 hover:border-[#FF7A59] bg-white'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-stone-500 font-mono">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        {item.category}
                      </span>
                    </div>
                    <h4 className={`text-sm sm:text-base font-black truncate font-cozy-serif ${isCompleted ? 'line-through text-stone-400' : 'text-[#2D241E]'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Stamped visited seal */}
                  {isCompleted && (
                    <PassportStamp
                      city="DONE"
                      label="VISITED"
                      color="wine"
                      rotation={-6}
                      size="sm"
                    />
                  )}

                  {/* Open photo */}
                  <button
                    type="button"
                    onClick={() => onOpenPhotoLightbox(item)}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                    title="View landmark photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {/* Walking directions link */}
                  <a
                    href={getDirectionsUrl({
                      destinationTitle: item.title,
                      destinationLocation: item.location,
                      destinationCity: destination,
                      travelMode: 'walking',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#FAF4EA] hover:bg-[#F0E6D6] text-[#FF7A59] rounded-xl transition-colors border border-[#EFE5D8]"
                    title="Get directions"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
