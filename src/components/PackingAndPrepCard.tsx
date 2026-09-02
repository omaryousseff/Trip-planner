import React, { useState } from 'react';
import { 
  Luggage, 
  CheckSquare, 
  Square, 
  Sparkles, 
  ShieldAlert, 
  FileText 
} from 'lucide-react';

interface PackingAndPrepCardProps {
  tips: string[];
  destination: string;
}

export const PackingAndPrepCard: React.FC<PackingAndPrepCardProps> = ({
  tips,
  destination,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!tips || tips.length === 0) return null;

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#FFF8F0] border-2 border-[#FF6B6B] flex items-center justify-center text-[#FF6B6B] shadow-xs">
            <Luggage className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-[#1A1A1A]">
              Packing Checklist & Local Preparation
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Tailored for {destination} weather and activities
            </p>
          </div>
        </div>

        <span className="text-xs font-black text-[#2D2D2D] bg-[#FFD93D] px-3 py-1 rounded-full border-b-2 border-[#E5B80B]">
          {completedCount} / {tips.length} Packed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {tips.map((tip, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isChecked
                  ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                  : 'bg-[#FFF8F0] border-stone-200/90 hover:border-[#FF6B6B]/50 text-stone-800 shadow-xs'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-[#FF6B6B] focus:outline-none shrink-0"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-[#4ECDC4]" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
              </button>
              <span className="text-xs leading-relaxed font-bold select-none">
                {tip}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
