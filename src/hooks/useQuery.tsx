// 추후 useQuery들 재사용 가능하도록 훅으로 분리 예정
import { useQuery } from "@tanstack/react-query";
import { MemberListResponseType, StudyInfoType } from "../types/study-channel-type";
import { getMemberList, getStudyInfo } from "../services/channel-api";

export const useGetStudyInfo = (channelId: number) => {
  const { data, error, isLoading } = useQuery<StudyInfoType, Error>({
    queryKey: ["studyInfo", channelId],
    queryFn: () => getStudyInfo(channelId),
  });
  return { data, error, isLoading };
};

export const useMemberList = (channelId: number) => {
  const { data, error, isLoading } = useQuery<MemberListResponseType, Error>({
    queryKey: ["memberList", channelId],
    queryFn: () => getMemberList(channelId),
  });
  return { data, error, isLoading };
};
