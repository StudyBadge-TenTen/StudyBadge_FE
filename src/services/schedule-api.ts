import axios, { AxiosError, AxiosResponse } from "axios";
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
import { CustomErrorType } from "@/types/common";

const getAllSchedules = async (accessToken: string | null, channelId: number) => {
  if (!accessToken || !channelId) {
    console.log("error: accessToken, channelId 중 없는 요소가 있습니다.");
    return [];
  }
  try {
    const allSchedules = await fetchCall<ScheduleType[]>(`/api/study-channels/${channelId}/schedules`, "get");
    return allSchedules;
  } catch (error) {
    console.error("Failed to fetch schedules:", error);
    return [];
  }
};

const getSchedules = async ({ channelId, year, month }: ScheduleParamsType) => {
  // if (!accessToken) {
  //   console.log("error: accessToken이 없습니다.");
  //   return [];
  // }
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

const getAttendList = async (
  channelId: number,
  scheduleId: number | undefined,
  scheduleType: ScheduleRepeatType,
  date: string,
) => {
  // if (!channelId || !scheduleId || !scheduleType || !date) return [];
  const response = await fetchCall<AttendMemberType[] | AxiosError>(
    `/api/study-channels/${channelId}/${scheduleType}-schedules/${scheduleId}/members?date=${date}`,
    "get",
  );
  if (axios.isAxiosError(response)) {
    const error = response.response?.data as CustomErrorType;
    alert(error.message);
    return [];
  } else {
    return response ?? [];
  }
};

const postAttendList = async (studyChannelId: number, requestBody: postAttendRequestType) => {
  if (!requestBody) return;
  try {
    await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/check-attendance`,
      "post",
      requestBody,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(`${error.response?.data.errorCode}: ${error.response?.data.message}`);
    } else {
      console.log(error);
      alert(
        "출석체크에 문제가 발생하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  }
};

export {
  getAllSchedules,
  getSchedules,
  getPlace,
  postSchedule,
  putSchedule,
  deleteSchedule,
  getAttendList,
  postAttendList,
};
