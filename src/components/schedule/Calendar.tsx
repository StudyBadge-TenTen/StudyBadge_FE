import { useEffect, useState } from "react";
import { Value } from "../../types/schedule-type";
import { StyledCalendar } from "../../styles/components/StyledCalendar";
import moment from "moment";
import { useSelectedDateStore, useSelectedMonthStore } from "../../store/schedule-store";
import PrevMonthBtn from "./PrevMonthBtn";
import NextMonthBtn from "./NextMonthBtn";
import { useParams } from "react-router";

const Calendar = ({
  marks,
  repeatEndDate,
  setRepeatEndDate,
}: {
  marks?: string[];
  repeatEndDate?: string;
  setRepeatEndDate?: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const { selectedDateParam } = useParams();

  // if (selectedDateParam) {
  const { setSelectedDate } = useSelectedDateStore();
  const { setSelectedMonth } = useSelectedMonthStore();
  const [value, onChange] = useState<Value>(
    repeatEndDate ? new Date(repeatEndDate) : selectedDateParam ? new Date(selectedDateParam) : new Date(),
  );
  const [mark, setMark] = useState<string[]>([]);
  // const [mark, setMark] = useState(marks);
  // 달력에 일정표시할 날짜들을 mark배열에 "YYYY-MM-DD"형태로 담을 예정

  useEffect(() => {
    if (repeatEndDate) {
      onChange(() => new Date(repeatEndDate));
    } else if (selectedDateParam) {
      onChange(() => new Date(selectedDateParam));
    }
  }, [repeatEndDate, selectedDateParam]);

  useEffect(() => {
    setMark(() => marks ?? []);
  }, [marks]);

  const handleValueChange = (selectedDate: Value) => {
    onChange(() => selectedDate);
  };
  const handleDayClick = (date: Date) => {
    const transDate = moment(date).format("YYYY-MM-DD");

    if (!mark.length && setRepeatEndDate) {
      setRepeatEndDate(() => transDate);
      onChange(() => date);
      return;
    }

    setSelectedDate(transDate);
    onChange(() => date);
  };
  const handleMonthClick = (date: Date) => {
    const transDate = moment(date).format("YYYY-MM");
    setSelectedMonth(transDate);
  };

  return (
    <>
      <StyledCalendar
        className={`calendar ${!mark && "absolute left-[-10px] z-10"}`}
        onChange={handleValueChange}
        onClickDay={handleDayClick}
        onClickMonth={handleMonthClick}
        // month를 변경하는 버튼들을 컴포넌트로 만들어 onClick함수로 새로운 달의 일정을 get해야함
        prevLabel={<PrevMonthBtn />}
        nextLabel={<NextMonthBtn />}
        value={value}
        formatDay={(_, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(_, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(_, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileClassName={({ date, view }) => {
          if (date.getDay() === 0 && view !== "year") {
            return "text-[#bf230b]";
          }
        }}
        tileContent={({ date, view }) => {
          if (view !== "year") {
            if (mark && mark.find((markDate) => markDate === moment(date).format("YYYY-MM-DD"))) {
              return (
                <>
                  <div className="flex justify-center items-center relative absoluteDiv">
                    <div className="dot w-3/4 h-2 bg-Yellow-1 rounded-lg flex ml-px absolute top-[0.2px]"></div>
                  </div>
                </>
              );
            }
          }
        }}
      />
    </>
  );
  // }
  // return <></>;
};

export default Calendar;
