import React from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Home, 
  Map, 
  Compass, 
  Bookmark, 
  Sparkles,
  Smartphone,
  Maximize2
} from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  onExitFrame: () => void;
  title?: string;
  activeNavTab?: string;
  onNavTabChange?: (tab: string) => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  onExitFrame,
  title = "Trip Planner",
  activeNavTab = "itinerary",
  onNavTabChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-4 px-2">
      {/* Device Frame Wrapper */}
      <div className="relative w-full max-w-[420px] h-[860px] bg-stone-900 rounded-[50px] p-3 shadow-2xl border-4 border-stone-700/80 ring-1 ring-stone-900/50 flex flex-col">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-40 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
        </div>

        {/* Screen Bezel container */}
        <div className="w-full h-full bg-stone-100 rounded-[40px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-11 bg-[#1A1A1A] text-white px-7 flex items-center justify-between text-xs z-30 shrink-0 font-medium select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile App Bar */}
          <div className="bg-[#FF6B6B] text-white px-4 py-3.5 flex items-center justify-between shadow-xs shrink-0 z-20 border-b-2 border-[#EE5253]">
            <div className="flex items-center gap-2">
              <span className="text-base font-black uppercase tracking-tight truncate max-w-[200px]">{title}</span>
            </div>

            <button
              type="button"
              id="btn-exit-mobile-view"
              onClick={onExitFrame}
              title="Expand to Full Web Layout"
              className="px-2.5 py-1 rounded-xl bg-[#EE5253] hover:bg-[#D63031] text-white text-xs font-black flex items-center gap-1 transition-colors shadow-xs"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wider">Web</span>
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 scrollbar-none bg-[#FFF8F0]">
            {children}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2.5 px-6 flex items-center justify-around z-30 shadow-lg">
            {[
              { id: 'itinerary', label: 'Itinerary', icon: Compass },
              { id: 'transit', label: 'Transit', icon: Map },
              { id: 'preferences', label: 'Plan', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeNavTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onNavTabChange?.(tab.id)}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    isSelected ? 'text-[#FF6B6B] font-black' : 'text-stone-400 hover:text-stone-600 font-bold'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-[#FFE8D6]' : ''}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] tracking-tight uppercase">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Home indicator bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-300 rounded-full z-40 pointer-events-none" />
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-stone-500 flex items-center gap-2">
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile Companion Preview</span>
        <span>•</span>
        <button
          type="button"
          onClick={onExitFrame}
          className="text-teal-700 font-semibold hover:underline"
        >
          Switch to Desktop Wide View
        </button>
      </div>
    </div>
  );
};
