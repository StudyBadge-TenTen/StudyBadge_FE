// 1.DAILY 2.WEEKLY 3.MONTHLY 3가지 상황 날짜 계산해서 마크 리스트로 반환하는 함수

import moment from "moment";
import { RepeatCycleType, ScheduleCalcResponseType, ScheduleParamsType, ScheduleType } from "../types/schedule-type";
import { getPlace, getSchedules } from "../services/schedule-api";

// 반복 주기를 계산해 달력에 마크할 날짜 리스트를 반환하는 함수
const repeatFunction = (
  scheduleDate: ScheduleType["scheduleDate"],
  repeatCycle: ScheduleType["repeatCycle"],
  repeatEndDate: ScheduleType["repeatEndDate"],
) => {
  const startDate = new Date(scheduleDate);
  let newDate = startDate;
  let marks = [moment(newDate).format("YYYY-MM-DD")];

  if (repeatEndDate) {
    switch (repeatCycle) {
      case "DAILY":
        while (new Date(newDate.setDate(newDate.getDate() + 1)) <= new Date(repeatEndDate)) {
          marks.push(moment(newDate).format("YYYY-MM-DD"));
        }
        break;
      case "WEEKLY":
        while (new Date(newDate.setDate(newDate.getDate() + 7)) <= new Date(repeatEndDate)) {
          marks.push(moment(newDate).format("YYYY-MM-DD"));
        }
        break;
      case "MONTHLY":
        while (new Date(newDate.setMonth(newDate.getMonth() + 1)) <= new Date(repeatEndDate)) {
          marks.push(moment(newDate).format("YYYY-MM-DD"));
        }
        break;
    }
  } else {
    throw new Error("반복 종료일 설정이 되어있지 않습니다.");
  }

  return marks;
};

// 화면에 보이는 년도/월에 해당하는 일정 객체들과 달력에 마크할 날짜리스트를 반환하는 함수
const scheduleCalculator = async ({ channelId, year, month }: ScheduleParamsType) => {
  try {
    const scheduleList: ScheduleType[] = await getSchedules({ channelId, year, month });
    // console.log(scheduleList);

    if (Array.isArray(scheduleList)) {
      if (scheduleList.length === 0) {
        return { scheduleList: [], scheduleMarks: [] };
      } else {
        const scheduleMarks = scheduleList.map((schedule: ScheduleType) => {
          let marks: string[] = [];

          if (schedule.repeated) {
            marks = repeatFunction(schedule.scheduleDate, schedule.repeatCycle, schedule.repeatEndDate);
          } else marks = [schedule.scheduleDate];

          return { scheduleId: schedule.id, marks: marks };
        });
        return { scheduleList, scheduleMarks };
      }
    } else {
      console.log("scheduleList가 Array가 아닙니다.");
      return { scheduleList: [], scheduleMarks: [] };
    }
  } catch (error) {
    console.error("Error fetching or processing schedules:", error);
    return { scheduleList: [], scheduleMarks: [] };
  }
};

// 특정 날짜를 클릭하면 날짜에 해당하는 일정 객체를 찾고, (없으면 false반환) 해당 일정 객체의 정보를 반환하는 함수
const getScheduleInfo = async (
  selectedDate: string,
  scheduleList: ScheduleCalcResponseType["scheduleList"],
  scheduleMarks: ScheduleCalcResponseType["scheduleMarks"],
) => {
  let scheduleId: ScheduleType["id"], scheduleInfo;

  if (scheduleList.length === 0 || scheduleMarks.length === 0) {
    return { result: undefined, scheduleInfo: undefined };
  } else {
    const result = scheduleMarks.find((schedule) => {
      if (schedule.marks.find((value) => value === selectedDate)) {
        scheduleId = schedule.scheduleId;
        return true;
      } else return false;
    });

    const scheduleObject = scheduleList.find((schedule) => schedule.id === scheduleId);

    if (scheduleObject) {
      if (scheduleObject.placeId) {
        const params = { studyChannelId: scheduleObject.studyChannelId, placeId: scheduleObject.placeId };
        const placeInfo = await getPlace(params);
        const placeAddress = placeInfo?.placeAddress ?? "";
        scheduleInfo = {
          ...scheduleObject,
          placeAddress: placeAddress,
        };
      } else {
        scheduleInfo = {
          ...scheduleObject,
        };
      }
    }

    return { result, scheduleInfo };
  }
};

// 숫자로 된 값을 요일로 바꾸는 함수
const transDay = (selectedDay: number) => {
  let result;
  switch (selectedDay) {
    case 0:
      result = "일요일";
      break;
    case 1:
      result = "월요일";
      break;
    case 2:
      result = "화요일";
      break;
    case 3:
      result = "수요일";
      break;
    case 4:
      result = "목요일";
      break;
    case 5:
      result = "금요일";
      break;
    case 6:
      result = "토요일";
      break;

    default:
      break;
  }

  return result;
};

// 반복 조건을 post할 데이터타입으로 반환하는 함수
const situationCalculator = (repeatState: RepeatCycleType, selectedDate: string, selectedDay: number) => {
  let result;

  if (repeatState === "DAILY") {
    result = "EVERYDAY";
  }
  if (repeatState === "WEEKLY") {
    switch (selectedDay) {
      case 0:
        result = "SUNDAY";
        break;
      case 1:
        result = "MONDAY";
        break;
      case 2:
        result = "TUESDAY";
        break;
      case 3:
        result = "WEDNESDAY";
        break;
      case 4:
        result = "THURSDAY";
        break;
      case 5:
        result = "FRIDAY";
        break;
      case 6:
        result = "SATURDAY";
        break;
    }
  }
  if (repeatState === "MONTHLY") {
    result = Number(selectedDate.split("-")[2]);
  }

  return result;
};

export { repeatFunction, scheduleCalculator, getScheduleInfo, transDay, situationCalculator };
