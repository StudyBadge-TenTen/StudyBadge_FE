import React from "react";

const Modal = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <div className="outside-modal fixed top-0 left-0 w-screen h-screen bg-Gray-3 bg-opacity-25 z-40 flex justify-center items-center">
        <div className="w-fit min-h-fit p-8 bg-white opacity-100 border border-solid border-Gray-2 rounded-[30px] fixed z-50 flex flex-col">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
