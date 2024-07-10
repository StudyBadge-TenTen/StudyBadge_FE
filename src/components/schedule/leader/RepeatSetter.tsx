import { RepeatSetterPropsType } from "../../../types/schedule-type";
import { useSelectedDateStore } from "../../../store/schedule-store";

const RepeatSetter = ({ repeatState, setRepeatState, day, setSelector }: RepeatSetterPropsType): JSX.Element => {
  const { selectedDate } = useSelectedDateStore();

  return (
    <>
      <div className="absolute w-full p-4 bg-Gray-2 rounded-b-[50px] z-10">
        <div className="repeat-container flex flex-col justify-center items-center">
          <div className="repeat-btn-container w-full flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setRepeatState(() => "NONE");
              }}
              className={`w-fit min-w-4 start-hour ${repeatState === "NONE" ? "bg-Gray-3 text-white" : "bg-white"} text-center px-4 py-1 rounded-[50px] hover:bg-Gray-3 hover:text-white`}
            >
              없음
            </button>
            <button
              type="button"
              onClick={() => {
                setRepeatState(() => "DAILY");
              }}
              className={`w-fit min-w-4 start-hour ${repeatState === "DAILY" ? "bg-Gray-3 text-white" : "bg-white"} text-center px-4 py-1 rounded-[50px] hover:bg-Gray-3 hover:text-white`}
            >
              일간
            </button>
            <button
              type="button"
              onClick={() => {
                setRepeatState(() => "WEEKLY");
              }}
              className={`w-fit min-w-4 start-hour ${repeatState === "WEEKLY" ? "bg-Gray-3 text-white" : "bg-white"} text-center px-4 py-1 rounded-[50px] hover:bg-Gray-3 hover:text-white`}
            >
              주간
            </button>
            <button
              type="button"
              onClick={() => {
                setRepeatState(() => "MONTHLY");
              }}
              className={`w-fit min-w-4 start-hour ${repeatState === "MONTHLY" ? "bg-Gray-3 text-white" : "bg-white"} text-center px-4 py-1 rounded-[50px] hover:bg-Gray-3 hover:text-white`}
            >
              월간
            </button>
          </div>
          <div className="w-full bg-white p-8 my-4 text-center rounded-[30px]">
            {repeatState === "NONE" && <>반복 없음</>}
            {repeatState === "DAILY" && <>종료일까지 매일 반복</>}
            {repeatState === "WEEKLY" && <>매주 {day} 마다 반복</>}
            {repeatState === "MONTHLY" && <>매월 {selectedDate.split("-")[2]}일 마다 반복</>}
          </div>
          <button
            onClick={() => {
              setSelector(() => "");
            }}
            className="btn-blue px-8"
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
};

export default RepeatSetter;
