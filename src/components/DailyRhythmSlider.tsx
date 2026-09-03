import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Clock, Sparkles, Navigation, CheckCircle2, RotateCcw } from 'lucide-react';
import { TravelPace } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { WashiTape } from './ScrapbookElements';

interface DailyRhythmSliderProps {
  pace: TravelPace;
  morningTime: string; // e.g. "09:00 AM"
  eveningTime: string; // e.g. "10:00 PM"
  onChange: (morningTime: string, eveningTime: string) => void;
}

// Helper: Convert "09:00 AM" or "10:30 PM" to decimal hour (6.0 to 24.0)
const parseTimeToDecimal = (timeStr: string): number => {
  if (!timeStr) return 9.0;
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return 9.0;
  const [hStr, mStr] = parts[0].split(':');
  let hour = parseInt(hStr, 10) || 9;
  const minute = parseInt(mStr, 10) || 0;
  const isPM = parts[1].toUpperCase() === 'PM';

  if (isPM && hour < 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return hour + minute / 60;
};

// Helper: Convert decimal hour to formatted "09:00 AM"
const formatDecimalToTime = (dec: number): string => {
  // Round to nearest 15 minutes (0.25)
  const rounded = Math.round(dec * 4) / 4;
  let totalMinutes = Math.round(rounded * 60);
  if (totalMinutes >= 24 * 60) totalMinutes = 23 * 60 + 45;

  let hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour >= 12 ? 'PM' : 'AM';

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  const hPad = hour.toString().padStart(2, '0');
  const mPad = minute.toString().padStart(2, '0');
  return `${hPad}:${mPad} ${period}`;
};

export const DailyRhythmSlider: React.FC<DailyRhythmSliderProps> = ({
  pace,
  morningTime,
  eveningTime,
  onChange,
}) => {
  // Track min is 6:00 AM (6.0) and max is 12:00 Midnight (24.0)
  const TRACK_MIN = 6.0;
  const TRACK_MAX = 24.0;
  const TRACK_SPAN = TRACK_MAX - TRACK_MIN; // 18 hours

  // Current values
  const morningVal = parseTimeToDecimal(morningTime || '09:00 AM');
  const eveningVal = parseTimeToDecimal(eveningTime || '10:00 PM');

  const [isDraggingSun, setIsDraggingSun] = useState(false);
  const [isDraggingMoon, setIsDraggingMoon] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Dynamic Defaults based on Travel Pace:
  // Relaxed -> 10:30 AM departure, 08:30 PM return
  // Balanced -> 09:00 AM departure, 09:30 PM return
  // Fast -> 08:00 AM departure, 10:30 PM return
  const prevPaceRef = useRef<TravelPace>(pace);

  useEffect(() => {
    if (prevPaceRef.current !== pace) {
      prevPaceRef.current = pace;
      let newMorning = '09:00 AM';
      let newEvening = '09:30 PM';

      if (pace === 'Relaxed') {
        newMorning = '10:30 AM';
        newEvening = '08:30 PM';
      } else if (pace === 'Fast') {
        newMorning = '08:00 AM';
        newEvening = '10:30 PM';
      } else {
        newMorning = '09:00 AM';
        newEvening = '09:30 PM';
      }

      onChange(newMorning, newEvening);
    }
  }, [pace, onChange]);

  // Convert decimal to percentage along track
  const getPercent = (val: number) => {
    const clamped = Math.max(TRACK_MIN, Math.min(TRACK_MAX, val));
    return ((clamped - TRACK_MIN) / TRACK_SPAN) * 100;
  };

  const sunPercent = getPercent(morningVal);
  const moonPercent = getPercent(eveningVal);

  // Hours of active exploration
  const totalExploringHours = Math.max(1, Math.round((eveningVal - morningVal) * 10) / 10);

  // Mouse / Touch drag logic on slider track
  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const ratio = clickX / rect.width;
      const dec = TRACK_MIN + ratio * TRACK_SPAN;

      // Snap to 15 min steps
      const snapped = Math.round(dec * 4) / 4;

      if (isDraggingSun) {
        // Morning Sun handle bounded between 06:00 AM (6.0) and min(eveningVal - 2, 12.0)
        const maxMorning = Math.min(12.0, eveningVal - 2);
        const clampedSun = Math.max(6.0, Math.min(maxMorning, snapped));
        const newSunTime = formatDecimalToTime(clampedSun);
        if (newSunTime !== morningTime) {
          triggerHaptic('light');
          onChange(newSunTime, eveningTime);
        }
      } else if (isDraggingMoon) {
        // Evening Moon handle bounded between max(morningVal + 2, 18.0) and 24.0
        const minEvening = Math.max(18.0, morningVal + 2);
        const clampedMoon = Math.max(minEvening, Math.min(24.0, snapped));
        const newMoonTime = formatDecimalToTime(clampedMoon);
        if (newMoonTime !== eveningTime) {
          triggerHaptic('light');
          onChange(morningTime, newMoonTime);
        }
      }
    },
    [isDraggingSun, isDraggingMoon, morningVal, eveningVal, morningTime, eveningTime, onChange]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingSun || isDraggingMoon) {
        handlePointerMove(e.clientX);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingSun || isDraggingMoon) {
        handlePointerMove(e.touches[0].clientX);
      }
    };
    const onEnd = () => {
      setIsDraggingSun(false);
      setIsDraggingMoon(false);
    };

    if (isDraggingSun || isDraggingMoon) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDraggingSun, isDraggingMoon, handlePointerMove]);

  // Quick preset helper
  const applyPresetRhythm = (mTime: string, eTime: string) => {
    triggerHaptic('medium');
    onChange(mTime, eTime);
  };

  return (
    <div className="space-y-4">
      {/* ── THE SUN & MOON DIAL CARD ── */}
      <div className="cozy-card p-5 sm:p-7 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#F59E0B]">✦</span>
            <h3 className="text-xs sm:text-sm font-black text-[#3E3025] tracking-wider uppercase">
              THE DAILY RHYTHM SLIDER (SUN &amp; MOON DIAL)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#B45309] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A] shadow-2xs inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{totalExploringHours} hrs Exploring / Day</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-500 font-medium">
          Drag the glowing <strong>Sun</strong> for your morning departure, and the <strong>Moon</strong> for your evening return.
        </p>

        {/* Dial Slider Track Container */}
        <div className="pt-8 pb-6 px-4 select-none">
          <div
            ref={trackRef}
            className="relative h-4 w-full rounded-full cursor-pointer shadow-inner"
            style={{
              background: `linear-gradient(to right, #FDE68A 0%, #F59E0B 20%, #38BDF8 45%, #F97316 75%, #4338CA 90%, #1E1B4B 100%)`,
            }}
          >
            {/* Active Range Highlight Between Sun & Moon */}
            <div
              className="absolute top-0 bottom-0 bg-white/35 backdrop-blur-2xs rounded-full pointer-events-none border-t border-b border-white/60"
              style={{
                left: `${sunPercent}%`,
                width: `${Math.max(0, moonPercent - sunPercent)}%`,
              }}
            />

            {/* Morning Sun Handle */}
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDraggingSun(true);
                triggerHaptic('medium');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsDraggingSun(true);
                triggerHaptic('medium');
              }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 cursor-grab active:cursor-grabbing focus:outline-none group"
              style={{ left: `${sunPercent}%` }}
            >
              {/* Floating Tooltip Above Sun */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-[#B45309] text-white px-2.5 py-0.5 rounded-full text-[11px] font-black whitespace-nowrap shadow-md border border-[#FDE68A]">
                  ☀️ {morningTime}
                </div>
                <div className="w-2 h-2 bg-[#B45309] transform rotate-45 -mt-1" />
              </div>

              {/* Sun Orb Graphic */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F59E0B] via-[#FBBF24] to-[#FEF08A] p-1.5 shadow-xl border-2 border-white ring-3 ring-[#F59E0B]/50 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                <Sun className="w-5 h-5 text-[#78350F] stroke-[2.5]" />
              </div>
            </div>

            {/* Evening Moon Handle */}
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDraggingMoon(true);
                triggerHaptic('medium');
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setIsDraggingMoon(true);
                triggerHaptic('medium');
              }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 cursor-grab active:cursor-grabbing focus:outline-none group"
              style={{ left: `${moonPercent}%` }}
            >
              {/* Floating Tooltip Above Moon */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-[#1E1B4B] text-white px-2.5 py-0.5 rounded-full text-[11px] font-black whitespace-nowrap shadow-md border border-[#A5B4FC]">
                  🌙 {eveningTime}
                </div>
                <div className="w-2 h-2 bg-[#1E1B4B] transform rotate-45 -mt-1" />
              </div>

              {/* Moon Orb Graphic */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E1B4B] via-[#312E81] to-[#6366F1] p-1.5 shadow-xl border-2 border-white ring-3 ring-[#4338CA]/50 flex items-center justify-center transform group-hover:scale-115 transition-transform">
                <Moon className="w-5 h-5 text-[#E0E7FF] stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Dial Milestones / Labels */}
          <div className="flex items-center justify-between text-[10px] font-mono font-black text-stone-500 pt-3 px-1">
            <span>06:00 AM (Dawn)</span>
            <span>12:00 PM (Noon)</span>
            <span>06:00 PM (Sunset)</span>
            <span>12:00 AM (Night)</span>
          </div>
        </div>

        {/* Quick Rhythm Presets aligned with Travel Pace */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#DFB277]/30">
          <span className="text-[11px] font-bold text-stone-500">Pace sync &amp; rhythm presets:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { label: '☕ Early Bird (08:00 AM - 09:30 PM)', m: '08:00 AM', e: '09:30 PM' },
              { label: '🥐 Balanced (09:00 AM - 10:00 PM)', m: '09:00 AM', e: '10:00 PM' },
              { label: '🥞 Slow Morning (10:30 AM - 08:30 PM)', m: '10:30 AM', e: '08:30 PM' },
              { label: '✨ Night Owl (10:00 AM - 11:30 PM)', m: '10:00 AM', e: '11:30 PM' },
            ].map((preset) => {
              const isActive = morningTime === preset.m && eveningTime === preset.e;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPresetRhythm(preset.m, preset.e)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#3D291F] text-white border-[#3D291F] shadow-xs'
                      : 'bg-[#FFFDF7] hover:bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── HANDWRITTEN CONFIRMATION STICKY NOTE ── */}
      <div className="relative pt-2">
        {/* Tilted washi tape on top of sticky note */}
        <div className="absolute top-0 left-12 z-20">
          <WashiTape color="sage" width={85} rotate={-3} />
        </div>

        {/* Yellow Scribbled Sticky Note */}
        <div className="relative bg-[#FEFCE8] p-4 sm:p-5 rounded-2xl shadow-md border border-[#FDE047] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#854D0E] font-mono tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#CA8A04]" />
                <span>CONFIRMED DAILY RHYTHM</span>
              </div>
              <p className="font-handwritten text-2xl sm:text-3xl font-bold text-[#422006] leading-snug">
                &ldquo;Out the door by {morningTime}, back to base at {eveningTime}.&rdquo;
              </p>
              <div className="text-xs text-[#713F12] font-medium flex items-center gap-1.5 pt-0.5">
                <Navigation className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                <span>AI will schedule transit from the final evening activity so you walk through your hotel door right on time!</span>
              </div>
            </div>

            <div className="shrink-0 text-right hidden sm:block">
              <div className="text-[10px] font-mono font-bold uppercase text-[#A16207]">Transit Buffer</div>
              <div className="text-xs font-black text-[#713F12]">Built-in ~45m</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
