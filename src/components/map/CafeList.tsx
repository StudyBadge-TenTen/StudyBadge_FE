import React, { useEffect } from "react";
import { LocateType } from "../../services/location-api";
import CustomOverlay from "./CustomOverlay";
import ReactDOM from "react-dom/client";

interface CafeListProps {
  map: kakao.maps.Map | null;
  onSelectCafe: (cafe: LocateType) => void;
  handlePlaceSelect: () => Promise<void>;
  originMarker?: kakao.maps.Marker;
}

const CafeList: React.FC<CafeListProps> = ({ map, onSelectCafe, handlePlaceSelect, originMarker }) => {
  useEffect(() => {
    if (!map) return;

    // 기존에 등록한 장소에 해당하는 마커일 경우
    if (originMarker) {
      console.log(originMarker);
    }

    kakao.maps.load(() => {
      const places = new kakao.maps.services.Places(map);

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

              kakao.maps.event.addListener(marker, "click", () => {
                const postCafeInfo = {
                  lat: place.y,
                  lng: place.x,
                  placeName: place.place_name,
                  placeAddress: place.address_name,
                };
                onSelectCafe(postCafeInfo);
                const overlay = new kakao.maps.CustomOverlay({
                  map: map,
                  position: marker.getPosition(),
                  content: document.createElement("div"),
                });

                const overlayContent = (
                  <CustomOverlay
                    overlay={overlay}
                    placeName={place.place_name}
                    placeAddress={place.address_name}
                    placeWebsite={place.place_url || ""}
                    onClose={() => overlay.setMap(null)}
                    handlePlaceSelect={handlePlaceSelect}
                  />
                );

                const contentElement = overlay.getContent() as HTMLElement;
                contentElement.classList.add("absolute");
                contentElement.classList.add("z-50");
                contentElement.classList.add("bottom-1/2");
                contentElement.classList.add("right-[-8rem]");
                const root = ReactDOM.createRoot(contentElement);
                root.render(overlayContent);

                overlay.setMap(map);
              });
            });
          }
        },
        { useMapBounds: true },
      );
    });
  }, [map, onSelectCafe]);

  return null;
};

export default CafeList;
