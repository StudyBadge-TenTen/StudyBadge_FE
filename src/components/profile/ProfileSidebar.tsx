import React from "react";
import useProfileStore from "../../store/profile-store";

const ProfileSidebar: React.FC = () => {
  const { isOpen, toggleSidebar } = useProfileStore((state) => ({
    isOpen: state.isOpen,
    toggleSidebar: state.toggleSidebar,
  }));

  return (
    <div className="md:relative border border-gray-300 mt-8">
      <button className="block md:hidden p-2 bg-gray-800 text-white rounded" onClick={toggleSidebar}>
        Menu
      </button>
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-[220px] bg-white border border-gray-300 p-4 fixed md:relative top-0 left-0 z-10`}
      >
        <ul>
          <li className="mb-2">
            <button className="w-full h-[40px] text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none box-border border border-gray-300">
              Edit Profile
            </button>
          </li>
          <li className="mb-2">
            <button className="w-full h-[40px] text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none box-border border border-gray-300">
              결제 내역
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default ProfileSidebar;
