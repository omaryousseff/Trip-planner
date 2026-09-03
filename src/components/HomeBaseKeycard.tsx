import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Home, 
  Search, 
  Sparkles, 
  X, 
  Check, 
  Key, 
  Compass, 
  Navigation, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Coordinates } from '../types';
import { triggerHaptic } from '../utils/haptics';

export interface PlaceSuggestion {
  id: string;
  name: string;
  neighborhood?: string;
  city?: string;
  type: 'hotel' | 'neighborhood' | 'airbnb' | 'district';
  coords: Coordinates;
  address?: string;
}

// Curated top hotels and authentic neighborhoods worldwide for instant, zero-delay typing
const CURATED_PLACES_BY_DESTINATION: Record<string, PlaceSuggestion[]> = {
  tokyo: [
    { id: 't-shinjuku', name: 'Shinjuku District', neighborhood: 'Shinjuku', city: 'Tokyo', type: 'neighborhood', coords: { lat: 35.6938, lng: 139.7034 }, address: 'Shinjuku, Tokyo 160-0022' },
    { id: 't-shibuya', name: 'Shibuya Crossing & Dogenzaka', neighborhood: 'Shibuya', city: 'Tokyo', type: 'neighborhood', coords: { lat: 35.6595, lng: 139.7005 }, address: 'Shibuya, Tokyo 150-0002' },
    { id: 't-ginza', name: 'Ginza Shopping District', neighborhood: 'Ginza', city: 'Tokyo', type: 'neighborhood', coords: { lat: 35.6719, lng: 139.7648 }, address: 'Ginza, Chuo City, Tokyo 104-0061' },
    { id: 't-asakusa', name: 'Asakusa Historic Quarter', neighborhood: 'Asakusa', city: 'Tokyo', type: 'neighborhood', coords: { lat: 35.7118, lng: 139.7967 }, address: 'Asakusa, Taito City, Tokyo 111-0032' },
    { id: 't-parkhyatt', name: 'Park Hyatt Tokyo', neighborhood: 'Nishi-Shinjuku', city: 'Tokyo', type: 'hotel', coords: { lat: 35.6853, lng: 139.6911 }, address: '3-7-1-2 Nishi-Shinjuku, Tokyo' },
    { id: 't-cerulean', name: 'Cerulean Tower Tokyu Hotel', neighborhood: 'Shibuya', city: 'Tokyo', type: 'hotel', coords: { lat: 35.6560, lng: 139.6998 }, address: '26-1 Sakuragaokacho, Shibuya, Tokyo' },
    { id: 't-hoshinoya', name: 'HOSHINOYA Tokyo Ryokan', neighborhood: 'Otemachi', city: 'Tokyo', type: 'hotel', coords: { lat: 35.6882, lng: 139.7645 }, address: '1-9-1 Otemachi, Chiyoda, Tokyo' },
  ],
  warsaw: [
    { id: 'w-stare-miasto', name: 'Old Town (Stare Miasto)', neighborhood: 'Śródmieście Północne', city: 'Warsaw', type: 'neighborhood', coords: { lat: 52.2497, lng: 21.0122 }, address: 'Rynek Starego Miasta, Warsaw' },
    { id: 'w-srodmiescie', name: 'Śródmieście (City Centre)', neighborhood: 'Śródmieście', city: 'Warsaw', type: 'neighborhood', coords: { lat: 52.2319, lng: 21.0067 }, address: 'Marszałkowska, Warsaw' },
    { id: 'w-mokotow', name: 'Mokotów Residential Quarter', neighborhood: 'Mokotów', city: 'Warsaw', type: 'neighborhood', coords: { lat: 52.1939, lng: 21.0317 }, address: 'Mokotów, Warsaw' },
    { id: 'w-praga', name: 'Praga Art District', neighborhood: 'Praga-Północ', city: 'Warsaw', type: 'neighborhood', coords: { lat: 52.2541, lng: 21.0371 }, address: 'Ząbkowska, Warsaw' },
    { id: 'w-bristol', name: 'Hotel Bristol, a Luxury Collection Hotel', neighborhood: 'Krakowskie Przedmieście', city: 'Warsaw', type: 'hotel', coords: { lat: 52.2425, lng: 21.0163 }, address: 'Krakowskie Przedmieście 42/44, Warsaw' },
    { id: 'w-raffles', name: 'Raffles Europejski Warsaw', neighborhood: 'Śródmieście', city: 'Warsaw', type: 'hotel', coords: { lat: 52.2415, lng: 21.0145 }, address: 'Krakowskie Przedmieście 13, Warsaw' },
    { id: 'w-puro', name: 'PURO Warszawa Centrum', neighborhood: 'Śródmieście', city: 'Warsaw', type: 'hotel', coords: { lat: 52.2312, lng: 21.0158 }, address: 'Widok 9, Warsaw' },
  ],
  prague: [
    { id: 'p-stare-mesto', name: 'Old Town (Staré Město)', neighborhood: 'Prague 1', city: 'Prague', type: 'neighborhood', coords: { lat: 50.0875, lng: 14.4212 }, address: 'Staroměstské nám., Prague 1' },
    { id: 'p-vinohrady', name: 'Vinohrady Bohemian Quarter', neighborhood: 'Prague 2', city: 'Prague', type: 'neighborhood', coords: { lat: 50.0755, lng: 14.4442 }, address: 'Náměstí Míru, Prague 2' },
    { id: 'p-mala-strana', name: 'Malá Strana (Lesser Town)', neighborhood: 'Prague 1', city: 'Prague', type: 'neighborhood', coords: { lat: 50.0872, lng: 14.4048 }, address: 'Malostranské nám., Prague 1' },
    { id: 'p-karlin', name: 'Karlín Hip Dining Quarter', neighborhood: 'Prague 8', city: 'Prague', type: 'neighborhood', coords: { lat: 50.0924, lng: 14.4533 }, address: 'Karlínské nám., Prague 8' },
    { id: 'p-fourseasons', name: 'Four Seasons Hotel Prague', neighborhood: 'Old Town Riverside', city: 'Prague', type: 'hotel', coords: { lat: 50.0876, lng: 14.4144 }, address: 'Veleslavínova 1098/2a, Prague 1' },
    { id: 'p-augustine', name: 'Augustine, a Luxury Collection Hotel', neighborhood: 'Malá Strana', city: 'Prague', type: 'hotel', coords: { lat: 50.0890, lng: 14.4069 }, address: 'Letenská 12/33, Prague 1' },
    { id: 'p-emblem', name: 'The Emblem Hotel', neighborhood: 'Old Town', city: 'Prague', type: 'hotel', coords: { lat: 50.0871, lng: 14.4178 }, address: 'Platnéřská 19, Prague 1' },
  ],
  paris: [
    { id: 'pa-marais', name: 'Le Marais Historic District', neighborhood: '4th Arrondissement', city: 'Paris', type: 'neighborhood', coords: { lat: 48.8575, lng: 2.3622 }, address: 'Place des Vosges, 75004 Paris' },
    { id: 'pa-saintgermain', name: 'Saint-Germain-des-Prés', neighborhood: '6th Arrondissement', city: 'Paris', type: 'neighborhood', coords: { lat: 48.8538, lng: 2.3333 }, address: 'Boulevard Saint-Germain, 75006 Paris' },
    { id: 'pa-montmartre', name: 'Montmartre Artists Quarter', neighborhood: '18th Arrondissement', city: 'Paris', type: 'neighborhood', coords: { lat: 48.8867, lng: 2.3431 }, address: 'Place du Tertre, 75018 Paris' },
    { id: 'pa-ritz', name: 'Ritz Paris', neighborhood: 'Place Vendôme', city: 'Paris', type: 'hotel', coords: { lat: 48.8682, lng: 2.3292 }, address: '15 Place Vendôme, 75001 Paris' },
    { id: 'pa-bristol', name: 'Le Bristol Paris', neighborhood: 'Faubourg Saint-Honoré', city: 'Paris', type: 'hotel', coords: { lat: 48.8718, lng: 2.3148 }, address: '112 Rue du Faubourg Saint-Honoré, 75008 Paris' },
  ],
  rome: [
    { id: 'r-trastevere', name: 'Trastevere Cobblestone Quarter', neighborhood: 'Trastevere', city: 'Rome', type: 'neighborhood', coords: { lat: 41.8890, lng: 12.4695 }, address: 'Piazza di Santa Maria in Trastevere, Rome' },
    { id: 'r-monti', name: 'Monti Bohemian Village', neighborhood: 'Rione Monti', city: 'Rome', type: 'neighborhood', coords: { lat: 41.8955, lng: 12.4930 }, address: 'Via Urbana, Rome' },
    { id: 'r-derussie', name: 'Hotel de Russie', neighborhood: 'Piazza del Popolo', city: 'Rome', type: 'hotel', coords: { lat: 41.9103, lng: 12.4777 }, address: 'Via del Babuino 9, Rome' },
  ],
  london: [
    { id: 'l-soho', name: 'Soho & Covent Garden', neighborhood: 'West End', city: 'London', type: 'neighborhood', coords: { lat: 51.5136, lng: -0.1332 }, address: 'Soho, London W1D' },
    { id: 'l-shoreditch', name: 'Shoreditch Creative Quarter', neighborhood: 'East London', city: 'London', type: 'neighborhood', coords: { lat: 51.5245, lng: -0.0782 }, address: 'Redchurch St, London E2' },
    { id: 'l-savoy', name: 'The Savoy Hotel', neighborhood: 'Strand', city: 'London', type: 'hotel', coords: { lat: 51.5104, lng: -0.1206 }, address: 'Strand, London WC2R 0EZ' },
  ],
  'new york': [
    { id: 'ny-soho', name: 'SoHo Cast Iron Historic District', neighborhood: 'Lower Manhattan', city: 'New York', type: 'neighborhood', coords: { lat: 40.7233, lng: -74.0030 }, address: 'Prince St & Spring St, New York, NY' },
    { id: 'ny-greenwich', name: 'Greenwich Village', neighborhood: 'Downtown', city: 'New York', type: 'neighborhood', coords: { lat: 40.7336, lng: -74.0027 }, address: 'Washington Square Park, New York, NY' },
    { id: 'ny-plaza', name: 'The Plaza Hotel', neighborhood: 'Midtown / Central Park', city: 'New York', type: 'hotel', coords: { lat: 40.7645, lng: -73.9745 }, address: '768 5th Ave, New York, NY 10019' },
  ],
};

interface HomeBaseKeycardProps {
  destination: string;
  homeBase: string;
  homeBaseCoords?: Coordinates;
  onSelectHomeBase: (name: string, coords?: Coordinates) => void;
}

export const HomeBaseKeycard: React.FC<HomeBaseKeycardProps> = ({
  destination,
  homeBase,
  homeBaseCoords,
  onSelectHomeBase,
}) => {
  const [query, setQuery] = useState(homeBase || '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingCustom, setIsTypingCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive city key for curated suggestions
  const destCityLower = destination.toLowerCase().split(',')[0].trim();
  const matchedCurated = Object.entries(CURATED_PLACES_BY_DESTINATION).find(([key]) =>
    destCityLower.includes(key) || key.includes(destCityLower)
  )?.[1] || [];

  // Sync external homeBase prop
  useEffect(() => {
    if (homeBase && homeBase !== query) {
      setQuery(homeBase);
    }
  }, [homeBase]);

  // Click outside to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch or filter places
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions(matchedCurated.slice(0, 6));
      return;
    }

    const timer = setTimeout(async () => {
      const q = query.toLowerCase().trim();
      // Local instant filter from curated
      const localMatches = matchedCurated.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.neighborhood && p.neighborhood.toLowerCase().includes(q)) ||
          (p.address && p.address.toLowerCase().includes(q))
      );

      // Also call server autocomplete for worldwide places / hotels / addresses
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/places-autocomplete?q=${encodeURIComponent(query)}&destination=${encodeURIComponent(destination)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.predictions && Array.isArray(data.predictions)) {
            // Merge deduplicated
            const combined = [...localMatches];
            data.predictions.forEach((remote: PlaceSuggestion) => {
              if (!combined.some((c) => c.name.toLowerCase() === remote.name.toLowerCase())) {
                combined.push(remote);
              }
            });
            setSuggestions(combined.slice(0, 8));
          } else {
            setSuggestions(localMatches);
          }
        } else {
          setSuggestions(localMatches);
        }
      } catch {
        setSuggestions(localMatches);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, destination, matchedCurated]);

  const handleSelectPlace = (place: PlaceSuggestion) => {
    triggerHaptic('medium');
    setQuery(place.name);
    onSelectHomeBase(place.name, place.coords);
    setIsOpen(false);
  };

  const handleCustomConfirm = () => {
    if (!query.trim()) return;
    triggerHaptic('medium');
    // Default to city center coords if no exact match
    const approx = matchedCurated[0]?.coords || { lat: 48.8566, lng: 2.3522 };
    onSelectHomeBase(query.trim(), homeBaseCoords || approx);
    setIsOpen(false);
  };

  const handleClear = () => {
    triggerHaptic('light');
    setQuery('');
    onSelectHomeBase('', undefined);
    setIsOpen(false);
  };

  // Static / SVG Mini Map Renderer based on coordinate
  const currentCoords = homeBaseCoords || (matchedCurated[0]?.coords ?? { lat: 50.0755, lng: 14.4378 });

  return (
    <div className="space-y-4">
      {/* ── THE HOTEL KEYCARD & LUGGAGE TAG CONTAINER ── */}
      <div className="relative group">
        {/* Vintage Leather Tag Stitching & Shadow */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#4A3222] via-[#3B2618] to-[#2B1B10] p-4 sm:p-6 text-white shadow-xl border-4 border-[#694830] overflow-hidden">
          
          {/* Subtle leather texture grain & decorative stitch marks */}
          <div className="absolute inset-2 border-2 border-dashed border-[#A67C52]/40 rounded-2xl pointer-events-none" />

          {/* Top Brass Eyelet & Leather Strap Notch */}
          <div className="flex items-center justify-between pb-3 relative z-10">
            <div className="flex items-center gap-3">
              {/* Embossed brass eyelet ring */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#E6C280] via-[#C99C48] to-[#8C6420] p-1 shadow-inner flex items-center justify-center shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-[#2B1B10] border border-[#5C3E20]" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#E3BE7B] uppercase font-black flex items-center gap-1.5">
                  <Key className="w-3 h-3 text-[#F5CF8E]" />
                  <span>HOME BASE KEYCARD • SLEEVE</span>
                </div>
                <div className="text-xs text-stone-300 font-serif italic">
                  Anchor Node A (Morning Departure) &amp; Node Z (Evening Return)
                </div>
              </div>
            </div>

            {/* Room / Suite Badge */}
            <div className="px-3 py-1 bg-[#24150B]/80 rounded-lg border border-[#A67C52]/50 text-[#F5CF8E] font-mono text-xs font-black tracking-wider shadow-inner">
              RM 402 • STAY
            </div>
          </div>

          {/* Keycard Input Area with Smart Autocomplete */}
          <div className="relative z-20 pt-1" ref={dropdownRef}>
            <div className="relative bg-[#FFFDF7] rounded-2xl border-2 border-[#D4AF37] shadow-inner p-2 sm:p-2.5 flex items-center gap-2 focus-within:ring-3 focus-within:ring-[#F5CF8E] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#2E1E14] text-[#E5C287] flex items-center justify-center shrink-0 shadow-sm">
                <Bed className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <label 
                  htmlFor="input-home-base" 
                  className="block text-[10px] font-black uppercase tracking-wider text-stone-500 font-mono"
                >
                  Where are you staying? (Hotel, Airbnb, or Neighborhood)
                </label>
                <input
                  id="input-home-base"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomConfirm();
                    }
                  }}
                  placeholder={`e.g., Hotel Bristol, Shinjuku, or Vinohrady in ${destination.split(',')[0]}...`}
                  className="w-full text-xs sm:text-sm font-bold text-stone-900 bg-transparent border-none outline-none placeholder:text-stone-400"
                />
              </div>

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-7 h-7 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors shrink-0"
                  title="Clear accommodation"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleCustomConfirm}
                className="px-3.5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C287] hover:to-[#C99A22] text-[#2B1B10] font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden xs:inline">Lock In Base</span>
              </button>
            </div>

            {/* Smart Autocomplete Dropdown List */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37] z-50 overflow-hidden text-stone-900 max-h-72 overflow-y-auto"
                >
                  <div className="px-3.5 py-2 bg-[#FAF6EE] border-b border-stone-200 flex items-center justify-between text-[11px] font-bold text-stone-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Suggested bases in {destination.split(',')[0]}:</span>
                    </span>
                    {isLoading && <span className="text-[#B8860B] animate-pulse">Searching places...</span>}
                  </div>

                  <div className="divide-y divide-stone-100">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectPlace(item)}
                        className="w-full text-left px-4 py-3 hover:bg-[#FFFDF7] flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            item.type === 'hotel' 
                              ? 'bg-[#FFEAD1] text-[#9E5718]' 
                              : 'bg-[#E0F9F7] text-[#00897B]'
                          }`}>
                            {item.type === 'hotel' ? <Bed className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                          </div>
                          <div className="truncate">
                            <div className="text-xs sm:text-sm font-black text-[#2D241E] group-hover:text-[#B8860B] transition-colors truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-stone-500 font-medium truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                              <span>{item.address || item.neighborhood || item.city}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                          item.type === 'hotel'
                            ? 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]'
                            : 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                        }`}>
                          {item.type}
                        </span>
                      </button>
                    ))}

                    {query.trim() && (
                      <button
                        type="button"
                        onClick={handleCustomConfirm}
                        className="w-full text-left px-4 py-3 bg-[#FAF6EE] hover:bg-[#F3ECE0] flex items-center gap-2 text-xs font-bold text-[#6D4C41] cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span>Use custom location: &ldquo;<strong className="text-stone-900">{query}</strong>&rdquo;</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Popular Neighborhood Chips */}
          <div className="pt-3 flex items-center gap-1.5 flex-wrap relative z-10 text-[11px]">
            <span className="text-[#E3BE7B] font-mono text-[10px] uppercase font-bold tracking-wider mr-1">
              Quick Pick:
            </span>
            {matchedCurated.slice(0, 4).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPlace(p)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer border ${
                  homeBase === p.name
                    ? 'bg-[#D4AF37] text-[#2B1B10] border-[#F5CF8E] shadow-xs'
                    : 'bg-[#2B1B10]/70 hover:bg-[#2B1B10] text-[#E3BE7B] border-[#A67C52]/50 hover:border-[#D4AF37]'
                }`}
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TORN-PAPER MINI MAP SNIPPET ── */}
      <AnimatePresence>
        {homeBase && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            {/* Ragged/Torn Paper Edge container */}
            <div className="relative bg-[#FFFDF7] rounded-2xl p-4 sm:p-5 border-2 border-[#DFB277]/80 shadow-md overflow-hidden space-y-3">
              
              {/* Jagged Sawtooth Paper Edge Visual at top */}
              <div 
                className="absolute -top-1 left-0 right-0 h-2 bg-repeat-x pointer-events-none opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at 5px 0, transparent 4px, #DFB277 4px)`,
                  backgroundSize: '10px 6px',
                }}
              />

              {/* Header inside torn paper */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#3E2E20] flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>LOCKED HOME BASE (NODE A &amp; Z)</span>
                  </span>
                </div>
                <div className="text-[11px] font-mono font-bold text-stone-500 bg-[#FAF4EA] px-2.5 py-0.5 rounded-md border border-[#EBE0D0]">
                  GPS: {currentCoords.lat.toFixed(4)}°N, {currentCoords.lng.toFixed(4)}°E
                </div>
              </div>

              {/* Mini Map Snippet Canvas (Tactile Stylized Street Grid with Cute Bouncing Home Pin) */}
              <div className="relative h-40 sm:h-44 w-full rounded-xl overflow-hidden border-2 border-[#E5D7C3] bg-[#EAE2D5] shadow-inner flex items-center justify-center">
                
                {/* SVG Stylized Streets & Contours */}
                <svg className="absolute inset-0 w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3C3B1" strokeWidth="1.5" />
                      <rect x="2" y="2" width="16" height="16" fill="#E2D8C7" rx="3" />
                      <rect x="22" y="2" width="16" height="16" fill="#E2D8C7" rx="3" />
                      <rect x="2" y="22" width="16" height="16" fill="#E2D8C7" rx="3" />
                      <rect x="22" y="22" width="16" height="16" fill="#E2D8C7" rx="3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#streetGrid)" />
                  {/* Curving scenic avenue */}
                  <path d="M -20,120 Q 150,40 400,100 T 800,60" fill="none" stroke="#FFF7ED" strokeWidth="10" />
                  <path d="M -20,120 Q 150,40 400,100 T 800,60" fill="none" stroke="#DFB277" strokeWidth="2" strokeDasharray="6,6" />
                  {/* River or canal snippet */}
                  <path d="M 0,20 Q 180,90 350,20 T 700,50" fill="none" stroke="#BFDBFE" strokeWidth="14" opacity="0.6" />
                </svg>

                {/* Concentric GPS Radar Rings around Home Pin */}
                <div className="absolute w-28 h-28 rounded-full border-2 border-[#FF7A59]/40 animate-ping pointer-events-none" />
                <div className="absolute w-20 h-20 rounded-full bg-[#FF7A59]/10 border border-[#FF7A59]/30 pointer-events-none" />

                {/* Cute Bouncing Home / Bed Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  {/* Speech Bubble Tag */}
                  <div className="bg-[#2B1B10] text-[#F5CF8E] px-3 py-1 rounded-xl shadow-lg border border-[#D4AF37] text-xs font-black flex items-center gap-1.5 whitespace-nowrap">
                    <Bed className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>{homeBase}</span>
                  </div>
                  <div className="w-2 h-2 bg-[#2B1B10] transform rotate-45 -mt-1 border-r border-b border-[#D4AF37]" />
                  
                  {/* Brass Push-Pin */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF5722] to-[#FF8A65] p-1.5 shadow-xl flex items-center justify-center border-2 border-white ring-2 ring-[#FF7A59] mt-0.5">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Compass Rose in Corner */}
                <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-stone-300 text-[10px] font-mono font-black text-stone-700 shadow-xs flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#FF7A59]" />
                  <span>1:2,500</span>
                </div>

                {/* Node A / Node Z Watermark */}
                <div className="absolute top-2.5 left-2.5 bg-[#2B1B10]/80 backdrop-blur-xs text-[#E3BE7B] px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase tracking-wider">
                  Origin &amp; Destination Anchor
                </div>
              </div>

              {/* Explanatory Routing Callout */}
              <div className="flex items-center justify-between text-xs text-stone-600 bg-[#FAF4EA] p-2.5 rounded-xl border border-[#EBE0D0]">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#FF7A59] shrink-0" />
                  <span className="font-medium text-[11px] sm:text-xs">
                    Every morning schedule originates from <strong>{homeBase}</strong>, and every evening ends with a built-in transit buffer safely back here.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[11px] font-bold text-stone-500 hover:text-red-600 underline shrink-0 ml-2 cursor-pointer"
                >
                  Change Base
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
