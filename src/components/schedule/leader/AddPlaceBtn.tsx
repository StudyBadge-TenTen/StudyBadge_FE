import React, { useState } from 'react';
import StudyCafeSelector from '../../map/LocationSelect';

const AddPlaceBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full px-6 mt-8">
      <span className="mr-12">장소</span>
      <button 
        type="button" 
        onClick={openModal}
        className="btn-blue px-12">
        지도에서 선택
      </button>
      <StudyCafeSelector isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddPlaceBtn;
