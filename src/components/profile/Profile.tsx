import NONE_BADGE from "../../assets/NONE-BADGE_PNG.png";
import BRONZE_BADGE from "../../assets/BRONZE-BADGE_PNG.png";
import SILVER_BADGE from "../../assets/SILVER-BADGE_PNG.png";
import GOLD_BADGE from "../../assets/GOLD-BADGE_PNG.png";
import ProfileEdit from "./ProfileEdit";
import { useEffect, useState } from "react";
import SelectAmount from "../payment/SelectAmount";
import Checkout from "../payment/Checkout";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { MyStudyType, UserInfoType } from "../../types/profile-type";
import { getMyStudy, getProfile } from "../../services/profile-api";
import { useEditModeStore } from "../../store/edit-mode-store";
import { useAuthStore } from "../../store/auth-store";

const Profile = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(10000);
  const [myStudy, setMyStudy] = useState<MyStudyType[]>([]);
  const { isEditMode, setIsEditMode } = useEditModeStore();
  const { data, isLoading, error } = useQuery<UserInfoType, Error>({
    queryKey: ["UserInfo"],
    queryFn: () => getProfile(),
  });
  const { accessToken } = useAuthStore();

  useEffect(() => {
    console.log(accessToken); // accessToken 확인용 디버깅 코드

    return () => setIsEditMode(false); // 클린업 함수로 변경
  }, []);

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          const myStudyList = await getMyStudy();
          setMyStudy(() => myStudyList);
        } catch (error) {
          console.log("내 스터디 리스트 로딩에 실패하였습니다." + error);
        }
      })();
    }
  }, [data]);

  useEffect(() => {
    const element = document.getElementById("root");
    if (element) {
      element.scrollIntoView();
    }

    if (location.state) {
      if (location.state.social) {
        setIsEditMode(true);
      }
    }
  }, [location]);

  return (
    <>
      {isLoading && (
        <>
          <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-t-[30px] p-6 flex flex-col items-center md:flex-row">
            <div className="flex items-center">
              <div className="no-profile-image w-32 h-32 bg-Gray-2 rounded-full flex justify-center items-center mr-8 animate-pulse">
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
              <div className="w-32 h-12 rounded-[30px] bg-Gray-1 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-fit bg-Gray-1 border-x border-b border-solid border-Gray-3 rounded-b-[30px] flex flex-col md:flex-row justify-between items-center px-10 py-8 md:py-4"></div>
        </>
      )}
      {!isLoading && data && isEditMode ? (
        <ProfileEdit />
      ) : (
        data && (
          <>
            <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-t-[30px] p-6 flex flex-col items-center md:flex-row">
              <div className="profile-image w-full md:w-2/3 flex flex-col justify-center md:border-r border-solid border-Gray-2">
                <div className="flex items-center">
                  {data.imgUrl ? (
                    <img src={data.imgUrl} alt="프로필 이미지" className="object-cover w-32 h-32 rounded-full mr-8" />
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
                  <span className="text-2xl">{data.nickname}</span>
                </div>
                <div className="flex justify-end">
                  <button className="btn-blue px-3 py-2 text-xs md:mr-8" onClick={() => setIsEditMode(true)}>
                    수정하기
                  </button>
                </div>
              </div>
              <div className="badge w-1/3 flex justify-center items-center mt-8 md:mt-0">
                {data.badgeLevel === "NONE" && <img src={NONE_BADGE} className="w-28" />}
                {data.badgeLevel === "BRONZE" && <img src={BRONZE_BADGE} className="w-28" />}
                {data.badgeLevel === "SILVER" && <img src={SILVER_BADGE} className="w-28" />}
                {data.badgeLevel === "GOLD" && <img src={GOLD_BADGE} className="w-28" />}
              </div>
            </div>
            <div className="w-full h-fit bg-Gray-1 border-x border-b border-solid border-Gray-3 rounded-b-[30px] flex flex-col md:flex-row justify-between items-center px-10 py-8 md:py-4">
              <div className="text-xl">
                충전금액 : <span className="ml-4 font-bold">{data.point && data.point.toLocaleString()}원</span>
              </div>
              <button
                onClick={() => {
                  navigate("/profile/payment");
                }}
                className="btn-blue mt-8 md:mt-0"
              >
                충전하기
              </button>
            </div>
            {location.pathname === "/profile/payment" && !confirm && (
              <SelectAmount setConfirm={setConfirm} chargeAmount={chargeAmount} setChargeAmount={setChargeAmount} />
            )}
            {location.pathname === "/profile/payment" && confirm && (
              <Checkout setConfirm={setConfirm} chargeAmount={chargeAmount} />
            )}
            {/* 이용자가 소속된 스터디 채널 개수대로 렌더링 */}
            {!myStudy ? (
              <div className="border border-solid border-Gray-3 w-full h-32 p-10 rounded-[30px] flex flex-col sm:flex-row justify-between items-center mt-10">
                <p>loading...</p>
              </div>
            ) : (
              Array.isArray(myStudy) &&
              myStudy.map((studyChannel) => (
                <div
                  key={studyChannel.studyId}
                  onClick={() => navigate(`/channel/${studyChannel.studyId}/schedule`)}
                  className="border border-solid border-Gray-3 w-full h-32 p-10 rounded-[30px] flex flex-col sm:flex-row justify-between items-center mt-10"
                >
                  <div className="flex items-center">
                    <h3 className="font-bold text-2xl text-Blue-2">{studyChannel.studyName}</h3>
                    {studyChannel.role === "LEADER" && <span className="ml-8 font-bold text-Red-2">리더</span>}
                  </div>
                  <div>출석률 프로그레스바</div>
                </div>
              ))
            )}
          </>
        )
      )}
      {error && (
        <div>
          프로필을 로딩하는데 실패했습니다. errorName: {error.name}. errorMessage: {error.message}
        </div>
      )}
    </>
  );
};

export default Profile;
