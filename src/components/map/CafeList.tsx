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

    // 기존에 등록한 장소에 해당하는 마커일 경우
    if (originMarker) {
      // console.log(originMarker);
    }

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
              // console.log("Marker clicked");

              const postCafeInfo: LocateType = {
                lat: place.y,
                lng: place.x,
                placeName: place.place_name,
                placeAddress: place.address_name,
              };
              setSelectedCafe(postCafeInfo);
              // console.log("Cafe Info:", postCafeInfo);

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
                    // console.log("Overlay closed");
                    customOverlay.setMap(null);
                  }}
                  studyChannelId={studyChannelId}
                  handlePlaceSelect={handlePlaceSelect}
                  selectedCafe={postCafeInfo}
                />
              );

              const contentElement = customOverlay.getContent() as HTMLElement;
              // console.log("Overlay Content Element:", contentElement);
              contentElement.classList.add("absolute", "z-50", "bottom-1/2", "right-[-8rem]");
              const root = ReactDOM.createRoot(content);
              root.render(overlayContent);
            });
          });
        } else {
          console.log("Category search failed with status:", status);
        }
      },
      { useMapBounds: true },
    );
  }, [map, originMarker]);

  return null;
};

export default CafeList;

// import React, { useEffect, useState } from "react";
// import { LocateType } from "../../services/location-api";
// import CustomOverlay from "./CustomOverlay";
// import ReactDOM from "react-dom/client";

// interface CafeListProps {
//   studyChannelId: number;
//   map: kakao.maps.Map | null;
//   handlePlaceSelect: (studyChannelId: number, cafe: LocateType) => Promise<void>;
//   originMarker?: kakao.maps.Marker;
//   onSelectCafe: React.Dispatch<React.SetStateAction<LocateType | null>>;
// }

// const CafeList: React.FC<CafeListProps> = ({ studyChannelId, map, handlePlaceSelect, originMarker, onSelectCafe }) => {
//   const [selectedCafe, setSelectedCafe] = useState<LocateType>();

//   useEffect(() => {
//     if (selectedCafe) {
//       onSelectCafe(() => selectedCafe);
//     }
//   }, [selectedCafe, onSelectCafe]);

//   useEffect(() => {
//     if (!map) return;

//     // 기존에 등록한 장소에 해당하는 마커일 경우
//     if (originMarker) {
//       console.log(originMarker);
//     }

//     kakao.maps.load(() => {
//       const places = new kakao.maps.services.Places(map);

//       // 카테고리 "카페"로 찾아 마커로 표시하고 커스텀 오버레이로 표현
//       places.categorySearch(
//         "CE7",
//         (data, status) => {
//           if (status === kakao.maps.services.Status.OK) {
//             data.forEach((place) => {
//               const markerPosition = new kakao.maps.LatLng(place.y, place.x);
//               const marker = new kakao.maps.Marker({
//                 map: map,
//                 position: markerPosition,
//               });

//               kakao.maps.event.addListener(marker, "click", () => {
//                 console.log("Marker clicked");

//                 const postCafeInfo: LocateType = {
//                   lat: place.y,
//                   lng: place.x,
//                   placeName: place.place_name,
//                   placeAddress: place.address_name,
//                 };
//                 setSelectedCafe(postCafeInfo);
//                 console.log("Cafe Info:", postCafeInfo);

//                 const overlay = new kakao.maps.CustomOverlay({
//                   map: map,
//                   position: marker.getPosition(),
//                   content: document.createElement("div"),
//                 });

//                 const overlayContent = (
//                   <CustomOverlay
//                     placeName={place.place_name}
//                     placeAddress={place.address_name}
//                     placeWebsite={place.place_url || ""}
//                     onClose={() => {
//                       console.log("Overlay closed");
//                       overlay.setMap(null);
//                     }}
//                     studyChannelId={studyChannelId}
//                     handlePlaceSelect={handlePlaceSelect}
//                     selectedCafe={selectedCafe}
//                   />
//                 );

//                 const contentElement = overlay.getContent() as HTMLElement;
//                 console.log("Overlay Content Element:", contentElement);
//                 contentElement.classList.add("absolute", "z-50", "bottom-1/2", "right-[-8rem]");
//                 const root = ReactDOM.createRoot(contentElement);
//                 root.render(overlayContent);

//                 overlay.setMap(map); // Show the overlay on the map
//               });
//             });
//           } else {
//             console.log("Category search failed with status:", status);
//           }
//         },
//         { useMapBounds: true },
//       );
//     });
//   }, [map, handlePlaceSelect, originMarker]);

//   return null;
// };

// export default CafeList;
