import { LocateType } from "@/services/location-api";

interface CustomOverlayProps {
  placeName: string;
  placeAddress: string;
  placeWebsite: string;
  onClose: () => void;
  studyChannelId: number;
  handlePlaceSelect: (
    e: React.MouseEvent<HTMLButtonElement>,
    studyChannelId: number,
    cafe: LocateType,
  ) => Promise<void>;
  selectedCafe: LocateType | undefined;
}

const CustomOverlay = ({
  placeName,
  placeAddress,
  placeWebsite,
  onClose,
  studyChannelId,
  handlePlaceSelect,
  selectedCafe,
}: CustomOverlayProps): JSX.Element => {
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>, selectedCafe: LocateType) => {
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    if (selectedCafe) {
      // 서버로 장소 등록
      await handlePlaceSelect(e, studyChannelId, selectedCafe);

      // 커스텀 오버레이와 맵 모달이 닫히도록
      onClose();
      if (modalCloseBtn) {
        modalCloseBtn.click();
      }
    }
  };

  return (
    <div className="wrap w-[250px] h-fit bg-white rounded-[30px] shadow-card relative">
      <div className="info">
        <div className="title w-full h-fit bg-Blue-2 text-white p-1 py-2 rounded-t-[30px] text-center flex flex-col justify-center items-center">
          <button
            className="inline-block text-black close px-2 mr-3 bg-white rounded-full self-end"
            onClick={onClose}
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
            {selectedCafe && (
              <button
                onClick={(e) => {
                  handleButtonClick(e, selectedCafe);
                }}
                className="btn-blue mt-4"
              >
                스터디 장소로 선택
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOverlay;
