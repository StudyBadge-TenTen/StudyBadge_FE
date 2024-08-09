import { useEffect, useMemo, useState } from "react";
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
  const [isStudyEnd, setIsStudyEnd] = useState(false);
  const [endModal, setEndModal] = useState(false);

  const { accessToken, isMember, setIsMember } = useAuthStore();
  const { data } = useGetStudyInfo(Number(channelId));
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const { setSelectedMonth } = useSelectedMonthStore();
  const memberTab = ["정보", "일정", "멤버", "출석현황"];
  const transTab = useMemo(() => transTabName(tab ?? "information"), [tab]);
  usePageScrollTop();

  // URL에서 탭 상태 설정
  useEffect(() => {
    if (transTab && transTab !== tabState) {
      setTabState(transTab);
    }
  }, [transTab]);

  // 상태 변경 시 URL 설정
  useEffect(() => {
    const navigateToTab = () => {
      const transTab = transTabName(tabState);
      if (transTab !== tab) {
        if (tabState === "일정" && selectedDate) {
          navigate(`/channel/${channelId}/${transTab}/${selectedDate}`, { replace: true });
        } else {
          navigate(`/channel/${channelId}/${transTab}`, { replace: true });
        }
      }
    };
    navigateToTab();
  }, [tabState, selectedDate, tab, navigate, channelId]);

  // 기본 데이터 설정
  useEffect(() => {
    if (accessToken && channelId && data) {
      getIsMember(Number(channelId)).then((isMemberData) => setIsMember(isMemberData));
      if (new Date(data.endDate) < new Date()) {
        setIsStudyEnd(true);
        setEndModal(true);
      }
    }
  }, [accessToken, channelId, data, setIsMember]);

  // AccessToken이 없는 경우 회원 상태를 false로 설정
  useEffect(() => {
    if (!accessToken) {
      setIsMember(false);
    }
  }, [accessToken, setIsMember]);

  // selectedDateParam 설정
  useEffect(() => {
    if (selectedDateParam && moment(selectedDateParam, "YYYY-MM-DD", true).isValid()) {
      setSelectedDate(selectedDateParam);
      setSelectedMonth(moment(selectedDateParam).format("YYYY-MM"));
      if (tabState !== "일정") {
        setTabState("일정");
      }
    }
  }, [selectedDateParam, setSelectedDate, setSelectedMonth]);

  // 상태에서 탭 설정
  useEffect(() => {
    if (state && state.tab) {
      setTabState(state.tab);
    }
  }, [state]);

  if (data) {
    return (
      <>
        <PageScrollTop />
        {isStudyEnd && endModal && (
          <Modal>
            해당 스터디 채널은 종료되었습니다.
            {isMember && data && (
              <div className="flex flex-col justify-center items-center my-8">
                <span className="text-lg">
                  출석률 : <b>{Math.round(data.attendanceRatio ?? 0)}</b>%
                </span>
                <span className="text-lg">
                  환급금 : <b>{data.refundsAmount.toLocaleString()}</b>원
                </span>
              </div>
            )}
            <button onClick={() => setEndModal(() => false)} className="btn-blue mt-2">
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
                <p className="px-10 sm:px-0 sm:text-2xl font-bold opacity-100">
                  해당 스터디 멤버에게만 공개되는 컨텐츠입니다.
                </p>
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
