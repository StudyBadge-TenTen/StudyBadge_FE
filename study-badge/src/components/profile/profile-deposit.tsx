import React from "react";

const ProfileDeposit: React.FC = () => {
  return (
    <div className="border border-gray-300 p-4" style={{ width: "700px", height: "200px" }}>
      <h2 className="text-xl font-semibold mb-4">예치금</h2>
      <div className="flex items-center h-full justify-between">
        <p className="text-gray-700">예치금: 5,000 포인트</p>
      </div>
    </div>
  );
};

export default ProfileDeposit;
