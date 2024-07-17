import { StudyListRequestType, StudyListResponseType } from "../types/study-channel-type";
import fetchCall from "./common";

const getStudyList = async ({ page, order, type, category, status }: StudyListRequestType) => {
  const studyChannelListResponse = await fetchCall<StudyListResponseType>(
    `/api/study-channels?page=${page}&order=${order}&type=${type}&category=${category}&status=${status}`,
    "get",
  );
  return studyChannelListResponse;
};

export { getStudyList };
