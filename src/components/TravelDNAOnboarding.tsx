import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  Flame, 
  Utensils, 
  Landmark, 
  Footprints, 
  Moon, 
  ArrowRight, 
  Check, 
  RefreshCw,
  Camera,
  Heart,
  X
} from 'lucide-react';
import { TravelDNA, TravelArchetype } from '../types';
import { WashiTape, PushPin, PassportStamp, triggerStampCelebration } from './ScrapbookElements';
import { triggerHaptic } from '../utils/haptics';

export const TRAVEL_ARCHETYPES: TravelArchetype[] = [
  {
    id: 'flaneur',
    title: 'The Wandering Flâneur',
    tagline: 'Lost in the poetry of backstreets and sunlit cafés',
    badge: '☕ Flâneur',
    description: 'You travel not to cross off checklists, but to absorb the atmosphere. You cherish hidden bookshops, quiet alleyways, and long afternoons with coffee.',
    quote: '"Not all those who wander are lost."',
    dominantTraits: ['Atmosphere Seeker', 'Unscripted Days', 'Visual Storyteller'],
    color: '#FF7A59',
    stampBg: '#FFF0ED',
  },
  {
    id: 'epicurean',
    title: 'The Epicurean Scout',
    tagline: 'Tasting the soul of civilizations one bite at a time',
    badge: '🍜 Epicurean',
    description: 'For you, food is culture, memory, and art. From 5 AM fish markets to sizzling night stalls and cozy bistros, your itinerary is mapped by palate.',
    quote: '"To travel is to taste."',
    dominantTraits: ['Night Markets', 'Artisanal Flavors', 'Culinary Lore'],
    color: '#F59E0B',
    stampBg: '#FEF3C7',
  },
  {
    id: 'archivist',
    title: 'The Heritage Archivist',
    tagline: 'Unearthing ancient stones, folklore, and timeless echoes',
    badge: '🏛️ Archivist',
    description: 'You love places with a soul. Castles, historic libraries, ancient temples, and local craftsmen hold endless fascination for you.',
    quote: '"Every cobblestone has a secret to confess."',
    dominantTraits: ['Historical Depth', 'Old World Architecture', 'Museum Wonders'],
    color: '#10B981',
    stampBg: '#D1FAE5',
  },
  {
    id: 'trailblazer',
    title: 'The Kinetic Trailblazer',
    tagline: 'Chasing electric skylines, coastal ridges, and dawn expeditions',
    badge: '⚡ Trailblazer',
    description: 'High energy, vibrant rhythms, and boundless curiosity. You want to see the city from the highest rooftop and explore the bay before the crowds awaken.',
    quote: '"Life begins at the edge of your comfort zone."',
    dominantTraits: ['Active Excursions', 'Scenic Panorama', 'Urban Energy'],
    color: '#6366F1',
    stampBg: '#EEF2FF',
  },
  {
    id: 'pilgrim',
    title: 'The Serene Pilgrim',
    tagline: 'Slow sunrises, tranquil waters, and restorative quietude',
    badge: '🌿 Pilgrim',
    description: 'Travel is your refuge. You crave peaceful botanical gardens, mist-covered shrines, boutique ryokans, and sunset viewpoints.',
    quote: '"In quiet moments, the world opens up."',
    dominantTraits: ['Zen Spaces', 'Golden Hour Rituals', 'Mindful Exploration'],
    color: '#8B5CF6',
    stampBg: '#F5F3FF',
  },
];

interface TravelDNAOnboardingProps {
  initialDNA?: TravelDNA | null;
  onSaveDNA?: (dna: TravelDNA) => void;
  onComplete?: (dna: TravelDNA) => void;
  onClose?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const TravelDNAOnboarding: React.FC<TravelDNAOnboardingProps> = ({
  initialDNA,
  onSaveDNA,
  onComplete,
  onClose,
  onCancel,
  isModal = true,
}) => {
  const [step, setStep] = useState<'archetype' | 'sensory' | 'rhythm' | 'result'>(
    initialDNA ? 'result' : 'archetype'
  );

  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(
    initialDNA?.archetype.id || 'flaneur'
  );

  const [curiosityScore, setCuriosityScore] = useState(initialDNA?.sensoryScores.curiosity ?? 85);
  const [culinaryScore, setCulinaryScore] = useState(initialDNA?.sensoryScores.culinary ?? 75);
  const [cultureScore, setCultureScore] = useState(initialDNA?.sensoryScores.culture ?? 80);
  const [relaxationScore, setRelaxationScore] = useState(initialDNA?.sensoryScores.relaxation ?? 60);
  const [spontaneityScore, setSpontaneityScore] = useState(initialDNA?.sensoryScores.spontaneity ?? 70);
  const [rhythm, setRhythm] = useState<'gentle' | 'balanced' | 'fast'>(
    initialDNA?.preferredRhythm || 'balanced'
  );

  const activeArchetype = TRAVEL_ARCHETYPES.find((a) => a.id === selectedArchetypeId) || TRAVEL_ARCHETYPES[0];

  const handleFinish = () => {
    triggerStampCelebration();
    const dna: TravelDNA = {
      archetype: activeArchetype,
      sensoryScores: {
        curiosity: curiosityScore,
        culinary: culinaryScore,
        culture: cultureScore,
        relaxation: relaxationScore,
        spontaneity: spontaneityScore,
      },
      preferredRhythm: rhythm,
      passions: activeArchetype.dominantTraits,
      collectedStampsCount: initialDNA?.collectedStampsCount || 1,
    };
    if (onSaveDNA) onSaveDNA(dna);
    if (onComplete) onComplete(dna);
    setStep('result');
  };

  const handleDismiss = () => {
    if (onClose) onClose();
    if (onCancel) onCancel();
  };

  const modalBody = (
    <div className={`relative w-full ${isModal ? 'max-w-2xl mx-auto bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#2D241E] my-auto max-h-[90vh] overflow-y-auto overscroll-contain' : ''}`}>
      {/* Tape & Pin decorations */}
      <div className="absolute -top-3 left-8 z-10 pointer-events-none">
        <WashiTape color="coral" rotation={-3} />
      </div>
      <div className="absolute -top-3 right-12 z-10 pointer-events-none">
        <WashiTape color="mint" rotation={4} />
      </div>

      {isModal && (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === 'archetype' && (
          <motion.div
            key="archetype"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#FFE17D] text-[#2D241E] text-xs font-black px-3.5 py-1 rounded-full border border-[#DFB277] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A59]" />
                Step 1 of 3: Discover Your Travel DNA
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif">
                What kind of soul travels inside you?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-medium">
                Tap your natural traveler archetype to personalize your scrapbook itineraries, timings, and insider discoveries.
              </p>
            </div>

            {/* Archetype Cards in scrapbook polaroid / note style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {TRAVEL_ARCHETYPES.map((arch, idx) => {
                const isSelected = selectedArchetypeId === arch.id;
                const rotation = idx % 2 === 0 ? -1 : 1.5;

                return (
                  <motion.div
                    key={arch.id}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedArchetypeId(arch.id);
                    }}
                    style={{ transform: `rotate(${isSelected ? 0 : rotation}deg)` }}
                    className={`cursor-pointer p-4 rounded-2xl transition-all border-2 relative ${
                      isSelected
                        ? 'bg-white border-[#FF7A59] shadow-lg ring-3 ring-[#FF7A59]/20'
                        : 'bg-[#FFFDF9] border-[#EADECB] hover:border-[#D0BEA2] shadow-xs'
                    }`}
                  >
                    {/* Selected Stamp badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <span className="w-6 h-6 rounded-full bg-[#FF7A59] text-white flex items-center justify-center text-xs font-black shadow-xs">
                          ✓
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{arch.badge.split(' ')[0]}</span>
                      <h3 className="text-base font-black text-[#2D241E] font-cozy-serif">
                        {arch.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#FF7A59] font-bold italic mb-2">
                      {arch.tagline}
                    </p>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {arch.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {arch.dominantTraits.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold bg-[#F5EFE6] text-stone-700 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  setStep('sensory');
                }}
                className="bg-[#FF7A59] hover:bg-[#FF6040] text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer border-b-2 border-[#E05030]"
              >
                <span>Tune Sensory Instincts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'sensory' && (
          <motion.div
            key="sensory"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#4ECDC4]/20 text-[#1A535C] text-xs font-black px-3.5 py-1 rounded-full border border-[#4ECDC4]/40">
                <Compass className="w-3.5 h-3.5 text-[#1A535C]" />
                Step 2 of 3: Sensory Dial
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif">
                How do you want the trip to feel?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                Adjust your sensory dials to influence AI stop suggestions and landmark pacing.
              </p>
            </div>

            {/* Tactile sliders on yellow kraft paper card */}
            <div className="bg-[#FFF8E7] border-2 border-[#F3E2B8] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm relative">
              <div className="absolute -top-3 right-6">
                <PushPin color="brass" />
              </div>

              {/* Curiosity slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-[#2D241E]">
                  <span className="flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-[#FF7A59]" />
                    Curiosity & Hidden Alleys
                  </span>
                  <span className="font-mono text-[#FF7A59]">{curiosityScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={curiosityScore}
                  onChange={(e) => setCuriosityScore(Number(e.target.value))}
                  className="w-full accent-[#FF7A59] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                  <span>Major landmarks</span>
                  <span>Secret local gems</span>
                </div>
              </div>

              {/* Culinary Hunger */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-[#2D241E]">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Culinary Immersion
                  </span>
                  <span className="font-mono text-[#F59E0B]">{culinaryScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={culinaryScore}
                  onChange={(e) => setCulinaryScore(Number(e.target.value))}
                  className="w-full accent-[#F59E0B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                  <span>Quick casual eats</span>
                  <span>Destination gastronomy</span>
                </div>
              </div>

              {/* Cultural Depth */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-[#2D241E]">
                  <span className="flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-[#10B981]" />
                    Heritage & Architecture
                  </span>
                  <span className="font-mono text-[#10B981]">{cultureScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={cultureScore}
                  onChange={(e) => setCultureScore(Number(e.target.value))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* Spontaneity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-[#2D241E]">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    Room for Spontaneity
                  </span>
                  <span className="font-mono text-[#8B5CF6]">{spontaneityScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={spontaneityScore}
                  onChange={(e) => setSpontaneityScore(Number(e.target.value))}
                  className="w-full accent-[#8B5CF6] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('archetype')}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  setStep('rhythm');
                }}
                className="bg-[#FF7A59] hover:bg-[#FF6040] text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer border-b-2 border-[#E05030]"
              >
                <span>Choose Daily Rhythm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'rhythm' && (
          <motion.div
            key="rhythm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#FFD93D] text-[#2D241E] text-xs font-black px-3.5 py-1 rounded-full border border-[#DFB277]">
                <Footprints className="w-3.5 h-3.5 text-[#FF7A59]" />
                Step 3 of 3: Your Daily Tempo
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif">
                Select your rhythm between stops
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'gentle',
                  title: 'Gentle Stroll',
                  desc: '2-3 thoughtful stops daily. Plenty of café breaks and open hours.',
                  stops: '2-3 stops/day',
                  icon: '☕',
                },
                {
                  id: 'balanced',
                  title: 'Balanced Flow',
                  desc: '4-5 curated stops with relaxed transit and scenic dining.',
                  stops: '4-5 stops/day',
                  icon: '🌿',
                },
                {
                  id: 'fast',
                  title: 'Sunrise to Twilight',
                  desc: '6+ stops maximizing every hour across dawn, noon, and night markets.',
                  stops: '6+ stops/day',
                  icon: '⚡',
                },
              ].map((r) => {
                const isSelected = rhythm === r.id;
                return (
                  <motion.div
                    key={r.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      triggerHaptic('light');
                      setRhythm(r.id as any);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#FF7A59] shadow-md ring-2 ring-[#FF7A59]/30'
                        : 'bg-[#FFFDF9] border-[#EAE0D0] hover:border-stone-400'
                    }`}
                  >
                    <div>
                      <span className="text-3xl block mb-2">{r.icon}</span>
                      <h4 className="font-black text-sm text-[#2D241E] font-cozy-serif mb-1">
                        {r.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                    <span className="inline-block mt-3 text-[10px] font-black text-[#FF7A59] bg-[#FFF0ED] py-1 px-2 rounded-lg">
                      {r.stops}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep('sensory')}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="bg-[#285A34] hover:bg-[#1E4327] text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer border-b-2 border-[#15341E]"
              >
                <Sparkles className="w-4 h-4 text-[#FFE17D]" />
                <span>Generate Travel DNA & Stamp Journal</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 pt-4"
          >
            {/* The Stamped Travel DNA Passport Card */}
            <div className="relative bg-[#FFFDF9] border-4 border-[#2D241E] rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
              {/* Corner Washi Tape */}
              <div className="absolute -top-3 left-6">
                <WashiTape color="coral" rotation={-4} />
              </div>
              <div className="absolute -top-3 right-6">
                <WashiTape color="gold" rotation={3} />
              </div>

              {/* Passport Stamp in corner */}
              <div className="absolute top-4 right-4 hidden sm:block">
                <PassportStamp
                  city={activeArchetype.title.split(' ')[1] || 'VOYAGER'}
                  label="VERIFIED DNA"
                  color="wine"
                  rotation={8}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black uppercase tracking-widest text-stone-400">
                    OFFICIAL TRAVEL SCRAPBOOK IDENTITY
                  </span>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl mr-2">{activeArchetype.badge.split(' ')[0]}</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#2D241E] font-cozy-serif inline">
                    {activeArchetype.title}
                  </h2>
                  <p className="text-sm font-bold text-[#FF7A59] italic mt-1">
                    {activeArchetype.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-[#FAF4EA] p-4 rounded-2xl border border-[#EFE5D8]">
                  {activeArchetype.description}
                </p>

                {/* Trait breakdown pills */}
                <div>
                  <span className="text-[11px] font-black uppercase text-stone-400 tracking-wider block mb-2">
                    Sensory DNA Profile:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white border border-stone-200 p-2.5 rounded-xl">
                      <span className="text-[10px] text-stone-400 block font-bold">Curiosity</span>
                      <span className="font-mono font-black text-sm text-[#FF7A59]">{curiosityScore}%</span>
                    </div>
                    <div className="bg-white border border-stone-200 p-2.5 rounded-xl">
                      <span className="text-[10px] text-stone-400 block font-bold">Gastronomy</span>
                      <span className="font-mono font-black text-sm text-[#F59E0B]">{culinaryScore}%</span>
                    </div>
                    <div className="bg-white border border-stone-200 p-2.5 rounded-xl">
                      <span className="text-[10px] text-stone-400 block font-bold">Heritage</span>
                      <span className="font-mono font-black text-sm text-[#10B981]">{cultureScore}%</span>
                    </div>
                    <div className="bg-white border border-stone-200 p-2.5 rounded-xl">
                      <span className="text-[10px] text-stone-400 block font-bold">Rhythm</span>
                      <span className="font-mono font-black text-sm text-[#8B5CF6] capitalize">{rhythm}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep('archetype')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Recalibrate DNA</span>
                  </button>

                  {(onClose || onCancel) && (
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="bg-[#2D241E] hover:bg-black text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Apply & Return to Scrapbook
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleDismiss();
        }}
      >
        {modalBody}
      </div>
    );
  }

  return modalBody;
};
