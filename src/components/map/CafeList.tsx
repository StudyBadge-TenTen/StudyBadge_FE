import React, { useEffect, useState } from "react";
import { LocateType } from "../../services/location-api";
import CustomOverlay from "./CustomOverlay";
import ReactDOM from "react-dom/client";

interface CafeListProps {
  studyChannelId: number;
  map: kakao.maps.Map | null;
  handlePlaceSelect: (
    e: React.MouseEvent<HTMLButtonElement>,
    studyChannelId: number,
    cafe: LocateType,
  ) => Promise<void>;
  originMarker?: kakao.maps.Marker;
  onSelectCafe: React.Dispatch<React.SetStateAction<LocateType | null>>;
}

const CafeList: React.FC<CafeListProps> = ({ studyChannelId, map, handlePlaceSelect, originMarker, onSelectCafe }) => {
  const [selectedCafe, setSelectedCafe] = useState<LocateType | null>(null);

  useEffect(() => {
    if (selectedCafe) {
      onSelectCafe(selectedCafe);
    }
  }, [selectedCafe, onSelectCafe]);

  useEffect(() => {
    if (!map) return;

    const places = new kakao.maps.services.Places(map);
    const markers: kakao.maps.Marker[] = []; // 생성된 마커를 관리하는 배열

    const displayMarkers = () => {
      // 기존의 마커들을 모두 제거
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0; // 배열 초기화

      // 현재 맵의 경계(bounds)를 가져옴
      // const bounds = map.getBounds();
      // const swLatLng = bounds.getSouthWest();
      // const neLatLng = bounds.getNorthEast();
      // console.log(swLatLng, neLatLng);

      // 카테고리 "카페"로 찾아 마커로 표시하고 커스텀 오버레이로 표현
      places.categorySearch(
        "CE7",
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            data.forEach((place) => {
              const markerPosition = new kakao.maps.LatLng(place.y, place.x);
              const marker = new kakao.maps.Marker({
                map: map,
                position: markerPosition,
              });

              markers.push(marker); // 새로 생성된 마커를 배열에 추가

              kakao.maps.event.addListener(marker, "click", () => {
                const postCafeInfo: LocateType = {
                  lat: place.y,
                  lng: place.x,
                  placeName: place.place_name,
                  placeAddress: place.address_name,
                };
                setSelectedCafe(postCafeInfo);

                const content = document.createElement("div");
                const customOverlay = new kakao.maps.CustomOverlay({
                  map: map,
                  position: marker.getPosition(),
                  content: content,
                });

                const overlayContent = (
                  <CustomOverlay
                    placeName={place.place_name}
                    placeAddress={place.address_name}
                    placeWebsite={place.place_url || ""}
                    onClose={() => {
                      customOverlay.setMap(null);
                    }}
                    studyChannelId={studyChannelId}
                    handlePlaceSelect={handlePlaceSelect}
                    selectedCafe={postCafeInfo}
                  />
                );

                const contentElement = customOverlay.getContent() as HTMLElement;
                contentElement.classList.add("absolute", "z-50", "bottom-1/2", "right-[-8rem]");
                const root = ReactDOM.createRoot(content);
                root.render(overlayContent);
              });
            });
          } else {
            console.log("Category search failed with status:", status);
          }
        },
        {
          useMapBounds: true, // 현재 맵의 경계를 기반으로 검색
        },
      );
    };

    // 최초 마커 표시
    displayMarkers();

    // 맵의 시점이 변경될 때마다 마커 갱신
    kakao.maps.event.addListener(map, "dragend", displayMarkers);
    kakao.maps.event.addListener(map, "zoom_changed", displayMarkers);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      kakao.maps.event.removeListener(map, "dragend", displayMarkers);
      kakao.maps.event.removeListener(map, "zoom_changed", displayMarkers);
      markers.forEach((marker) => marker.setMap(null)); // 맵에서 마커 제거
    };
  }, [map, originMarker]);

  return null;
};

export default CafeList;
