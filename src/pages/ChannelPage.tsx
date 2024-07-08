import ChannelBook from "../components/channel/ChannelBook";
import KingOfAttendance from "../components/channel/KingOfAttendance";

const ChannelPage = (): JSX.Element => {
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="w-screen h-60 bg-[#1C4587] flex justify-center items-center">
        <div className="w-[1025px] flex flex-col justify-center items-center">
          <KingOfAttendance />
        </div>
      </div>
      <div className="w-full h-fit my-24 flex justify-center items-center">
        <ChannelBook />
      </div>
    </div>
  );
};

export default ChannelPage;
