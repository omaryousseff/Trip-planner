import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  CheckCircle2, 
  ExternalLink, 
  RotateCw, 
  Train, 
  GripVertical,
  Maximize2,
  Camera,
  Sparkles,
  Building2,
  Calendar,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getLandmarkPhoto, LandmarkPhotoInfo } from '../utils/landmarkImages';
import { getDirectionsUrl, getPlaceSearchUrl } from '../utils/geoCoordinates';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { WashiTape, PushPin, PassportStamp, triggerStampCelebration } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';

// Time adjustment helper for dragged items
const TIME_SLOTS_PRESETS = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '07:00 PM', '09:00 PM', '10:30 PM'];

export const adjustScheduleTimes = (items: ScheduleItem[]): ScheduleItem[] => {
  return items.map((item, idx) => {
    const newTime = TIME_SLOTS_PRESETS[Math.min(idx, TIME_SLOTS_PRESETS.length - 1)] || item.time;
    let newSlot: TimeSlot = 'morning';
    if (idx <= 1) newSlot = 'morning';
    else if (idx <= 3) newSlot = 'afternoon';
    else newSlot = 'evening';

    return {
      ...item,
      time: newTime,
      timeSlot: newSlot,
    };
  });
};

// SORTABLE SCRAPBOOK ITEM WRAPPER
interface SortableItemProps {
  item: ScheduleItem;
  dayIndex: number;
  idx: number;
  destination: string;
  onToggleComplete: (dayIndex: number, itemId: string) => void;
  onRegenerateItem: (dayIndex: number, item: ScheduleItem) => void;
  onOpenPhotoLightbox: (item: ScheduleItem, photoInfo: LandmarkPhotoInfo) => void;
  regeneratingItemId: string | null;
}

const SortableScrapbookItem: React.FC<SortableItemProps> = ({
  item,
  dayIndex,
  idx,
  destination,
  onToggleComplete,
  onRegenerateItem,
  onOpenPhotoLightbox,
  regeneratingItemId,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const photoInfo = getLandmarkPhoto(item, destination);

  // Curate the best 3 photos of the place (from Pinterest search: place name city)
  const placePhotos: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (item.photos && item.photos.length > 0) {
      list.push(...item.photos);
    } else {
      if (item.imageUrl) list.push(item.imageUrl);
      if (photoInfo.photos && photoInfo.photos.length > 0) {
        photoInfo.photos.forEach((p) => {
          if (p && !list.includes(p)) list.push(p);
        });
      }
      if (photoInfo.alternativePhotos && photoInfo.alternativePhotos.length > 0) {
        photoInfo.alternativePhotos.forEach((p) => {
          if (p.url && !list.includes(p.url)) list.push(p.url);
        });
      }
      if (photoInfo.url && !list.includes(photoInfo.url)) list.push(photoInfo.url);
    }
    return list.slice(0, 3);
  }, [item, photoInfo]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const currentPhotoUrl = placePhotos[activePhotoIdx] || photoInfo.url;

  const isFood = item.category === 'food';
  const isCompleted = !!item.completed;
  const isRegenerating = regeneratingItemId === item.id;

  // Subtle natural paper rotations
  const itemRotations = [-1.2, 0.8, -0.7, 1.4, -1.0, 0.9];
  const naturalRotation = itemRotations[idx % itemRotations.length];

  return (
    <div ref={setNodeRef} style={style} className="relative mb-8 last:mb-2">
      {/* Timeline Node Connector Point */}
      <div className="absolute -left-[27px] sm:-left-[35px] top-6 z-20 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            if (!isCompleted) triggerStampCelebration();
            else triggerHaptic('light');
            onToggleComplete(dayIndex, item.id);
          }}
          title={isCompleted ? 'Mark unvisited' : 'Stamp as visited!'}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-3 flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isCompleted
              ? 'bg-[#285A34] border-[#285A34] text-white'
              : 'bg-[#FFFDF9] border-[#2D241E] text-[#2D241E] hover:border-[#FF7A59]'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <span className="text-[11px] font-black font-mono">{idx + 1}</span>
          )}
        </button>
      </div>

      {/* ITEM PHYSICAL OBJECT (Sticky Note vs Polaroid vs Postcard) */}
      <motion.div
        whileHover={{ scale: 1.015, y: -3 }}
        whileTap={{ scale: 0.99 }}
        style={{ transform: `rotate(${isDragging ? 0 : naturalRotation}deg)` }}
        className={`relative transition-shadow duration-200 ${
          isDragging ? 'shadow-2xl opacity-90' : ''
        }`}
      >
        {/* ========================================================
            CASE 1: FOOD -> YELLOW STICKY NOTE
        ======================================================== */}
        {isFood ? (
          <div className="sticky-note-yellow p-5 sm:p-6 border border-[#F0DC82] rounded-2xl relative shadow-md">
            {/* Brass push pin in top center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <PushPin color="brass" />
            </div>

            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-black/5"
              title="Drag to rearrange & recalculate times"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Header / Time */}
            <div className="flex items-center gap-2 mb-2 pr-8">
              <span className="font-mono text-xs font-black text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
                {item.time}
              </span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" />
                {item.foodDetail?.mealType || 'Culinary Stop'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-[#2D241E] font-cozy-serif mb-1">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium mb-3">
              {item.description}
            </p>

            {/* Food recommendations & details */}
            {item.foodDetail && (
              <div className="bg-white/80 border border-amber-300/80 rounded-xl p-3 text-xs space-y-1 mb-3">
                <div className="flex justify-between font-bold text-stone-700">
                  <span>Cuisine: {item.foodDetail.cuisine}</span>
                  <span className="font-mono">{item.foodDetail.priceRange}</span>
                </div>
                {item.foodDetail.recommendedDishes && item.foodDetail.recommendedDishes.length > 0 && (
                  <p className="text-amber-900">
                    <span className="font-black">Must Order: </span>
                    {item.foodDetail.recommendedDishes.join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-300/60 text-xs">
              <div className="flex items-center gap-1 text-stone-600 font-semibold truncate max-w-[200px]">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
                <span className="truncate">{item.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getDirectionsUrl({
                    destinationTitle: item.title,
                    destinationLocation: item.location,
                    destinationCity: destination,
                    travelMode: 'walking',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2D241E] hover:bg-black text-white px-3 py-1.5 rounded-lg font-black text-[11px] inline-flex items-center gap-1 shadow-2xs"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Completed Stamp */}
            {isCompleted && (
              <div className="absolute bottom-4 right-6 pointer-events-none">
                <PassportStamp
                  city="TASTED"
                  label="VISITED"
                  color="wine"
                  rotation={-8}
                  size="sm"
                />
              </div>
            )}
          </div>
        ) : (
          /* ========================================================
              CASE 2: PLACES & ACTIVITIES -> AUTHENTIC POLAROID
          ======================================================== */
          <div className="polaroid-card relative border border-stone-200 transition-all duration-300 ease-out hover:scale-[1.02]">
            {/* Washi tape at top corner */}
            <div className="absolute -top-3.5 left-6 z-10">
              <WashiTape color={idx % 2 === 0 ? 'coral' : 'mint'} rotation={idx % 2 === 0 ? -3 : 4} />
            </div>

            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="absolute top-2 right-2 text-stone-400 hover:text-stone-800 cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-stone-100 z-20"
              title="Drag note to reorder schedule"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* Photo inside Polaroid - Best 3 Photos Display */}
            <div className="relative rounded-sm overflow-hidden bg-stone-900 group">
              <img
                src={currentPhotoUrl}
                alt={`${item.title} - photo ${activePhotoIdx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-52 sm:h-64 object-cover group-hover:scale-103 transition-transform duration-300"
              />

              {/* Time pill overlay on photo */}
              <div className="absolute top-3 left-3 bg-[#2D241E]/85 backdrop-blur-xs text-white text-xs font-mono font-black px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 z-10">
                <Clock className="w-3 h-3 text-[#FFD93D]" />
                <span>{item.time}</span>
              </div>

              {/* Best 3 Pinterest Photos Pill Badge */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1.5 shadow-xs z-10">
                <Camera className="w-3 h-3 text-[#E60023]" />
                <span>3 Photos</span>
                {placePhotos.length > 1 && (
                  <span className="bg-[#E60023] text-white px-1 py-0.2 rounded font-mono text-[9px]">
                    {activePhotoIdx + 1}/{placePhotos.length}
                  </span>
                )}
              </div>

              {/* Navigation arrows for multiple photos */}
              {placePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic('light');
                      setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : placePhotos.length - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerHaptic('light');
                      setActivePhotoIdx((prev) => (prev < placePhotos.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer shadow-md"
                    title="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Bottom bar inside photo: Stated Source & Inspect */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                {/* Verified Source Tag directly stating origin */}
                <div className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 pointer-events-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E60023]" />
                  <span>{photoInfo.source || 'Pinterest'}</span>
                </div>

                {/* Inspect / Zoom button */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    onOpenPhotoLightbox(item, {
                      ...photoInfo,
                      url: currentPhotoUrl,
                    });
                  }}
                  className="bg-white/90 hover:bg-white text-stone-900 text-xs font-black p-2 rounded-full shadow-md transition-all cursor-pointer pointer-events-auto shrink-0"
                  title="Inspect high-res photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3-Photo Mini Gallery Strip */}
            {placePhotos.length > 1 && (
              <div className="pt-2 px-1 grid grid-cols-3 gap-1.5">
                {placePhotos.map((thumbUrl, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setActivePhotoIdx(pIdx);
                    }}
                    className={`relative rounded-md overflow-hidden h-14 border cursor-pointer transition-all ${
                      activePhotoIdx === pIdx
                        ? 'ring-2 ring-[#FF7A59] border-transparent scale-102 shadow-xs'
                        : 'opacity-70 hover:opacity-100 border-stone-200'
                    }`}
                    title={`View photo ${pIdx + 1} from Pinterest`}
                  >
                    <img
                      src={thumbUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1.5 bg-black/75 text-white text-[9px] font-mono font-bold px-1 rounded">
                      #{pIdx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Handwritten Title and Caption */}
            <div className="pt-3 pb-1 px-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#FF7A59]" />
                    <span>{item.location}, {destination}</span>
                  </p>
                </div>

                {item.costEstimate && (
                  <span className="text-[11px] font-mono font-bold bg-[#FAF4EA] text-stone-700 px-2 py-1 rounded-md border border-[#EFE5D8]">
                    {item.costEstimate}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium mt-2">
                {item.description}
              </p>

              {item.tips && (
                <div className="mt-2 text-xs bg-[#FFF8E7] text-stone-800 p-2.5 rounded-xl border border-[#F3E2B8]">
                  <span className="font-black text-[#FF7A59]">Note: </span>
                  {item.tips}
                </div>
              )}

              {/* Bottom Quick Controls */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={getDirectionsUrl({
                      destinationTitle: item.title,
                      destinationLocation: item.location,
                      destinationCity: destination,
                      travelMode: 'walking',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF7A59] hover:text-[#E05030] font-black inline-flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Walk directions</span>
                  </a>

                  {photoInfo.officialWebsiteUrl && (
                    <a
                      href={photoInfo.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-stone-800 font-bold inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isRegenerating}
                    onClick={() => {
                      triggerHaptic('medium');
                      onRegenerateItem(dayIndex, item);
                    }}
                    className="text-[11px] font-bold text-stone-500 hover:text-stone-800 p-1 rounded-md hover:bg-stone-100 inline-flex items-center gap-1 cursor-pointer"
                    title="Swap with another suggestion"
                  >
                    <RotateCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                    <span>Alternate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Completed Inked Stamp */}
            {isCompleted && (
              <div className="absolute top-1/2 right-6 -translate-y-1/2 pointer-events-none z-30">
                <PassportStamp
                  city={destination.slice(0, 10)}
                  label="VISITED"
                  color="wine"
                  rotation={-10}
                  size="md"
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

// MAIN SCHEDULE VIEW COMPONENT
interface ScheduleViewProps {
  days: DayPlan[];
  destination: string;
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
  onToggleComplete: (dayIndex: number, itemId: string) => void;
  onRegenerateItem: (dayIndex: number, item: ScheduleItem) => void;
  onReorderItems?: (dayIndex: number, newItems: ScheduleItem[]) => void;
  regeneratingItemId: string | null;
  onUpdateItemPhoto?: (
    dayIndex: number, 
    itemId: string, 
    newPhoto: { 
      url: string; 
      caption?: string; 
      source: string; 
      sourceType?: string;
      officialWebsiteUrl?: string;
      tripAdvisorUrl?: string;
    }
  ) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  days,
  destination,
  activeDayIndex,
  onSelectDay,
  onToggleComplete,
  onRegenerateItem,
  onReorderItems,
  regeneratingItemId,
  onUpdateItemPhoto,
}) => {
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<{
    item: ScheduleItem;
    photoInfo: LandmarkPhotoInfo;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentDay = days[activeDayIndex] || days[0];
  const items = currentDay.schedule;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    triggerHaptic('strong');

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove<ScheduleItem>(items, oldIndex, newIndex);
      // Automatically adjust times chronologically
      const timed = adjustScheduleTimes(reordered);

      if (onReorderItems) {
        onReorderItems(activeDayIndex, timed);
      }
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <PhotoLightboxModal
          item={selectedPhotoModal.item}
          photoInfo={selectedPhotoModal.photoInfo}
          destination={destination}
          onClose={() => setSelectedPhotoModal(null)}
          onSaveCustomPhoto={(newPhoto) => {
            if (onUpdateItemPhoto) {
              onUpdateItemPhoto(activeDayIndex, selectedPhotoModal.item.id, newPhoto);
            }
          }}
        />
      )}

      {/* Day Picker Tactile Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          const completedCount = day.schedule.filter((i) => i.completed).length;

          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => {
                triggerHaptic('light');
                onSelectDay(idx);
              }}
              className={`relative px-4 py-2.5 rounded-2xl font-black text-xs transition-all shrink-0 cursor-pointer flex items-center gap-2 border-2 ${
                isActive
                  ? 'bg-[#FF7A59] border-[#E05030] text-white shadow-md'
                  : 'bg-[#FFFDF9] border-[#EAE0D0] text-stone-700 hover:border-stone-400'
              }`}
            >
              <span>Day {day.dayNumber}</span>
              {completedCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${isActive ? 'bg-white text-[#FF7A59]' : 'bg-stone-200 text-stone-700'}`}>
                  {completedCount}/{day.schedule.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day Overview Scrapbook Note */}
      <div className="postcard-card p-6 rounded-3xl relative">
        <div className="absolute -top-3 right-8">
          <WashiTape color="gold" rotation={2} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-400">
              DAY {currentDay.dayNumber} OF {days.length} • {destination}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif">
              {currentDay.title}
            </h2>
          </div>

          <div className="shrink-0 text-xs font-bold text-stone-500 bg-[#FAF4EA] px-3 py-1.5 rounded-xl border border-[#EFE5D8]">
            <span>✨ Drag sticky notes to re-order sequence</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium mt-2">
          {currentDay.summary}
        </p>
      </div>

      {/* ANIMATED VERTICAL TIMELINE CONTAINER */}
      <div className="relative pl-7 sm:pl-10">
        {/* Animated Drawing Route Line */}
        <div className="absolute left-[13px] sm:left-[17px] top-4 bottom-8 w-1 bg-stone-300 -z-1 rounded-full overflow-hidden">
          {/* Animated drawing ink bar */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-gradient-to-b from-[#FF7A59] via-[#F59E0B] to-[#285A34]"
          />
        </div>

        {/* Drag & Drop Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <div>
              {items.map((item, idx) => (
                <SortableScrapbookItem
                  key={item.id}
                  item={item}
                  dayIndex={activeDayIndex}
                  idx={idx}
                  destination={destination}
                  onToggleComplete={onToggleComplete}
                  onRegenerateItem={onRegenerateItem}
                  onOpenPhotoLightbox={(it, p) => setSelectedPhotoModal({ item: it, photoInfo: p })}
                  regeneratingItemId={regeneratingItemId}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
