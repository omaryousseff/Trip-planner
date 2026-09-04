import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-full bg-[#FF7A59] px-3 py-1.5 text-xs font-black tracking-wide text-white shadow-sm hover:bg-[#e06749] transition active:scale-95"
      >
        <Download className="w-3.5 h-3.5" />
        INSTALL APP
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-full border-2 border-[#EFE5D8] bg-white px-3 py-1.5 text-xs font-black tracking-wide text-[#2D241E] shadow-sm hover:bg-[#FAF4EA] transition active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          INSTALL
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm rounded-[24px] bg-[#FAF5EC] p-6 shadow-xl border-4 border-[#2D241E]">
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-black/5 text-[#2D241E]"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-black text-[#2D241E] mb-4">Install Scrapbook</h3>
              <div className="space-y-4 text-sm font-medium text-[#5C5046]">
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EFE5D8] font-black text-[#2D241E]">1</span>
                  <span>Tap the <strong>Share</strong> button in your Safari toolbar at the bottom of the screen.</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EFE5D8] font-black text-[#2D241E]">2</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                </p>
              </div>
              
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-8 w-full rounded-full bg-[#2D241E] py-3 text-sm font-black text-white hover:bg-[#40352D] active:scale-95 transition"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
