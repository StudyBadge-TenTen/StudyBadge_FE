import { PlaceParamsType, PlaceType, ScheduleParamsType, SchedulePostType, ScheduleType } from "../types/schedule-type";
import fetchCall from "./common";

// todo: react-query로 호출 최소화하는 방법 적용하기
const getSchedules = async ({ channelId, year, month }: ScheduleParamsType) => {
  const schedules = await fetchCall<ScheduleType[]>(
    `/api/study-channels/${channelId}/schedules?year=${year}&month=${month}`,
    "get",
  );
  return schedules;
};

const getPlace = async ({ studyChannelId, placeId }: PlaceParamsType) => {
  const placeInfo = await fetchCall<PlaceType>(`/api/study-channels/${studyChannelId}/places/${placeId}`, "get");
  return placeInfo;
};

const postSchedule = async (studyChannelId: number | string, scheduleInfo: SchedulePostType) => {
  const result = await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}/schedules`, "post", scheduleInfo);

  return result;
};

export { getSchedules, getPlace, postSchedule };
