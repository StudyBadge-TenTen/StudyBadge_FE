import React, { useEffect, useState } from "react";
import CafeList from "./CafeList";
import { LocateType, postLocate, fetchLocate } from "../../services/location-api";
import { useGetStudyInfo } from "@/hooks/useQuery";

interface KakaoMapProps {
  originPlaceId?: number;
  studyChannelId: number;
  onClose: () => void;
  setPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const KakaoMap = ({ originPlaceId, studyChannelId, onClose, setPlaceId }: KakaoMapProps): JSX.Element => {
  const { data: studyInfo, isLoading: isStudyInfoLoading } = useGetStudyInfo(studyChannelId);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [originMarker, setOriginMarker] = useState<kakao.maps.Marker | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<LocateType | null>(null);

  useEffect(() => {
    if (typeof kakao === "undefined" || !kakao.maps) {
      console.error("Kakao maps API is not loaded");
      return;
    }

    if (isStudyInfoLoading || !studyInfo) return;

    const initializeMap = (lat: number, lng: number) => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      if (mapContainer) {
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        if (originPlaceId) {
          fetchLocate(studyChannelId, originPlaceId)
            .then((locateInfo) => {
              if (locateInfo) {
                const marker = new kakao.maps.Marker({
                  position: new kakao.maps.LatLng(locateInfo.lat, locateInfo.lng),
                  map: map,
                  title: locateInfo.placeName,
                });
                setOriginMarker(() => marker);
                setSelectedCafe(locateInfo);
                map.setCenter(new kakao.maps.LatLng(locateInfo.lat, locateInfo.lng));
                map.setLevel(3);
              }
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
            });
        }
      }
    };

    window.kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      if (studyInfo.region) {
        geocoder.addressSearch(studyInfo.region, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));
            initializeMap(coords.getLat(), coords.getLng());
          } else {
            // 기본 위치로 설정 (서울 시청)
            initializeMap(37.5665, 126.978);
          }
        });
      } else {
        // 기본 위치로 설정 (서울 시청)
        initializeMap(37.5665, 126.978);
      }
    });
  }, [originPlaceId, studyChannelId, studyInfo, isStudyInfoLoading]);

  const handleCafeSelect = (cafe: LocateType) => {
    console.log(cafe); // 디버깅로그
    setSelectedCafe(cafe);
  };

  const handlePlaceSelect = async (studyChannelId: number, selectedCafe: LocateType | null) => {
    if (!selectedCafe) return;
    try {
      const response = await postLocate(studyChannelId, selectedCafe);
      if (response) {
        const placeId = response.id;
        setPlaceId(() => placeId);
        console.log("Selected place ID:", placeId); // 디버깅로그
        onClose();
      }
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {originMarker ? (
        <CafeList
          studyChannelId={studyChannelId}
          map={map}
          selectedCafe={selectedCafe}
          onSelectCafe={handleCafeSelect}
          handlePlaceSelect={handlePlaceSelect}
          originMarker={originMarker}
        />
      ) : (
        <CafeList
          studyChannelId={studyChannelId}
          map={map}
          selectedCafe={selectedCafe}
          onSelectCafe={handleCafeSelect}
          handlePlaceSelect={handlePlaceSelect}
        />
      )}
    </div>
  );
};

export default KakaoMap;
