import { StudyInfoType } from "../types/study-channel-type";
import fetchCall from "./common";

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType>(`/api/study-channels/${studyChannelId}`, "get");
  return studyInfoResponse;
};

export { getStudyInfo };
