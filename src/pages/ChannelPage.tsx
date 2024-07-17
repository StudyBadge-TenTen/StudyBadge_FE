import { Outlet } from "react-router";
import KingOfAttendance from "../components/channel/KingOfAttendance";

const ChannelPage = (): JSX.Element => {
  // 함수 작성 금지

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="w-screen h-60 bg-Blue-2 flex justify-center items-center">
        <div className="w-[1025px] flex flex-col justify-center items-center">
          <KingOfAttendance />
        </div>
      </div>
      <div className="w-full h-fit my-24 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default ChannelPage;
