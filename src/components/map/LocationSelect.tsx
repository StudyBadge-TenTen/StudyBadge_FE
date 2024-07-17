import React from 'react';
import NaverMap from './NaverMap';
import CafeList from './List';
import Modal from '../common/Modal';

interface StudyCafeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudyCafeSelector: React.FC<StudyCafeSelectorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="w-[800px] max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">장소 선택</h1>
        <NaverMap />
        <CafeList />
      </div>
    </Modal>
  );
};

export default StudyCafeSelector;