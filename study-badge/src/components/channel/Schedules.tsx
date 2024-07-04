import useSelectedDateStore from "../../store/schedule-state";
import Calendar from "../calendar/Calendar";

const Schedules = (): JSX.Element => {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const attendList = ["홍길동", "김철수", "김영희"];

  return (
    <>
      <h2 className="text-2xl font-bold text-[#1C4587] text-center mb-4">스터디 일정</h2>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Calendar />
        <div className="schedule w-96 h-[393px] border border-solid border-[#B4BDCB] rounded-[50px] md:ml-4 p-6">
          {/* 일정이 등록되어 있는 경우 렌더링 될 요소 */}
          <>
            <div className="h-fit bg-[#dce1e77e] rounded-[30px]">
              <div className="p-4 border-b border-solid border-[#B4BDCB]">일정 이름</div>
              <div className="p-4">일정 메모</div>
            </div>
            {/* todo: 오프라인 스터디일 경우 장소 div 추가 */}
            <div className="h-fit flex items-center border border-solid border-[#DCE1E7] rounded-[50px] p-2 my-2">
              <div className="w-fit flex items-center text-[#1C4587] text-xl font-bold mx-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                장소
              </div>
              <div className="w-48 text-[#89919D] overflow-x-hidden text-ellipsis whitespace-nowrap">
                서울특별시 서대문구 창천동 자세한 주소 생략
              </div>
            </div>
            {/* 출석 체크 멤버 */}
            <>
              <h3 className="text-2xl font-bold text-[#1C4587] text-center my-4">
                {selectedDate.split("-")[1]}.{selectedDate.split("-")[2]} 출석 멤버
              </h3>
              <div className="h-40 flex flex-wrap overflow-y-scroll custom-scroll">
                {attendList.map((member) => (
                  <div className="member w-fit h-fit flex flex-col justify-center items-center mx-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </>
          </>

          {/* 일정이 등록되어 있지 않은 경우 렌더링 될 요소 */}
          {/* <div className="h-full flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold text-[#1C4587] text-center my-4">
              {selectedDate.split("-")[1]}.{selectedDate.split("-")[2]}
            </h3>
            <div className="h-full flex justify-center items-center text-[#B4BDCB]">등록된 일정이 없습니다.</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Schedules;
