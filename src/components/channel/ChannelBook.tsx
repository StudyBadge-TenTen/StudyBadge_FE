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
import PageScrollTop from "../common/PageScrollTop";
import usePageScrollTop from "../common/PageScrollTop";
import { getIsMember } from "@/services/channel-api";
import { useAuthStore } from "@/store/auth-store";
import Modal from "../common/Modal";
import { transTabName } from "@/utils/transform-function";

const ChannelBook = (): JSX.Element => {
  const { channelId, selectedDateParam, tab } = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;

  const [tabState, setTabState] = useState("정보");
  const memberTab = ["정보", "일정", "멤버", "출석현황"];
  const [isStudyEnd, setIsStudyEnd] = useState(false);
  const [endModal, setEndModal] = useState(false);

  const { accessToken, isMember, setIsMember } = useAuthStore();
  const { data } = useGetStudyInfo(Number(channelId));
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { setSelectedMonth } = useSelectedMonthStore();
  // const isMemberData = useQuery<boolean, AxiosError>({
  //   queryKey: ["isMember", channelId],
  //   queryFn: () => getIsMember(Number(channelId)),
  //   enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  // });
  usePageScrollTop();

  const today = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    if (tab) {
      const transTab = transTabName(tab);
      if (transTab) {
        setTabState(() => transTab);
      }
    }
  }, [tab]);

  useEffect(() => {
    if (accessToken && channelId && data) {
      getIsMember(Number(channelId)).then((isMemberData) => setIsMember(isMemberData));

      if (new Date(data.endDate) < new Date(today)) {
        // 개인 출석률과 환급금 정산내역 api 호출
        setIsStudyEnd(() => true);
        setEndModal(() => true);
      }
    }
  }, [accessToken, channelId, data]);

  useEffect(() => {
    if (!accessToken) {
      setIsMember(false);
    }
  }, [accessToken, setIsMember]);

  // useEffect(() => {
  //   if (isMemberData !== undefined && isMemberData.data && isMember !== isMemberData.data) {
  //     setIsMember(isMemberData.data);
  //   }
  // }, [data, channelId, isMemberData, isMember, setIsMember]);

  useEffect(() => {
    if (selectedDateParam && moment(selectedDateParam, "YYYY-MM-DD", true).isValid()) {
      const newSelectedMonth = moment(selectedDateParam).format("YYYY-MM");
      setSelectedDate(selectedDateParam);
      setSelectedMonth(newSelectedMonth);
      if (tabState !== "일정") {
        setTabState(() => "일정");
      }
    }
  }, [selectedDateParam, setSelectedDate, setSelectedMonth]);

  useEffect(() => {
    if (state && state.tab) {
      setTabState(() => state.tab);
    }
  }, [state]);

  useEffect(() => {
    if (state && state.tab) {
      const transTab = transTabName(state.tab);
      if (state.edit) {
        navigate(`/channel/${channelId}/${transTab}/${transTab}_edit`);
      } else {
        navigate(`/channel/${channelId}/${transTab}`);
      }
    } else {
      const transTab = transTabName(tabState);
      if (tabState === "일정") {
        navigate(`/channel/${channelId}/${transTab}/${selectedDate}`);
      } else {
        navigate(`/channel/${channelId}/${transTab}`);
      }
    }
  }, [tabState, state, channelId, selectedDate, navigate]);

  if (data) {
    return (
      <>
        <PageScrollTop />
        {isStudyEnd && endModal && (
          <Modal>
            해당 스터디 채널은 종료되었습니다.
            {isMember && data.attendanceRatio && data.refundsAmount && (
              <div className="flex flex-col justify-center items-center my-8">
                <span className="text-lg">
                  출석률 : <b>{Math.round(data.attendanceRatio)}</b>%
                </span>
                <span className="text-lg">
                  환급금 : <b>{data.refundsAmount.toLocaleString()}</b>원
                </span>
              </div>
            )}
            <button onClick={() => setEndModal(() => false)} className="btn-blue">
              확인
            </button>
          </Modal>
        )}
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
            {!isStudyEnd && data.leader && (
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
          <div className="w-[400px] md:w-[768px] lg:w-[854px] h-fit flex flex-col px-4 py-8 md:p-8 relative">
            {!isMember && tabState !== "정보" && (
              <div className="w-full h-full absolute top-0 left-0 bg-Gray-2 opacity-60 rounded-b-[50px] flex justify-center items-center">
                <p className="text-2xl font-bold opacity-100">해당 스터디 멤버에게만 공개되는 컨텐츠입니다.</p>
              </div>
            )}
            {tabState === "정보" && <Information isStudyEnd={isStudyEnd} />}
            {tabState === "일정" && (
              <Schedules selectedDateParam={selectedDateParam} isLeader={data.leader} isStudyEnd={isStudyEnd} />
            )}
            {tabState === "멤버" && <MemberList isStudyEnd={isStudyEnd} />}
            {tabState === "출석현황" && <Attendance />}
            {tabState === "모집" && !isStudyEnd && <Recruitment />}
          </div>
        </div>
      </>
    );
  }
  return <div>스터디 채널 정보가 존재하지 않습니다.</div>;
};

export default ChannelBook;
