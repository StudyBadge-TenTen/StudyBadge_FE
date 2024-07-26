import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Calendar from "../schedule/Calendar";
import { useSelectedDateStore, useSelectedMonthStore } from "../../store/schedule-store";
import { AttendMemberType, ScheduleCalcResponseType, ScheduleType } from "../../types/schedule-type";
import { getScheduleInfo, scheduleCalculator } from "../../utils/schedule-function";
import AddScheduleBtn from "../schedule/leader/AddScheduleBtn";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getAttendList } from "../../services/schedule-api";
import CheckAttend from "../schedule/leader/CheckAttend";
import { useEditModeStore } from "../../store/edit-mode-store";

const Schedules = ({
  selectedDateParam,
  isLeader,
}: {
  selectedDateParam: string | undefined;
  isLeader: boolean | undefined;
}): JSX.Element => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { selectedMonth, setSelectedMonth } = useSelectedMonthStore();
  const { isEditMode, setIsEditMode } = useEditModeStore();

  const [marks, setMarks] = useState<string[]>([]);
  const [scheduleState, setScheduleState] = useState<ScheduleCalcResponseType>();
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleType | undefined>();
  const [isLoadingState, setIsLoadingState] = useState(false);

  const [checkDay, setCheckDay] = useState(false);
  const today = new Date();
  const todayString = moment(today).format("YYYY-MM-DD");

  const { data, error, isLoading } = useQuery<AttendMemberType[], Error>({
    queryKey: ["attendList", channelId, scheduleInfo?.id, selectedDate],
    queryFn: () =>
      getAttendList(Number(channelId), scheduleInfo?.id, scheduleInfo?.repeated ? "repeat" : "single", selectedDate),
  });

  const [attendList, setAttendList] = useState<{
    data: AttendMemberType[] | undefined;
    error: Error | undefined | null;
    isLoading: boolean;
  }>({ data: undefined, error: undefined, isLoading: false });

  useEffect(() => {
    return () => setIsEditMode(false);
  }, []);

  // 최초 로드 시 selectedDateParam 값이 있으면 상태를 업데이트
  useEffect(() => {
    if (selectedDateParam && moment(selectedDateParam, "YYYY-MM-DD", true).isValid()) {
      const newSelectedMonth = moment(selectedDateParam).format("YYYY-MM");
      setSelectedDate(selectedDateParam);
      setSelectedMonth(newSelectedMonth);
    } else {
      const todayString = moment(today).format("YYYY-MM-DD");
      const todayMonthString = moment(today).format("YYYY-MM");
      setSelectedDate(todayString);
      setSelectedMonth(todayMonthString);
    }
  }, [selectedDateParam]);

  // selectedDate가 변경될 때마다 URL을 업데이트
  useEffect(() => {
    if (selectedDate && selectedDate !== selectedDateParam) {
      navigate(`/channel/${channelId}/schedule/${selectedDate}`, { replace: true });
    }
  }, [selectedDate, navigate, channelId, selectedDateParam]);

  useEffect(() => {
    //month상태가 바뀔 때마다 scheduleCalculator()호출해 일정들 가져오기
    if (channelId) {
      const year = selectedMonth.split("-")[0];
      const month = selectedMonth.split("-")[1];
      // 결과를 받아 상태로 저장
      scheduleCalculator({ channelId: Number(channelId), year, month }).then((response) => {
        if (response) {
          response.scheduleMarks.map((schedule) => {
            setMarks((marks) => [...marks, ...schedule.marks]);
          });
          setScheduleState(() => response);
        }
      });
    }
  }, [channelId, selectedMonth]);

  // 선택하는 날짜가 바뀔 때마다 날짜에 해당되는 일정정보를 set하기 위해
  useEffect(() => {
    if (scheduleInfo && moment(selectedDate).isBefore(todayString)) {
      // 일정이 있고, 지난 날짜의 일정일 때
      setAttendList(() => ({ data: data, error: error, isLoading: isLoading }));
    } else if (scheduleInfo && moment(selectedDate).isSame(todayString)) {
      // 일정이 있고, 오늘일 때
      setCheckDay(() => true);
    } else {
      setAttendList(() => ({ data: undefined, error: undefined, isLoading: false }));
    }

    if (scheduleState) {
      setIsLoadingState(() => true);
      try {
        getScheduleInfo(selectedDate, scheduleState.scheduleList, scheduleState.scheduleMarks).then((response) => {
          if (response.result) {
            setScheduleInfo(() => response.scheduleInfo);
          } else setScheduleInfo(() => undefined);
        });
      } catch (error) {
        console.log("error: 일정을 불러오는데 실패하였습니다.", error);
      } finally {
        setIsLoadingState(() => false);
      }
    }
  }, [selectedDate, data, error, isLoading, scheduleState]);

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-4">스터디 일정</h2>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Calendar marks={marks} />
        <div className="schedule w-96 h-[393px] border border-solid border-Gray-3 rounded-[50px] mt-4 md:mt-0 md:ml-4">
          <div className="m-6 h-[345px] overflow-y-scroll custom-scroll">
            {isLoadingState && (
              <>
                <div className="h-[136px] bg-Gray-1 rounded-[30px]"></div>
                <div className="h-[32px] flex items-center border border-solid border-Gray-2 rounded-[50px] p-2 my-2"></div>
                <div className="text-center text-Gray-3">is Loading...</div>
              </>
            )}
            {/* 일정이 등록되어 있는 경우 렌더링 될 요소 */}
            {scheduleInfo ? (
              <>
                <div className="h-fit bg-Gray-1 rounded-[30px]">
                  <div className="p-4 border-b border-solid border-Gray-3">{scheduleInfo.scheduleName}</div>
                  <div className="p-4">{scheduleInfo.scheduleContent}</div>
                </div>
                {/* 시간 */}
                <div className="h-fit flex items-center border border-solid border-Gray-2 rounded-[50px] p-2 my-2">
                  <div className="w-fit flex items-center text-Blue-2 font-bold mx-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-alarm mr-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                    </svg>
                    시간
                  </div>
                  <div className="w-32 lg:w-48 text-Gray-4 overflow-x-hidden text-ellipsis whitespace-nowrap">
                    {`${scheduleInfo.scheduleStartTime.split(":")[0]}:${scheduleInfo.scheduleStartTime.split(":")[1]} ~ ${scheduleInfo.scheduleEndTime.split(":")[0]}:${scheduleInfo.scheduleEndTime.split(":")[1]}`}
                  </div>
                </div>
                {/* 오프라인 스터디일 경우 장소 추가 */}
                {scheduleInfo.placeAddress && (
                  <div className="h-fit flex items-center border border-solid border-Gray-2 rounded-[50px] p-2 my-2">
                    <div className="w-fit flex items-center text-Blue-2 font-bold mx-4">
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
                    <div className="w-48 md:w-32 lg:w-48 text-Gray-4 overflow-x-hidden text-ellipsis whitespace-nowrap">
                      {scheduleInfo.placeAddress}
                    </div>
                  </div>
                )}
                {/* 출석 체크 멤버 */}
                <>
                  <h3 className="text-2xl font-bold text-Blue-2 text-center my-4">
                    {selectedDate.split("-")[1]}.{selectedDate.split("-")[2]} 출석 멤버
                  </h3>
                  {/* 조건 : 리더, 오늘, 출석체크비활성화 시 버튼 렌더링 */}
                  {isLeader && checkDay && !isEditMode ? (
                    <>
                      <div className="flex justify-center items-center">
                        <button onClick={() => setIsEditMode(true)} className="btn-blue self-center">
                          출석체크
                        </button>
                      </div>
                      {channelId && isEditMode && (
                        <CheckAttend
                          channelId={Number(channelId)}
                          scheduleInfo={{
                            scheduleType: scheduleInfo.repeated ? "REPEAT" : "SINGLE",
                            scheduleId: scheduleInfo.id,
                            attendanceCheckDate: selectedDate,
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {/* 출석체크 작동 확인용 */}
                      {/* <div className="flex justify-center items-center">
                        <button onClick={() => setIsEditMode(true)} className="btn-blue self-center">
                          출석체크
                        </button>
                      </div>
                      {channelId && isEditMode && (
                        <CheckAttend
                          channelId={Number(channelId)}
                          scheduleInfo={{
                            scheduleType: scheduleInfo.repeated ? "REPEAT" : "SINGLE",
                            scheduleId: scheduleInfo.id,
                            attendanceCheckDate: selectedDate,
                          }}
                        />
                      )} */}
                    </>
                  )}
                  {!attendList || (Array.isArray(attendList.data) && attendList.data?.length === 0) ? (
                    <div className="text-center text-Gray-3">출석체크를 하지 않았습니다.</div>
                  ) : attendList.isLoading ? (
                    <div className="skeleton w-full h-28 rounded-[30px] bg-Gray-1 animate-pulse"></div>
                  ) : (
                    <div className="h-28 flex flex-wrap">
                      {attendList &&
                        attendList.data?.map(
                          (member) =>
                            member.attendance && (
                              <div
                                key={member.studyMemberId}
                                className="member w-fit h-fit flex flex-col justify-center items-center mx-2"
                              >
                                {member.imageUrl ? (
                                  <img
                                    src={member.imageUrl}
                                    alt="프로필이미지"
                                    className="w-16 h-16 object-cover rounded-full bg-Gray-2"
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-Gray-2 rounded-full"></div>
                                )}

                                <span>{member.name}</span>
                              </div>
                            ),
                        )}
                    </div>
                  )}
                </>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold text-Blue-2 text-center my-4">
                  {selectedDate.split("-")[1]}.{selectedDate.split("-")[2]}
                </h3>
                <div className="h-full flex justify-center items-center text-Gray-3">등록된 일정이 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 스터디 리더 용 일정등록/변경 버튼 */}
      {isLeader && new Date(selectedDate) >= new Date(todayString) && <AddScheduleBtn originInfo={scheduleInfo} />}
    </>
  );
};

export default Schedules;
