import { StudyListRequestType, StudyListResponseType } from "../types/study-channel-type";
import { fetchCall } from "./common";

const getStudyList = async ({ page, order, type, category, status, keyword }: StudyListRequestType) => {
  const studyChannelListResponse = await fetchCall<StudyListResponseType>(
    `/api/study-channels?page=${page ?? 1}&order=${order ?? "RECENT"}&type=${type ?? ""}&category=${category ?? ""}&status=${status ?? ""}&keyword=${keyword ?? ""}`,
    "get",
  );
  return studyChannelListResponse;
};

export { getStudyList };
