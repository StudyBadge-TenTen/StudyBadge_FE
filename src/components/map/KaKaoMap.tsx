import React, { useEffect, useState } from "react";
import CafeList from "./CafeList";
import { LocateType, postLocate, fetchLocate } from "../../services/location-api";

interface KakaoMapProps {
  originPlaceId?: number;
  studyChannelId: number;
  onClose: () => void;
  setPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const KakaoMap = ({ originPlaceId, studyChannelId, onClose, setPlaceId }: KakaoMapProps): JSX.Element => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [originMarker, setOriginMarker] = useState<kakao.maps.Marker | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<LocateType | null>(null);

  useEffect(() => {
    if (typeof kakao === "undefined" || !kakao.maps) {
      console.error("Kakao maps API is not loaded");
      return;
    }

    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      if (mapContainer) {
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        if (originPlaceId) {
          fetchLocate(studyChannelId, originPlaceId)
            .then((locateInfo) => {
              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(locateInfo.lat, locateInfo.lng),
                map: map,
                title: locateInfo.placeName,
              });
              setOriginMarker(() => marker);
              setSelectedCafe(locateInfo);
              map.setCenter(new kakao.maps.LatLng(locateInfo.lat, locateInfo.lng));
              map.setLevel(3);
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
            });
        }
      }
    });
  }, [originPlaceId, studyChannelId]);

  const handleCafeSelect = (cafe: LocateType) => {
    console.log(cafe);
    setSelectedCafe(cafe);
  };

  const handlePlaceSelect = async () => {
    if (!selectedCafe) return;
    try {
      const response = await postLocate(studyChannelId, selectedCafe);
      const placeId = response.placeId;
      setPlaceId(() => placeId);
      console.log("Selected place ID:", placeId);
      onClose();
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {originMarker ? (
        <CafeList
          map={map}
          onSelectCafe={handleCafeSelect}
          handlePlaceSelect={handlePlaceSelect}
          originMarker={originMarker}
        />
      ) : (
        <CafeList map={map} onSelectCafe={handleCafeSelect} handlePlaceSelect={handlePlaceSelect} />
      )}
    </div>
  );
};

export default KakaoMap;
