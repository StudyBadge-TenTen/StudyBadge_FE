import Schedules from "./Schedules";

const ChannelBook = ({ isLeader }: { isLeader: boolean }): JSX.Element => {
  return (
    <>
      <div className="container w-fit min-w-80 h-fit flex flex-col rounded-[50px] shadow-card">
        <div className="tab-container h-20 bg-Blue-2 rounded-t-[50px]">
          {/* todo: '정보', '일정', '멤버', '출석현황', '모집' 탭 필요 */}
        </div>
        <div className="h-fit flex flex-col px-4 py-8 md:p-8">
          <Schedules />
        </div>
      </div>
    </>
  );
};

export default ChannelBook;
