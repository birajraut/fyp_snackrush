import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface MapComponentProps {
  productLocation: Location | null;
  accessToken: string;
}

const MapComponent = ({ productLocation, accessToken }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
      accessToken: accessToken
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      if (!map.getSource('route')) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          }
        });
      }
    
      if (!map.getLayer('route')) {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 4,
            'line-opacity': 0.8
          }
        });
      }
    
      setMapLoaded(true);
    });
    

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`)
            .then(res => res.json())
            .then(data => {
              const address = data.features[0]?.place_name || 'Your location';
              const location = { lat: latitude, lng: longitude, address };
              const route = data.routes[0].geometry;

              setUserLocation(location);
              addMarker(longitude, latitude, address, 'user');
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setMapLoaded(false);
    };
  }, [accessToken]);

  useEffect(() => {
    if (!mapLoaded) return;

    if (userLocation && productLocation) {
      addMarker(productLocation.lng, productLocation.lat, productLocation.address, 'product');
      calculateRoute(userLocation, productLocation);
    } else if (userLocation) {
      mapRef.current?.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 14
      });
    } else if (productLocation) {
      mapRef.current?.flyTo({
        center: [productLocation.lng, productLocation.lat],
        zoom: 14
      });
    }
  }, [userLocation, productLocation, mapLoaded]);

  const addMarker = (lng: number, lat: number, address: string, type: 'user' | 'product') => {
    if (!mapRef.current) return;

    markersRef.current = markersRef.current.filter(marker => {
      const markerType = marker.getElement()?.getAttribute('data-type');
      if (markerType === type) {
        marker.remove();
        return false;
      }
      return true;
    });

    const el = document.createElement('div');
    el.className = `w-4 h-4 rounded-full ${type === 'user' ? 'bg-blue-500 border-2 border-white' : 'bg-red-500 border-2 border-white'}`;
    el.setAttribute('data-type', type);

    const marker = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<p>${address}</p>`))
      .addTo(mapRef.current);

    markersRef.current.push(marker);
  };

  const calculateRoute = (start: Location, end: Location) => {
    if (!mapRef.current || !mapRef.current.getSource('route')) return;

    const coordinates = `${start.lng}%2C${start.lat}%3B${end.lng}%2C${end.lat}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(`Map driving fetched`);

        const distance = data.routes[0].distance; // meters
        const duration = data.routes[0].duration; // seconds
      
        console.log(`Distance: ${(distance / 1000).toFixed(2)} km`);
        console.log(`Estimated time: ${(duration / 60).toFixed(1)} minutes`);
        // if (!mapRef.current || !mapRef.current.getSource('route')) return;

        const route = data.routes[0].geometry;
        console.log(route,'route ');

        const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
          type: 'Feature',
          properties: {},
          geometry: route
        };

        const source = mapRef.current.getSource('route') as mapboxgl.GeoJSONSource;
        source.setData(geojson);

        const coords = route.coordinates;
        const bounds = coords.reduce(
          (b: mapboxgl.LngLatBounds, coord: [number, number]) => b.extend(coord),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        );

        mapRef.current?.fitBounds(bounds, {
          padding: 50
        });
      })
      .catch(err => {
        console.error('Error calculating route:', err);
      });
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        {userLocation && (
          <div className="mb-2">
            <p className="font-medium">Your Location:</p>
            <p>{userLocation.address}</p>
            <p className="text-sm text-gray-500">
              Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
            </p>
          </div>
        )}
        {productLocation && (
          <div>
            <p className="font-medium">Product Location:</p>
            <p>{productLocation.address}</p>
            <p className="text-sm text-gray-500">
              Latitude: {productLocation.lat.toFixed(6)}, Longitude: {productLocation.lng.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      {/* <div ref={mapContainerRef} className="h-96 w-full rounded-lg" /> */}
    </div>
  );
};

export default MapComponent;
