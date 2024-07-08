import React from "react";
import useProfileStore from "../../store/profile-store";

const ProfilePhoto: React.FC = () => {
  const { isEditing, handleUpload, handleDelete } = useProfileStore((state) => ({
    isEditing: state.isEditing,
    handleUpload: state.handleUpload,
    handleDelete: state.handleDelete,
  }));

  return (
    <div className="profile-photo">
      <h2 className="text-xl font-semibold mb-2">프로필 사진</h2>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">사진</span>
        </div>
        {isEditing && (
          <div>
            <button onClick={handleUpload} className="btn btn-primary mr-2">
              사진 업로드
            </button>
            <button onClick={handleDelete} className="btn btn-secondary">
              삭제
            </button>
          </div>
        )}
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">뱃지</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
