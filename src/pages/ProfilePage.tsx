import ProfileTab from "../components/profile/ProfileTab";
import { Outlet } from "react-router";

const ProfilePage = (): JSX.Element => {
  // 함수 작성 금지

  return (
    <div className="w-full min-h-96 p-8 py-14 mb-24">
      <h2 className="text-3xl text-Blue-2 font-bold">My Profile</h2>
      <div className="flex flex-col md:flex-row mt-10">
        <ProfileTab />
        <div className="content md:w-3/4 min-h-52 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
