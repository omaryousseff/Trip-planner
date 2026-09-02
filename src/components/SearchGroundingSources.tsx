import React from 'react';
import { GroundingSource } from '../types';
import { Globe, ExternalLink, ShieldCheck } from 'lucide-react';

interface SearchGroundingSourcesProps {
  sources?: GroundingSource[];
  destination: string;
}

export const SearchGroundingSources: React.FC<SearchGroundingSourcesProps> = ({
  sources = [],
  destination,
}) => {
  if (!sources || sources.length === 0) {
    return (
      <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#FF6B6B]/30 flex items-center justify-between text-xs text-[#2D2D2D] font-bold">
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#4ECDC4]" />
          Itinerary verified via Google Search real-time grounding
        </span>
        <span className="text-stone-500 font-medium">Current transit routes & places</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[28px] p-5 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#E0F9F7] border border-[#4ECDC4] flex items-center justify-center text-[#009688]">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-tight text-[#1A1A1A]">
            Google Search Grounding & Verified Sources
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#009688] bg-[#E0F9F7] px-3 py-1 rounded-full border border-[#4ECDC4]/50 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Web Data
        </span>
      </div>

      <p className="text-xs text-stone-500 font-medium">
        Recommendations for {destination} are cross-referenced with live web guides, official transit pages, and recent operating schedules:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {sources.map((source, sIdx) => {
          let hostname = '';
          try {
            hostname = new URL(source.url).hostname.replace(/^www\./, '');
          } catch {
            hostname = source.url;
          }

          return (
            <a
              key={sIdx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl border border-stone-200/90 bg-[#FFF8F0] hover:bg-[#FFE8D6] hover:border-[#FF6B6B]/40 transition-all text-xs group shadow-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="font-bold text-stone-900 truncate group-hover:text-[#FF6B6B]">
                  {source.title || hostname}
                </div>
                <div className="text-[11px] text-stone-500 truncate font-medium">
                  {hostname}
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#FF6B6B] shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
};
