interface CustomOverlayProps {
  overlay: kakao.maps.CustomOverlay;
  placeName: string;
  placeAddress: string;
  placeWebsite: string;
  onClose: () => void;
  handlePlaceSelect: () => Promise<void>;
}

const CustomOverlay = ({
  overlay,
  placeName,
  placeAddress,
  placeWebsite,
  onClose,
  handlePlaceSelect,
}: CustomOverlayProps): JSX.Element => {
  const closeOverlay = () => {
    overlay.setMap(null);
    onClose();
  };

  return (
    <div className="wrap w-[250px] h-fit bg-white rounded-[30px] shadow-card relative">
      <div className="info">
        <div className="title w-full h-fit bg-Blue-2 text-white p-1 py-2 rounded-t-[30px] text-center flex flex-col justify-center items-center">
          <button
            className="inline-block text-black close px-2 mr-3 bg-white rounded-full self-end"
            onClick={closeOverlay}
            title="닫기"
          >
            X
          </button>
          {placeName}
        </div>
        <div className="body p-4">
          <div className="desc flex flex-col justify-center items-center">
            <div className="ellipsis mb-2">{placeAddress}</div>
            <div className="text-center text-Blue-2 hover:text-Red-2">
              <a href={placeWebsite} target="_blank" className="link" rel="noopener noreferrer">
                리뷰보기
              </a>
            </div>
            <button
              onClick={() => {
                handlePlaceSelect();
                closeOverlay();
              }}
              className="btn-blue mt-4"
            >
              스터디 장소로 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOverlay;
