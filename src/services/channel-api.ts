import {
  AttendanceResponseType,
  MemberListResponseType,
  StudyInfoPutRequestType,
  StudyInfoType,
} from "../types/study-channel-type";
import { fetchCall } from "./common";

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType>(`/api/study-channels/${studyChannelId}`, "get");
  return studyInfoResponse;
};

const putStudyInfo = async (studyChannelId: number, newStudyInfo: StudyInfoPutRequestType) => {
  try {
    await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}`, "put", newStudyInfo);
  } catch (error) {
    console.log(error);
  }
};

const getMemberList = async (studyChannelId: number) => {
  const memberList = await fetchCall<MemberListResponseType>(`/api/study-channels/${studyChannelId}/members`, "get");
  return memberList;
};

const postSubLeader = async (studyChannelId: number, requestBody: { studyMemberId: number }) => {
  try {
    await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}/members/assign-role`, "post", requestBody);
  } catch (error) {
    console.log(error);
  }
};

const getAttendance = async (studyChannelId: number) => {
  const attendance = await fetchCall<AttendanceResponseType[]>(
    `/api/study-channels/${studyChannelId}/attendances`,
    "get",
  );
  return attendance;
};

export { getStudyInfo, putStudyInfo, getMemberList, postSubLeader, getAttendance };
