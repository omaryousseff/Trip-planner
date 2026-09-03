import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  CloudSun, 
  Camera, 
  Clock, 
  Shuffle, 
  X, 
  Send, 
  MessageCircle, 
  Check, 
  ChevronRight,
  Sun,
  ShieldAlert
} from 'lucide-react';
import { CompassSuggestion, TripPlan, ScheduleItem } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface CompassAssistantProps {
  tripPlan: TripPlan | null;
  activeDayIndex: number;
  onOptimizeSchedule?: (dayIndex: number) => void;
  onSwapItems?: (dayIndex: number, idx1: number, idx2: number) => void;
}

export const CompassAssistant: React.FC<CompassAssistantProps> = ({
  tripPlan,
  activeDayIndex,
  onOptimizeSchedule,
  onSwapItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tips' | 'chat'>('tips');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'pip' | 'user'; text: string; time: string }>>([
    {
      sender: 'pip',
      text: `Ahoy! I'm Pip, your pocket compass guide. I'm keeping an eye on the daylight, walking routes, and cozy photo spots for Day ${activeDayIndex + 1}!`,
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [dismissedSuggestionIds, setDismissedSuggestionIds] = useState<string[]>([]);

  const currentDay = tripPlan?.days[activeDayIndex] || tripPlan?.days[0];
  const destination = tripPlan?.destination || 'your destination';

  // Dynamic contextual suggestions based on itinerary items
  const generatedSuggestions: CompassSuggestion[] = [
    {
      id: 'golden-hour',
      type: 'golden_hour',
      title: 'Golden Hour Photo Alert',
      message: `Sunset in ${destination} is around 6:40 PM. The warm light will hit your afternoon stops beautifully!`,
      actionText: 'Great to know!',
    },
    {
      id: 'weather-prep',
      type: 'weather',
      title: 'Comfort & Weather Check',
      message: `${tripPlan?.weatherSummary || 'Pleasant walking conditions today'}. Keep a light jacket or canvas tote handy for flea market finds!`,
      actionText: 'Got it',
    },
    {
      id: 'route-optimization',
      type: 'route',
      title: 'Shortest Walking Route',
      message: `Your stops are clustered nicely today. Walk rather than taking transit for Day ${activeDayIndex + 1} to catch hidden cobblestones.`,
      actionText: onOptimizeSchedule ? 'Re-order for Shortest Walk' : 'Noted',
      actionType: onOptimizeSchedule ? 'switch_items' : undefined,
    },
  ];

  const visibleSuggestions = generatedSuggestions.filter((s) => !dismissedSuggestionIds.includes(s.id));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    triggerHaptic('medium');
    const userText = inputMessage.trim();
    const newMsg = { sender: 'user' as const, text: userText, time: 'Now' };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Contextual intelligent responses from Pip
    setTimeout(() => {
      let reply = `Looking at your Day ${activeDayIndex + 1} schedule in ${destination}: `;
      const lower = userText.toLowerCase();

      if (lower.includes('food') || lower.includes('eat') || lower.includes('hungry') || lower.includes('coffee')) {
        reply += `I recommend checking out local spots around ${currentDay?.schedule[1]?.title || 'your midday stop'}. Street stalls with lines of locals never fail!`;
      } else if (lower.includes('rain') || lower.includes('weather')) {
        reply += `Today's conditions are mostly clear with pleasant temperatures. If it showers, duck into an artisan gallery or covered market hall!`;
      } else if (lower.includes('photo') || lower.includes('picture') || lower.includes('camera')) {
        reply += `Top photo angle: stand at a 45-degree angle in front of ${currentDay?.schedule[0]?.title || 'your morning landmark'} during early morning light to skip crowds!`;
      } else if (lower.includes('walk') || lower.includes('transit') || lower.includes('subway')) {
        reply += `Walking between your stops takes only 10-15 minutes each. Save subway fares for longer transfers!`;
      } else {
        reply += `You have ${currentDay?.schedule.length || 4} stops lined up for today. Don't rush; leave room for spontaneous alleyway discoveries!`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'pip', text: reply, time: 'Just now' },
      ]);
      triggerHaptic('light');
    }, 600);
  };

  return (
    <>
      {/* Floating Animated Pip the Compass Button */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-40">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            triggerHaptic('medium');
            setIsOpen(!isOpen);
          }}
          className="relative bg-[#FFFDF9] border-3 border-[#2D241E] p-2.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
          title="Chat with Pip the AI Compass"
        >
          {/* Compass character visual */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#FFE17D] to-[#FF9254] flex items-center justify-center shadow-inner overflow-hidden border border-[#E5B80B]">
            {/* Spinning Needle animation */}
            <motion.div
              animate={{ rotate: [0, 45, -30, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute w-1 h-8 flex flex-col items-center justify-between"
            >
              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[10px] border-b-[#E03131]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D241E] z-10" />
              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[10px] border-t-[#2D241E]" />
            </motion.div>

            {/* Cute eyes */}
            <div className="absolute top-2.5 flex gap-2 z-20">
              <div className="w-1 h-1.5 bg-[#2D241E] rounded-full" />
              <div className="w-1 h-1.5 bg-[#2D241E] rounded-full" />
            </div>
          </div>

          {/* Unread suggestion badge */}
          {visibleSuggestions.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[10px] font-black w-5 h-5 rounded-full border-2 border-white flex items-center justify-center animate-bounce">
              {visibleSuggestions.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Slide-out Compass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-96 bg-[#FFFDF9] border-4 border-[#2D241E] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Drawer Header */}
            <div className="bg-[#FAF4EA] px-4 py-3 border-b-2 border-[#EFE5D8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFE17D] border border-[#E5B80B] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#FF7A59] animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2D241E] font-cozy-serif">
                    Pip the AI Compass
                  </h3>
                  <p className="text-[10px] text-stone-500 font-medium">
                    Contextual Scrapbook Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Tabs */}
                <div className="flex bg-stone-200/70 p-0.5 rounded-lg text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setActiveTab('tips');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === 'tips' ? 'bg-white text-stone-900 shadow-2xs font-black' : 'text-stone-600'
                    }`}
                  >
                    Tips ({visibleSuggestions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setActiveTab('chat');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === 'chat' ? 'bg-white text-stone-900 shadow-2xs font-black' : 'text-stone-600'
                    }`}
                  >
                    Chat
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {activeTab === 'tips' ? (
              <div className="p-4 overflow-y-auto space-y-3 max-h-[380px]">
                {visibleSuggestions.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <Sparkles className="w-8 h-8 text-[#FFE17D] mx-auto" />
                    <p className="text-xs font-black text-stone-700">All clear!</p>
                    <p className="text-[11px] text-stone-500">
                      Your Day {activeDayIndex + 1} itinerary is flowing smoothly.
                    </p>
                  </div>
                ) : (
                  visibleSuggestions.map((sugg) => (
                    <div
                      key={sugg.id}
                      className="bg-white border-2 border-[#EAE0D0] rounded-2xl p-3.5 shadow-2xs space-y-2 relative"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setDismissedSuggestionIds((prev) => [...prev, sugg.id]);
                        }}
                        className="absolute top-2 right-2 text-stone-300 hover:text-stone-500"
                        title="Dismiss"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {sugg.type === 'golden_hour' && <Camera className="w-4 h-4 text-[#FF7A59]" />}
                        {sugg.type === 'weather' && <CloudSun className="w-4 h-4 text-[#F59E0B]" />}
                        {sugg.type === 'route' && <Sparkles className="w-4 h-4 text-[#10B981]" />}
                        <span className="text-xs font-black text-[#2D241E]">
                          {sugg.title}
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        {sugg.message}
                      </p>

                      {sugg.actionText && (
                        <button
                          type="button"
                          onClick={() => {
                            triggerHaptic('medium');
                            if (sugg.actionType === 'switch_items' && onOptimizeSchedule) {
                              onOptimizeSchedule(activeDayIndex);
                            }
                            setDismissedSuggestionIds((prev) => [...prev, sugg.id]);
                          }}
                          className="text-[11px] font-black text-[#FF7A59] hover:text-[#FF6040] inline-flex items-center gap-1 pt-1"
                        >
                          <span>{sugg.actionText}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="flex flex-col h-[380px]">
                {/* Chat feed */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                  {chatMessages.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#FF7A59] text-white font-medium rounded-br-none'
                            : 'bg-white border border-[#EAE0D0] text-stone-800 rounded-bl-none shadow-2xs font-medium'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input form */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-2 border-t border-stone-200 bg-[#FAF4EA] flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ask Pip: best coffee nearby? photo tip?"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF7A59] hover:bg-[#FF6040] text-white p-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
