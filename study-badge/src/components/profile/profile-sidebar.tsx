import React from "react";
import useProfileEditStore from "../../store/profile-edit";

const ProfileSidebar: React.FC = () => {
  const { toggleViewPayments, toggleViewProfile } = useProfileEditStore();

  return (
    <aside className="w-full md:w-1/4 border border-gray-300 p-4">
      <button onClick={toggleViewProfile} className="w-full mb-2 p-2 border border-gray-300 hover:bg-gray-200">
        Edit Profile
      </button>
      <button onClick={toggleViewPayments} className="w-full p-2 border border-gray-300 hover:bg-gray-200">
        결제 내역
      </button>
    </aside>
  );
};

export default ProfileSidebar;
