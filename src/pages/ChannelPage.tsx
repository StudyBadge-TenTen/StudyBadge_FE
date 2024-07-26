import { Outlet } from "react-router";
import KingOfAttendance from "../components/channel/KingOfAttendance";
import ParticipateBtn from "@/components/channel/ParticipateBtn";

const ChannelPage = (): JSX.Element => {
  // 함수 작성 금지

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="w-screen h-60 bg-Blue-2 flex justify-center items-center mb-12">
        <div className="w-[1025px] flex flex-col justify-center items-center">
          <KingOfAttendance />
        </div>
      </div>
      <ParticipateBtn />
      <div className="w-full h-fit mt-12 mb-24 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default ChannelPage;
