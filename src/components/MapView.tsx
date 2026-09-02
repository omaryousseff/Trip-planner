import React, { useState } from 'react';
import { ScheduleItem } from '../types';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Train, 
  Utensils, 
  Compass, 
  Layers 
} from 'lucide-react';

interface MapViewProps {
  items: ScheduleItem[];
  destination: string;
  dayNumber: number;
}

export const MapView: React.FC<MapViewProps> = ({
  items,
  destination,
  dayNumber,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const placesWithCoords = items.map((item, idx) => {
    // Generate deterministic visual coordinates if not explicitly provided
    const baseLat = 35.6895;
    const baseLng = 139.6917;
    const lat = item.coordinates?.lat || baseLat + ((idx * 0.015) % 0.06);
    const lng = item.coordinates?.lng || baseLng + ((idx * 0.02) % 0.08);
    return {
      ...item,
      displayIndex: idx + 1,
      lat,
      lng,
    };
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-indigo-600 border-indigo-700 text-white';
      case 'food':
        return 'bg-amber-600 border-amber-700 text-white';
      case 'place':
        return 'bg-emerald-600 border-emerald-700 text-white';
      case 'activity':
      default:
        return 'bg-purple-600 border-purple-700 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return Train;
      case 'food':
        return Utensils;
      case 'place':
        return MapPin;
      case 'activity':
      default:
        return Compass;
    }
  };

  // Google Maps Multi-stop URL
  const stopsQuery = items
    .map((item) => encodeURIComponent(`${item.title}, ${destination}`))
    .join('/');
  const fullDirectionsUrl = `https://www.google.com/maps/dir/${stopsQuery}`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            Day {dayNumber} Route Map & Sequence
          </h3>
          <p className="text-xs text-stone-500">
            Chronological navigation order for {items.length} itinerary stops
          </p>
        </div>

        <a
          href={fullDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-open-full-day-route"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3.5 py-2 rounded-xl transition-colors shadow-xs shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open Full Day Route in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-teal-200" />
        </a>
      </div>

      {/* Visual Route Canvas Card */}
      <div className="relative bg-gradient-to-b from-stone-100 to-stone-50 rounded-2xl p-6 border border-stone-200/80 min-h-[260px] overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.35]" 
          style={{
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Route step sequence cards on top of canvas */}
        <div className="relative z-10 space-y-3">
          {placesWithCoords.map((place, idx) => {
            const isLast = idx === placesWithCoords.length - 1;
            const isSelected = activeItemIndex === idx;
            const Icon = getCategoryIcon(place.category);

            return (
              <div key={place.id || idx} className="relative">
                {/* Connecting line to next stop */}
                {!isLast && (
                  <div className="absolute left-[18px] top-8 bottom-[-16px] w-0.5 bg-stone-300 z-0" />
                )}

                <div 
                  onClick={() => setActiveItemIndex(isSelected ? null : idx)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
                    isSelected 
                      ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-xs' 
                      : 'border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  {/* Pin badge */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border z-10 ${getCategoryColor(place.category)}`}>
                    {place.displayIndex}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-500">{place.time}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          {place.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {place.duration}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-stone-900 truncate mt-0.5">
                      {place.title}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{place.location}</span>
                    </div>

                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 text-xs text-stone-600 leading-relaxed">
                        <p>{place.description}</p>
                        {place.tips && (
                          <p className="mt-1 font-medium text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/70">
                            💡 {place.tips}
                          </p>
                        )}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.title} ${place.location} ${destination}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-700 font-semibold mt-2 hover:underline"
                        >
                          <Navigation className="w-3 h-3" />
                          View on Google Maps
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
