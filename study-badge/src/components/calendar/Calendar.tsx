import { useEffect, useState } from "react";
import { Value } from "../../types/calendar";
import { StyledCalendar } from "../../styles/components/StyledCalendar";
import moment from "moment";

const Calendar = (): JSX.Element => {
  const curDate = new Date();
  const [value, onChange] = useState<Value>(curDate);
  const [mark, setMark] = useState(["2024-07-01"]);
  // 달력에 일정표시할 날짜들을 mark배열에 "YYYY-MM-DD"형태로 담을 예정

  // useQuery이용해서 데이터 가져오기(예시)
  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `일정 호출할 api 주소`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 mark배열에 담으면 해당 날짜에 표시
  //     },
  //   }
  // );

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleValueChange = (selectedDate: Value) => {
    onChange(() => selectedDate);
  };

  const handleDayClick = (date: Date) => {
    const transDate = moment(date).format("YYYY-MM-DD");
    console.log(transDate);
  };

  return (
    <>
      <StyledCalendar
        onChange={handleValueChange}
        onClickDay={handleDayClick}
        value={value}
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        tileClassName={({ date }) => {
          if (date.getDay() === 0) {
            return "text-[#bf230b]";
          }
        }}
        tileContent={({ date }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div className="flex justify-center items-center absolute absoluteDiv">
                  <div className="dot w-9 h-2 bg-[#ffcd32] rounded-lg flex ml-px"></div>
                </div>
              </>
            );
          }
        }}
      />
    </>
  );
};

export default Calendar;
