import React, { useState } from "react";
import ProfileSidebar from "../components/profile/profile-sidebar";
import ProfilePhoto from "../components/profile/profile-photo";
import ProfileHeader from "../components/profile/profile-header";
import ProfileDeposit from "../components/profile/profile-deposit";
import useProfileEditStore from "../store/profile-edit";

const Profile: React.FC = () => {
  const { isEditing, isViewingPayments, isViewingProfile, toggleEditMode, toggleViewProfile, nickname, setNickname } =
    useProfileEditStore();
  const [newNickname, setNewNickname] = useState(nickname);

  const handleSave = () => {
    setNickname(newNickname);
    toggleEditMode();
    toggleViewProfile();
  };

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <ProfileHeader />
        <div className="flex flex-col md:flex-row mt-4 md:mt-8">
          <ProfileSidebar />
          <div className="flex-1 md:ml-4 lg:ml-8">
            <div className="bg-white border border-gray-300 p-4 md:p-6 mb-4 md:mb-8">
              {isViewingProfile && !isEditing && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">프로필 사진</h2>
                  <div className="flex items-center">
                    <ProfilePhoto />
                    <div className="ml-8 flex items-center">
                      <div className="mr-8 border border-gray-300 p-2">
                        <p>{nickname}</p>
                      </div>
                      <div className="border border-gray-300 p-2">
                        <p>뱃지 이미지</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={toggleEditMode}
                      className="px-4 py-2 border border-gray-300 text-white bg-blue-600 hover:bg-blue-700"
                    >
                      수정하기
                    </button>
                  </div>
                </div>
              )}
              {isEditing && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">프로필 사진</h2>
                  <ProfilePhoto />
                  <h2 className="text-lg md:text-xl font-semibold mb-4 mt-4">사용자 정보</h2>
                  <div className="bg-white border border-gray-300 p-4 mb-4">
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 border border-gray-300 text-white bg-blue-600 hover:bg-blue-700"
                    >
                      저장하기
                    </button>
                  </div>
                </div>
              )}
              {isViewingPayments && (
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-4">결제 내역</h2>
                  <p>여기에 결제 내역을 표시하세요.</p>
                </div>
              )}
            </div>
            {!isEditing && isViewingProfile && (
              <div className="bg-white border border-gray-300 p-4 md:p-6 mb-4 md:mb-8">
                <ProfileDeposit />
              </div>
            )}
            {!isEditing && isViewingProfile && (
              <div className="mt-4 md:mt-8 flex justify-end pr-2 md:pr-6">
                <button className="px-4 py-2 border border-gray-300 text-white bg-gray-600 hover:bg-gray-700">
                  결제하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
