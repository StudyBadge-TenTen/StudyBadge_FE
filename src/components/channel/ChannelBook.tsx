import { useEffect, useState } from "react";
import Schedules from "./Schedules";
import Information from "./Information";
import { useLocation, useNavigate, useParams } from "react-router";

const ChannelBook = (): JSX.Element => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;
  const [tabState, setTabState] = useState("일정");
  const memberTab = ["정보", "일정", "멤버", "출석현황"];

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
    if (state) {
      if (state.tab) {
        if (state.edit) navigate(`/channel/${channelId}/${transTabName(state.tab)}/${transTabName(state.tab)}_edit`);
        else navigate(`/channel/${channelId}/${transTabName(state.tab)}`);
      }
    } else {
      navigate(`/channel/${channelId}/${transTabName(tabState)}`);
    }
  }, [tabState]);

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
          <button
            className={`${"hidden"} w-20 md:w-32 h-12 md:h-14 bg-Gray-1 rounded-t-[30px] md:text-xl text-Blue-2 font-bold flex justify-center items-center hover:bg-Gray-2`}
          >
            모집
          </button>
        </div>
        <div className="h-fit flex flex-col px-4 py-8 md:p-8">
          {tabState === "일정" && <Schedules />}
          {tabState === "정보" && <Information />}
        </div>
      </div>
    </>
  );
};

export default ChannelBook;
