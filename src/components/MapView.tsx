import React, { useState, useMemo } from 'react';
import { ScheduleItem } from '../types';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Train, 
  Utensils, 
  Compass, 
  Layers,
  Footprints,
  Clock,
  Car,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { 
  resolvePlaceCoordinates, 
  calculateDistance, 
  getDirectionsUrl, 
  getMultiStopDirectionsUrl, 
  getPlaceSearchUrl, 
  getAppleMapsUrl 
} from '../utils/geoCoordinates';
import { getLandmarkPhoto, LandmarkPhotoInfo } from '../utils/landmarkImages';
import { PhotoLightboxModal } from './PhotoLightboxModal';

interface MapViewProps {
  items: ScheduleItem[];
  destination: string;
  dayNumber: number;
}

export const MapView: React.FC<MapViewProps> = ({
  items,
  destination,
  dayNumber,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(0);
  const [travelMode, setTravelMode] = useState<'walking' | 'transit' | 'driving'>('walking');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<{
    item: ScheduleItem;
    photoInfo: LandmarkPhotoInfo;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // 1. Resolve accurate geographic coordinates and photos for all items
  const placesWithCoords = useMemo(() => {
    return items.map((item, idx) => {
      const coords = resolvePlaceCoordinates(item, destination, idx);
      const photoInfo = getLandmarkPhoto(item, destination);
      return {
        ...item,
        displayIndex: idx + 1,
        resolvedCoords: coords,
        photoInfo,
      };
    });
  }, [items, destination]);

  // 2. Calculate distances and route legs between consecutive stops
  const routeLegs = useMemo(() => {
    const legs: Array<{
      fromIndex: number;
      toIndex: number;
      fromTitle: string;
      toTitle: string;
      distanceText: string;
      km: number;
      walkingMinutes: number;
      transitMinutes: number;
      directionsUrl: string;
    }> = [];

    for (let i = 0; i < placesWithCoords.length - 1; i++) {
      const current = placesWithCoords[i];
      const next = placesWithCoords[i + 1];
      const dist = calculateDistance(current.resolvedCoords, next.resolvedCoords);
      const dirUrl = getDirectionsUrl({
        originTitle: current.title,
        originLocation: current.location,
        destinationTitle: next.title,
        destinationLocation: next.location,
        destinationCity: destination,
        travelMode,
      });

      legs.push({
        fromIndex: i,
        toIndex: i + 1,
        fromTitle: current.title,
        toTitle: next.title,
        distanceText: dist.formattedText,
        km: dist.km,
        walkingMinutes: dist.walkingMinutes,
        transitMinutes: dist.transitMinutes,
        directionsUrl: dirUrl,
      });
    }
    return legs;
  }, [placesWithCoords, destination, travelMode]);

  // Total route metrics
  const totalDistanceKm = routeLegs.reduce((acc, leg) => acc + leg.km, 0);
  const totalWalkingMins = routeLegs.reduce((acc, leg) => acc + leg.walkingMinutes, 0);

  // 3. Compute 2D SVG canvas projection bounds based on true coordinates
  const projection = useMemo(() => {
    if (placesWithCoords.length === 0) {
      return { points: [], bounds: null };
    }

    const lats = placesWithCoords.map((p) => p.resolvedCoords.lat);
    const lngs = placesWithCoords.map((p) => p.resolvedCoords.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latSpan = Math.max(maxLat - minLat, 0.012);
    const lngSpan = Math.max(maxLng - minLng, 0.015);

    // Padding inside the SVG viewport (width 800, height 420)
    const paddingX = 80;
    const paddingY = 60;
    const width = 800;
    const height = 420;

    const points = placesWithCoords.map((p) => {
      // Latitude increases upwards, SVG Y increases downwards
      const x = paddingX + ((p.resolvedCoords.lng - minLng) / lngSpan) * (width - 2 * paddingX);
      const y = height - paddingY - ((p.resolvedCoords.lat - minLat) / latSpan) * (height - 2 * paddingY);
      return {
        x,
        y,
        place: p,
      };
    });

    return { points, bounds: { minLat, maxLat, minLng, maxLng } };
  }, [placesWithCoords]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-[#6C5CE7] border-[#5848c2] text-white';
      case 'food':
        return 'bg-[#FF6B6B] border-[#d64545] text-white';
      case 'place':
        return 'bg-[#009688] border-[#00796b] text-white';
      case 'activity':
      default:
        return 'bg-[#E17055] border-[#c0563f] text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return Train;
      case 'food':
        return Utensils;
      case 'place':
        return MapPin;
      case 'activity':
      default:
        return Compass;
    }
  };

  // Google Maps Full Day Multi-stop Directions URL
  const fullDirectionsUrl = getMultiStopDirectionsUrl(
    placesWithCoords.map((p) => ({ title: p.title, location: p.location })),
    destination,
    travelMode
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullDirectionsUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const activePlace = activeItemIndex !== null ? placesWithCoords[activeItemIndex] : null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-900 border-b-6 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFD93D] text-[#2D2D2D] font-black text-xs px-2.5 py-0.5 rounded-lg border border-[#E5B80B]">
              Day {dayNumber}
            </span>
            <span className="text-xs font-bold text-stone-500">
              {destination} Geographic Route
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FF6B6B]" />
            Landmarks, Route Map & Accurate Directions
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Real GPS coordinates, photos of famous places, and multi-stop navigation
          </p>
        </div>

        {/* Travel Mode & Navigation Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Travel Mode Switcher */}
          <div className="inline-flex bg-[#FFF8F0] p-1 rounded-xl border border-stone-200 text-xs font-black text-stone-700">
            <button
              type="button"
              onClick={() => setTravelMode('walking')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                travelMode === 'walking' ? 'bg-[#FF6B6B] text-white shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Walk</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('transit')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                travelMode === 'transit' ? 'bg-[#6C5CE7] text-white shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>Transit</span>
            </button>
            <button
              type="button"
              onClick={() => setTravelMode('driving')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                travelMode === 'driving' ? 'bg-[#009688] text-white shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Drive</span>
            </button>
          </div>

          {/* Full Day Google Maps Route Button */}
          <a
            href={fullDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-open-full-day-route"
            className="inline-flex items-center gap-2 text-xs font-black text-white bg-[#009688] hover:bg-[#00796b] px-4 py-2 rounded-xl transition-all shadow-xs border-b-2 border-[#00796b] active:translate-y-0.5"
            title="Open complete sequential route on Google Maps"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Route in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-200" />
          </a>

          {/* Copy Route Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
            title="Copy Google Maps directions link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#009688]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Route Summary Metrics Banner */}
      <div className="bg-[#FFF8F0] border-2 border-stone-900 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-stone-800">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500">Stops:</span>
            <span className="font-black text-stone-900">{placesWithCoords.length} places</span>
          </div>
          {totalDistanceKm > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500">Total Route:</span>
              <span className="font-black text-[#FF6B6B]">
                {totalDistanceKm.toFixed(1)} km ({ (totalDistanceKm * 0.621371).toFixed(1) } mi)
              </span>
            </div>
          )}
          {totalWalkingMins > 0 && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-500">Active Transit Time:</span>
              <span className="font-black text-stone-900">~{totalWalkingMins} mins</span>
            </div>
          )}
        </div>
        <div className="text-[11px] text-stone-500 font-medium">
          💡 Click any landmark card or pin to preview photography & directions
        </div>
      </div>

      {/* Interactive Visual Map & Route Canvas */}
      <div className="relative bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/20 rounded-3xl p-4 sm:p-6 border-2 border-stone-900 overflow-hidden shadow-inner min-h-[360px] flex flex-col justify-between">
        {/* Cartographic grid background */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              radial-gradient(#a8a29e 1.2px, transparent 1.2px),
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 48px 48px, 48px 48px',
          }}
        />

        {/* Destination Location Label Stamp */}
        <div className="relative z-10 self-start bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-300 text-stone-800 shadow-xs flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
          <span className="text-xs font-black">{destination}</span>
          {projection.bounds && (
            <span className="text-[10px] font-mono text-stone-500">
              ({projection.bounds.minLat.toFixed(2)}°N, {projection.bounds.minLng.toFixed(2)}°E)
            </span>
          )}
        </div>

        {/* SVG Route Connector Lines and Interactive Markers */}
        <div className="relative z-10 w-full my-auto overflow-x-auto py-2">
          <svg
            viewBox="0 0 800 420"
            className="w-full h-[280px] sm:h-[340px] drop-shadow-sm select-none"
          >
            {/* Draw Sequential Connecting Route Path with SVG id for vehicle tracking */}
            {projection.points.length > 1 && (
              <>
                <path
                  id="scrapbookRouteTrack"
                  d={projection.points.reduce((acc, pt, i) => {
                    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
                  }, '')}
                  fill="none"
                  stroke="#FF7A59"
                  strokeWidth="3.5"
                  strokeDasharray="8,6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Animated Moving Vehicle along Dotted Route (Airplane / Train / Walking) */}
                <g>
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#scrapbookRouteTrack" />
                  </animateMotion>
                  <g transform="translate(-16, -16)">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="#2D241E"
                      stroke="#FFD93D"
                      strokeWidth="2"
                    />
                    <text
                      x="16"
                      y="20"
                      textAnchor="middle"
                      fontSize="13"
                    >
                      {travelMode === 'transit' ? '🚆' : travelMode === 'driving' ? '🚗' : '✈️'}
                    </text>
                  </g>
                </g>
              </>
            )}

            {/* Render Pins on True Relative Geographic Positions with Pop-out Polaroids */}
            {projection.points.map((pt, i) => {
              const isSelected = activeItemIndex === i;
              const place = pt.place;
              return (
                <g
                  key={place.id || i}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => {
                    setActiveItemIndex(i);
                  }}
                >
                  {/* Outer pulse circle for selected pin */}
                  {isSelected && (
                    <circle
                      r="26"
                      fill="none"
                      stroke="#FF7A59"
                      strokeWidth="3"
                      opacity="0.7"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker shadow */}
                  <ellipse cx="0" cy="18" rx="14" ry="5" fill="rgba(0,0,0,0.18)" />

                  {/* Pin Body */}
                  <circle
                    r={isSelected ? '18' : '15'}
                    fill={isSelected ? '#2D241E' : '#FF7A59'}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="transition-colors"
                  />

                  {/* Sequence number */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FFFFFF"
                    fontSize={isSelected ? '13' : '11'}
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    {place.displayIndex}
                  </text>

                  {/* POP-OUT POLAROID PIN (Enhanced when selected) */}
                  {isSelected ? (
                    <g transform="translate(-65, -135)">
                      {/* Polaroid White Card Body */}
                      <rect
                        x="0"
                        y="0"
                        width="130"
                        height="115"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#2D241E"
                        strokeWidth="2"
                        filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.2))"
                      />

                      {/* Mini Washi Tape on Polaroid */}
                      <rect
                        x="35"
                        y="-6"
                        width="60"
                        height="12"
                        rx="2"
                        fill="rgba(255, 122, 89, 0.85)"
                      />

                      {/* Photo Image inside Polaroid */}
                      <clipPath id={`polaroidClip-${i}`}>
                        <rect x="8" y="10" width="114" height="68" rx="3" />
                      </clipPath>
                      <image
                        href={place.photoInfo.url}
                        x="8"
                        y="10"
                        width="114"
                        height="68"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#polaroidClip-${i})`}
                      />

                      {/* Handwritten Caption Title */}
                      <text
                        x="65"
                        y="94"
                        textAnchor="middle"
                        fill="#1F2937"
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="'Caveat', cursive, sans-serif"
                      >
                        {place.title.length > 16 ? `${place.title.slice(0, 15)}...` : place.title}
                      </text>

                      {/* Stated Source Badge */}
                      <text
                        x="65"
                        y="107"
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {place.photoInfo.source.length > 20 ? place.photoInfo.source.slice(0, 18) + '...' : place.photoInfo.source}
                      </text>

                      {/* Polaroid bottom pointer triangle */}
                      <polygon points="60,115 70,115 65,124" fill="#2D241E" />
                    </g>
                  ) : (
                    /* Standard Mini Tag when not selected */
                    <g transform="translate(0, -28)">
                      <rect
                        x="-55"
                        y="-11"
                        width="110"
                        height="20"
                        rx="5"
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#1F2937"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="'Caveat', cursive, sans-serif"
                      >
                        {place.title.length > 15 ? `${place.title.slice(0, 14)}...` : place.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Landmark Snapshot Popover inside Canvas */}
        {activePlace && (
          <div className="relative z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border-2 border-stone-900 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Photo Thumbnail */}
              <div
                className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer group relative"
                onClick={() =>
                  setSelectedPhotoModal({
                    item: activePlace,
                    photoInfo: activePlace.photoInfo,
                  })
                }
                title="Click to view full photo"
              >
                <img
                  src={activePlace.photoInfo.url}
                  alt={activePlace.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <Maximize2 className="absolute bottom-1 right-1 w-3.5 h-3.5 text-white drop-shadow" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF6B6B] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    Stop #{activePlace.displayIndex}
                  </span>
                  <span className="text-xs font-black text-stone-900 truncate">
                    {activePlace.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 truncate mt-0.5">
                  <MapPin className="w-3 h-3 text-[#FF6B6B] shrink-0" />
                  <span className="truncate">{activePlace.location || destination}</span>
                  <span className="font-mono text-[10px] text-stone-400">
                    ({activePlace.resolvedCoords.lat.toFixed(4)}, {activePlace.resolvedCoords.lng.toFixed(4)})
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() =>
                  setSelectedPhotoModal({
                    item: activePlace,
                    photoInfo: activePlace.photoInfo,
                  })
                }
                className="text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl border border-stone-300 transition-colors"
              >
                View Photo
              </button>
              <a
                href={getDirectionsUrl({
                  destinationTitle: activePlace.title,
                  destinationLocation: activePlace.location,
                  destinationCity: destination,
                  travelMode,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#FF6B6B] hover:bg-[#EE5253] px-3.5 py-1.5 rounded-xl transition-all shadow-xs border-b-2 border-[#EE5253]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Sequential Landmark List & Route Step Breakdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <span>Itinerary Sequence & Step-by-Step Navigation</span>
          <span className="text-xs font-normal text-stone-500 capitalize">
            ({placesWithCoords.length} landmarks & stops)
          </span>
        </h4>

        <div className="space-y-4">
          {placesWithCoords.map((place, idx) => {
            const isLast = idx === placesWithCoords.length - 1;
            const isSelected = activeItemIndex === idx;
            const Icon = getCategoryIcon(place.category);
            const legToNext = routeLegs[idx];

            return (
              <div key={place.id || idx} className="relative">
                {/* Connecting transit line to next stop */}
                {!isLast && legToNext && (
                  <div className="my-2 ml-5 sm:ml-7 pl-6 sm:pl-8 border-l-2 border-dashed border-[#FF6B6B] py-2">
                    <div className="bg-[#FFF8F0] border border-stone-200 rounded-xl px-3 py-1.5 inline-flex items-center gap-2 text-xs text-stone-700 shadow-xs">
                      <Footprints className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      <span className="font-bold">Leg {idx + 1} → {idx + 2}:</span>
                      <span className="font-medium text-stone-600">{legToNext.distanceText}</span>
                      <a
                        href={legToNext.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-[#FF6B6B] hover:underline ml-1 inline-flex items-center gap-1"
                        title="Open step directions between these two stops"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Stop Card */}
                <div
                  id={`map-card-stop-${place.displayIndex}`}
                  onClick={() => setActiveItemIndex(idx)}
                  className={`bg-white rounded-2xl border-2 transition-all cursor-pointer p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-stone-900 ring-4 ring-[#FFD93D]/40 shadow-md bg-stone-50/50'
                      : 'border-stone-200 hover:border-stone-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {/* Landmark Thumbnail Picture with Photo Preview */}
                    <div
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-stone-800 shadow-xs group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoModal({
                          item: place,
                          photoInfo: place.photoInfo,
                        });
                      }}
                      title="Click to expand landmark photo"
                    >
                      <img
                        src={place.photoInfo.url}
                        alt={place.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-1 left-1 bg-stone-900/80 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
                        #{place.displayIndex}
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-black text-[#2D2D2D] bg-[#FFD93D] px-2 py-0.5 rounded-lg border border-[#E5B80B]">
                          {place.time}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${getCategoryColor(place.category)}`}>
                          <Icon className="w-3 h-3" />
                          {place.category}
                        </span>
                        {place.duration && (
                          <span className="text-xs text-stone-500 font-medium">
                            • {place.duration}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-black text-stone-900 truncate">
                        {place.title}
                      </h4>

                      <div className="flex items-center gap-1 text-xs text-stone-600 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B6B] shrink-0" />
                        <span className="truncate">{place.location || destination}</span>
                        <span className="font-mono text-[10px] text-stone-400 ml-1">
                          ({place.resolvedCoords.lat.toFixed(4)}, {place.resolvedCoords.lng.toFixed(4)})
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-medium">
                        {place.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Directions Buttons */}
                  <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoModal({
                          item: place,
                          photoInfo: place.photoInfo,
                        });
                      }}
                      className="text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl border border-stone-300 transition-colors"
                    >
                      Photo
                    </button>

                    <a
                      href={getDirectionsUrl({
                        destinationTitle: place.title,
                        destinationLocation: place.location,
                        destinationCity: destination,
                        travelMode,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-[#009688] hover:bg-[#00796b] px-3.5 py-1.5 rounded-xl transition-all shadow-xs border-b-2 border-[#00796b]"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3 text-teal-200" />
                    </a>

                    <a
                      href={getPlaceSearchUrl(place.title, place.location, destination)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-stone-500 hover:text-stone-800 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 transition-colors"
                      title="View on Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <PhotoLightboxModal
          item={selectedPhotoModal.item}
          photoInfo={selectedPhotoModal.photoInfo}
          destination={destination}
          onClose={() => setSelectedPhotoModal(null)}
        />
      )}
    </div>
  );
};
