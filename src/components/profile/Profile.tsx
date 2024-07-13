import SAMPLE_IMG from "../../assets/image/CAROUSEL_IMG_1.jpg";
import GOLD_BADGE from "../../assets/GOLD-BADGE_PNG.png";
import ProfileEdit from "./ProfileEdit";
import { useEffect, useState } from "react";

const Profile = (): JSX.Element => {
  const [userImage, setUserImage] = useState(SAMPLE_IMG);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    return setIsEditMode(() => false);
  }, []);

  return (
    <>
      {isEditMode ? (
        <ProfileEdit />
      ) : (
        <>
          <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-t-[30px] p-6 flex flex-col items-center md:flex-row">
            <div className="profile-image w-full md:w-2/3 flex flex-col justify-center md:border-r border-solid border-Gray-2">
              <div className="flex items-center">
                {userImage ? (
                  <img src={userImage} className="object-cover w-32 h-32 rounded-full mr-8" />
                ) : (
                  <div className="no-profile-image w-32 h-32 bg-Gray-2 rounded-full flex justify-center items-center mr-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="white"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </div>
                )}
                <span className="text-2xl">홍길동</span>
              </div>
              <div className="flex justify-end">
                <button className="btn-blue px-3 py-2 text-xs md:mr-8" onClick={() => setIsEditMode(() => true)}>
                  수정하기
                </button>
              </div>
            </div>
            <div className="badge w-1/3 flex justify-center items-center mt-8 md:mt-0">
              <img src={GOLD_BADGE} className="w-28" />
            </div>
          </div>
          <div className="w-full h-fit bg-Gray-1 border-x border-b border-solid border-Gray-3 rounded-b-[30px] flex flex-col md:flex-row justify-between items-center px-10 py-8 md:py-4">
            <div className="text-xl">
              충전금액 : <span className="ml-4 font-bold">10,000원</span>
            </div>
            <button className="btn-blue mt-8 md:mt-0">충전하기</button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
