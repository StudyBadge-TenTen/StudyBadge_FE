import React, { useEffect, useRef } from 'react';
import { useMapStore } from '../../store/map-store';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { locates, selectedLocates, fetchLocates, selectLocate } = useMapStore();

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 14,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = new window.naver.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            map.setCenter(userLocation);
            fetchLocates(position.coords.latitude, position.coords.longitude);
          },
          () => {
            console.error('Unable to retrieve your location');
          }
        );
      }

      locates.forEach((locates) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(locates.lat, locates.lng),
          map: map,
        });

        window.naver.maps.Event.addListener(marker, 'click', () => selectLocate(locates));
      });
    };

    initializeMap();
  }, [locates, fetchLocates, selectLocate]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;