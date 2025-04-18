// src/pages/TrackProductPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getProductLocation } from '../../services/productService';
import { useSocket } from '../../hooks/useSocket';
import { useLocation, useParams } from 'react-router';
import { resturantDetailsFn } from '../../services/restaurant';

// Types
type Coordinates = [number, number];

// Constants
const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v12';
const FALLBACK_PRODUCT_LOCATION: Coordinates = [85.328, 27.72];
const FALLBACK_USER_LOCATION: Coordinates = [85.324, 27.7];
const ROUTE_LINE_STYLE = {
  id: 'route',
  type: 'line' as const,
  paint: {
    'line-color': '#1db7dd',
    'line-width': 5,
  },
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
};

// Delivery person settings
const DELIVERY_MARKER_COLOR = '#3bb54a';
const DUMMY_UPDATE_INTERVAL = 3000; // 3 seconds
const DUMMY_MOVEMENT_STEP = 0.001;

// Initialize Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const TrackProductPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order;


  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const socket = useSocket();
  const deliveryMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const dummyUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [productLocation, setProductLocation] = useState<Coordinates | null>([0,0]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
console.log(order,'passed data')


const getRestaurantLocation=async()=>{
  const restaurantDetails= await resturantDetailsFn(order?.products[0]?.product?.restaurant_id)
  console.log(restaurantDetails,'restaurant details')
  const Details=restaurantDetails.data.result
if (restaurantDetails.data.result) {
setProductLocation([Details?.lng, Details?.lat])

}
}
  // 1. Get user's location from browser
  useEffect(() => {
    if (!navigator.geolocation) {

      setLocationError('Geolocation is not supported by your browser');
      setUserLocation(FALLBACK_USER_LOCATION);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setUserLocation([position.coords.longitude, position.coords.latitude]);
      setLocationError(null);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.warn('Geolocation error:', error);
      setLocationError(`Error getting location: ${error.message}`);
      setUserLocation(FALLBACK_USER_LOCATION);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  useEffect(() => {
    getRestaurantLocation()
  },[order])
  // 2. Socket implementation (commented out - uncomment when backend is ready)
  /*
  useEffect(() => {
    if (!socket) return;

    const handleDeliveryUpdate = (data: any) => {
      if (data?.latitude && data?.longitude) {
        setDeliveryLocation([data.longitude, data.latitude]);
      }
    };

    socket.on('deliveryLocation', handleDeliveryUpdate);
    
    return () => {
      socket.off('deliveryLocation', handleDeliveryUpdate);
    };
  }, [socket]);
  */

  // 3. Dummy delivery movement (comment this out when using real socket)
  useEffect(() => {
    if (!productLocation || !userLocation) return;

    // Initialize near product location
    const initialLocation: Coordinates = [
      productLocation[0] - 0.002,
      productLocation[1] - 0.002
    ];
    setDeliveryLocation(initialLocation);

    // Set up movement towards user
    dummyUpdateIntervalRef.current = setInterval(() => {
      setDeliveryLocation(prev => {
        if (!prev || !userLocation) return prev;
        
        // Calculate direction
        const directionLng = userLocation[0] > prev[0] ? 1 : -1;
        const directionLat = userLocation[1] > prev[1] ? 1 : -1;
        
        // Move towards user
        const newLng = prev[0] + (DUMMY_MOVEMENT_STEP * directionLng);
        const newLat = prev[1] + (DUMMY_MOVEMENT_STEP * directionLat);
        
        // Stop when close to user
        const distance = Math.sqrt(
          Math.pow(userLocation[0] - newLng, 2) + 
          Math.pow(userLocation[1] - newLat, 2))
        ;
        
        if (distance < DUMMY_MOVEMENT_STEP * 2) {
          if (dummyUpdateIntervalRef.current) {
            clearInterval(dummyUpdateIntervalRef.current);
          }
          return userLocation;
        }
        
        return [newLng, newLat];
      });
    }, DUMMY_UPDATE_INTERVAL);

    return () => {
      if (dummyUpdateIntervalRef.current) {
        clearInterval(dummyUpdateIntervalRef.current);
      }
    };
  }, [productLocation, userLocation]);

  // 4. Fetch product location
  // useEffect(() => {
  //   const fetchProductLocation = async () => {
  //     try {
  //       const { data } = await getProductLocation(id!);
  //       if (data?.latitude && data?.longitude) {
  //         setProductLocation([data.longitude, data.latitude]);
  //       } else {
  //         setProductLocation(FALLBACK_PRODUCT_LOCATION);
  //       }
  //     } catch (err) {
  //       console.warn('Using fallback product location:', err);
  //       setProductLocation(FALLBACK_PRODUCT_LOCATION);
  //     }
  //   };
    
  //   fetchProductLocation();
  // }, [id]);

  // 5. Initialize map and markers
  useEffect(() => {
    if (!productLocation || !userLocation || !mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: userLocation,
      zoom: 13,
    });

    // Helper to add markers
    const addMarker = (coordinates: Coordinates, color: string, label: string) => {
      return new mapboxgl.Marker({ color })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setText(label))
        .addTo(map.current!);
    };

    // Add static markers
    addMarker(userLocation, 'blue', 'Your Location');
    addMarker(productLocation, 'red', 'Product Location');

    // Add delivery marker if available
    if (deliveryLocation) {
      deliveryMarkerRef.current = addMarker(
        deliveryLocation,
        DELIVERY_MARKER_COLOR,
        'Delivery Person'
      );
    }

    // Add route
    const fetchAndDisplayRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${productLocation[0]},${productLocation[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        const route = data.routes?.[0]?.geometry;

        if (!route || !map.current) return;

        map.current.on('load', () => {
          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            },
          });

          map.current!.addLayer(ROUTE_LINE_STYLE);
        });
      } catch (err) {
        console.warn('Route fetch error:', err);
      }
    };

    fetchAndDisplayRoute();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [productLocation, userLocation]);

  // 6. Update delivery marker position
  useEffect(() => {
    if (!deliveryLocation || !deliveryMarkerRef.current) return;
    
    deliveryMarkerRef.current.setLngLat(deliveryLocation);
    
    // Optional: Center map on delivery person occasionally
    if (map.current && Math.random() > 0.7) {
      map.current.flyTo({
        center: deliveryLocation,
        essential: true
      });
    }
  }, [deliveryLocation]);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {locationError && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1,
          background: 'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
          {locationError}
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="map-container" 
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default TrackProductPage;