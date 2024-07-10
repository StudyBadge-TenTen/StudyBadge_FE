import axios from "axios";
import { PlaceParamsType, ScheduleParamsType } from "../types/schedule-type";

// todo: react-query로 호출 최소화하는 방법 적용하기
const getSchedules = async ({ channelId, year, month }: ScheduleParamsType) => {
  const res = await axios.get(`/api/study-channels/${channelId}/schedules?year=${year}&month=${month}`);
  const schedules = res.data;
  return schedules;
};

const getPlace = async ({ scheduleId, placeId }: PlaceParamsType) => {
  const res = await axios.get(`/api/study-channels/${scheduleId}/places/${placeId}`);
  const placeInfo = res.data;
  return placeInfo;
};

export { getSchedules, getPlace };
