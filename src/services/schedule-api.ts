import {
  DeleteRequestBodyType,
  PlaceParamsType,
  PlaceType,
  ScheduleParamsType,
  ScheduleType,
  RepeatCycleType,
  NewScheduleType,
  ScheduleRepeatType,
  AttendMemberType,
  postAttendRequestType,
} from "../types/schedule-type";
import { fetchCall } from "./common";

// todo: react-query로 호출 최소화하는 방법 적용하기
const getSchedules = async ({ channelId, year, month }: ScheduleParamsType) => {
  if (!channelId || !year || !month) return [];
  const schedules = await fetchCall<ScheduleType[]>(
    `/api/study-channels/${channelId}/schedules?year=${year}&month=${month}`,
    "get",
  );
  return schedules;
};

const getPlace = async ({ studyChannelId, placeId }: PlaceParamsType) => {
  if (!studyChannelId || !placeId) {
    console.log("error: studyChannelId와 placeId가 존재하지 않습니다.");
    return;
  }
  const placeInfo = await fetchCall<PlaceType>(`/api/study-channels/${studyChannelId}/places/${placeId}`, "get");
  return placeInfo;
};

const postSchedule = async (
  studyChannelId: number,
  scheduleInfo: NewScheduleType,
  repeatState: RepeatCycleType | "NONE",
) => {
  if (!studyChannelId || !scheduleInfo || !repeatState) return;
  let response;

  if (repeatState === "NONE") {
    response = await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/single-schedules`,
      "post",
      scheduleInfo,
    );
  } else {
    response = await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/repeat-schedules`,
      "post",
      scheduleInfo,
    );
  }

  return response;
};

const putSchedule = async (studyChannelId: number, newScheduleInfo: NewScheduleType, isAfterEvent?: boolean) => {
  if (!studyChannelId || !newScheduleInfo || !isAfterEvent) return;
  let response;

  if (isAfterEvent === undefined) {
    response = await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}/schedules`, "put", newScheduleInfo);
  } else {
    response = await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/schedules/isAfterEvent?Same=${isAfterEvent}`,
      "put",
      newScheduleInfo,
    );
  }

  return response;
};

const deleteSchedule = async (
  studyChannelId: number,
  deleteRequestBody: DeleteRequestBodyType,
  isAfterEvent?: boolean,
) => {
  if (!studyChannelId || !deleteRequestBody || !isAfterEvent) return;
  let response;

  if (isAfterEvent === undefined) {
    response = await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/schedules`,
      "delete",
      deleteRequestBody,
    );
  } else {
    response = await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/schedules/isAfterEvent?Same=${isAfterEvent}`,
      "delete",
      deleteRequestBody,
    );
  }

  return response;
};

const getAttendList = async (
  channelId: number,
  scheduleId: number | undefined,
  scheduleType: ScheduleRepeatType,
  date: string,
) => {
  if (!channelId || !scheduleId || !scheduleType || !date) return [];
  const response = await fetchCall<AttendMemberType[]>(
    `/api/study-channels/${channelId}/${scheduleType}-schedules/${scheduleId}/members?date=${date}`,
    "get",
  );

  return response;
};

const postAttendList = async (studyChannelId: number, requestBody: postAttendRequestType) => {
  if (!requestBody) return;
  try {
    await fetchCall(`/api/study-channels/${studyChannelId}/check-attendance`, "post", requestBody);
  } catch (error) {
    console.log(error);
  }
};

export { getSchedules, getPlace, postSchedule, putSchedule, deleteSchedule, getAttendList, postAttendList };
