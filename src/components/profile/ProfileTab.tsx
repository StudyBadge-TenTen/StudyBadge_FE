import { useLocation, useNavigate } from "react-router";
import { useEditModeStore } from "../../store/edit-mode-store";
import { useEffect, useState } from "react";

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
      <span
        onClick={() => {
          setProfileState(() => "myInfo");
          setIsEditMode(false);
          navigate("/profile/myInfo");
        }}
        className={`w-full px-4 py-2 rounded-[30px] ${profileState === "myInfo" && "bg-Gray-1"} cursor-pointer`}
      >
        내 정보
      </span>
      <span
        onClick={() => {
          setProfileState(() => "paymentList");
          navigate("/profile/paymentList");
        }}
        className={`w-full px-4 py-2 rounded-[30px] ${profileState === "paymentList" && "bg-Gray-1"} cursor-pointer`}
      >
        포인트내역
      </span>
      <span
        onClick={() => {
          setProfileState(() => "notification");
          navigate("/profile/notification");
        }}
        className={`w-full px-4 py-2 rounded-[30px] ${profileState === "notification" && "bg-Gray-1"} cursor-pointer`}
      >
        알림
      </span>
    </div>
  );
};

export default ProfileTab;
