import { useLocation, useNavigate } from "react-router";
import { useEditModeStore } from "../../store/edit-mode-store";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { deleteAccount } from "@/services/profile-api";
import usePageScrollTop from "../common/PageScrollTop";
import { postLogout } from "@/services/auth-api";

const PROFILE_TAB_LIST = [
  { kr: "내 정보", en: "myInfo" },
  { kr: "결제내역", en: "paymentList" },
  { kr: "포인트내역", en: "pointList" },
  { kr: "알림", en: "notification" },
  { kr: "신청내역", en: "myApplication" },
];

const ProfileTab = (): JSX.Element => {
  usePageScrollTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsEditMode } = useEditModeStore();
  const [profileState, setProfileState] = useState("myInfo");
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    if (location) {
      location.pathname.includes("myInfo") && setProfileState(() => "myInfo");
      location.pathname.includes("paymentList") && setProfileState(() => "paymentList");
      location.pathname.includes("pointList") && setProfileState(() => "pointList");
      location.pathname.includes("notification") && setProfileState(() => "notification");
      location.pathname.includes("myApplication") && setProfileState(() => "myApplication");
    }
  }, [location]);

  const handleDeleteClick = async () => {
    await deleteAccount();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="menu w-full md:w-1/4 md:min-h-52 flex md:flex-col flex-wrap md:flex-nowrap justify-between border border-solid border-Gray-3 rounded-[30px] p-6 mr-8 mb-8 md:mb-0">
      <div className="menu-container flex md:flex-col flex-wrap md:flex-nowrap">
        {PROFILE_TAB_LIST.map((tabInfo) => (
          <span
            key={tabInfo.en}
            onClick={() => {
              setProfileState(() => tabInfo.en);
              setIsEditMode(false);
              navigate(`/profile/${tabInfo.en}`);
            }}
            className={`w-full px-4 py-2 rounded-[30px] ${profileState === tabInfo.en && "bg-Gray-1"} cursor-pointer`}
          >
            {tabInfo.kr}
          </span>
        ))}
      </div>
      <div className="w-full flex justify-between mt-8">
        <button onClick={() => setModalOpen(() => true)} className="w-24 md:w-full text-center text-Red-2 py-2">
          회원 탈퇴하기
        </button>
        <button onClick={() => setLogoutModal(() => true)} className={`w-20 btn-blue w-10 md:hidden`}>
          로그아웃
        </button>
        {logoutModal && (
          <Modal>
            <div className="flex flex-col justify-center items-center">
              <p>로그아웃 하시겠습니까?</p>
              <div className="flex mt-6">
                <button onClick={() => postLogout()} className="w-10 btn-blue">
                  예
                </button>
                <button onClick={() => setLogoutModal(() => false)} className="w-10 btn-blue ml-2">
                  아니요
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      {modalOpen && (
        <Modal>
          <div className="flex flex-col justify-center items-center">
            <p>스터디 뱃지 계정을 삭제하고</p>
            <p>탈퇴하시겠습니까?</p>
            <div className="flex mt-6">
              <button onClick={() => handleDeleteClick()} className="w-10 btn-blue">
                예
              </button>
              <button onClick={() => setModalOpen(() => false)} className="w-10 btn-blue ml-2">
                아니요
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileTab;
