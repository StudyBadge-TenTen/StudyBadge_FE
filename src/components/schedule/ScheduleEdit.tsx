import { useEffect, useState } from "react";
import AddPlaceBtn from "./leader/AddPlaceBtn";
import { useLocation, useNavigate, useParams } from "react-router";
import { RepeatCycleType, ScheduleType, SelectorType } from "../../types/schedule-type";
import { useNewScheduleStore, useSelectedDateStore } from "../../store/schedule-store";
import { situationCalculator } from "../../utils/schedule-function";
import ConfirmModal from "./leader/ConfirmModal";
import Setters from "./leader/Setters";

const ScheduleEdit = (): JSX.Element => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const {
    state: { originInfo },
  }: { state: { originInfo: false | ScheduleType | undefined } } = useLocation();
  const { selectedDate } = useSelectedDateStore();
  const [selector, setSelector] = useState<SelectorType>("");
  const [inputValue, setInputValue] = useState({
    name: originInfo ? originInfo.scheduleName : "",
    content: originInfo ? originInfo.scheduleContent : "",
  });
  const [time, setTime] = useState({
    start: ["00", "00"],
    end: ["00", "00"],
  });
  const [repeatState, setRepeatState] = useState<RepeatCycleType | "NONE">("NONE");
  const [repeatEndDate, setRepeatEndDate] = useState("NONE");
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

    // 기존에 등록된 일정이 있을 경우 등록된 일정으로 상태 세팅
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
      // 오프라인 일정의 경우
      if (originInfo.placeId) {
        setPlaceId(() => originInfo.placeId);
      }
    }

    return window.removeEventListener("click", (e) => handleSelectorReset(e));
  }, []);

  useEffect(() => {
    if (originInfo) {
      if (repeatState === "NONE") {
        setNewSchedule({
          memberId: 1, // 유저 아이디 필요
          scheduleId: originInfo.id,
          scheduleName: inputValue.name,
          scheduleContent: inputValue.content,
          originType: originInfo.repeated ? "repeat" : "single",
          editType: "single",
          selectedDate: selectedDate,
          scheduleStartTime: `${time.start[0]}:${time.start[1]}:00`,
          scheduleEndTime: `${time.end[0]}:${time.end[1]}:00`,
          placeId: placeId ? placeId : null,
        });
      } else {
        setNewSchedule({
          memberId: 1, // 유저 아이디 필요
          scheduleId: originInfo.id,
          scheduleName: inputValue.name,
          scheduleContent: inputValue.content,
          originType: originInfo.repeated ? "repeat" : "single",
          editType: "repeat",
          selectedDate: selectedDate,
          scheduleStartTime: `${time.start[0]}:${time.start[1]}:00`,
          scheduleEndTime: `${time.end[0]}:${time.end[1]}:00`,
          repeatCycle: repeatState,
          repeatSituation: situationCalculator(repeatState, selectedDate, selectedDay),
          repeatEndDate: repeatEndDate === "NONE" ? selectedDate : repeatEndDate,
          placeId: placeId ? placeId : null,
        });
      }
    } else {
      if (repeatState === "NONE") {
        setNewSchedule({
          memberId: 1, // 유저 아이디 필요
          scheduleDate: selectedDate,
          scheduleName: inputValue.name,
          scheduleContent: inputValue.content,
          scheduleStartTime: `${time.start[0]}:${time.start[1]}:00`,
          scheduleEndTime: `${time.end[0]}:${time.end[1]}:00`,
          placeId: placeId ? placeId : null,
        });
      } else {
        setNewSchedule({
          memberId: 1, // 유저 아이디 필요
          scheduleDate: selectedDate,
          scheduleName: inputValue.name,
          scheduleContent: inputValue.content,
          scheduleStartTime: `${time.start[0]}:${time.start[1]}:00`,
          scheduleEndTime: `${time.end[0]}:${time.end[1]}:00`,
          repeatCycle: repeatState,
          repeatSituation: situationCalculator(repeatState, selectedDate, selectedDay),
          repeatEndDate: repeatEndDate === "NONE" ? selectedDate : repeatEndDate,
          placeId: placeId ? placeId : null,
        });
      }
    }
  }, [selectedDate, inputValue, repeatState, repeatEndDate, placeId, time]);

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
  const handleSubmitClick = async () => {
    if (
      new Date(selectedDate + " " + `${time.start[0]}:${time.start[1]}:00`) >=
      new Date(selectedDate + " " + `${time.end[0]}:${time.end[1]}:00`)
    ) {
      alert("종료 시간은 반드시 시작 시간보다 이후여야 합니다.");
      return;
    } else if (repeatEndDate < selectedDate) {
      alert("반복 종료일은 반드시 선택한 날짜 이후여야 합니다.");
      return;
    } else if (originInfo) {
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
    } else {
      // 일정 생성
      setModalInfo(() => ({
        isOpen: true,
        modalFor: "EDIT",
        isAfterCheck: false,
      }));
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
                placeholder="일정 이름 (*최대 한글 기준 20자)"
                defaultValue={originInfo ? originInfo.scheduleName : undefined}
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
                defaultValue={originInfo ? originInfo.scheduleContent : undefined}
                value={inputValue.content}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 px-6 bg-Gray-1 rounded-b-[30px]"
                maxLength={70}
              />
            </div>
            <Setters
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
