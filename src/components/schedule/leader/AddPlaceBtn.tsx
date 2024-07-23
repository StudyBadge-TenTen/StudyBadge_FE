import { useEffect, useState } from "react";
import LocationSelector from "../../map/LocationSelect";

interface AddPlaceBtnPropsType {
  setPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
  originPlaceId?: number;
  studyChannelId: number;
}

const AddPlaceBtn = ({ setPlaceId, originPlaceId, studyChannelId }: AddPlaceBtnPropsType): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 기존 장소 id
  useEffect(() => {
    console.log(originPlaceId);
  }, [originPlaceId]);

  return (
    <div className="w-full px-6 mt-8">
      <span className="mr-12">장소</span>
      <button type="button" onClick={openModal} className="btn-blue px-12">
        지도에서 선택
      </button>
      {isModalOpen && (
        <LocationSelector
          isOpen={isModalOpen}
          onClose={closeModal}
          studyChannelId={studyChannelId}
          setPlaceId={setPlaceId}
        />
      )}
    </div>
  );
};

export default AddPlaceBtn;
