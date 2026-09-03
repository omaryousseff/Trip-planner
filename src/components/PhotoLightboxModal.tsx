import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Train, 
  CheckCircle2, 
  Globe, 
  Star, 
  ShieldCheck, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Link as LinkIcon,
  Layers,
  Building2,
  Camera
} from 'lucide-react';
import { ScheduleItem } from '../types';
import { getDirectionsUrl, getPlaceSearchUrl, getAppleMapsUrl } from '../utils/geoCoordinates';
import { LandmarkPhotoInfo, AlternativePhoto } from '../utils/landmarkImages';

interface PhotoLightboxModalProps {
  item: ScheduleItem | null;
  photoInfo: LandmarkPhotoInfo | null;
  destination: string;
  dayIndex?: number;
  onClose: () => void;
  onUpdatePhoto?: (
    dayIndex: number, 
    itemId: string, 
    newPhoto: { 
      url: string; 
      caption?: string; 
      source: string; 
      sourceType?: string;
      officialWebsiteUrl?: string;
      tripAdvisorUrl?: string;
    }
  ) => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  item,
  photoInfo,
  destination,
  dayIndex = 0,
  onClose,
  onUpdatePhoto,
}) => {
  if (!item || !photoInfo) return null;

  // Multi-photo options: combine primary photo with up to 3 best photos
  const rawList: AlternativePhoto[] = [];
  if (photoInfo.url) {
    rawList.push({
      url: photoInfo.url,
      caption: photoInfo.caption || item.title,
      source: photoInfo.source || 'Pinterest',
      sourceType: photoInfo.sourceType || 'pinterest',
      pinUrl: photoInfo.officialWebsiteUrl,
    });
  }
  if (photoInfo.photos && photoInfo.photos.length > 0) {
    photoInfo.photos.forEach((u, idx) => {
      if (u && !rawList.some((p) => p.url === u)) {
        rawList.push({
          url: u,
          caption: `${item.title} - Perspective ${idx + 1}`,
          source: 'Pinterest',
          sourceType: 'pinterest',
          pinUrl: photoInfo.officialWebsiteUrl,
        });
      }
    });
  }
  if (photoInfo.alternativePhotos) {
    photoInfo.alternativePhotos.forEach((alt, idx) => {
      if (alt.url && !rawList.some((p) => p.url === alt.url)) {
        rawList.push(alt);
      }
    });
  }
  const allPhotos = rawList.slice(0, 3);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const currentPhoto = allPhotos[selectedPhotoIndex] || allPhotos[0];

  // Zoom controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [customSource, setCustomSource] = useState('Official Website');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const walkingDirectionsUrl = getDirectionsUrl({
    destinationTitle: item.title,
    destinationLocation: item.location,
    destinationCity: destination,
    travelMode: 'walking',
  });

  const transitDirectionsUrl = getDirectionsUrl({
    destinationTitle: item.title,
    destinationLocation: item.location,
    destinationCity: destination,
    travelMode: 'transit',
  });

  const placeSearchUrl = item.googleMapsUrl || getPlaceSearchUrl(item.title, item.location, destination);
  const appleMapsUrl = getAppleMapsUrl(item.title, item.location, destination);

  const officialWebsiteUrl = photoInfo.officialWebsiteUrl || item.officialWebsiteUrl;
  const tripAdvisorUrl = photoInfo.tripAdvisorUrl || item.tripAdvisorUrl || `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${item.title} ${destination}`)}`;

  const handleApplyCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim() || !onUpdatePhoto) return;
    
    onUpdatePhoto(dayIndex, item.id, {
      url: customUrl.trim(),
      caption: item.title,
      source: customSource.trim() || 'Official Place Website',
      sourceType: customSource.toLowerCase().includes('tripadvisor') ? 'tripadvisor' : 'official_website',
      officialWebsiteUrl: officialWebsiteUrl,
      tripAdvisorUrl: tripAdvisorUrl,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowCustomInput(false);
    }, 1500);
  };

  const isTripAdvisorSource = (currentPhoto.source || '').toLowerCase().includes('tripadvisor') || currentPhoto.sourceType === 'tripadvisor';
  const isOfficialWebsiteSource = (currentPhoto.source || '').toLowerCase().includes('official') || currentPhoto.sourceType === 'official_website';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#2D241E] animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#FAF4EA] px-5 py-3.5 border-b border-[#EFE5D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A59] animate-pulse" />
            <span className="text-xs font-black text-[#2D241E] uppercase tracking-wider">
              Original Place Photography
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#4ECDC4]/20 text-[#1A535C] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#4ECDC4]/40">
              <ShieldCheck className="w-3 h-3 text-[#1A535C]" />
              Stated Source
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white rounded-full border border-stone-200 p-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                  title="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 p-1.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* High-Resolution Embedded Photo Canvas */}
        <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-stone-950 shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || item.title}
            referrerPolicy="no-referrer"
            style={{ transform: `scale(${zoomLevel})` }}
            className="w-full h-full object-cover transition-transform duration-300 select-none"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

          {/* Photo Source Badge Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/20 shadow-md">
              {isTripAdvisorSource ? (
                <>
                  <Star className="w-3.5 h-3.5 text-[#00AA6C] fill-[#00AA6C]" />
                  <span>Source: TripAdvisor Archive</span>
                </>
              ) : isOfficialWebsiteSource ? (
                <>
                  <Building2 className="w-3.5 h-3.5 text-[#FFE17D]" />
                  <span>Source: {currentPhoto.source}</span>
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5 text-[#4ECDC4]" />
                  <span>Source: {currentPhoto.source}</span>
                </>
              )}
            </div>

            {allPhotos.length > 1 && (
              <span className="bg-[#FFE17D] text-[#2D241E] text-[11px] font-black px-2.5 py-1 rounded-full border border-[#DFB277] shadow-xs">
                Photo {selectedPhotoIndex + 1} of {allPhotos.length}
              </span>
            )}
          </div>

          {/* Photo Switcher Pill Tabs (if multiple photos available) */}
          {allPhotos.length > 1 && (
            <div className="absolute bottom-12 left-3 right-3 flex items-center justify-center gap-2 pointer-events-auto">
              <div className="bg-black/75 backdrop-blur-md p-1 rounded-2xl flex items-center gap-1 border border-white/20 shadow-xl">
                {allPhotos.map((photo, pIdx) => {
                  const isSelected = selectedPhotoIndex === pIdx;
                  const isPinterest = (photo.source || '').toLowerCase().includes('pinterest') || photo.sourceType === 'pinterest';
                  const isTA = (photo.source || '').toLowerCase().includes('tripadvisor');
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setSelectedPhotoIndex(pIdx);
                        setZoomLevel(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E60023] text-white shadow-xs'
                          : 'text-white/80 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      {isPinterest ? (
                        <Camera className="w-3 h-3 text-[#FFD93D]" />
                      ) : isTA ? (
                        <Star className="w-3 h-3 text-[#FFE17D]" />
                      ) : (
                        <Building2 className="w-3 h-3 text-[#4ECDC4]" />
                      )}
                      <span>{isPinterest ? `Pinterest Photo ${pIdx + 1}` : isTA ? 'TripAdvisor Photo' : 'Official Site Photo'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Photo caption tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 bg-black/65 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <span className="font-bold truncate">{currentPhoto.caption || item.title}</span>
            <span className="text-[10px] text-stone-300 shrink-0 ml-2 font-mono">
              In-App Photography
            </span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Stated Source and Attribution Info Card */}
          <div className="bg-[#FAF4EA] border-2 border-[#EFE5D8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#285A34]" />
                <span className="text-xs font-black text-[#2D241E] uppercase tracking-wider">
                  Stated Photo Source Attribution
                </span>
              </div>
              <p className="text-xs text-stone-700 font-bold">
                {currentPhoto.source}
              </p>
              <p className="text-[11px] text-stone-500">
                Original authentic photograph rendered natively inside your cozy trip plan.
              </p>
            </div>

            {/* Direct Verification Links */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentPhoto.pinUrl || `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(`${item.title} ${destination}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#E60023] hover:bg-[#c9001f] text-white font-bold text-xs px-3 py-2 rounded-xl shadow-2xs transition-all"
                title="Search aesthetic travel photos on Pinterest"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
                <span>Pinterest</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>

              {officialWebsiteUrl && (
                <a
                  href={officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-[#2D241E] font-bold text-xs px-3 py-2 rounded-xl border border-[#DFB277] shadow-2xs transition-all"
                  title="Visit official place website"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#FF7A59]" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              )}

              {tripAdvisorUrl && (
                <a
                  href={tripAdvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#00AA6C] hover:bg-[#008f5a] text-white font-bold text-xs px-3 py-2 rounded-xl shadow-2xs transition-all"
                  title="View reviews and photos on TripAdvisor"
                >
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>TripAdvisor Page</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>
              )}
            </div>
          </div>

          {/* Place Title & Location */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-[#FFD93D] text-[#2D241E] border border-[#E5B80B]">
                {item.time}
              </span>
              <span className="text-xs font-bold text-stone-500 capitalize">
                {item.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-cozy-serif">
              {item.title}
            </h2>
          </div>

          {item.location && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600">
              <MapPin className="w-4 h-4 text-[#FF7A59] shrink-0" />
              <span>{item.location}, {destination}</span>
              {item.coordinates && (
                <span className="text-[11px] text-stone-400 font-mono ml-2">
                  ({item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)})
                </span>
              )}
            </div>
          )}

          <p className="text-sm text-stone-700 leading-relaxed font-medium">
            {item.description}
          </p>

          {item.tips && (
            <div className="bg-[#FFFDF7] border-2 border-[#FFE17D] rounded-2xl p-3.5 text-xs text-stone-800">
              <span className="font-black text-[#FF7A59]">Insider Tip: </span>
              <span>{item.tips}</span>
            </div>
          )}

          {/* Custom Photo URL Changer Toggle */}
          {onUpdatePhoto && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A59] hover:text-[#FF6040] transition-colors cursor-pointer"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{showCustomInput ? 'Hide photo customization' : 'Add custom photo from official site or TripAdvisor'}</span>
              </button>

              {showCustomInput && (
                <form onSubmit={handleApplyCustomPhoto} className="mt-3 bg-[#FAF4EA] p-4 rounded-2xl border border-[#EFE5D8] space-y-3 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-[11px] font-black text-[#2D241E] uppercase tracking-wider mb-1">
                      Direct Photo URL (from Official Website or TripAdvisor)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://.../photo.jpg"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-[#2D241E] uppercase tracking-wider mb-1">
                      Stated Source Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Official Place Website (domain.com) or TripAdvisor"
                      value={customSource}
                      onChange={(e) => setCustomSource(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF7A59]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="bg-[#FF7A59] hover:bg-[#FF6040] text-white font-black text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      Save Photo to Schedule
                    </button>
                    {saveSuccess && (
                      <span className="text-xs font-bold text-[#285A34] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Saved successfully!
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2.5">
            <a
              href={walkingDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#FF6040] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all border-b-2 border-[#E05030]"
            >
              <Navigation className="w-4 h-4" />
              <span>Walk Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={transitDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[#285A34] hover:bg-[#1E4327] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all border-b-2 border-[#1E4327]"
            >
              <Train className="w-4 h-4" />
              <span>Transit Route</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href={placeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-all border border-stone-300"
            >
              <MapPin className="w-3.5 h-3.5 text-stone-600" />
              <span>Google Maps Pin</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-all border border-stone-300"
            >
              <span>Apple Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
