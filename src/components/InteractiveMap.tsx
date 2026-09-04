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
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ 
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#FF7A59',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || items.length < 2) {
      if (directionsRenderer) directionsRenderer.setDirections(null);
      return;
    }

    const origin = items[0].resolvedCoords;
    const destination = items[items.length - 1].resolvedCoords;
    const waypoints = items.slice(1, -1).map(item => ({
      location: item.resolvedCoords,
      stopover: true
    }));

    let googleTravelMode = google.maps.TravelMode.WALKING;
    if (travelMode === 'driving') googleTravelMode = google.maps.TravelMode.DRIVING;
    if (travelMode === 'transit') googleTravelMode = google.maps.TravelMode.TRANSIT;

    directionsService.route({
      origin,
      destination,
      waypoints,
      travelMode: googleTravelMode
    }).then(response => {
      directionsRenderer.setDirections(response);
    }).catch(e => {
      console.warn("Directions request failed:", e);
    });
  }, [directionsService, directionsRenderer, items, travelMode]);

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
