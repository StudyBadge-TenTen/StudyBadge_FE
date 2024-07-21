import {
  MemberListResponseType,
  StudyInfoPutRequestType,
  StudyInfoType,
  StudyStoreType,
} from "../types/study-channel-type";
import { fetchCall } from "./common";

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType>(`/api/study-channels/${studyChannelId}`, "get");
  return studyInfoResponse;
};

const putStudyInfo = async (studyChannelId: number, newStudyInfo: StudyInfoPutRequestType) => {
  const response = await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}`, "put", newStudyInfo);
  return response;
};

const getMemberList = async (studyChannelId: number) => {
  const memberList = await fetchCall<MemberListResponseType>(`/api/study-channels/${studyChannelId}/members`, "get");
  return memberList;
};

const postStudyChannel = async (requestBody: StudyStoreType) => {
  const response = await fetchCall<{ studyChannelId: number }>(`/api/study-channels`, "post", requestBody);
  return response;
};

export { getStudyInfo, putStudyInfo, getMemberList, postStudyChannel };
