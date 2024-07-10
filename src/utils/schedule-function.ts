// 1.DAILY 2.WEEKLY 3.MONTHLY 3가지 상황 날짜 계산해서 마크 리스트로 반환하는 함수

import moment from "moment";
import { ScheduleCalcResponseType, ScheduleParamsType, ScheduleType } from "../types/schedule-type";
import { getPlace, getSchedules } from "../services/schedule-api";

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

const scheduleCalculator = async ({ channelId, year, month }: ScheduleParamsType) => {
  try {
    const scheduleList: ScheduleType[] = await getSchedules({ channelId, year, month });

    const scheduleMarks = scheduleList.map((schedule: ScheduleType) => {
      let marks: string[] = [];

      if (schedule.repeated) {
        marks = repeatFunction(schedule.scheduleDate, schedule.repeatCycle, schedule.repeatEndDate);
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
    if (scheduleObject.placeId) {
      const params = { studyChannelId: scheduleObject.studyChannelId, placeId: scheduleObject.placeId };
      const { placeAddress } = await getPlace(params);
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
};

export { repeatFunction, scheduleCalculator, getScheduleInfo };
