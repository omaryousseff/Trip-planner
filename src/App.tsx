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
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  Smartphone, 
  Layers, 
  Train, 
  Luggage,
  RotateCcw
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
  const [activeSection, setActiveSection] = useState<'schedule' | 'transit' | 'map' | 'packing'>('schedule');
  const [regeneratingItemId, setRegeneratingItemId] = useState<string | null>(null);

  // Load initial plan from localStorage or start with Tokyo sample
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTripPlan(parsed);
      } else {
        // Provide the rich Tokyo sample by default so the user immediately experiences the detailed schedule
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

  // Loading step simulation animation
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 3500);
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
        // If server returned non-ok or error, activate rich offline fallback generator
        console.warn("Server returned non-success, activating curated fallback generator:", data.error);
        const fallback = generateFallbackTripPlan(preferences);
        setTripPlan(fallback);
        setActiveDayIndex(0);
        setActiveSection('schedule');
      }
    } catch (err: any) {
      console.warn("Network or server error, falling back to curated itinerary:", err);
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
      console.warn("Regenerate item fallback triggered:", err);
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

  const currentDay = tripPlan?.days[activeDayIndex] || tripPlan?.days[0];

  const renderMainContent = () => {
    if (!tripPlan) {
      return (
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2D2D2D] bg-[#FFD93D] px-4 py-1.5 rounded-full border-b-2 border-[#E5B80B] shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
              AI Powered Trip Architect
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase italic">
              Where will your next journey take you?
            </h1>
            <p className="text-sm sm:text-base text-[#FF6B6B] font-bold mt-2 max-w-xl mx-auto">
              Tell us your occasion, group size, and preferences to receive a minute-by-minute schedule with transport, dining, and sights.
            </p>
          </div>

          <PreferenceForm
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            onSelectSample={() => {
              setTripPlan(SAMPLE_TRIPS[0]);
              setActiveDayIndex(0);
            }}
          />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Header overview banner */}
        <TripOverviewHeader
          plan={tripPlan}
          onReset={() => setTripPlan(null)}
          onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
          isMobileDeviceView={isMobileDeviceView}
          onToggleMobileDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        />

        {/* Section Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border-b-4 border-stone-200 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'schedule', label: 'Detailed Daily Schedule', icon: Calendar },
            { id: 'transit', label: 'Transit & Passes', icon: Train },
            { id: 'map', label: 'Route Map Sequence', icon: Layers },
            { id: 'packing', label: 'Packing Checklist', icon: Luggage },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`section-tab-${tab.id}`}
                onClick={() => setActiveSection(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#FF6B6B] text-white font-black shadow-xs border-b-2 border-[#EE5253]'
                    : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-[#FFF8F0] font-bold'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
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
            />

            {/* In-page Transit Highlights */}
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

        {/* Real-time Google Search Grounding Sources */}
        <SearchGroundingSources
          sources={tripPlan.sources}
          destination={tripPlan.destination}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2D2D2D] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top App Bar with Vibrant Coral Header */}
      <header className="sticky top-0 z-40 bg-[#FF6B6B] border-b-4 border-[#EE5253] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            onClick={() => setTripPlan(SAMPLE_TRIPS[0])}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-[#FF6B6B] shadow-inner font-black">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                Trip Planner
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
                  Vibrant Edition
                </span>
              </span>
              <p className="text-xs text-white/80 font-bold leading-none mt-0.5">
                Detailed Schedules • Transit • Dining • Sights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="header-btn-toggle-mobile"
              onClick={() => setIsMobileDeviceView(!isMobileDeviceView)}
              className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl border transition-all ${
                isMobileDeviceView
                  ? 'bg-white text-[#FF6B6B] border-white shadow-sm'
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isMobileDeviceView ? 'Exit Mobile Frame' : 'Flutter Mobile Frame'}
              </span>
            </button>

            {tripPlan && (
              <button
                type="button"
                id="header-btn-new-plan"
                onClick={() => setTripPlan(null)}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#2D2D2D] bg-[#FFD93D] hover:bg-[#F6C90E] border-b-2 border-[#E5B80B] px-4 py-2 rounded-xl transition-all shadow-sm active:translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>New Trip</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Global Error Banner if any */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <div className="bg-white border-2 border-[#EE5253] border-b-4 text-[#EE5253] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-start gap-3 flex-1 min-w-[240px]">
              <AlertCircle className="w-5 h-5 text-[#EE5253] shrink-0 mt-0.5" />
              <div>
                <span className="font-black">API Limit or Network Notice: </span>
                <span className="font-medium text-stone-700">{error}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setTripPlan(SAMPLE_TRIPS[0]);
                }}
                className="bg-[#FFD93D] hover:bg-[#F6C90E] text-[#2D2D2D] font-black px-3 py-1.5 rounded-xl border border-[#E5B80B] shadow-xs"
              >
                Load Sample Itinerary
              </button>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-stone-500 hover:text-stone-800 font-bold px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFF8F0] rounded-[32px] p-8 max-w-md w-full shadow-2xl border-4 border-[#EE5253] text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-[#FFD93D] border-t-[#FF6B6B] animate-spin" />
              <Compass className="w-7 h-7 text-[#FF6B6B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight">
                Architecting Your Trip
              </h3>
              <p className="text-xs text-[#FF6B6B] font-bold mt-1">
                Grounded with Google Search for live transit, hours & dining
              </p>
            </div>

            {/* Stepped progress indicators */}
            <div className="space-y-2.5 text-left bg-white p-4 rounded-2xl border-b-4 border-gray-200 shadow-sm text-xs">
              {[
                "1. Searching destination transit lines & metro passes...",
                "2. Identifying top-rated food places & local dining...",
                "3. Mapping places & curated activities by neighborhood...",
                "4. Finalizing chronological schedule & timing...",
              ].map((stepText, sIdx) => {
                const isPassed = loadingStep > sIdx;
                const isCurrent = loadingStep === sIdx;
                return (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2.5 ${
                      isPassed
                        ? 'text-[#45B7AF] font-bold'
                        : isCurrent
                        ? 'text-[#FF6B6B] font-black'
                        : 'text-stone-400'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isPassed
                          ? 'bg-[#4ECDC4]'
                          : isCurrent
                          ? 'bg-[#FF6B6B] animate-pulse'
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMobileDeviceView ? (
          <MobileDeviceFrame
            onExitFrame={() => setIsMobileDeviceView(false)}
            title={tripPlan ? tripPlan.destination : "Trip Planner"}
            activeNavTab={activeSection === 'schedule' ? 'itinerary' : activeSection === 'transit' ? 'transit' : 'preferences'}
            onNavTabChange={(tab) => {
              if (tab === 'itinerary') setActiveSection('schedule');
              else if (tab === 'transit') setActiveSection('transit');
              else if (tab === 'preferences') setTripPlan(null);
            }}
          >
            {renderMainContent()}
          </MobileDeviceFrame>
        ) : (
          renderMainContent()
        )}
      </main>

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
