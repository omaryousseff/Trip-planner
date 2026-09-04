import React from 'react';
import { useOnlineStatus } from './useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#2D241E] px-4 py-2 text-xs font-black tracking-wide text-white shadow-lg animate-in slide-in-from-bottom-5">
      <WifiOff className="w-4 h-4 text-[#FF7A59]" />
      OFFLINE MODE
    </div>
  );
};
