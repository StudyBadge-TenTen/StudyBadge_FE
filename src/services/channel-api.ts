import { StudyInfoPutRequestType, StudyInfoType } from "../types/study-channel-type";
import fetchCall from "./common";

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType>(`/api/study-channels/${studyChannelId}`, "get");
  return studyInfoResponse;
};

const putStudyInfo = async (studyChannelId: number, newStudyInfo: StudyInfoPutRequestType) => {
  const response = await fetchCall<ResponseType>(`/api/study-channels/${studyChannelId}`, "put", newStudyInfo);
  return response;
};

export { getStudyInfo, putStudyInfo };
