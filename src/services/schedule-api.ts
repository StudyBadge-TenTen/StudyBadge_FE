import {
  DeleteRequestBodyType,
  PlaceParamsType,
  PlaceType,
  ScheduleParamsType,
  ScheduleType,
  RepeatCycleType,
  NewScheduleType,
} from "../types/schedule-type";
import { fetchCall } from "./common";

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

const postSchedule = async (
  studyChannelId: number,
  scheduleInfo: NewScheduleType,
  repeatState: RepeatCycleType | "NONE",
) => {
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

export { getSchedules, getPlace, postSchedule, putSchedule, deleteSchedule };
