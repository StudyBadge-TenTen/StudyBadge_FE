import { StudyListRequestType, StudyListResponseType } from "../types/study-channel-type";
import { fetchCall } from "./common";

const getStudyList = async ({ page, order, type, category, status, keyword }: StudyListRequestType) => {
  const params = { page, order, type, category, status, keyword };
  try {
    // undefined 값을 제거하는 로직 추가
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined));

    const studyChannelListResponse = await fetchCall<StudyListResponseType>(
      `/api/study-channels`,
      "get",
      null,
      filteredParams,
    );
    return studyChannelListResponse ?? {};
  } catch (error) {
    console.error("Failed to fetch study list:", error);
    throw error;
  }
};

export { getStudyList };
