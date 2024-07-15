import { useEffect, useState } from "react";
import AddPlaceBtn from "./leader/AddPlaceBtn";
import { useLocation, useNavigate, useParams } from "react-router";
import TimeSelector from "./leader/TimeSelector";
import RepeatSetter from "./leader/RepeatSetter";
import { RepeatCycleType, ScheduleType, SelectorType } from "../../types/schedule-type";
import { useSelectedDateStore } from "../../store/schedule-store";
import Calendar from "./Calendar";
import { postSchedule } from "../../services/schedule-api";

const ScheduleEdit = (): JSX.Element => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const {
    state: { originInfo },
  }: { state: { originInfo: false | ScheduleType | undefined } } = useLocation();
  const { selectedDate } = useSelectedDateStore();
  const [inputValue, setInputValue] = useState({ scheduleName: "", scheduleContent: "" });
  const [selector, setSelector] = useState<SelectorType>("");
  const [time, setTime] = useState({ start: ["00", "00"], end: ["00", "00"] });
  const [repeatState, setRepeatState] = useState<RepeatCycleType | "NONE">("NONE");
  const [repeatEndDate, setRepeatEndDate] = useState("NONE");

  const selectedDay = new Date(selectedDate).getDay();

  useEffect(() => {
    // 드롭다운모달 밖을 클릭할 때를 감지하기 위한 이벤트 등록
    window.addEventListener("click", (e) => handleSelectorReset(e));

    // 기존에 등록된 일정이 있을 경우
    if (originInfo) {
      setTime(() => ({
        start: [originInfo.scheduleStartTime.split(":")[0], originInfo.scheduleStartTime.split(":")[1]],
        end: [originInfo.scheduleEndTime.split(":")[0], originInfo.scheduleEndTime.split(":")[1]],
      }));

      // 반복일정인 경우
      if (originInfo.repeated && originInfo.repeatCycle) {
        setRepeatState(() => originInfo.repeatCycle!);
        setRepeatEndDate(() => originInfo.repeatEndDate!);
      }
    }

    return window.removeEventListener("click", (e) => handleSelectorReset(e));
  }, []);

  // 일정 이름, 내용 input의 handler함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "scheduleName") {
      setInputValue((origin) => ({
        ...origin,
        scheduleName: e.target.value,
      }));
    }
    if (e.target.id === "scheduleContent") {
      setInputValue((origin) => ({
        ...origin,
        scheduleContent: e.target.value,
      }));
    }
  };

  // 설정 클릭 시, 드롭다운모달을 활성화하기위한 함수
  const handleSelectorClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const btn = e.target as HTMLButtonElement;
    if (btn.classList.contains("start-hour")) {
      setSelector(() => "start-hour");
    }
    if (btn.classList.contains("start-minute")) {
      setSelector(() => "start-minute");
    }
    if (btn.classList.contains("end-hour")) {
      setSelector(() => "end-hour");
    }
    if (btn.classList.contains("end-minute")) {
      setSelector(() => "end-minute");
    }
    if (btn.id === "repeat-check") {
      setSelector(() => "repeat-check");
    }
    if (btn.id === "repeatEndDate") {
      setSelector(() => "repeatEndDate");
    }
  };

  // 드롭다운모달을 닫기 위한 함수
  const handleSelectorReset = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target) {
      if (
        !target.classList.contains("start-hour") &&
        !target.classList.contains("start-minute") &&
        !target.classList.contains("end-hour") &&
        !target.classList.contains("end-minute") &&
        !(target.id === "repeat-check") &&
        !(target.id === "repeatEndDate") &&
        !target.classList.contains("calendar")
      ) {
        setSelector(() => "");
      }
    }
  };

  // 숫자로 된 값을 요일로 바꾸는 함수
  const transDay = (selectedDay: number) => {
    let result;
    switch (selectedDay) {
      case 0:
        result = "일요일";
        break;
      case 1:
        result = "월요일";
        break;
      case 2:
        result = "화요일";
        break;
      case 3:
        result = "수요일";
        break;
      case 4:
        result = "목요일";
        break;
      case 5:
        result = "금요일";
        break;
      case 6:
        result = "토요일";
        break;

      default:
        break;
    }

    return result;
  };

  // 반복 조건을 post할 데이터타입으로 반환하는 함수
  const situationCalculator = (repeatState: RepeatCycleType, selectedDate: string, selectedDay: number) => {
    let result;

    if (repeatState === "DAILY") {
      result = "EVERYDAY";
    }
    if (repeatState === "WEEKLY") {
      switch (selectedDay) {
        case 0:
          result = "SUNDAY";
          break;
        case 1:
          result = "MONDAY";
          break;
        case 2:
          result = "TUESDAY";
          break;
        case 3:
          result = "WEDNESDAY";
          break;
        case 4:
          result = "THURSDAY";
          break;
        case 5:
          result = "FRIDAY";
          break;
        case 6:
          result = "SATURDAY";
          break;
      }
    }
    if (repeatState === "MONTHLY") {
      result = Number(selectedDate.split("-")[2]);
    }

    return result;
  };

  // 일정 등록을 클릭 시, post요청하는 함수
  const handleSubmitClick = async () => {
    try {
      if (repeatState === "NONE") {
        await postSchedule(Number(channelId), {
          type: "single",
          scheduleName: inputValue.scheduleName,
          scheduleContent: inputValue.scheduleContent,
          scheduleDate: selectedDate,
          scheduleStartTime: `${time.start.join(":")}:00`,
          scheduleEndTime: `${time.end.join(":")}:00`,
        });
      } else {
        await postSchedule(Number(channelId), {
          type: "repeat",
          repeatCycle: repeatState,
          repeatSituation: situationCalculator(repeatState, selectedDate, selectedDay),
          repeatEndDate: repeatEndDate,
          scheduleName: inputValue.scheduleName,
          scheduleContent: inputValue.scheduleContent,
          scheduleDate: selectedDate,
          scheduleStartTime: `${time.start.join(":")}:00`,
          scheduleEndTime: `${time.end.join(":")}:00`,
        });
      }
      navigate(`/channel/${channelId}`);
    } catch (error) {
      console.log(error);
      alert("일정 등록에 실패하였습니다.");
    }
  };

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="w-screen h-60 bg-Blue-2 flex justify-center items-center">
        <div className="w-[1025px] flex flex-col justify-center items-center"></div>
      </div>
      <div className="container w-fit min-w-80 h-fit flex flex-col rounded-[50px] shadow-card my-16">
        <div className="text-white h-20 bg-Blue-2 rounded-t-[50px] flex justify-center items-center text-lg">
          일정 등록
        </div>
        <form className="h-fit flex flex-col px-4 py-8 md:p-8">
          <div className="schedule w-96 border border-solid border-Gray-3 rounded-[50px] p-8">
            <div className="bg-Gray-1 w-full h-fit rounded-[30px] mb-6">
              <input
                id="scheduleName"
                type="text"
                placeholder="일정 이름"
                defaultValue={originInfo ? originInfo.scheduleName : undefined}
                value={inputValue.scheduleName}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 px-6 bg-Gray-1 border-b border-solid border-Gray-3 rounded-t-[30px]"
              />
              <input
                id="scheduleContent"
                type="text"
                placeholder="내용"
                defaultValue={originInfo ? originInfo.scheduleContent : undefined}
                value={inputValue.scheduleContent}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 px-6 bg-Gray-1 rounded-b-[30px]"
              />
            </div>
            <div className="bg-Gray-1 w-full h-fit rounded-[30px] relative">
              <div className="p-4 px-6 border-b border-solid border-Gray-3 flex items-center relative">
                <label htmlFor="scheduleStartTime" className="mr-8">
                  시작시간
                </label>
                <div id="scheduleStartTime" className="bg-Gray-1 flex items-center">
                  <button
                    type="button"
                    onClick={(e) => handleSelectorClick(e)}
                    className="w-fit min-w-4 start-hour bg-white text-center px-4 py-1 rounded-[50px] mr-2"
                  >
                    {time.start[0]}
                  </button>
                  <span className="mr-4">시</span>
                  <button
                    type="button"
                    onClick={(e) => handleSelectorClick(e)}
                    className="w-fit min-w-4 start-minute bg-white text-center px-4 py-1 rounded-[50px] mr-2"
                  >
                    {time.start[1]}
                  </button>
                  <span>분</span>
                </div>
                <TimeSelector name="start" selector={selector} setTime={setTime} />
              </div>
              <div className="p-4 px-6 border-b border-solid border-Gray-3 flex items-center relative">
                <label htmlFor="scheduleEndTime" className="mr-8">
                  종료시간
                </label>
                <div id="scheduleEndTime" className="bg-Gray-1 flex items-center">
                  <button
                    type="button"
                    onClick={(e) => handleSelectorClick(e)}
                    className="w-fit min-w-4 end-hour bg-white text-center px-4 py-1 rounded-[50px] mr-2"
                  >
                    {time.end[0]}
                  </button>
                  <span className="mr-4">시</span>
                  <button
                    type="button"
                    onClick={(e) => handleSelectorClick(e)}
                    className="w-fit min-w-4 end-minute bg-white text-center px-4 py-1 rounded-[50px] mr-2"
                  >
                    {time.end[1]}
                  </button>
                  <span>분</span>
                </div>
                <TimeSelector name="end" selector={selector} setTime={setTime} />
              </div>
              <div className="p-4 px-6 border-b border-solid border-Gray-3 flex items-center">
                <label htmlFor="repeat-check" className="mr-16">
                  반복
                </label>
                <button
                  type="button"
                  id="repeat-check"
                  onClick={(e) => handleSelectorClick(e)}
                  className="w-40 bg-white py-1 rounded-[50px] flex justify-center items-center"
                >
                  {repeatState === "NONE" && <>없음</>}
                  {repeatState === "DAILY" && <>매일</>}
                  {repeatState === "WEEKLY" && <>매주 {transDay(selectedDay)}</>}
                  {repeatState === "MONTHLY" && <>매월 {selectedDate.split("-")[2]}일</>}
                </button>
              </div>
              {selector === "repeat-check" && (
                <>
                  <RepeatSetter
                    repeatState={repeatState}
                    setRepeatState={setRepeatState}
                    day={transDay(selectedDay)}
                    setSelector={setSelector}
                  />
                </>
              )}
              <div className={`${repeatState === "NONE" && "opacity-0"} p-4 px-6 flex items-center`}>
                <label htmlFor="repeatEndDate" className="mr-8">
                  종료날짜
                </label>
                <button
                  type="button"
                  id="repeatEndDate"
                  onClick={(e) => handleSelectorClick(e)}
                  className="w-40 bg-white py-1 rounded-[50px] flex justify-center items-center"
                >
                  {repeatEndDate === "NONE" ? `${selectedDate}` : `${repeatEndDate}`}
                </button>
              </div>
              {selector === "repeatEndDate" && (
                <>
                  <Calendar setRepeatEndDate={setRepeatEndDate} />
                </>
              )}
            </div>
            {/* 오프라인 채널일 경우 장소 선택 버튼 - 클릭하면 맵 페이지로 이동 */}
            {/* 돌아오면서 placeId를 navigate의 state로 전달해주는 방향이면 좋을 듯*/}
            <AddPlaceBtn />
          </div>
          <div className="flex justify-between items-center px-8 mt-8">
            <button type="button" onClick={() => navigate(`/channel/${channelId}`)} className="btn-blue w-24">
              취소
            </button>
            <button type="button" onClick={() => handleSubmitClick()} className="btn-blue w-24">
              일정저장
            </button>
          </div>
          {/* 일정 수정일 경우 보여야할 삭제 버튼 */}
          <button type="button" className="btn-red w-2/3 mt-8 self-center">
            일정 삭제
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleEdit;
