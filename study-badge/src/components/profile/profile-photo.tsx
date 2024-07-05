import React, { useState } from "react";
import useProfileEditStore from "../../store/profile-edit";

const ProfilePhoto: React.FC = () => {
  const { isEditing } = useProfileEditStore();
  const [photo, setPhoto] = useState<string | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPhoto(null);
  };

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
        {photo ? (
          <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <span>사진</span>
        )}
      </div>
      {isEditing && (
        <div className="ml-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="px-4 py-2 border border-gray-300 text-blue-600 bg-white hover:bg-gray-100"
          />
          <button
            onClick={handleDelete}
            className="ml-2 px-4 py-2 border border-gray-300 text-red-600 bg-white hover:bg-gray-100"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
