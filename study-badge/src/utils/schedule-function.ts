// 1.DAILY 2.WEEKLY 3.MONTHLY 3가지 상황 날짜 계산해서 마크 리스트로 반환하는 함수

import moment from "moment";
import { RepeatDailyType, ScheduleCalcResponseType, ScheduleParamsType, ScheduleType } from "../types/schedule-type";
import { getPlace, getSchedules } from "../services/schedule-api";

// 일간반복(며칠마다)으로 달력에 마크할 날짜들을 반환하는 함수
const repeatDaily = (
  scheduleDate: ScheduleType["scheduleDate"],
  repeatSituation: RepeatDailyType,
  repeatEndDate: ScheduleType["repeatEndDate"],
) => {
  const startDate = new Date(scheduleDate);
  let newDate = startDate;
  let marks = [moment(newDate).format("YYYY-MM-DD")];

  switch (repeatSituation) {
    case "DAILY_ONE":
      while (new Date(newDate.setDate(newDate.getDate() + 1)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
    case "DAILY_TWO":
      while (new Date(newDate.setDate(newDate.getDate() + 2)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
    case "DAILY_THREE":
      while (new Date(newDate.setDate(newDate.getDate() + 3)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
    case "DAILY_FOUR":
      while (new Date(newDate.setDate(newDate.getDate() + 4)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
    case "DAILY_FIVE":
      while (new Date(newDate.setDate(newDate.getDate() + 5)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
    case "DAILY_SIX":
      while (new Date(newDate.setDate(newDate.getDate() + 6)) <= new Date(repeatEndDate)) {
        marks.push(moment(newDate).format("YYYY-MM-DD"));
      }
      break;
  }

  return marks;
};

// 주간반복(매주)으로 달력에 마크할 날짜들을 반환하는 함수
const repeatWeekly = (scheduleDate: ScheduleType["scheduleDate"], repeatEndDate: ScheduleType["repeatEndDate"]) => {
  const startDate = new Date(scheduleDate);
  let newDate = startDate;
  let marks = [moment(newDate).format("YYYY-MM-DD")];

  while (new Date(newDate.setDate(newDate.getDate() + 7)) <= new Date(repeatEndDate)) {
    marks.push(moment(newDate).format("YYYY-MM-DD"));
  }

  return marks;
};

// 월간반복(매월)으로 달력에 마크할 날짜들을 반환하는 함수
const repeatMonthly = (scheduleDate: ScheduleType["scheduleDate"], repeatEndDate: ScheduleType["repeatEndDate"]) => {
  const startDate = new Date(scheduleDate);
  const newDate = startDate;
  let marks = [moment(newDate).format("YYYY-MM-DD")];

  while (new Date(newDate.setMonth(newDate.getMonth() + 1)) <= new Date(repeatEndDate)) {
    marks.push(moment(newDate).format("YYYY-MM-DD"));
  }

  return marks;
};

const scheduleCalculator = async ({ channelId, year, month }: ScheduleParamsType) => {
  try {
    const scheduleList: ScheduleType[] = await getSchedules({ channelId, year, month });

    const scheduleMarks = scheduleList.map((schedule: ScheduleType) => {
      let marks: string[] = [];

      if (schedule.repeated) {
        // 반복타입에 따라 4가지 함수 호출+계산
        switch (schedule.repeatCycle) {
          case "DAILY":
            marks = repeatDaily(
              schedule.scheduleDate,
              schedule.repeatSituation as RepeatDailyType,
              schedule.repeatEndDate,
            );
            break;
          case "WEEKLY":
            marks = repeatWeekly(schedule.scheduleDate, schedule.repeatEndDate);
            break;
          case "MONTHLY":
            marks = repeatMonthly(schedule.scheduleDate, schedule.repeatEndDate);
            break;
        }
      } else marks = [schedule.scheduleDate];

      return { scheduleId: schedule.id, marks: marks };
    });
    return { scheduleList, scheduleMarks };
  } catch (error) {
    console.error("Error fetching or processing schedules:", error);
    return { scheduleList: [], scheduleMarks: [] };
  }
};

const getScheduleInfo = async (
  selectedDate: string,
  scheduleList: ScheduleCalcResponseType["scheduleList"],
  scheduleMarks: ScheduleCalcResponseType["scheduleMarks"],
) => {
  let scheduleId: ScheduleType["id"], scheduleInfo;

  const result = scheduleMarks.find((schedule) => {
    if (schedule.marks.find((value) => value === selectedDate)) {
      scheduleId = schedule.scheduleId;
      return true;
    } else return false;
  });

  const scheduleObject = scheduleList.find((schedule) => schedule.id === scheduleId);

  if (scheduleObject) {
    const params = { scheduleId: scheduleObject.id, placeId: scheduleObject.placeId };
    const { placeAddress } = await getPlace(params);
    scheduleInfo = {
      name: scheduleObject.scheduleName,
      content: scheduleObject.scheduleContent,
      time: [scheduleObject.scheduleStartTime, scheduleObject.scheduleEndTime],
      placeAddress: placeAddress,
    };
  }

  return { result, scheduleInfo };
};

export { repeatDaily, repeatWeekly, repeatMonthly, scheduleCalculator, getScheduleInfo };
