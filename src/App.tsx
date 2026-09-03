import React, { useState, useEffect } from 'react';
import { TripPlan, TripPreferences, ScheduleItem } from './types';
import { SAMPLE_TRIPS } from './data/sampleTrips';
import { generateFallbackTripPlan, generateFallbackItem } from './data/fallbackGenerator';
import { PreferenceForm } from './components/PreferenceForm';
import { ScheduleView } from './components/ScheduleView';
import { TripOverviewHeader } from './components/TripOverviewHeader';
import { TransportationGuide } from './components/TransportationGuide';
import { MapView } from './components/MapView';
import { PackingAndPrepCard } from './components/PackingAndPrepCard';
import { SearchGroundingSources } from './components/SearchGroundingSources';
import { FlutterExportModal } from './components/FlutterExportModal';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
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
  RotateCcw,
  PenTool,
  Download,
  Printer,
  Code2,
  Share2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const STORAGE_KEY = 'ai_studio_trip_planner_plan';

export default function App() {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState(false);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'planner' | 'schedule' | 'transit' | 'map' | 'packing'>('planner');
  const [regeneratingItemId, setRegeneratingItemId] = useState<string | null>(null);

  // Load saved plan from localStorage or start ready for user prompt
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTripPlan(parsed);
      } else {
        // Prepare with Tokyo sample ready in background
        setTripPlan(SAMPLE_TRIPS[0]);
      }
    } catch {
      setTripPlan(SAMPLE_TRIPS[0]);
    }
  }, []);

  // Save to localStorage when plan changes
  useEffect(() => {
    if (tripPlan) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tripPlan));
      } catch (e) {
        console.error("Failed to save plan to localStorage:", e);
      }
    }
  }, [tripPlan]);

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

  const handleGeneratePlan = async (preferences: TripPreferences) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (response.ok && data.success && data.plan) {
        setTripPlan(data.plan);
        setActiveDayIndex(0);
        setActiveSection('schedule');
      } else {
        console.log("Server returned non-success, activating curated fallback generator:", data?.error || data?.warning);
        const fallback = generateFallbackTripPlan(preferences);
        setTripPlan(fallback);
        setActiveDayIndex(0);
        setActiveSection('schedule');
      }
    } catch (err: any) {
      console.log("Network or server issue, activating curated fallback itinerary:", err);
      try {
        const fallback = generateFallbackTripPlan(preferences);
        setTripPlan(fallback);
        setActiveDayIndex(0);
        setActiveSection('schedule');
      } catch (fallbackErr) {
        setError("Unable to generate trip plan. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = (dayIndex: number, itemId: string) => {
    if (!tripPlan) return;
    const newDays = [...tripPlan.days];
    const day = { ...newDays[dayIndex] };
    day.schedule = day.schedule.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    newDays[dayIndex] = day;
    setTripPlan({ ...tripPlan, days: newDays });
  };

  const handleRegenerateItem = async (dayIndex: number, item: ScheduleItem) => {
    if (!tripPlan) return;
    setRegeneratingItemId(item.id);

    try {
      const response = await fetch('/api/plan/regenerate-item', {
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
      console.log("Regenerate item fallback triggered:", err);
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

  // Download iCal (.ics)
  const handleDownloadCalendar = () => {
    if (!tripPlan) return;
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Studio Trip Planner Cozy Edition//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;

    const now = new Date();
    tripPlan.days.forEach((day, dayIdx) => {
      day.schedule.forEach((item) => {
        const itemDate = new Date(now.getTime() + dayIdx * 24 * 60 * 60 * 1000);
        const dateStr = itemDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        icsContent += `BEGIN:VEVENT\nSUMMARY:${item.title} (${tripPlan.destination})\nDESCRIPTION:${item.description}\\nCategory: ${item.category}\\nTips: ${item.tips || ''}\nLOCATION:${item.location || tripPlan.destination}\nDTSTART:${dateStr}\nDTEND:${dateStr}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
      });
    });

    icsContent += `END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${tripPlan.destination.replace(/[^a-z0-9]/gi, '_')}_cozy_trip.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const currentDay = tripPlan?.days[activeDayIndex] || tripPlan?.days[0];

  const renderMainContent = () => {
    // 1. Cozy Planner View matching IMG_0781.png
    if (activeSection === 'planner') {
      return (
        <div className="space-y-6">
          {tripPlan && (
            <div className="bg-[#FFFDF7] border border-[#E9DCCF] rounded-2xl p-3.5 px-5 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4] animate-pulse" />
                <span className="font-medium">Active Itinerary Loaded:</span>
                <span className="font-black text-[#2F241D]">{tripPlan.destination} ({tripPlan.durationDays} Days)</span>
              </div>
              <button
                type="button"
                id="btn-jump-to-schedule"
                onClick={() => setActiveSection('schedule')}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF7A59] hover:text-[#E8502A] transition-colors"
              >
                <span>View Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <PreferenceForm
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            onSelectSample={() => {
              setTripPlan(SAMPLE_TRIPS[0]);
              setActiveDayIndex(0);
              setActiveSection('schedule');
            }}
          />
        </div>
      );
    }

    // If on other sections without plan, prompt to plan
    if (!tripPlan) {
      return (
        <PreferenceForm
          onSubmit={handleGeneratePlan}
          isLoading={isLoading}
          onSelectSample={() => {
            setTripPlan(SAMPLE_TRIPS[0]);
            setActiveDayIndex(0);
            setActiveSection('schedule');
          }}
        />
      );
    }

    // 2. Schedule View with Landmark Photos & Directions
    return (
      <div className="space-y-8">
        {/* Header overview banner */}
        <TripOverviewHeader
          plan={tripPlan}
          onReset={() => setActiveSection('planner')}
          onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
          isMobileDeviceView={isMobileDeviceView}
          onToggleMobileDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        />

        {/* Feature Sub-Navigation Tabs */}
        <div className="cozy-card p-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'schedule', label: 'Daily Schedule & Landmark Photos', icon: Calendar },
            { id: 'transit', label: 'Transit & Metro Passes', icon: Train },
            { id: 'map', label: 'Route Map Sequence', icon: Layers },
            { id: 'packing', label: 'Packing & Preparation', icon: Luggage },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`subtab-${tab.id}`}
                onClick={() => setActiveSection(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF7A59] text-white font-black shadow-xs'
                    : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-[#F4ECE1] font-bold'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section Content */}
        {activeSection === 'schedule' && (
          <div className="space-y-8">
            <ScheduleView
              days={tripPlan.days}
              destination={tripPlan.destination}
              activeDayIndex={activeDayIndex}
              onSelectDay={setActiveDayIndex}
              onToggleComplete={handleToggleComplete}
              onRegenerateItem={handleRegenerateItem}
              regeneratingItemId={regeneratingItemId}
              onUpdateItemPhoto={handleUpdateItemPhoto}
            />

            {/* In-page Transit Guide */}
            {tripPlan.transportationGuide && (
              <TransportationGuide
                guide={tripPlan.transportationGuide}
                destination={tripPlan.destination}
              />
            )}
          </div>
        )}

        {activeSection === 'transit' && tripPlan.transportationGuide && (
          <TransportationGuide
            guide={tripPlan.transportationGuide}
            destination={tripPlan.destination}
          />
        )}

        {activeSection === 'map' && currentDay && (
          <MapView
            items={currentDay.schedule}
            destination={tripPlan.destination}
            dayNumber={currentDay.dayNumber}
          />
        )}

        {activeSection === 'packing' && (
          <PackingAndPrepCard
            tips={tripPlan.packingAndPrepTips}
            destination={tripPlan.destination}
          />
        )}

        {/* Google Grounding Sources */}
        <SearchGroundingSources sources={tripPlan.sources} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#2D2723] flex flex-col font-sans selection:bg-[#FFE2D6] selection:text-[#782310]">
      {/* GLOBAL COZY HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF4EA]/95 backdrop-blur-md border-b border-[#EFE5D8] px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo with Star Mascot */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveSection('planner')}
          >
            <CuteStarMascot className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" />
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#3A281E] flex items-center gap-1.5 font-cozy-serif">
                TRIP PLANNER
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#FFE2D6] text-[#782310] px-2 py-0.5 rounded-full border border-[#FFC2AF]">
                  COZY
                </span>
              </span>
              <p className="text-[10px] text-stone-500 font-bold hidden sm:block">
                Original Photos from Official Sites & TripAdvisor • Stated Sources
              </p>
            </div>
          </div>

          {/* Navigation Bar Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F1E9DC] p-1 rounded-full border border-[#E5DACB]">
            {[
              { id: 'planner', label: 'Cozy Planner', icon: PenTool },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'map', label: 'Route Map', icon: Layers },
              { id: 'transit', label: 'Transit Guide', icon: Train },
              { id: 'packing', label: 'Packing & Prep', icon: Luggage },
            ].map((nav) => {
              const Icon = nav.icon;
              const isSelected = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  id={`nav-link-${nav.id}`}
                  onClick={() => setActiveSection(nav.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#2D241E] shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
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
            {/* Mobile Device View Frame toggle */}
            <button
              type="button"
              id="header-btn-toggle-mobile"
              onClick={() => setIsMobileDeviceView(!isMobileDeviceView)}
              className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isMobileDeviceView
                  ? 'bg-[#FF7A59] text-white border-[#FF6040] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-[#F4ECE1]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span className="hidden sm:inline">
                {isMobileDeviceView ? 'Exit Mobile' : 'Phone View'}
              </span>
            </button>

            {/* Export Flutter Code */}
            {tripPlan && (
              <button
                type="button"
                id="header-btn-flutter"
                onClick={() => setIsFlutterModalOpen(true)}
                className="hidden lg:inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-full bg-white text-stone-700 border border-stone-200 hover:bg-[#F4ECE1] transition-colors cursor-pointer"
                title="Export Flutter Mobile App Code"
              >
                <Code2 className="w-3.5 h-3.5 text-[#4ECDC4]" />
                <span>Flutter</span>
              </button>
            )}

            {/* Add to Calendar (.ics) */}
            {tripPlan && (
              <button
                type="button"
                id="header-btn-calendar"
                onClick={handleDownloadCalendar}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-full bg-[#FFE17D] hover:bg-[#F6D35B] text-[#3D291F] border border-[#DFB277] shadow-2xs transition-colors cursor-pointer"
                title="Download iCal (.ics) Calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-[#3D291F]" />
                <span>.ics</span>
              </button>
            )}

            {/* Print / PDF */}
            <button
              type="button"
              id="header-btn-print"
              onClick={() => window.print()}
              className="p-2 rounded-full bg-white hover:bg-[#F4ECE1] text-stone-700 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* New Trip Button */}
            <button
              type="button"
              id="header-btn-new-plan"
              onClick={() => setActiveSection('planner')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-[#FFA085] via-[#FF7A59] to-[#FF6B6B] hover:opacity-90 px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFE17D]" />
              <span>Planner</span>
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
                  setActiveSection('schedule');
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
          <div className="bg-[#FFFDF7] rounded-[32px] p-8 max-w-md w-full shadow-2xl border-2 border-[#FF7A59] text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFE17D] border-t-[#FF7A59] animate-spin" />
              <Compass className="w-7 h-7 text-[#FF7A59] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#2F241D] font-cozy-serif tracking-tight">
                Crafting Your Cozy Journey
              </h3>
              <p className="text-xs text-[#FF7A59] font-bold mt-1">
                Fetching authentic landmark photos, Google transit lines & food spots
              </p>
            </div>

            {/* Stepped Progress Indicators */}
            <div className="space-y-2.5 text-left bg-[#FAF4EA] p-4 rounded-2xl border border-[#EFE5D8] text-xs">
              {[
                "1. Searching destination transit lines & metro passes...",
                "2. Identifying top-rated dining & neighborhood spots...",
                "3. Resolving authentic Google & Wikimedia landmark photography...",
                "4. Finalizing chronological schedule & walking routes...",
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
            title={tripPlan ? tripPlan.destination : "Trip Planner"}
            activeNavTab={activeSection === 'schedule' ? 'itinerary' : activeSection === 'transit' ? 'transit' : 'preferences'}
            onNavTabChange={(tab) => {
              if (tab === 'itinerary') setActiveSection('schedule');
              else if (tab === 'transit') setActiveSection('transit');
              else if (tab === 'preferences') setActiveSection('planner');
            }}
          >
            {renderMainContent()}
          </MobileDeviceFrame>
        ) : (
          renderMainContent()
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EFE5D8] bg-[#FAF4EA] py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-600 font-bold">
            <CuteStarMascot className="w-5 h-5" />
            <span>Trip Planner (Cozy Edition)</span>
          </div>
          <p className="text-[11px] text-stone-400 font-medium">
            Hand-crafted travel schedules • Original photos with stated sources • Official place & TripAdvisor attributions
          </p>
        </div>
      </footer>

      {/* Flutter Code Modal */}
      {tripPlan && (
        <FlutterExportModal
          plan={tripPlan}
          isOpen={isFlutterModalOpen}
          onClose={() => setIsFlutterModalOpen(false)}
        />
      )}
    </div>
  );
}
