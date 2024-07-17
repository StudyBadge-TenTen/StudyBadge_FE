import { useNavigate } from "react-router";
import Profile from "../components/profile/Profile";

const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();

  // 함수 작성 금지

  return (
    <div className="w-full min-h-96 p-8 py-14">
      <h2 className="text-3xl text-Blue-2 font-bold">My Profile</h2>
      <div className="flex flex-col md:flex-row mt-10">
        <div className="menu w-full md:w-1/4 md:min-h-96 flex md:flex-col border border-solid border-Gray-3 rounded-[30px] p-6 mr-8 mb-8 md:mb-0">
          <span
            onClick={() => navigate("/profile")}
            className="w-full px-4 py-2 rounded-[30px] bg-Gray-1 hover:bg-Gray-1 cursor-pointer"
          >
            내 정보
          </span>
          <span
            onClick={() => navigate("/paymentList")}
            className="w-full px-4 py-2 rounded-[30px] hover:bg-Gray-1 cursor-pointer"
          >
            결제내역
          </span>
        </div>
        <div className="content md:w-3/4 min-h-52 flex flex-col">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
