import React from "react";
import { ProfileEditState } from "../../types/profile";
import useProfileEditStore from "../../store/profile-edit";

const ProfileInfo: React.FC = () => {
  const { nickname } = useProfileEditStore((state: ProfileEditState) => ({
    nickname: state.nickname,
  }));

  return (
    <div>
      <h2>프로필 정보</h2>
      <p>닉네임: {nickname}</p>
    </div>
  );
};

export default ProfileInfo;
