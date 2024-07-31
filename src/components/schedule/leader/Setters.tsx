import Calendar from "../Calendar";
import { SettersPropsType } from "../../../types/schedule-type";
import { transDay } from "../../../utils/schedule-function";
import RepeatSetter from "./RepeatSetter";
import TimeSelector from "./TimeSelector";
import { useSelectedDateStore } from "../../../store/schedule-store";
import { useEffect } from "react";

const Setters = ({
  originInfo,
  selector,
  setSelector,
  time,
  setTime,
  repeatState,
  selectedDay,
  setRepeatState,
  repeatEndDate,
  setRepeatEndDate,
}: SettersPropsType): JSX.Element => {
  const { selectedDate } = useSelectedDateStore();

  useEffect(() => {
    if (originInfo && originInfo.repeatEndDate) {
      setRepeatEndDate(() => originInfo.repeatEndDate!);
    }
  }, [originInfo]);

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

  return (
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
        {repeatEndDate && (
          <button
            type="button"
            id="repeatEndDate"
            onClick={(e) => handleSelectorClick(e)}
            className="w-40 bg-white py-1 rounded-[50px] flex justify-center items-center"
          >
            {repeatEndDate}
          </button>
        )}
      </div>
      {selector === "repeatEndDate" && (
        <>
          <Calendar repeatEndDate={repeatEndDate} setRepeatEndDate={setRepeatEndDate} />
        </>
      )}
    </div>
  );
};

export default Setters;
