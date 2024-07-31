import { useEffect, useState } from "react";
import AddPlaceBtn from "./leader/AddPlaceBtn";
import { useLocation, useNavigate, useParams } from "react-router";
import { RepeatCycleType, ScheduleType, SelectorType } from "../../types/schedule-type";
import { useNewScheduleStore, useSelectedDateStore } from "../../store/schedule-store";
import { situationCalculator } from "../../utils/schedule-function";
import ConfirmModal from "./leader/ConfirmModal";
import Setters from "./leader/Setters";
import { useGetStudyInfo, useUserInfo } from "../../hooks/useQuery";
import usePageScrollTop from "../common/PageScrollTop";
import { useAuthStore } from "@/store/auth-store";

const ScheduleEdit = (): JSX.Element => {
  usePageScrollTop();
  const { channelId, selectedDateParam } = useParams();
  const { data } = useGetStudyInfo(Number(channelId));
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const originInfo: ScheduleType = state?.originInfo ?? null;
  // const {
  //   state: { originInfo },
  // }: { state: { originInfo: false | ScheduleType | undefined } } = useLocation();
  const { accessToken } = useAuthStore();
  const userInfoData = useUserInfo(accessToken);
  const { selectedDate } = useSelectedDateStore();
  const [selector, setSelector] = useState<SelectorType>("");
  const [inputValue, setInputValue] = useState({
    name: "",
    content: "",
  });
  const [time, setTime] = useState({
    start: ["00", "00"],
    end: ["00", "00"],
  });
  const [repeatState, setRepeatState] = useState<RepeatCycleType | "NONE">("NONE");
  const [repeatEndDate, setRepeatEndDate] = useState(selectedDate);
  const [placeId, setPlaceId] = useState<number>(); // 맵에서 id를 넘겨받아 세팅
  const { newSchedule, setNewSchedule } = useNewScheduleStore();
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    modalFor: "EDIT",
    isAfterCheck: false,
  });

  const selectedDay = new Date(selectedDate).getDay();

  useEffect(() => {
    // 드롭다운모달 밖을 클릭할 때를 감지하기 위한 이벤트 등록
    window.addEventListener("click", (e) => handleSelectorReset(e));

    return () => {
      window.removeEventListener("click", (e) => handleSelectorReset(e));
    };
  }, []);

  // useEffect(() => {
  //   console.log(placeId); // placeId 디버깅 로그
  // }, [placeId]);

  useEffect(() => {
    // 기존에 등록된 일정이 있을 경우 등록된 일정으로 상태 세팅
    if (originInfo) {
      setInputValue(() => ({ name: originInfo.scheduleName, content: originInfo.scheduleContent }));
      setTime({
        start: [originInfo.scheduleStartTime.split(":")[0], originInfo.scheduleStartTime.split(":")[1]],
        end: [originInfo.scheduleEndTime.split(":")[0], originInfo.scheduleEndTime.split(":")[1]],
      });
      // 반복일정인 경우
      if (originInfo.repeated && originInfo.repeatCycle && originInfo.repeatEndDate) {
        setRepeatState(originInfo.repeatCycle);
        setRepeatEndDate(originInfo.repeatEndDate);
      }
      // 오프라인 일정의 경우
      if (originInfo.placeId) {
        setPlaceId(originInfo.placeId);
      }
    }
  }, [originInfo]);

  useEffect(() => {
    if (repeatState === "NONE" && !originInfo) {
      setRepeatEndDate(selectedDate ?? selectedDateParam);
    }
  }, [repeatState, selectedDate, selectedDateParam]);

  useEffect(() => {
    if (userInfoData.data) {
      const scheduleData = {
        memberId: userInfoData.data.memberId,
        scheduleName: inputValue.name,
        scheduleContent: inputValue.content,
        scheduleStartTime: `${time.start[0]}:${time.start[1]}:00`,
        scheduleEndTime: `${time.end[0]}:${time.end[1]}:00`,
        placeId: placeId ?? null,
      };

      if (originInfo) {
        if (repeatState === "NONE") {
          setNewSchedule({
            ...scheduleData,
            scheduleId: originInfo.id,
            originType: originInfo.repeated ? "repeat" : "single",
            editType: "single",
            selectedDate: selectedDate,
          });
        } else {
          setNewSchedule({
            ...scheduleData,
            scheduleId: originInfo.id,
            originType: originInfo.repeated ? "repeat" : "single",
            editType: "repeat",
            repeatCycle: repeatState,
            repeatSituation: situationCalculator(repeatState, selectedDate, selectedDay),
            repeatEndDate: repeatEndDate,
            selectedDate: selectedDate,
          });
        }
      } else {
        if (repeatState === "NONE") {
          setNewSchedule({
            ...scheduleData,
            scheduleDate: selectedDate,
          });
        } else {
          setNewSchedule({
            ...scheduleData,
            scheduleDate: selectedDate,
            repeatCycle: repeatState,
            repeatSituation: situationCalculator(repeatState, selectedDate, selectedDay),
            repeatEndDate: repeatEndDate,
          });
        }
      }
    }
    // else {
    //   console.log(accessToken);
    //   alert("유저 정보가 존재하지 않습니다.");
    // }
    // console.log(repeatEndDate);
  }, [userInfoData.data, selectedDate, inputValue, repeatState, repeatEndDate, placeId, time, originInfo]);

  // 일정 이름, 내용 input의 handler함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "scheduleName") {
      setInputValue((origin) => ({
        ...origin,
        name: e.target.value,
      }));
    }
    if (e.target.id === "scheduleContent") {
      setInputValue((origin) => ({
        ...origin,
        content: e.target.value,
      }));
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
  // 일정 저장을 클릭 시, 확인 모달 띄우기
  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (
      new Date(selectedDate + " " + `${time.start[0]}:${time.start[1]}:00`) >=
      new Date(selectedDate + " " + `${time.end[0]}:${time.end[1]}:00`)
    ) {
      alert("종료 시간은 반드시 시작 시간보다 이후여야 합니다.");
      return;
    }
    if (repeatState !== "NONE") {
      if (!repeatEndDate) {
        alert("반복 일정은 반복 종료일 설정이 필수입니다.");
        return;
      }
      if (repeatEndDate < selectedDate) {
        alert("반복 종료일은 반드시 선택한 날짜 이후여야 합니다.");
        return;
      }
    }

    if (originInfo) {
      // 일정 수정
      if (originInfo.repeated && repeatState === "NONE") {
        // 반복 -> 단일 수정 시
        setModalInfo(() => ({
          isOpen: true,
          modalFor: "EDIT",
          isAfterCheck: true,
        }));
      } else {
        // 나머지
        setModalInfo(() => ({
          isOpen: true,
          modalFor: "EDIT",
          isAfterCheck: false,
        }));
      }
      return;
    } else {
      // 일정 생성
      // console.log("일정생성모달");

      setModalInfo(() => ({
        isOpen: true,
        modalFor: "EDIT",
        isAfterCheck: false,
      }));
      return;
    }
  };
  // 일정 삭제 클릭 시, 확인 모달 띄우기
  const handleDeleteClick = () => {
    // 삭제 확인 모달 띄우기
    if (originInfo) {
      setModalInfo(() => ({
        isOpen: true,
        modalFor: "DELETE",
        isAfterCheck: originInfo.repeated,
      }));
    }
  };
  // 모달의 예/아니오 버튼 클릭 시 서버로 전송

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="container w-fit min-w-80 h-fit flex flex-col rounded-[50px] shadow-card my-16">
        <div className="text-white h-20 bg-Blue-2 rounded-t-[50px] flex justify-center items-center text-lg">
          일정 등록
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="h-fit flex flex-col px-4 py-8 md:p-8">
          <div className="schedule w-96 border border-solid border-Gray-3 rounded-[50px] p-8">
            <div className="bg-Gray-1 w-full h-fit rounded-[30px] mb-6">
              <input
                id="scheduleName"
                type="text"
                placeholder="일정 이름 (*최대 한글 기준 20자)"
                value={inputValue.name}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 px-6 bg-Gray-1 border-b border-solid border-Gray-3 rounded-t-[30px]"
                maxLength={20}
                required
              />
              <input
                id="scheduleContent"
                type="text"
                placeholder="내용 (*최대 한글 기준 70자)"
                value={inputValue.content}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 px-6 bg-Gray-1 rounded-b-[30px]"
                maxLength={70}
              />
            </div>
            <Setters
              originInfo={originInfo}
              selector={selector}
              setSelector={setSelector}
              time={time}
              setTime={setTime}
              repeatState={repeatState}
              selectedDay={selectedDay}
              setRepeatState={setRepeatState}
              repeatEndDate={repeatEndDate}
              setRepeatEndDate={setRepeatEndDate}
            />
            {data &&
              data.meetingType === "OFFLINE" &&
              (originInfo ? (
                <AddPlaceBtn
                  setPlaceId={setPlaceId}
                  originPlaceId={originInfo.placeId}
                  studyChannelId={Number(channelId)}
                />
              ) : (
                <AddPlaceBtn setPlaceId={setPlaceId} studyChannelId={Number(channelId)} />
              ))}
            {placeId && <div className="text-center mt-2 text-Gray-3">현재 선택된 장소가 있습니다.</div>}
          </div>
          <div className="flex justify-between items-center px-8 mt-8">
            <button
              type="button"
              onClick={() => navigate(`/channel/${channelId}/schedule/${selectedDate}`)}
              className="btn-blue w-24"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={async (e) => {
                await handleSubmitClick(e);
              }}
              className="btn-blue w-24"
            >
              일정저장
            </button>
          </div>
          {/* 일정 수정일 경우 보여야할 삭제 버튼 */}
          {originInfo && (
            <button type="button" onClick={() => handleDeleteClick()} className="btn-red w-2/3 mt-8 self-center">
              일정 삭제
            </button>
          )}
        </form>
        <ConfirmModal
          channelId={channelId}
          originInfo={originInfo}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          newSchedule={newSchedule}
          repeatState={repeatState}
        />
      </div>
    </div>
  );
};

export default ScheduleEdit;
