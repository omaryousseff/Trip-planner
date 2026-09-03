import React from 'react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils/haptics';

// --- WASHI TAPE ---
interface WashiTapeProps {
  color?: 'coral' | 'mint' | 'gold' | 'lavender' | 'kraft';
  pattern?: 'stripes' | 'dots' | 'solid';
  rotation?: number;
  className?: string;
  width?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  color = 'coral',
  pattern = 'stripes',
  rotation = -2,
  className = '',
  width = 'w-24 sm:w-28',
}) => {
  const colorClasses = {
    coral: 'bg-[#FF7A59]/85 text-[#D94F2B]',
    mint: 'bg-[#4ECDC4]/85 text-[#24827B]',
    gold: 'bg-[#FFD93D]/90 text-[#B8920C]',
    lavender: 'bg-[#C4B5FD]/85 text-[#7C3AED]',
    kraft: 'bg-[#D7BA89]/85 text-[#8C6D41]',
  }[color];

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`h-5 ${width} ${colorClasses} rounded-xs shadow-xs relative overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Tape texture & jagged ends */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: pattern === 'stripes' 
            ? 'repeating-linear-gradient(45deg, currentColor 0, currentColor 2px, transparent 0, transparent 8px)'
            : pattern === 'dots'
            ? 'radial-gradient(circle, currentColor 1px, transparent 1px)'
            : 'none',
          backgroundSize: pattern === 'dots' ? '6px 6px' : 'auto',
        }}
      />
      {/* Translucent tape shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10" />
    </div>
  );
};

// --- PUSH PIN ---
interface PushPinProps {
  color?: 'brass' | 'red' | 'teal';
  className?: string;
}

export const PushPin: React.FC<PushPinProps> = ({
  color = 'brass',
  className = '',
}) => {
  return (
    <div className={`relative inline-block select-none pointer-events-none ${className}`}>
      {/* Pin head shadow */}
      <div className="absolute top-2.5 left-1 w-4 h-3 bg-black/35 rounded-full blur-[2px] transform rotate-12" />
      
      {/* Pin head */}
      <div className="relative">
        {color === 'brass' && (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE898] via-[#DFB242] to-[#8C6415] shadow-md border border-[#FEE180] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
        )}
        {color === 'red' && (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FF6B6B] via-[#E03131] to-[#991B1B] shadow-md border border-[#FFA8A8] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
        )}
        {color === 'teal' && (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6EE7B7] via-[#0D9488] to-[#115E59] shadow-md border border-[#A7F3D0] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          </div>
        )}
      </div>
    </div>
  );
};

// --- PASSPORT STAMP ---
interface PassportStampProps {
  city: string;
  date?: string;
  label?: string;
  variant?: 'circle' | 'rect' | 'star';
  color?: 'wine' | 'teal' | 'navy' | 'sepia';
  rotation?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PassportStamp: React.FC<PassportStampProps> = ({
  city,
  date = '2026.09',
  label = 'VISITED',
  variant = 'circle',
  color = 'wine',
  rotation = -4,
  className = '',
  size = 'md',
}) => {
  const colorStyle = {
    wine: 'text-[#991B1B] border-[#991B1B]',
    teal: 'text-[#0F766E] border-[#0F766E]',
    navy: 'text-[#1E3A8A] border-[#1E3A8A]',
    sepia: 'text-[#78350F] border-[#78350F]',
  }[color];

  const sizeClasses = {
    sm: 'text-[9px] p-1.5 min-w-[70px]',
    md: 'text-[11px] p-2.5 min-w-[95px]',
    lg: 'text-xs p-3.5 min-w-[120px]',
  }[size];

  if (variant === 'rect') {
    return (
      <div
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`inline-flex flex-col items-center justify-center border-2 border-dashed ${colorStyle} font-mono uppercase tracking-widest font-black rounded-xs select-none pointer-events-none opacity-85 mix-blend-multiply ${sizeClasses} ${className}`}
      >
        <div className="flex items-center gap-1 text-[8px] font-bold">
          <span>★</span>
          <span>PASSPORT CONTROL</span>
          <span>★</span>
        </div>
        <div className="font-extrabold text-sm tracking-tight">{city}</div>
        <div className="text-[9px] font-bold mt-0.5">{date} • {label}</div>
      </div>
    );
  }

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`inline-flex flex-col items-center justify-center border-2 border-double rounded-full ${colorStyle} font-mono uppercase tracking-widest font-black select-none pointer-events-none opacity-85 mix-blend-multiply ${sizeClasses} ${className}`}
    >
      <div className="text-[8px] tracking-normal font-extrabold flex items-center gap-1">
        <span>✈</span> {label} <span>★</span>
      </div>
      <div className="font-black text-xs sm:text-sm tracking-wide">{city}</div>
      <div className="text-[8px] tracking-tighter opacity-80">{date}</div>
    </div>
  );
};

// --- TORN PAPER DIVIDER ---
export const TornPaperEdge: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 16"
        fill="currentColor"
        className={`w-full h-3 sm:h-4 text-[#FBF6EE] ${flip ? 'transform rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <path d="M0,0 L0,12 Q30,16 60,11 Q90,7 120,13 Q150,16 180,9 Q210,6 240,14 Q270,16 300,10 Q330,5 360,12 Q390,16 420,8 Q450,5 480,13 Q510,16 540,10 Q570,7 600,14 Q630,16 660,9 Q690,6 720,13 Q750,16 780,11 Q810,7 840,14 Q870,16 900,9 Q930,5 960,13 Q990,16 1020,10 Q1050,6 1080,13 Q1110,16 1140,9 Q1170,7 1200,12 L1200,0 Z" />
      </svg>
    </div>
  );
};

// --- STAMP CELEBRATION HELPER ---
export const triggerStampCelebration = () => {
  triggerHaptic('success');
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF7A59', '#4ECDC4', '#FFD93D', '#2D241E', '#C4B5FD'],
      ticks: 150,
      gravity: 1.2,
      scalar: 0.8,
    });
  } catch {
    // Graceful fallback
  }
};
