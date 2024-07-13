import { useRef, useState } from "react";
import { putProfile } from "../../services/profile-api";
import { ProfileInfoType, ProfilePutType } from "../../types/profile-type";

const ProfileEdit = (): JSX.Element => {
  // todo: 회원가입 시 정했던 닉네임이랑 소개 등 글자수 제한 반영하기

  const [profileInfo, setProfileInfo] = useState({
    nickname: "",
    introduction: "",
    account: "",
    imgUrl: "",
  });
  const [imageFile, setImageFile] = useState<File>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  // input 값의 change를 감지해 상태로 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.id === "editNickname") {
      setProfileInfo((origin) => ({
        ...origin,
        nickname: e.target.value,
      }));
    }
    if (e.target.id === "editIntroduction") {
      setProfileInfo((origin) => ({
        ...origin,
        introduction: e.target.value,
      }));
    }
    if (e.target.id === "editAccount") {
      if (Number.isNaN(Number(e.target.value))) {
        setProfileInfo((origin) => ({
          ...origin,
        }));
        alert("숫자만 입력해주세요");
      } else {
        setProfileInfo((origin) => ({
          ...origin,
          account: e.target.value,
        }));
      }
    }
  };

  // 이미지를 미리보기로 보여줄 함수
  const previewImage = () => {
    if (imageInputRef && imageInputRef.current && imageInputRef.current.files) {
      const img = imageInputRef.current.files[0];
      setImageFile(() => img);

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setProfileInfo((origin) => ({
          ...origin,
          imgUrl: reader.result as string,
        }));
      };
    }
  };

  // 등록한 이미지를 삭제하는 함수
  const handleDeleteImgClick = () => {
    setImageFile(() => undefined);
    setProfileInfo((origin) => ({
      ...origin,
      imgUrl: "",
    }));
  };

  // 프로필 수정을 저장할 때 반영하도록 하는 함수
  const handleSaveClick = async (profileInfo: ProfileInfoType, imageFile: ProfilePutType["file"]) => {
    const profileObj = {
      memberUpdateRequest: profileInfo,
      file: imageFile,
    };
    const newUserInfo = await putProfile(profileObj);
    console.log(newUserInfo); // 이 데이터로 user info set하면 됨
  };

  return (
    <>
      <div className="w-full min-h-96 border border-solid border-Gray-3 rounded-[30px] px-10 py-16 flex flex-col justify-center items-center">
        <div className="image-edit flex items-center mb-16">
          <div className="image-preview w-32 h-32 bg-Gray-2 rounded-full flex justify-center items-center mr-8">
            <img src={profileInfo.imgUrl} alt="업로드 이미지" className="object-cover w-32 h-32 rounded-full" />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="file"
              id="editImage"
              name="editImage"
              accept=".png, .jpeg, .jpg"
              className="hidden"
              ref={imageInputRef}
              onChange={previewImage}
            ></input>
            <label htmlFor="editImage">
              <div className="border border-solid border-Gray-3 rounded-[10px] px-2 py-1 mb-4 cursor-pointer">
                사진 업로드
              </div>
            </label>
            <span
              onClick={() => handleDeleteImgClick()}
              className="delete-image-btn text-sm text-Red-2 underline decoration-Red-2 decoration-solid cursor-pointer"
            >
              삭제하기
            </span>
          </div>
        </div>
        <div className="info-edit w-full flex flex-col">
          <label htmlFor="editNickname" className="mb-2 text-Blue-2">
            닉네임
          </label>
          <input
            id="editNickname"
            name="editNickname"
            type="text"
            className="border border-solid border-Gray-2 rounded-[10px] px-3 py-2 mb-8"
            value={profileInfo.nickname}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="editIntroduction" className="mb-2 text-Blue-2">
            소개
          </label>
          <textarea
            id="editIntroduction"
            name="editIntroduction"
            className="border border-solid border-Gray-2 rounded-[10px] px-3 py-2 resize-none mb-8"
            rows={5}
            cols={30}
            value={profileInfo.introduction}
            onChange={handleInputChange}
          ></textarea>
          <label htmlFor="editAccount" className="mb-2 text-Blue-2">
            계좌번호
            <span className="ml-4 text-Gray-3 text-sm">
              * (추후 환급금 반환을 위한 필수항목이므로 꼭 입력해주시기 바랍니다.)
            </span>
          </label>
          <input
            id="editAccount"
            name="editAccount"
            type="text"
            className="border border-solid border-Gray-2 rounded-[10px] px-3 py-2 mb-8"
            value={profileInfo.account}
            onChange={handleInputChange}
          ></input>
          <button onClick={() => handleSaveClick(profileInfo, imageFile)} className="btn-blue w-fit self-center mt-10">
            저장하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
