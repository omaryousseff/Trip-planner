import React from 'react';
import { TripPlan } from '../types';
import { 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  CloudSun, 
  Share2, 
  Download, 
  Smartphone, 
  Code2, 
  Printer, 
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface TripOverviewHeaderProps {
  plan: TripPlan;
  onReset: () => void;
  onOpenFlutterModal: () => void;
  isMobileDeviceView: boolean;
  onToggleMobileDeviceView: () => void;
}

export const TripOverviewHeader: React.FC<TripOverviewHeaderProps> = ({
  plan,
  onReset,
  onOpenFlutterModal,
  isMobileDeviceView,
  onToggleMobileDeviceView,
}) => {
  // Generate iCal (.ics) download for the itinerary
  const downloadCalendarFile = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Studio Trip Planner//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;

    const now = new Date();
    plan.days.forEach((day, dayIdx) => {
      day.schedule.forEach((item, itemIdx) => {
        const itemDate = new Date(now.getTime() + dayIdx * 24 * 60 * 60 * 1000);
        const dateStr = itemDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        icsContent += `BEGIN:VEVENT\nSUMMARY:${item.title} (${plan.destination})\nDESCRIPTION:${item.description}\\nCategory: ${item.category}\\nTips: ${item.tips || ''}\nLOCATION:${item.location || plan.destination}\nDTSTART:${dateStr}\nDTEND:${dateStr}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
      });
    });

    icsContent += `END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${plan.destination.replace(/[^a-z0-9]/gi, '_')}_trip.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm space-y-6">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-5">
        <button
          type="button"
          id="btn-back-to-preferences"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#2D2D2D] bg-[#FFF8F0] hover:bg-[#FFE8D6] border border-[#FF6B6B]/30 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#FF6B6B]" />
          <span>New Itinerary</span>
        </button>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Mobile frame toggle */}
          <button
            type="button"
            id="btn-toggle-mobile-frame"
            onClick={onToggleMobileDeviceView}
            className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl border transition-all ${
              isMobileDeviceView
                ? 'bg-[#FF6B6B] text-white border-[#EE5253] border-b-2 shadow-xs'
                : 'bg-[#FFF8F0] text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isMobileDeviceView ? 'Exit Mobile Frame' : 'Flutter Mobile Frame'}</span>
          </button>

          {/* Export Flutter Code */}
          <button
            type="button"
            id="btn-export-flutter-code"
            onClick={onOpenFlutterModal}
            className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#4ECDC4] hover:bg-[#45B7AF] border-b-2 border-[#45B7AF] px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Flutter Dart Code</span>
          </button>

          {/* Add to Calendar (.ics) */}
          <button
            type="button"
            id="btn-download-ics"
            onClick={downloadCalendarFile}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#2D2D2D] bg-[#FFD93D] hover:bg-[#F6C90E] border-b-2 border-[#E5B80B] px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to</span> Calendar (.ics)
          </button>

          {/* Print / Save PDF */}
          <button
            type="button"
            id="btn-print-itinerary"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#A29BFE] hover:bg-[#8C7AE6] border-b-2 border-[#6C5CE7] px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Destination Hero Block */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#FF6B6B] px-3 py-1 rounded-full border border-[#EE5253] shadow-xs">
            {plan.occasion}
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#4ECDC4] px-3 py-1 rounded-full border border-[#45B7AF] shadow-xs">
            {plan.durationDays} Days / {plan.durationDays - 1} Nights
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#2D2D2D] bg-[#FFD93D] px-3 py-1 rounded-full border border-[#E5B80B] shadow-xs">
            {plan.travelersCount} Travelers ({plan.travelerType})
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#A29BFE] px-3 py-1 rounded-full border border-[#6C5CE7] shadow-xs">
            {plan.budget} Budget • {plan.pace} Pace
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
          {plan.destination}
        </h1>

        <p className="text-sm md:text-base text-stone-700 font-medium leading-relaxed max-w-4xl">
          {plan.overview}
        </p>

        {/* Quota Exceeded / Fallback Notice Banner */}
        {plan.quotaNotice && (
          <div className="bg-[#FFF8F0] border-2 border-[#FFD93D] border-b-4 border-b-[#E5B80B] rounded-2xl p-4 flex items-start gap-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-[#FFD93D] text-[#2D2D2D] flex items-center justify-center shrink-0 font-black">
              <Sparkles className="w-4 h-4 text-[#D35400]" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-black uppercase tracking-tight text-[#1A1A1A]">
                Curated Itinerary Mode (Gemini Free Quota Notice)
              </div>
              <p className="text-xs text-stone-700 font-medium leading-relaxed mt-0.5">
                {plan.quotaNotice}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Weather & Budget Highlight Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
        {/* Weather */}
        {plan.weatherSummary && (
          <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#FF6B6B]/20 border-b-4 border-b-[#FF6B6B]/40 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFD93D] text-[#2D2D2D] flex items-center justify-center shrink-0 shadow-xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-[#1A1A1A] uppercase tracking-tight">Weather & Seasonal Advice</div>
              <div className="text-xs text-stone-700 mt-0.5 leading-snug font-medium">
                {plan.weatherSummary}
              </div>
            </div>
          </div>
        )}

        {/* Budget estimate */}
        {plan.currencyAndCostEstimate && (
          <div className="bg-[#E0F9F7] rounded-2xl p-4 border border-[#4ECDC4]/30 border-b-4 border-b-[#4ECDC4] flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4ECDC4] text-white flex items-center justify-center shrink-0 shadow-xs">
              <DollarSign className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="text-xs font-black text-[#1A1A1A] uppercase tracking-tight">
                Estimated Total: {plan.currencyAndCostEstimate.estimatedTotalPerPerson}
              </div>
              <div className="text-xs text-stone-700 mt-0.5 leading-snug font-medium">
                {plan.currencyAndCostEstimate.breakdown}
              </div>
            </div>
          </div>
        )}

        {/* Packing & Prep tip count */}
        {plan.packingAndPrepTips && plan.packingAndPrepTips.length > 0 && (
          <div className="bg-[#F3F0FF] rounded-2xl p-4 border border-[#A29BFE]/30 border-b-4 border-b-[#A29BFE] flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-[#A29BFE] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-[#1A1A1A] uppercase tracking-tight">
                {plan.packingAndPrepTips.length} Essential Preparation Tips
              </div>
              <div className="text-xs text-stone-700 mt-0.5 leading-snug truncate font-medium">
                {plan.packingAndPrepTips[0]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
