import React, { useRef } from "react";
import useProfileEditStore from "../../store/profile-edit";

const ProfilePhoto: React.FC = (): JSX.Element => {
  const { profilePhoto, setProfilePhoto, isEditing } = useProfileEditStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="profile-photo">
      <div className="flex items-center space-x-4">
        {profilePhoto ? (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500">사진</span>
          </div>
        )}
        {isEditing && (
          <div className="ml-4">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleUpload} />
            <button className="btn btn-primary mr-2" onClick={() => fileInputRef.current?.click()}>
              사진 업로드
            </button>
            <button className="btn btn-secondary" onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
