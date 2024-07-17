import { useNavigate } from "react-router";
import { useEditModeStore } from "../../store/edit-mode-store";

const ProfileTab = (): JSX.Element => {
  const navigate = useNavigate();
  const { setIsEditMode } = useEditModeStore();

  return (
    <div className="menu w-full md:w-1/4 md:min-h-52 flex md:flex-col border border-solid border-Gray-3 rounded-[30px] p-6 mr-8 mb-8 md:mb-0">
      <span
        onClick={() => {
          setIsEditMode(false);
          navigate("/profile/myInfo");
        }}
        className="w-full px-4 py-2 rounded-[30px] bg-Gray-1 hover:bg-Gray-1 cursor-pointer"
      >
        내 정보
      </span>
      <span
        onClick={() => navigate("/profile/paymentList")}
        className="w-full px-4 py-2 rounded-[30px] hover:bg-Gray-1 cursor-pointer"
      >
        결제내역
      </span>
    </div>
  );
};

export default ProfileTab;
