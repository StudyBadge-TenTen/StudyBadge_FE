import React from "react";

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-Gray-3 bg-opacity-25 z-40 flex justify-center items-center">
      <div className="w-fit min-h-fit p-8 bg-white opacity-100 border border-solid border-Gray-2 rounded-[30px] fixed z-50 flex flex-col relative">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            X
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
