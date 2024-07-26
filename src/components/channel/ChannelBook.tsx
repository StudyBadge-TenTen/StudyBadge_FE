import { useEffect, useState } from "react";
import Schedules from "./Schedules";
import Information from "./Information";
import { useLocation, useNavigate, useParams } from "react-router";
import MemberList from "./MemberList";
import Attendance from "./Attendance";
import Recruitment from "./Recruitment";
import { useGetStudyInfo } from "@/hooks/useQuery";
import { useSelectedDateStore, useSelectedMonthStore } from "@/store/schedule-store";
import moment from "moment";

const ChannelBook = (): JSX.Element => {
  const { selectedDateParam } = useParams();
  const { channelId } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;
  const [tabState, setTabState] = useState("일정");
  const memberTab = ["정보", "일정", "멤버", "출석현황"];
  const { data } = useGetStudyInfo(Number(channelId));
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { setSelectedMonth } = useSelectedMonthStore();

  useEffect(() => {
    if (selectedDateParam && moment(selectedDateParam, "YYYY-MM-DD", true).isValid()) {
      const newSelectedMonth = moment(selectedDateParam).format("YYYY-MM");
      setSelectedDate(selectedDateParam);
      setSelectedMonth(newSelectedMonth);
    }
  }, [selectedDateParam, setSelectedDate, setSelectedMonth]);

  useEffect(() => {
    const element = document.getElementById("root");
    if (element) {
      element.scrollIntoView();
    }
    if (state && state.tab) {
      setTabState(() => state.tab);
    }
  }, [channelId]);

  useEffect(() => {
    if (state && state.tab) {
      if (state.edit) {
        navigate(`/channel/${channelId}/${transTabName(state.tab)}/${transTabName(state.tab)}_edit`);
      } else {
        navigate(`/channel/${channelId}/${transTabName(state.tab)}`);
      }
    } else {
      if (tabState === "일정") {
        navigate(`/channel/${channelId}/${transTabName(tabState)}/${selectedDate}`);
      } else {
        navigate(`/channel/${channelId}/${transTabName(tabState)}`);
      }
    }
  }, [tabState, state, channelId, selectedDate, navigate]);

  const transTabName = (krTabName: string) => {
    let enTabName;
    switch (krTabName) {
      case "정보":
        enTabName = "information";
        break;
      case "일정":
        enTabName = "schedule";
        break;
      case "멤버":
        enTabName = "member";
        break;
      case "출석현황":
        enTabName = "attendance";
        break;
      case "모집":
        enTabName = "recruitment";
        break;
    }

    return enTabName;
  };

  if (data) {
    return (
      <>
        <div className="container w-fit min-w-80 h-fit flex flex-col rounded-[50px] shadow-card">
          <div className="tab-container h-20 bg-Blue-2 rounded-t-[50px] flex items-end">
            {/* todo: '정보', '일정', '멤버', '출석현황', '모집' 탭 필요 */}
            {memberTab.map((tab) => (
              <button
                key={`tab_${tab}`}
                onClick={() => {
                  setTabState(() => tab);
                }}
                className={`w-20 md:w-32 h-12 md:h-14 ${tab === tabState ? "bg-Gray-3 text-Blue-2" : "bg-Gray-1 text-Blue-2"} rounded-t-[30px] md:text-xl font-bold flex justify-center items-center hover:bg-Gray-2 transition-all`}
              >
                {tab}
              </button>
            ))}
            {data.leader && (
              <button
                onClick={() => {
                  setTabState(() => "모집");
                }}
                className={`w-20 md:w-32 h-12 md:h-14 ${tabState === "모집" ? "bg-Gray-3 text-Blue-2" : "bg-Gray-1 text-Blue-2"} rounded-t-[30px] md:text-xl font-bold flex justify-center items-center hover:bg-Gray-2`}
              >
                모집
              </button>
            )}
          </div>
          <div className="w-[400px] md:w-[768px] lg:w-[854px] h-fit flex flex-col px-4 py-8 md:p-8">
            {tabState === "일정" && <Schedules selectedDateParam={selectedDateParam} isLeader={data.leader} />}
            {tabState === "정보" && <Information />}
            {tabState === "멤버" && <MemberList />}
            {tabState === "출석현황" && <Attendance />}
            {tabState === "모집" && <Recruitment />}
          </div>
        </div>
      </>
    );
  }
  return <div>스터디 채널 정보가 존재하지 않습니다.</div>;
};

export default ChannelBook;
