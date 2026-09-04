import React, { useState, useEffect } from 'react';
import { TripPlan, TripPreferences, ScheduleItem, TravelDNA, JournalMemory, NavigationTab } from './types';
import { SAMPLE_TRIPS } from './data/sampleTrips';
import { generateFallbackTripPlan, generateFallbackItem } from './data/fallbackGenerator';
import { PreferenceForm } from './components/PreferenceForm';
import { ScheduleView } from './components/ScheduleView';
import { TripOverviewHeader } from './components/TripOverviewHeader';
import { TransportationGuide } from './components/TransportationGuide';
import { MapView } from './components/MapView';
import { PackingAndPrepCard } from './components/PackingAndPrepCard';
import { SearchGroundingSources } from './components/SearchGroundingSources';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TravelDNAOnboarding, TRAVEL_ARCHETYPES } from './components/TravelDNAOnboarding';
import { CompassAssistant } from './components/CompassAssistant';
import { BottomNavBar } from './components/BottomNavBar';
import { TodayCompanionView } from './components/TodayCompanionView';
import { JournalView } from './components/JournalView';
import { ProfileView } from './components/ProfileView';
import { WashiTape, PushPin, PassportStamp, triggerStampCelebration } from './components/ScrapbookElements';
import { triggerHaptic } from './utils/haptics';
import { getLandmarkPhoto } from './utils/landmarkImages';
import { 
  CuteStarMascot, 
  CozyCompass, 
  CozyCapybara 
} from './components/CozyIllustrations';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  Smartphone, 
  Layers, 
  Train, 
  Luggage, 
  PenTool, 
  Printer, 
  Code2, 
  BookOpen, 
  User, 
  ArrowRight,
  RefreshCw,
  Compass as CompassIcon,
  X
} from 'lucide-react';

const STORAGE_KEY = 'ai_studio_trip_planner_plan';
const DNA_STORAGE_KEY = 'ai_studio_travel_dna';
const MEMORIES_STORAGE_KEY = 'ai_studio_scrapbook_memories';

// Initial sample memories for Tokyo
const INITIAL_MEMORIES: JournalMemory[] = [
  {
    id: 'mem-1',
    dayIndex: 0,
    title: 'Morning Tsukiji Sushi Feast',
    location: 'Tsukiji Outer Market, Tokyo',
    date: 'Day 1 • 09:30 AM',
    userNote: 'Melt-in-your-mouth chutoro tuna and sweet tamagoyaki skewers straight off the grill! Arrived early to beat the rush.',
    photoUrl: 'https://i.pinimg.com/originals/ee/70/06/ee700645073ad37721b1697f37b87d1a.jpg',
    stampCity: 'TSUKIJI',
    stampColor: 'wine',
  },
  {
    id: 'mem-2',
    dayIndex: 0,
    title: 'Incense Blessing at Senso-ji',
    location: 'Asakusa, Tokyo',
    date: 'Day 1 • 02:00 PM',
    userNote: 'Waved incense smoke for good fortune under the giant red Kaminarimon lantern, then got freshly baked melonpan on Nakamise-dori.',
    photoUrl: 'https://i.pinimg.com/originals/e7/83/3e/e7833e2f076215b7f9d5898b43720c6f.jpg',
    stampCity: 'ASAKUSA',
    stampColor: 'teal',
  },
];

export default function App() {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState(false);
  const [navigationTab, setNavigationTab] = useState<NavigationTab>('plan');
  const [regeneratingItemId, setRegeneratingItemId] = useState<string | null>(null);

  // Scrapbook specific state
  const [travelDNA, setTravelDNA] = useState<TravelDNA | null>(null);
  const [isDnaModalOpen, setIsDnaModalOpen] = useState(false);
  const [isTodayMode, setIsTodayMode] = useState(false);
  const [journalMemories, setJournalMemories] = useState<JournalMemory[]>(INITIAL_MEMORIES);
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<{
    item: ScheduleItem;
    photoInfo: any;
  } | null>(null);

  // Load saved plan, Travel DNA, and memories on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(STORAGE_KEY);
      if (savedPlan) {
        setTripPlan(JSON.parse(savedPlan));
      } else {
        setTripPlan(SAMPLE_TRIPS[0]);
      }
    } catch {
      setTripPlan(SAMPLE_TRIPS[0]);
    }

    try {
      const savedDna = localStorage.getItem(DNA_STORAGE_KEY);
      if (savedDna) {
        setTravelDNA(JSON.parse(savedDna));
      } else {
        // Default to The Wandering Flâneur if not yet taken
        setTravelDNA({
          archetype: TRAVEL_ARCHETYPES[0],
          sensoryScores: {
            curiosity: 88,
            culinary: 94,
            culture: 82,
            relaxation: 70,
            spontaneity: 85,
          },
          preferredRhythm: 'balanced',
          passions: ['hidden-alleys', 'street-food', 'photo-walks'],
          collectedStampsCount: 4,
        });
      }
    } catch {
      // Ignore
    }

    try {
      const savedMemories = localStorage.getItem(MEMORIES_STORAGE_KEY);
      if (savedMemories) {
        setJournalMemories(JSON.parse(savedMemories));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Sync plan to localStorage
  useEffect(() => {
    if (tripPlan) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tripPlan));
      } catch (e) {
        console.error('Failed to save plan to localStorage:', e);
      }
    }
  }, [tripPlan]);

  // Sync memories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(journalMemories));
    } catch (e) {
      console.error('Failed to save memories:', e);
    }
  }, [journalMemories]);

  // Loading animation step timer
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // Handle Travel DNA completion
  const handleCompleteDNA = (dna: TravelDNA) => {
    setTravelDNA(dna);
    try {
      localStorage.setItem(DNA_STORAGE_KEY, JSON.stringify(dna));
    } catch {
      // Ignore
    }
    setIsDnaModalOpen(false);
    triggerStampCelebration();
  };

  // Reset scroll position to top whenever switching main navigation tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [navigationTab]);

  const handleGeneratePlan = async (preferences: TripPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${baseUrl}/api/plan/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (response.ok && data.success && data.plan) {
        setTripPlan(data.plan);
        setActiveDayIndex(0);
        setNavigationTab('plan');
      } else {
        console.log('Server returned non-success, activating curated fallback generator:', data?.error || data?.warning);
        const fallback = generateFallbackTripPlan(preferences);
        setTripPlan(fallback);
        setActiveDayIndex(0);
        setNavigationTab('plan');
      }
    } catch (err: any) {
      console.log('Network or server issue, activating curated fallback itinerary:', err);
      try {
        const fallback = generateFallbackTripPlan(preferences);
        setTripPlan(fallback);
        setActiveDayIndex(0);
        setNavigationTab('plan');
      } catch (fallbackErr) {
        setError('Unable to generate trip plan. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = (dayIndex: number, itemId: string) => {
    if (!tripPlan) return;
    const newDays = [...tripPlan.days];
    const day = { ...newDays[dayIndex] };
    let itemCompletedNow = false;
    let completedItemRef: ScheduleItem | null = null;

    day.schedule = day.schedule.map((item) => {
      if (item.id === itemId) {
        itemCompletedNow = !item.completed;
        completedItemRef = item;
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    newDays[dayIndex] = day;
    setTripPlan({ ...tripPlan, days: newDays });

    // If marked completed, also add an automatic scrapbook polaroid memory!
    if (itemCompletedNow && completedItemRef) {
      const photoInfo = getLandmarkPhoto(completedItemRef, tripPlan.destination);
      const newMemory: JournalMemory = {
        id: `auto-${Date.now()}`,
        dayIndex,
        itemId,
        title: (completedItemRef as ScheduleItem).title,
        location: (completedItemRef as ScheduleItem).location || tripPlan.destination,
        date: `Day ${day.dayNumber} • ${(completedItemRef as ScheduleItem).time}`,
        userNote: `Visited ${(completedItemRef as ScheduleItem).title}! ${(completedItemRef as ScheduleItem).description}`,
        photoUrl: photoInfo.url,
        stampCity: tripPlan.destination.split(',')[0].slice(0, 10).toUpperCase(),
        stampColor: 'wine',
      };
      setJournalMemories((prev) => [newMemory, ...prev]);
    }
  };

  // Reorder items via drag-and-drop
  const handleReorderItems = (dayIndex: number, newItems: ScheduleItem[]) => {
    if (!tripPlan) return;
    const newDays = [...tripPlan.days];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      schedule: newItems,
    };
    setTripPlan({ ...tripPlan, days: newDays });
  };

  const handleRegenerateItem = async (dayIndex: number, item: ScheduleItem) => {
    if (!tripPlan) return;
    setRegeneratingItemId(item.id);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${baseUrl}/api/plan/regenerate-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: tripPlan.destination,
          currentItem: item,
          category: item.category,
        }),
      });

      const data = await response.json();
      const resolvedItem = data?.success && data?.item 
        ? data.item 
        : generateFallbackItem(tripPlan.destination, item, item.category);

      const newItem: ScheduleItem = {
        ...resolvedItem,
        id: `item-${Date.now()}`,
        time: item.time,
        timeSlot: item.timeSlot,
        completed: false,
      };

      const newDays = [...tripPlan.days];
      const day = { ...newDays[dayIndex] };
      day.schedule = day.schedule.map((s) => (s.id === item.id ? newItem : s));
      newDays[dayIndex] = day;
      setTripPlan({ ...tripPlan, days: newDays });
    } catch (err) {
      console.log('Regenerate item fallback triggered:', err);
      const fallbackItemData = generateFallbackItem(tripPlan.destination, item, item.category);
      const newItem: ScheduleItem = {
        ...fallbackItemData,
        id: `item-${Date.now()}`,
        time: item.time,
        timeSlot: item.timeSlot,
        completed: false,
      };
      const newDays = [...tripPlan.days];
      const day = { ...newDays[dayIndex] };
      day.schedule = day.schedule.map((s) => (s.id === item.id ? newItem : s));
      newDays[dayIndex] = day;
      setTripPlan({ ...tripPlan, days: newDays });
    } finally {
      setRegeneratingItemId(null);
    }
  };

  const handleUpdateItemPhoto = (
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
  ) => {
    if (!tripPlan) return;
    const updatedDays = tripPlan.days.map((day, dIdx) => {
      if (dIdx !== dayIndex) return day;
      return {
        ...day,
        schedule: day.schedule.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            imageUrl: newPhoto.url,
            photoCaption: newPhoto.caption || item.photoCaption || item.title,
            photoSource: newPhoto.source,
            photoSourceType: newPhoto.sourceType as any,
            officialWebsiteUrl: newPhoto.officialWebsiteUrl || item.officialWebsiteUrl,
            tripAdvisorUrl: newPhoto.tripAdvisorUrl || item.tripAdvisorUrl,
          };
        }),
      };
    });
    setTripPlan({ ...tripPlan, days: updatedDays });
  };

  const handleAddMemory = (memory: JournalMemory) => {
    setJournalMemories((prev) => [memory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    triggerHaptic('light');
    setJournalMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateStartDate = (newStartDate: string) => {
    if (!tripPlan) return;
    const updatedPlan = { ...tripPlan, startDate: newStartDate };
    setTripPlan(updatedPlan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlan));
    } catch {
      // Ignore
    }
  };

  const currentDay = tripPlan?.days[activeDayIndex] || tripPlan?.days[0];

  // RENDER CONTENT ACCORDING TO NAVIGATION TAB
  const renderMainContent = () => {
    // 0. TODAY COMPANION HUD OVERRIDE
    if (isTodayMode && tripPlan) {
      return (
        <TodayCompanionView
          tripPlan={tripPlan}
          activeDayIndex={activeDayIndex}
          onSelectDay={setActiveDayIndex}
          onToggleComplete={handleToggleComplete}
          onOpenPhotoLightbox={(item) => {
            const pInfo = getLandmarkPhoto(item, tripPlan.destination);
            setActivePhotoLightbox({ item, photoInfo: pInfo });
          }}
          onExitTodayMode={() => setIsTodayMode(false)}
        />
      );
    }

    // 1. HOME / SCRAPBOOK COVER & PREFERENCES PLANNER
    if (navigationTab === 'home') {
      return (
        <div className="space-y-8">
          {/* Active Trip Banner if already loaded */}
          {tripPlan && (
            <div className="postcard-card p-5 rounded-3xl relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="absolute -top-3 left-6">
                <WashiTape color="coral" rotation={-2} />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase font-black tracking-wider text-stone-400">
                  CURRENT LOADED SCRAPBOOK
                </span>
                <h3 className="text-2xl font-black text-[#2D241E] font-cozy-serif">
                  {tripPlan.destination} ({tripPlan.durationDays} Days)
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {tripPlan.occasion} • {tripPlan.budget} • {tripPlan.pace}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setNavigationTab('plan');
                  }}
                  className="bg-[#FF7A59] hover:bg-[#E05030] text-white px-4 py-2 rounded-xl text-xs font-black shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Daily Scrapbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Travel DNA Prompt Teaser */}
          <div className="relative bg-[#FFFDF9] border-3 border-[#2D241E] rounded-3xl p-6 shadow-md overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0ED] border-2 border-[#FF7A59] flex items-center justify-center text-2xl shrink-0 shadow-xs">
                {travelDNA?.archetype.badge ? travelDNA.archetype.badge.split(' ')[0] : '🧭'}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-black text-stone-400">
                  YOUR PERSONAL TRAVEL DNA
                </span>
                <h4 className="text-lg font-black text-[#2D241E]">
                  {travelDNA?.archetype.title || 'Unearth Your Travel Identity'}
                </h4>
                <p className="text-xs text-stone-600">
                  {travelDNA?.archetype.tagline || 'Answer 3 sensory questions to calibrate custom pacing and secret spots.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('medium');
                setIsDnaModalOpen(true);
              }}
              className="bg-[#2D241E] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-black shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>{travelDNA ? 'Recalibrate DNA' : 'Discover Travel DNA'}</span>
            </button>
          </div>

          {/* Primary Preferences Form */}
          <PreferenceForm
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            onSelectSample={() => {
              setTripPlan(SAMPLE_TRIPS[0]);
              setActiveDayIndex(0);
              setNavigationTab('plan');
            }}
          />
        </div>
      );
    }

    // If other tabs are selected without a plan, prompt to plan
    if (!tripPlan) {
      return (
        <div className="space-y-6">
          <PreferenceForm
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            onSelectSample={() => {
              setTripPlan(SAMPLE_TRIPS[0]);
              setActiveDayIndex(0);
              setNavigationTab('plan');
            }}
          />
        </div>
      );
    }

    // 2. PLAN / ITINERARY: Tactile Drag & Drop Scrapbook with Animated Vertical Timeline
    if (navigationTab === 'plan') {
      return (
        <div className="space-y-8">
          {/* Header Overview Banner with Inked Passport Arrival Stamp */}
          <TripOverviewHeader
            plan={tripPlan}
            onReset={() => setNavigationTab('home')}
            isTodayMode={isTodayMode}
            onToggleTodayMode={() => setIsTodayMode(!isTodayMode)}
            onUpdateStartDate={handleUpdateStartDate}
          />

          {/* Scrapbook Schedule View with Drag-and-Drop and Timelines */}
          <ScheduleView
            days={tripPlan.days}
            destination={tripPlan.destination}
            activeDayIndex={activeDayIndex}
            onSelectDay={setActiveDayIndex}
            onToggleComplete={handleToggleComplete}
            onRegenerateItem={handleRegenerateItem}
            onReorderItems={handleReorderItems}
            regeneratingItemId={regeneratingItemId}
            onUpdateItemPhoto={handleUpdateItemPhoto}
            homeBase={tripPlan.homeBase}
            homeBaseCoords={tripPlan.homeBaseCoords}
            morningDepartureTime={tripPlan.morningDepartureTime}
            eveningReturnTime={tripPlan.eveningReturnTime}
          />

          {/* Transit and Metro Passes Guide */}
          {tripPlan.transportationGuide && (
            <TransportationGuide
              guide={tripPlan.transportationGuide}
              destination={tripPlan.destination}
            />
          )}

          {/* Packing & Prep Scrapbook Card */}
          {tripPlan.packingAndPrepTips && (
            <PackingAndPrepCard
              tips={tripPlan.packingAndPrepTips}
              destination={tripPlan.destination}
            />
          )}

          {/* Official Research Sources Grounding */}
          <SearchGroundingSources sources={tripPlan.sources} />
        </div>
      );
    }

    // 3. MAP: Route Map with Pop-out Polaroids & Moving Vehicle Routes
    if (navigationTab === 'map' && currentDay) {
      return (
        <div className="space-y-8">
          <div className="postcard-card p-5 rounded-3xl relative flex items-center justify-between">
            <div className="absolute -top-3 left-8">
              <WashiTape color="mint" rotation={-2} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-black text-stone-400">
                CARTOGRAPHIC EXPEDITION MAP
              </span>
              <h2 className="text-2xl font-black text-[#2D241E] font-cozy-serif">
                {tripPlan.destination} • Day {currentDay.dayNumber}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {tripPlan.days.map((d, dIdx) => (
                <button
                  key={d.dayNumber}
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setActiveDayIndex(dIdx);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition-all cursor-pointer ${
                    activeDayIndex === dIdx
                      ? 'bg-[#FF7A59] text-white'
                      : 'bg-[#FAF4EA] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  D{d.dayNumber}
                </button>
              ))}
            </div>
          </div>

          <MapView
            items={currentDay.schedule}
            destination={tripPlan.destination}
            dayNumber={currentDay.dayNumber}
          />

          {/* Transit Card */}
          {tripPlan.transportationGuide && (
            <TransportationGuide
              guide={tripPlan.transportationGuide}
              destination={tripPlan.destination}
            />
          )}
        </div>
      );
    }

    // 4. JOURNAL: Scrapbook Memories, Sticky Notes, and Passport Stamps
    if (navigationTab === 'journal') {
      return (
        <JournalView
          tripPlan={tripPlan}
          travelDNA={travelDNA}
          memories={journalMemories}
          onAddMemory={handleAddMemory}
          onDeleteMemory={handleDeleteMemory}
          onOpenPhotoLightbox={(item) => {
            const pInfo = getLandmarkPhoto(item, tripPlan.destination);
            setActivePhotoLightbox({ item, photoInfo: pInfo });
          }}
        />
      );
    }

    // 5. PROFILE: Travel DNA Archetype, Radar, and Voyage Manifest
    if (navigationTab === 'profile') {
      return (
        <ProfileView
          tripPlan={tripPlan}
          travelDNA={travelDNA}
          onOpenDNAOnboarding={() => setIsDnaModalOpen(true)}
          onNewTrip={() => setNavigationTab('home')}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#2D241E] flex flex-col font-sans selection:bg-[#FFE2D6] selection:text-[#782310] relative pb-32">
      {/* GLOBAL COZY HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF4EA]/95 backdrop-blur-md border-b-2 border-[#EFE5D8] px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo with Star Mascot */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => {
              triggerHaptic('light');
              setNavigationTab('home');
            }}
          >
            <CuteStarMascot className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" />
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#2D241E] flex items-center gap-1.5 font-cozy-serif">
                TRAVEL SCRAPBOOK
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#FF7A59] text-white px-2 py-0.5 rounded-full shadow-2xs">
                  DNA
                </span>
              </span>
              <p className="text-[10px] text-stone-500 font-bold hidden sm:block">
                Tactile Journal • Real Photos & Official Sources • Drag & Drop
              </p>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F1E9DC] p-1 rounded-full border border-[#E5DACB]">
            {[
              { id: 'home', label: 'Cover & Plan', icon: PenTool },
              { id: 'plan', label: 'Daily Scrapbook', icon: Calendar },
              { id: 'map', label: 'Route Map', icon: Layers },
              { id: 'journal', label: 'Memories & Stamps', icon: BookOpen },
              { id: 'profile', label: 'Travel DNA', icon: User },
            ].map((nav) => {
              const Icon = nav.icon;
              const isSelected = navigationTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  id={`nav-link-${nav.id}`}
                  onClick={() => {
                    triggerHaptic('light');
                    setNavigationTab(nav.id as NavigationTab);
                    setIsTodayMode(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D241E] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF7A59]" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2">
            <PWAInstallButton />
            {/* Today HUD Toggle */}
            {tripPlan && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  setIsTodayMode(!isTodayMode);
                }}
                className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                  isTodayMode
                    ? 'bg-[#FF7A59] text-white border-[#E05030]'
                    : 'bg-[#FFF8E7] text-[#2D241E] border-[#F3E2B8] hover:bg-[#FFEFC7]'
                }`}
              >
                <CompassIcon className="w-3.5 h-3.5 text-[#FF7A59]" />
                <span className="hidden sm:inline">Today HUD</span>
              </button>
            )}

            {/* Travel DNA Button */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic('medium');
                setIsDnaModalOpen(true);
              }}
              className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-full bg-white text-stone-800 border border-stone-200 hover:bg-[#F4ECE1] transition-colors cursor-pointer"
              title="Calibrate Travel DNA"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span className="hidden sm:inline">Travel DNA</span>
            </button>

            {/* Print / PDF */}
            <button
              type="button"
              id="header-btn-print"
              onClick={() => {
                triggerHaptic('light');
                window.print();
              }}
              className="p-2 rounded-full bg-white hover:bg-[#F4ECE1] text-stone-700 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
              title="Print or Save Scrapbook PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Error Banner */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 px-4 w-full">
          <div className="bg-white border-2 border-[#FF7A59] text-[#782310] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-start gap-3 flex-1 min-w-[240px]">
              <AlertCircle className="w-5 h-5 text-[#FF7A59] shrink-0 mt-0.5" />
              <div>
                <span className="font-black">Notice: </span>
                <span className="font-medium text-stone-700">{error}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setTripPlan(SAMPLE_TRIPS[0]);
                  setNavigationTab('plan');
                }}
                className="bg-[#FFE17D] hover:bg-[#F6D35B] text-[#3D291F] font-black px-3 py-1.5 rounded-full border border-[#DFB277] shadow-xs cursor-pointer"
              >
                Load Sample Itinerary
              </button>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-stone-500 hover:text-stone-800 font-bold px-2 py-1 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal with Stepped Progress */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDF7] rounded-[32px] p-8 max-w-md w-full shadow-2xl border-4 border-[#2D241E] text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFE17D] border-t-[#FF7A59] animate-spin" />
              <Compass className="w-7 h-7 text-[#FF7A59] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#2D241E] font-cozy-serif tracking-tight">
                Binding Your Travel Scrapbook
              </h3>
              <p className="text-xs text-[#FF7A59] font-bold mt-1">
                Curating authentic landmark photos, stated official sources & tactile schedules
              </p>
            </div>

            {/* Stepped Progress Indicators */}
            <div className="space-y-2.5 text-left bg-[#FAF4EA] p-4 rounded-2xl border border-[#EFE5D8] text-xs">
              {[
                '1. Calibrating Travel DNA & destination pacing...',
                '2. Curating authentic landmark photography with stated sources...',
                '3. Crafting sticky-note culinary stops & directions...',
                '4. Assembling tactile polaroid cards & transit routes...',
              ].map((stepText, sIdx) => {
                const isPassed = loadingStep > sIdx;
                const isCurrent = loadingStep === sIdx;
                return (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2.5 ${
                      isPassed
                        ? 'text-[#285A34] font-bold'
                        : isCurrent
                        ? 'text-[#FF7A59] font-black'
                        : 'text-stone-400'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isPassed
                          ? 'bg-[#4ECDC4]'
                          : isCurrent
                          ? 'bg-[#FF7A59] animate-pulse'
                          : 'bg-stone-300'
                      }`}
                    />
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isMobileDeviceView ? (
          <MobileDeviceFrame
            onExitFrame={() => setIsMobileDeviceView(false)}
            title={tripPlan ? tripPlan.destination : 'Trip Planner'}
            activeNavTab={navigationTab === 'plan' ? 'itinerary' : navigationTab === 'map' ? 'transit' : 'preferences'}
            onNavTabChange={(tab) => {
              if (tab === 'itinerary') setNavigationTab('plan');
              else if (tab === 'transit') setNavigationTab('map');
              else if (tab === 'preferences') setNavigationTab('home');
            }}
          >
            {renderMainContent()}
          </MobileDeviceFrame>
        ) : (
          renderMainContent()
        )}
      </main>

      {/* FLOATING CONVERSATIONAL AI COMPANION "PIP" */}
      <CompassAssistant
        tripPlan={tripPlan}
        activeDayIndex={activeDayIndex}
        onOptimizeSchedule={(dIdx) => {
          triggerHaptic('medium');
          triggerStampCelebration();
        }}
      />

      {/* DOCKED BOTTOM 5-TAB NAVIGATION BAR */}
      <BottomNavBar
        activeTab={navigationTab}
        onChangeTab={(tab) => {
          setNavigationTab(tab);
          setIsTodayMode(false);
        }}
        journalBadgeCount={journalMemories.length}
        isTodayModeActive={isTodayMode}
        onToggleTodayMode={() => setIsTodayMode(!isTodayMode)}
      />

      {/* TRAVEL DNA ONBOARDING MODAL */}
      {isDnaModalOpen && (
        <TravelDNAOnboarding
          initialDNA={travelDNA}
          onComplete={handleCompleteDNA}
          onCancel={() => setIsDnaModalOpen(false)}
        />
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {activePhotoLightbox && (
        <PhotoLightboxModal
          item={activePhotoLightbox.item}
          photoInfo={activePhotoLightbox.photoInfo}
          destination={tripPlan?.destination || 'Destination'}
          onClose={() => setActivePhotoLightbox(null)}
          onSaveCustomPhoto={(newPhoto) => {
            handleUpdateItemPhoto(activeDayIndex, activePhotoLightbox.item.id, newPhoto);
          }}
        />
      )}
      
      <OfflineIndicator />
    </div>
  );
}
