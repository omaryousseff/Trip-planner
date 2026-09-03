import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Map as MapIcon, 
  Calendar, 
  BookOpen, 
  User, 
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface BottomNavBarProps {
  activeTab: NavigationTab;
  onChangeTab: (tab: NavigationTab) => void;
  journalBadgeCount?: number;
  isTodayModeActive?: boolean;
  onToggleTodayMode?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  journalBadgeCount = 0,
  isTodayModeActive = false,
  onToggleTodayMode,
}) => {
  const tabs: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }> = [
    { id: 'home', label: 'Home', icon: Home, accentColor: '#FF7A59' },
    { id: 'map', label: 'Map', icon: MapIcon, accentColor: '#4ECDC4' },
    { id: 'plan', label: 'Plan', icon: Calendar, accentColor: '#FFD93D' },
    { id: 'journal', label: 'Journal', icon: BookOpen, accentColor: '#A29BFE' },
    { id: 'profile', label: 'Profile', icon: User, accentColor: '#F59E0B' },
  ];

  return (
    <nav aria-label="Bottom Navigation" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-lg">
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border-3 border-[#2D241E] rounded-full px-2 sm:px-3 py-2 shadow-2xl flex items-center justify-between relative">
        {/* Leather/stitched journal edge indicator */}
        <div className="absolute inset-x-4 top-0.5 h-[1.5px] border-t border-dashed border-[#DFB277]/60 pointer-events-none" />

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                triggerHaptic('light');
                onChangeTab(tab.id);
              }}
              className={`relative flex-1 py-1.5 px-2 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive ? 'text-[#2D241E]' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {/* Active spring pill indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#FAF4EA] border border-[#EFE5D8] rounded-full shadow-inner -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#FF7A59]' : ''}`} />
                {tab.id === 'journal' && journalBadgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#FF7A59] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {journalBadgeCount}
                  </span>
                )}
              </div>

              <span className={`text-[10px] tracking-tight font-black mt-0.5 ${isActive ? 'text-[#2D241E]' : 'text-stone-500'}`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
