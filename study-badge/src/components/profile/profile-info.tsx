import React from "react";

const ProfileInfo: React.FC = (): JSX.Element => {
  return (
    <div className="profile-info">
      <h2 className="text-xl font-semibold mb-2">사용자 정보</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Label Name</label>
          <input type="text" className="border border-gray-300 p-2 rounded w-full" placeholder="Placeholder" />
        </div>
        <div>
          <label className="block text-gray-700">Label Name</label>
          <input type="text" className="border border-gray-300 p-2 rounded w-full" placeholder="Placeholder" />
        </div>
        <div>
          <label className="block text-gray-700">Label Name</label>
          <input type="text" className="border border-gray-300 p-2 rounded w-full" placeholder="Placeholder" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
