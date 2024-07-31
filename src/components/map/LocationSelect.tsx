import KakaoMap from "./KaKaoMap";
import Modal from "../common/Modal";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  originPlaceId?: number | undefined;
  studyChannelId: number;
  setPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  isOpen,
  onClose,
  originPlaceId,
  studyChannelId,
  setPlaceId,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="w-[800px] max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-Blue-2 text-center mb-4">장소 선택</h1>
        <KakaoMap originPlaceId={originPlaceId} studyChannelId={studyChannelId} setPlaceId={setPlaceId} />
      </div>
    </Modal>
  );
};

export default LocationSelector;
