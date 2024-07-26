import { useLocation, useNavigate } from "react-router";
import { useEditModeStore } from "../../store/edit-mode-store";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { deleteAccount } from "@/services/profile-api";

const PROFILE_TAB_LIST = [
  { kr: "내 정보", en: "myInfo" },
  { kr: "결제내역", en: "paymentList" },
  { kr: "포인트내역", en: "pointList" },
  { kr: "알림", en: "notification" },
  { kr: "신청내역", en: "myApplication" },
];

const ProfileTab = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsEditMode } = useEditModeStore();
  const [profileState, setProfileState] = useState("myInfo");
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="menu w-full md:w-1/4 md:min-h-52 flex md:flex-col justify-between border border-solid border-Gray-3 rounded-[30px] p-6 mr-8 mb-8 md:mb-0">
      <div className="menu-container flex md:flex-col">
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
      <button onClick={() => setModalOpen(() => true)} className="w-full text-center text-Red-2 py-2">
        회원 탈퇴하기
      </button>
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
