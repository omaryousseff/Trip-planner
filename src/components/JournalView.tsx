import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Stamp, 
  Camera, 
  PenTool, 
  Calendar, 
  MapPin, 
  Trash2, 
  Plus,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TripPlan, TravelDNA, JournalMemory, ScheduleItem } from '../types';
import { WashiTape, PushPin, PassportStamp, triggerStampCelebration } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';

interface JournalViewProps {
  tripPlan: TripPlan;
  travelDNA?: TravelDNA | null;
  memories: JournalMemory[];
  onAddMemory: (memory: JournalMemory) => void;
  onDeleteMemory: (id: string) => void;
  onOpenPhotoLightbox: (item: ScheduleItem) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  tripPlan,
  travelDNA,
  memories,
  onAddMemory,
  onDeleteMemory,
  onOpenPhotoLightbox,
}) => {
  const [newNote, setNewNote] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState(0);
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Extract all visited/completed stops across all days
  const completedStops = tripPlan.days.flatMap((day, dIdx) => 
    day.schedule.filter((item) => item.completed).map((item) => ({ ...item, dayNumber: day.dayNumber, dayIndex: dIdx }))
  );

  const destination = tripPlan.destination;

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    triggerStampCelebration();
    const memory: JournalMemory = {
      id: `mem-${Date.now()}`,
      dayIndex: selectedDay,
      title: newTitle.trim() || `Day ${selectedDay + 1} Memory`,
      location: destination,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      userNote: newNote.trim(),
      stampCity: destination.split(',')[0].slice(0, 10).toUpperCase(),
      washiStyle: ['coral', 'mint', 'gold'][Math.floor(Math.random() * 3)] as any,
      rotation: (Math.random() * 4 - 2),
    };

    onAddMemory(memory);
    setNewNote('');
    setNewTitle('');
    setShowNoteForm(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Scrapbook Journal Cover Header */}
      <div className="relative bg-[#FFFDF9] border-4 border-[#2D241E] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Washi Tapes on corners */}
        <div className="absolute -top-3 left-8">
          <WashiTape color="coral" rotation={-3} />
        </div>
        <div className="absolute -top-3 right-8">
          <WashiTape color="mint" rotation={2} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF7A59] bg-[#FFF0ED] px-3 py-1 rounded-full border border-[#FFD5CC]">
                Official Travel Scrapbook
              </span>
              <span className="text-xs font-mono font-bold text-stone-500">
                {destination} Edition
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#2D241E] font-cozy-serif">
              Memories & Passport Stamps
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Every landmark stamped, handwritten note penned, and Polaroid collected on your journey.
            </p>
          </div>

          {/* Stamped Passport seal */}
          <div className="shrink-0 flex items-center gap-3">
            <PassportStamp
              city={destination.split(',')[0].slice(0, 12)}
              label="SCRAPBOOK"
              color="wine"
              rotation={-6}
              size="md"
            />
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-6 pt-4 border-t-2 border-[#EFE5D8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-[#FAF4EA] p-3 rounded-2xl border border-[#EFE5D8]">
            <span className="text-[10px] uppercase font-black text-stone-400 block">Stamps Earned</span>
            <span className="font-mono text-xl font-black text-[#FF7A59]">{completedStops.length}</span>
          </div>
          <div className="bg-[#FAF4EA] p-3 rounded-2xl border border-[#EFE5D8]">
            <span className="text-[10px] uppercase font-black text-stone-400 block">Journal Notes</span>
            <span className="font-mono text-xl font-black text-[#10B981]">{memories.length}</span>
          </div>
          <div className="bg-[#FAF4EA] p-3 rounded-2xl border border-[#EFE5D8]">
            <span className="text-[10px] uppercase font-black text-stone-400 block">Travel DNA</span>
            <span className="font-cozy-serif text-sm font-black text-[#8B5CF6] truncate block">
              {travelDNA?.archetype.title.split(' ')[1] || 'Flâneur'}
            </span>
          </div>
          <div className="bg-[#FAF4EA] p-3 rounded-2xl border border-[#EFE5D8]">
            <span className="text-[10px] uppercase font-black text-stone-400 block">Total Days</span>
            <span className="font-mono text-xl font-black text-[#F59E0B]">{tripPlan.durationDays}</span>
          </div>
        </div>
      </div>

      {/* COLLECTED PASSPORT STAMPS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#2D241E] font-cozy-serif">
              Passport Stamp Collection
            </h2>
            <p className="text-xs text-stone-500">
              Completed stops receive official inked stamps on your passport pages.
            </p>
          </div>
        </div>

        {completedStops.length === 0 ? (
          <div className="bg-[#FFFDF9] border-2 border-dashed border-[#DFD7CC] rounded-3xl p-8 text-center space-y-3">
            <Stamp className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-black text-sm text-[#2D241E]">Your Passport is Waiting for Ink</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Check off stops as you visit them in the Plan or Today Companion view to stamp your passport book!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-[#FAF4EA] rounded-3xl border-2 border-[#EFE5D8]">
            {completedStops.map((stop, sIdx) => {
              const colors: Array<'wine' | 'teal' | 'navy' | 'sepia'> = ['wine', 'teal', 'navy', 'sepia'];
              const chosenColor = colors[sIdx % colors.length];
              const rotation = (sIdx % 3 === 0 ? -6 : sIdx % 3 === 1 ? 5 : -2);

              return (
                <div
                  key={`${stop.id}-${sIdx}`}
                  className="bg-white/80 p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col items-center text-center relative group"
                >
                  <PassportStamp
                    city={stop.title.slice(0, 14)}
                    label="VISITED"
                    color={chosenColor}
                    rotation={rotation}
                    size="sm"
                  />
                  <span className="text-[11px] font-bold text-stone-700 mt-2 truncate w-full">
                    {stop.title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    Day {stop.dayNumber} • {stop.time}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* HANDWRITTEN SCRAPBOOK NOTES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#2D241E] font-cozy-serif">
              Sticky Notes & Traveler Musings
            </h2>
            <p className="text-xs text-stone-500">
              Personal reflections, favorite espresso bars, and memories pinned to your board.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              setShowNoteForm(!showNoteForm);
            }}
            className="inline-flex items-center gap-1.5 bg-[#FF7A59] hover:bg-[#FF6040] text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Pin New Sticky Note</span>
          </button>
        </div>

        {/* Note entry form */}
        {showNoteForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateMemory}
            className="sticky-note-yellow p-5 rounded-2xl border border-[#F0DC82] space-y-3 relative shadow-md"
          >
            <div className="absolute -top-3 right-6">
              <PushPin color="red" />
            </div>

            <h3 className="font-handwritten text-xl font-bold text-stone-900">
              Pin a new memory to the board:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Title (e.g., Hidden Ramen Shop in Shinjuku)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-white/90 border border-[#E6D06C] rounded-xl px-3 py-2 text-xs text-stone-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59]"
              />

              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="bg-white/90 border border-[#E6D06C] rounded-xl px-3 py-2 text-xs text-stone-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59] cursor-pointer"
              >
                {tripPlan.days.map((d, dIdx) => (
                  <option key={dIdx} value={dIdx}>
                    Day {d.dayNumber}: {d.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            <textarea
              required
              rows={3}
              placeholder="What made this moment unforgettable? Smell of roasted tea, rain on cobblestones, a quiet conversation..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full bg-white/90 border border-[#E6D06C] rounded-xl p-3 text-xs text-stone-800 font-handwritten text-base focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59]"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#2D241E] hover:bg-black text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Pin Note
              </button>
            </div>
          </motion.form>
        )}

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((mem) => {
            return (
              <motion.div
                key={mem.id}
                whileHover={{ scale: 1.02, rotate: 0 }}
                style={{ transform: `rotate(${mem.rotation || -1.5}deg)` }}
                className="sticky-note-yellow p-5 rounded-2xl relative transition-all"
              >
                <div className="absolute -top-3 left-6">
                  <PushPin color="brass" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500">
                    Day {mem.dayIndex + 1} • {mem.date}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      onDeleteMemory(mem.id);
                    }}
                    className="text-stone-400 hover:text-red-500 transition-colors p-1"
                    title="Remove note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-black text-base text-[#2D241E] font-cozy-serif mb-1">
                  {mem.title}
                </h4>

                <p className="font-handwritten text-lg text-stone-800 leading-relaxed">
                  "{mem.userNote}"
                </p>

                <div className="mt-3 pt-2 border-t border-[#E6D06C]/60 flex items-center justify-between text-[10px] text-stone-500 font-bold">
                  <span>📍 {mem.location}</span>
                  <span>Journaled</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
