import React, { useState } from 'react';
import { 
  DayPlan, 
  ScheduleItem, 
  CategoryType, 
  TimeSlot 
} from '../types';
import { 
  MapPin, 
  Navigation, 
  Utensils, 
  Compass, 
  Clock, 
  DollarSign, 
  Lightbulb, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  RotateCw, 
  Info,
  Train,
  Footprints,
  Bus,
  Car,
  Ship,
  Sparkles
} from 'lucide-react';

interface ScheduleViewProps {
  days: DayPlan[];
  destination: string;
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
  onToggleComplete: (dayIndex: number, itemId: string) => void;
  onRegenerateItem: (dayIndex: number, item: ScheduleItem) => void;
  regeneratingItemId: string | null;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  days,
  destination,
  activeDayIndex,
  onSelectDay,
  onToggleComplete,
  onRegenerateItem,
  regeneratingItemId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');

  const currentDay = days[activeDayIndex] || days[0];

  if (!currentDay) {
    return (
      <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border border-stone-200">
        No schedule available.
      </div>
    );
  }

  const filteredSchedule = currentDay.schedule.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const completedCount = currentDay.schedule.filter((item) => item.completed).length;
  const totalCount = currentDay.schedule.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getCategoryConfig = (category: CategoryType) => {
    switch (category) {
      case 'transport':
        return {
          label: 'Transportation',
          icon: Train,
          badgeBg: 'bg-[#F3F0FF] text-[#6C5CE7] border-[#A29BFE]/50',
          accentColor: 'border-l-[#6C5CE7]',
          iconColor: 'text-[#6C5CE7]',
        };
      case 'food':
        return {
          label: 'Food & Dining',
          icon: Utensils,
          badgeBg: 'bg-[#FFE8D6] text-[#D35400] border-[#FF6B6B]/40',
          accentColor: 'border-l-[#FF6B6B]',
          iconColor: 'text-[#FF6B6B]',
        };
      case 'place':
        return {
          label: 'Sight & Place',
          icon: MapPin,
          badgeBg: 'bg-[#E0F9F7] text-[#009688] border-[#4ECDC4]/50',
          accentColor: 'border-l-[#4ECDC4]',
          iconColor: 'text-[#4ECDC4]',
        };
      case 'activity':
      default:
        return {
          label: 'Activity',
          icon: Compass,
          badgeBg: 'bg-[#F3F0FF] text-[#8E44AD] border-[#A29BFE]/50',
          accentColor: 'border-l-[#A29BFE]',
          iconColor: 'text-[#A29BFE]',
        };
    }
  };

  const getTransportIcon = (mode?: string) => {
    switch (mode?.toLowerCase()) {
      case 'walk':
      case 'walking':
        return Footprints;
      case 'bus':
        return Bus;
      case 'taxi':
      case 'car':
        return Car;
      case 'ferry':
      case 'boat':
        return Ship;
      case 'subway':
      case 'train':
      case 'metro':
      default:
        return Train;
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
        {days.map((day, idx) => {
          const isSelected = activeDayIndex === idx;
          const dayCompleted = day.schedule.filter((s) => s.completed).length;
          const dayTotal = day.schedule.length;

          return (
            <button
              key={day.dayNumber}
              type="button"
              id={`tab-day-${day.dayNumber}`}
              onClick={() => onSelectDay(idx)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-[#FF6B6B] text-white border-[#EE5253] border-b-2 shadow-xs'
                  : 'bg-[#FFF8F0] border-transparent text-stone-700 hover:bg-[#FFE8D6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-stone-500'}`}>
                  Day {day.dayNumber}
                </span>
                {dayTotal > 0 && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-stone-200/80 text-stone-700'
                  }`}>
                    {dayCompleted}/{dayTotal}
                  </span>
                )}
              </div>
              <div className={`text-xs font-black truncate mt-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                {day.title ? day.title.replace(/^Day\s*\d+[:\-]?\s*/i, '') : `Day ${day.dayNumber}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Day Header Card */}
      <div className="bg-[#FF6B6B] border-b-4 border-[#EE5253] text-white rounded-[28px] p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/90 bg-white/20 px-3 py-1 rounded-full border border-white/30 mb-2">
              <span>Day {currentDay.dayNumber} of {days.length}</span>
              <span>•</span>
              <span>{destination}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight italic">
              {currentDay.title}
            </h2>
            <p className="text-white/90 text-sm mt-2 max-w-3xl leading-relaxed font-medium">
              {currentDay.summary}
            </p>
          </div>

          {/* Day Progress bar */}
          <div className="bg-black/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[210px]">
            <div className="flex items-center justify-between text-xs mb-2 font-bold">
              <span className="text-white/90">Day Progress</span>
              <span className="text-white font-black">{completedCount} of {totalCount} visited</span>
            </div>
            <div className="w-full h-2.5 bg-black/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD93D] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase text-stone-400 mr-1 tracking-wider hidden sm:inline">Filter:</span>
          {[
            { id: 'all', label: 'All Items', icon: null },
            { id: 'place', label: 'Places & Sights', icon: MapPin },
            { id: 'food', label: 'Food & Dining', icon: Utensils },
            { id: 'activity', label: 'Activities', icon: Compass },
            { id: 'transport', label: 'Transportation', icon: Train },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                id={`filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-black transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-b-2 border-black shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-[#FFF8F0]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-stone-500 font-bold">
          Showing {filteredSchedule.length} stops
        </span>
      </div>

      {/* Timeline Schedule Items List */}
      <div className="space-y-4">
        {filteredSchedule.map((item, index) => {
          const catConfig = getCategoryConfig(item.category);
          const CategoryIcon = catConfig.icon;
          const isRegenerating = regeneratingItemId === item.id;
          const mapQuery = encodeURIComponent(`${item.title} ${item.location} ${destination}`);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

          return (
            <div
              key={item.id || index}
              id={`schedule-item-${item.id}`}
              className={`bg-white rounded-[24px] border border-stone-200/80 border-b-4 border-b-stone-200 transition-all duration-200 overflow-hidden ${
                item.completed
                  ? 'bg-stone-50/80 opacity-75'
                  : 'hover:border-stone-300 shadow-sm'
              }`}
            >
              <div className="p-5 md:p-6">
                {/* Header: Time, Category Badge, Checkbox, Actions */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center flex-wrap gap-2">
                    {/* Time badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#2D2D2D] bg-[#FFD93D] px-3 py-1 rounded-xl border-b-2 border-[#E5B80B]">
                      <Clock className="w-3.5 h-3.5 text-[#2D2D2D]" />
                      {item.time}
                    </div>

                    {/* Category pill */}
                    <span className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xl border ${catConfig.badgeBg}`}>
                      <CategoryIcon className="w-3.5 h-3.5" />
                      {catConfig.label}
                    </span>

                    {/* Duration badge */}
                    {item.duration && (
                      <span className="text-xs text-stone-500 font-bold">
                        • {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Right side: Checkbox toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`btn-complete-${item.id}`}
                      onClick={() => onToggleComplete(activeDayIndex, item.id)}
                      title={item.completed ? 'Mark as incomplete' : 'Mark as completed'}
                      className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                        item.completed
                          ? 'bg-[#E0F9F7] text-[#009688] border border-[#4ECDC4]/50'
                          : 'bg-[#FFF8F0] text-stone-700 hover:bg-[#FFE8D6] border border-stone-200'
                      }`}
                    >
                      {item.completed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#009688]" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-stone-400" />
                          <span>Mark done</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Title & Location */}
                <div className="mb-2">
                  <h3 className={`text-base md:text-lg font-black ${item.completed ? 'text-stone-400 line-through' : 'text-[#1A1A1A]'}`}>
                    {item.title}
                  </h3>

                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B6B] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 font-medium leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Special Detail: Food Item Details */}
                {item.category === 'food' && item.foodDetail && (
                  <div className="bg-[#FFF8F0] border-2 border-[#FFD93D]/60 border-b-4 border-b-[#E5B80B]/50 rounded-2xl p-4 mb-3 text-xs text-[#2D2D2D] space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-black text-[#D35400] uppercase tracking-wide">
                        🍽️ {item.foodDetail.mealType} • {item.foodDetail.cuisine}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.foodDetail.priceRange && (
                          <span className="font-black text-[#2D2D2D] bg-[#FFD93D] px-2.5 py-0.5 rounded-lg border border-[#E5B80B]">
                            {item.foodDetail.priceRange}
                          </span>
                        )}
                        {item.foodDetail.reservationNeeded && (
                          <span className="bg-[#FFE3E3] text-[#EE5253] font-black px-2.5 py-0.5 rounded-lg border border-[#EE5253]/30">
                            Reservation Recommended
                          </span>
                        )}
                      </div>
                    </div>

                    {item.foodDetail.recommendedDishes && item.foodDetail.recommendedDishes.length > 0 && (
                      <div className="flex items-center flex-wrap gap-1.5 pt-1">
                        <span className="text-stone-700 font-bold">Must-try:</span>
                        {item.foodDetail.recommendedDishes.map((dish, dIdx) => (
                          <span
                            key={dIdx}
                            className="bg-white text-stone-800 px-2.5 py-0.5 rounded-lg border border-stone-200 font-bold text-[11px] shadow-xs"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Special Detail: Transportation Transit Details */}
                {item.category === 'transport' && item.transportDetail && (
                  <div className="bg-[#F3F0FF] border-2 border-[#A29BFE]/40 border-b-4 border-b-[#6C5CE7]/30 rounded-2xl p-4 mb-3 text-xs text-[#2D2D2D]">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 font-black">
                        {React.createElement(getTransportIcon(item.transportDetail.mode), { className: "w-4 h-4 text-[#6C5CE7]" })}
                        <span className="capitalize text-stone-700">{item.transportDetail.mode} Line:</span>
                        <span className="text-[#6C5CE7]">{item.transportDetail.route}</span>
                      </div>
                      {item.transportDetail.cost && (
                        <span className="font-black text-[#6C5CE7] bg-white px-2.5 py-0.5 rounded-lg border border-[#A29BFE]/40">
                          Fare: {item.transportDetail.cost}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Cost Estimate & Practical Tips */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center gap-4 text-xs">
                    {item.costEstimate && (
                      <div className="flex items-center gap-1 font-black text-stone-700">
                        <DollarSign className="w-3.5 h-3.5 text-[#FFD93D]" />
                        <span>{item.costEstimate}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Swap alternative & Google Maps */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`btn-regen-${item.id}`}
                      onClick={() => onRegenerateItem(activeDayIndex, item)}
                      disabled={isRegenerating}
                      className="inline-flex items-center gap-1 text-xs font-black text-[#2D2D2D] bg-[#FFD93D] hover:bg-[#F6C90E] border-b-2 border-[#E5B80B] px-3 py-1.5 rounded-xl transition-all shadow-xs active:translate-y-0.5"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-[#FF6B6B]' : ''}`} />
                      <span>{isRegenerating ? 'Finding...' : 'Alternative'}</span>
                    </button>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`link-maps-${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-black text-white bg-[#4ECDC4] hover:bg-[#45B7AF] border-b-2 border-[#45B7AF] px-3.5 py-1.5 rounded-xl transition-all shadow-xs active:translate-y-0.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  </div>
                </div>

                {/* Insider tip box */}
                {item.tips && (
                  <div className="mt-3 bg-[#FFF8F0] border border-[#FF6B6B]/25 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-[#2D2D2D] font-medium">
                    <Lightbulb className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-[#FF6B6B]">Tip: </span>
                      <span>{item.tips}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
