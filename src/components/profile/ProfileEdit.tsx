import { useEffect, useRef, useState } from "react";
import { ProfileInfoType, ProfilePutType, UserInfoType } from "../../types/profile-type";
import { BANK_LIST } from "../../constants/bank-list";
import axios from "axios";
import { useAuthStore } from "../../store/auth-store";
import { useNavigate } from "react-router";
import { CustomErrorType } from "@/types/common";
import { getAccountVerification } from "@/services/auth-api";

const ProfileEdit = ({ userInfo }: { userInfo: UserInfoType }): JSX.Element => {
  // todo: 회원가입 시 정했던 닉네임이랑 소개 등 글자수 제한 반영하기

  const navigate = useNavigate();

  const { accessToken } = useAuthStore();
  const [imageFile, setImageFile] = useState<File>();
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    nickname: "",
    introduction: "",
    account: "",
    accountBank: "",
    imgUrl: "",
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  const accountBankRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (userInfo) {
      setProfileInfo((origin) => ({
        ...origin,
        nickname: userInfo.nickname,
        introduction: userInfo.introduction,
        account: userInfo.account,
        accountBank: userInfo.accountBank,
        imgUrl: userInfo.imgUrl,
      }));
      if (userInfo.isAccountCert) {
        setIsAccountVerified(() => true);
      } else {
        setIsAccountVerified(() => false);
      }
    }
  }, [userInfo]);

  // input 값의 change를 감지해 상태로 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (e.target.id === "bankDropdown") {
      setProfileInfo((origin) => ({
        ...origin,
        accountBank: e.target.value,
      }));
      setIsAccountVerified(() => false);
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
        setIsAccountVerified(() => false);
      }
    }
  };

  // 이미지를 미리보기로 보여줄 함수
  const previewImage = () => {
    if (imageInputRef && imageInputRef.current && imageInputRef.current.files) {
      const IMG_MAX_SIZE = 1024 * 1024;
      const img = imageInputRef.current.files[0];

      if (img.size > IMG_MAX_SIZE) {
        imageInputRef.current.files = null;
        alert("프로필 이미지는 1MB 이내로 가능합니다.");
        return;
      } else {
        setImageFile(() => img);
      }

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

  // 계좌 인증하는 함수
  const verifyAccount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const bank = BANK_LIST.find((bankObj) => bankObj.name === profileInfo.accountBank);

    if (bank && profileInfo.account) {
      try {
        await getAccountVerification(bank.code, profileInfo.account);
        alert("계좌번호 인증에 성공하였습니다");
        setIsAccountVerified(() => true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const customError = error.response?.data as CustomErrorType;
          alert(customError.message);
          setIsAccountVerified(() => false);
        } else {
          alert(
            "계좌번호 인증에 문제가 발생하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
          );
          setIsAccountVerified(() => false);
        }
      }
    } else if (!bank) {
      alert("선택한 은행이 존재하지 않습니다.");
      return;
    } else if (!profileInfo.account) {
      alert("계좌번호를 입력해주세요");
      return;
    }
  };

  // 프로필 수정을 저장할 때 반영하도록 하는 함수
  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    profileInfo: ProfileInfoType,
    imageFile: ProfilePutType["file"],
  ) => {
    e.preventDefault();

    // 계좌정보 값 필수 체크
    if (accountRef.current) {
      if (!accountRef.current.value) {
        alert("계좌정보 기재는 필수입니다.");
        accountRef.current.classList.add("outline-Red-2");
        accountRef.current.focus();
        return;
      }
      if (accountRef.current.value.length < 10) {
        alert("올바른 계좌번호가 아닙니다. 계좌번호를 다시 한 번 확인해주시기 바랍니다.");
        accountRef.current.classList.add("outline-Red-2");
        accountRef.current.focus();
        return;
      }
    }

    if (accountBankRef.current) {
      if (!accountBankRef.current.value) {
        alert("금융기관을 선택해주십시오.");
        accountBankRef.current.classList.add("outline-Red-2");
        accountBankRef.current.focus();
        return;
      }
    }

    if (!isAccountVerified) {
      alert("계좌 인증이 필요합니다");
      if (accountRef.current) {
        accountRef.current.classList.add("outline-Red-2");
        accountRef.current.focus();
      }
      return;
    }

    if (nicknameRef.current) {
      if (!nicknameRef.current.value) {
        alert("닉네임 입력은 필수입니다.");
        nicknameRef.current.classList.add("outline-Red-2");
        nicknameRef.current.focus();
        return;
      }
    }

    const formData = new FormData();
    formData.append("updateRequest", new Blob([JSON.stringify(profileInfo)], { type: "application/json" }));

    if (imageFile) {
      // FormData에 데이터 추가
      formData.append("file", imageFile);
    }
    try {
      const URL = import.meta.env.DEV
        ? import.meta.env.VITE_APP_LOCAL_BASE_URL
        : import.meta.env.VITE_APP_PRODUCTION_BASE_URL;

      const response = await axios({
        method: "put",
        url: `${URL}/api/members/my-info/update`,
        data: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      if (axios.isAxiosError(response)) {
        const error = response.response?.data as CustomErrorType;
        alert(error.message);
        return;
      }
      navigate("/profile/myInfo");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error)) {
        const customError = error.response?.data as CustomErrorType;
        alert(customError.message);
        return;
      }
    }
  };

  return (
    <>
      <form
        method="post"
        encType="multipart/form-data"
        className="w-full min-h-96 border border-solid border-Gray-3 rounded-[30px] px-10 py-16 flex flex-col justify-center items-center"
      >
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
            onChange={handleChange}
            ref={nicknameRef}
            required
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
            onChange={handleChange}
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
            className="border border-solid border-Gray-2 rounded-[10px] px-3 py-2"
            value={profileInfo.account}
            onChange={handleChange}
            ref={accountRef}
            required
          ></input>
          <div className="flex flex-col items-center sm:flex-row sm:items-start mb-14">
            <select
              name="bank"
              id="bankDropdown"
              className="w-fit p-1 border border-solid border-Gray-2 rounded-[10px] mt-2"
              value={profileInfo.accountBank}
              ref={accountBankRef}
              onChange={handleChange}
            >
              <option value="">-- 금융기관을 선택해주세요 --</option>
              {BANK_LIST.map((bank) => (
                <option key={bank.name} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
            {isAccountVerified ? (
              <div className="px-4 py-3 text-sm text-Green-1 mb-14 mt-2 ml-4">계좌인증완료</div>
            ) : (
              <button type="button" onClick={(e) => verifyAccount(e)} className="btn-blue w-24 mt-2 ml-4">
                계좌번호 인증
              </button>
            )}
          </div>
          <button
            type="submit"
            onClick={(e) => handleSaveClick(e, profileInfo, imageFile)}
            className="btn-blue w-fit self-center mt-10"
          >
            저장하기
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;
