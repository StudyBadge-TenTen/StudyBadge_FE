import { useLocation, useNavigate } from "react-router";
import { useEditModeStore } from "../../store/edit-mode-store";
import { useEffect, useState } from "react";

const PROFILE_TAB_LIST = [
  { kr: "내 정보", en: "myInfo" },
  { kr: "결제내역", en: "paymentList" },
  { kr: "포인트내역", en: "pointList" },
  { kr: "알림", en: "notification" },
  { kr: "신청내역", en: "participation" },
];

const ProfileTab = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsEditMode } = useEditModeStore();
  const [profileState, setProfileState] = useState("myInfo");

  useEffect(() => {
    if (location.pathname.includes("notification")) {
      setProfileState(() => "notification");
    }
  }, [navigate]);

  return (
    <div className="menu w-full md:w-1/4 md:min-h-52 flex md:flex-col border border-solid border-Gray-3 rounded-[30px] p-6 mr-8 mb-8 md:mb-0">
      {PROFILE_TAB_LIST.map((tabInfo) => (
        <span
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
  );
};

export default ProfileTab;
