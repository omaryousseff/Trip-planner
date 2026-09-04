import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { ScheduleItem } from '../types';

interface InteractiveMapProps {
  items: Array<ScheduleItem & { resolvedCoords: { lat: number, lng: number }, displayIndex: number }>;
  activeItemIndex: number | null;
  onMarkerClick: (index: number) => void;
  travelMode: 'walking' | 'transit' | 'driving';
}

function Directions({ items, travelMode }: { items: InteractiveMapProps['items'], travelMode: string }) {
  const map = useMap();
  const geometryLib = useMapsLibrary('geometry');
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !geometryLib || items.length < 2) {
      if (polyline) polyline.setMap(null);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    let apiTravelMode = 'WALK';
    if (travelMode === 'driving') apiTravelMode = 'DRIVE';
    if (travelMode === 'transit') apiTravelMode = 'TRANSIT';

    const origin = items[0].resolvedCoords;
    const destination = items[items.length - 1].resolvedCoords;
    const intermediates = items.slice(1, -1).map(item => ({
      location: { latLng: { latitude: item.resolvedCoords.lat, longitude: item.resolvedCoords.lng } }
    }));

    const body = {
      origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
      destination: { location: { latLng: { latitude: destination.lat, longitude: destination.lng } } },
      intermediates,
      travelMode: apiTravelMode
    };

    let active = true;

    fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.polyline.encodedPolyline'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      if (!active) return;
      if (data.routes && data.routes.length > 0 && data.routes[0].polyline) {
        const encodedPath = data.routes[0].polyline.encodedPolyline;
        const path = geometryLib.encoding.decodePath(encodedPath);
        
        if (polyline) {
          polyline.setPath(path);
        } else {
          const newPolyline = new google.maps.Polyline({
            path,
            map,
            strokeColor: '#FF7A59',
            strokeWeight: 4,
            strokeOpacity: 0.8
          });
          setPolyline(newPolyline);
        }
      } else {
        if (polyline) polyline.setPath([]);
      }
    })
    .catch(e => console.warn('Routes API failed:', e));

    return () => {
      active = false;
    };
  }, [map, geometryLib, items, travelMode]);

  // Clean up polyline on unmount
  useEffect(() => {
    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [polyline]);

  return null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ items, activeItemIndex, onMarkerClick, travelMode }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-stone-100 rounded-[20px] border-2 border-stone-200">
        <h3 className="text-xl font-black text-stone-800 mb-2">Interactive Map Requires API Key</h3>
        <p className="text-sm font-medium text-stone-500 max-w-md">
          To see the real, interactive route, please add your Google Maps Platform Demo Key to the <strong className="text-stone-700">VITE_GOOGLE_MAPS_API_KEY</strong> environment variable in your project settings.
        </p>
      </div>
    );
  }

  // Calculate center of all items
  const center = items.length > 0 
    ? items.reduce((acc, curr) => ({ lat: acc.lat + curr.resolvedCoords.lat, lng: acc.lng + curr.resolvedCoords.lng }), { lat: 0, lng: 0 }) 
    : { lat: 0, lng: 0 };
    
  if (items.length > 0) {
    center.lat /= items.length;
    center.lng /= items.length;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map 
        defaultCenter={center} 
        defaultZoom={13} 
        mapId="DEMO_MAP_ID"
        className="w-full h-full min-h-[400px] rounded-[20px] overflow-hidden"
        gestureHandling="greedy"
        disableDefaultUI={true}
        internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
      >
        {items.map((item, index) => {
          const isSelected = activeItemIndex === index;
          return (
            <AdvancedMarker
              key={item.id}
              position={item.resolvedCoords}
              onClick={() => onMarkerClick(index)}
              zIndex={isSelected ? 100 : 1}
            >
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${isSelected ? 'bg-[#2D241E] border-white scale-125 shadow-lg' : 'bg-[#FF7A59] border-white shadow-md'}`}>
                <span className="text-white font-black text-xs">{item.displayIndex}</span>
              </div>
            </AdvancedMarker>
          );
        })}
        <Directions items={items} travelMode={travelMode} />
      </Map>
    </APIProvider>
  );
};
