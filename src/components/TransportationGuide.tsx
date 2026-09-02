import React from 'react';
import { TransportationGuide as ITransportationGuide } from '../types';
import { 
  Train, 
  CreditCard, 
  Plane, 
  Car, 
  Navigation, 
  AlertCircle, 
  Compass, 
  CheckCircle 
} from 'lucide-react';

interface TransportationGuideProps {
  guide: ITransportationGuide;
  destination: string;
}

export const TransportationGuide: React.FC<TransportationGuideProps> = ({
  guide,
  destination,
}) => {
  if (!guide) return null;

  return (
    <div className="bg-white rounded-[28px] p-6 border border-stone-200/90 border-b-4 border-b-stone-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F3F0FF] border-2 border-[#A29BFE] flex items-center justify-center text-[#6C5CE7] shadow-xs">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#1A1A1A]">
              Getting Around {destination}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Transit guide, recommended passes & airport connectivity
            </p>
          </div>
        </div>
        <span className="text-xs font-black bg-[#A29BFE] text-white px-3.5 py-1.5 rounded-full border-b-2 border-[#6C5CE7] uppercase tracking-wider shadow-xs">
          Transportation Guide
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommended Passes & Cards */}
        <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#FFD93D] border-b-4 border-b-[#E5B80B] flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm uppercase tracking-tight mb-2">
              <CreditCard className="w-4 h-4 text-[#D35400]" />
              Recommended Transit Passes
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              {guide.recommendedPasses || "Check for local day passes or reloadable IC cards at major stations."}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#FFD93D]/50 flex items-center gap-1.5 text-[11px] text-[#2D2D2D] font-bold">
            <CheckCircle className="w-3.5 h-3.5 text-[#009688] shrink-0" />
            <span>Saves money and bypasses individual ticket lines</span>
          </div>
        </div>

        {/* Airport Transfer */}
        <div className="bg-[#E0F9F7] rounded-2xl p-5 border-2 border-[#4ECDC4] border-b-4 border-b-[#45B7AF] flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm uppercase tracking-tight mb-2">
              <Plane className="w-4 h-4 text-[#009688]" />
              Airport to City Center
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              {guide.airportTransfer || "Express airport rail and limousine shuttle buses connect to central terminals."}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#4ECDC4]/50 flex items-center gap-1.5 text-[11px] text-[#00796B] font-bold">
            <Navigation className="w-3.5 h-3.5 text-[#009688] shrink-0" />
            <span>Fastest & most cost-effective connection</span>
          </div>
        </div>

        {/* Metro, Subways & Buses */}
        <div className="bg-[#F3F0FF] rounded-2xl p-5 border-2 border-[#A29BFE] border-b-4 border-b-[#6C5CE7] flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm uppercase tracking-tight mb-2">
              <Train className="w-4 h-4 text-[#6C5CE7]" />
              Metro & City Buses
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              {guide.metroBusTips || "Public lines run frequently. Check Google Maps or Apple Maps for live platform numbers and train arrivals."}
            </p>
          </div>
        </div>

        {/* Ride-sharing & Taxis */}
        <div className="bg-[#FFE8D6] rounded-2xl p-5 border-2 border-[#FF6B6B] border-b-4 border-b-[#EE5253] flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm uppercase tracking-tight mb-2">
              <Car className="w-4 h-4 text-[#FF6B6B]" />
              Taxis & Ride-Hailing Apps
            </div>
            <p className="text-xs text-stone-700 font-medium leading-relaxed">
              {guide.rideSharing || "Official city taxis and ride apps (such as Uber, Bolt, Grab, or local taxi dispatch apps) are widely available."}
            </p>
          </div>
        </div>
      </div>

      {/* Transit General Overview */}
      {guide.overview && (
        <div className="bg-[#FFF8F0] border-2 border-[#FF6B6B]/30 border-b-4 border-b-[#FF6B6B]/40 rounded-2xl p-4 text-xs text-[#2D2D2D] flex items-start gap-2.5 font-medium">
          <Compass className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-[#FF6B6B] uppercase tracking-wide">Transit Note: </span>
            <span className="leading-relaxed">{guide.overview}</span>
          </div>
        </div>
      )}
    </div>
  );
};
