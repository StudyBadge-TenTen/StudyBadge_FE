// 추후 useQuery들 재사용 가능하도록 훅으로 분리 예정
import { useQuery } from "@tanstack/react-query";
import {
  AttendanceResponseType,
  MemberListResponseType,
  RecruitmentInfoType,
  StudyInfoType,
} from "../types/study-channel-type";
import { getAttendance, getMemberList, getRecruitment, getStudyInfo } from "../services/channel-api";
import { getApplicationList, getProfile } from "@/services/profile-api";
import { UserInfoType } from "@/types/profile-type";
import { getAllSchedules } from "@/services/schedule-api";
import { ScheduleType } from "@/types/schedule-type";

export const useUserInfo = (accessToken: string | null) => {
  const { data, isLoading, error } = useQuery<UserInfoType, Error>({
    queryKey: ["UserInfo"],
    queryFn: () => getProfile(),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, isLoading, error };
};

export const useGetStudyInfo = (channelId: number) => {
  const { data, error, isLoading } = useQuery<StudyInfoType, Error>({
    queryKey: ["studyInfo", channelId],
    queryFn: () => getStudyInfo(channelId),
  });
  return { data, error, isLoading };
};

export const useMemberList = (channelId: number, accessToken: string | null) => {
  const { data, error, isLoading } = useQuery<MemberListResponseType, Error>({
    queryKey: ["memberList", channelId],
    queryFn: () => getMemberList(channelId),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, error, isLoading };
};

export const useRecruitment = (channelId: number, accessToken: string | null) => {
  const { data, error, isLoading } = useQuery<RecruitmentInfoType, Error>({
    queryKey: ["recruitmentList", channelId],
    queryFn: () => getRecruitment(Number(channelId)),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, error, isLoading };
};

export const useApplicationList = (accessToken: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["participation"],
    queryFn: () => getApplicationList(),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, error, isLoading };
};

export const useAttendanceList = (channelId: number, accessToken: string | null) => {
  const { data, error, isLoading } = useQuery<AttendanceResponseType[], Error>({
    queryKey: ["attendance", channelId],
    queryFn: () => getAttendance(Number(channelId)),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, error, isLoading };
};

export const useAllSchedules = (channelId: number, accessToken: string | null) => {
  const { data, error, isLoading } = useQuery<ScheduleType[], Error>({
    queryKey: ["allSchedules", channelId],
    queryFn: () => getAllSchedules(accessToken, Number(channelId)),
    enabled: !!accessToken, // accessToken이 있는 경우에만 쿼리 실행
  });
  return { data, error, isLoading };
};
