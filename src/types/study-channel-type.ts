import { BadgeType } from "./profile-type";

type StudyCategoryType = "IT" | "LANGUAGE" | "EMPLOYMENT" | "SELF_DEVELOPMENT";
type MeetingType = "ONLINE" | "OFFLINE";
type RecruitmentStatusType = "RECRUITING" | "RECRUIT_COMPLETED";
type OrderType = "RECENT" | "VIEW_COUNT";

// 스터디 채널 정보 상세 타입
interface StudyInfoType {
  studyChannelId: number;
  studyChannelName: string;
  studyChannelDescription: string;
  chattingUrl: string | null;
  capacity: number;
  category: StudyCategoryType;
  meetingType: MeetingType;
  region: null | string; // ONLINE 일 경우 null, 오프라인일 경우 "서울시 ~~구" 반환
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  deposit: number;
  leaderName: string;
  subLeaderName: string;
  isLeader: boolean;
}

interface StudyInfoPutRequestType {
  name: string;
  description: string;
  chattingUrl: string;
}

interface StudyListObjectType {
  studyChannelId: number;
  name: string;
  category: StudyCategoryType;
  description: string;
  recruitmentStatus: RecruitmentStatusType;
  meetingType: MeetingType;
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  deposit: number;
  viewCount: number;
  memberId: number;
  memberName: string;
}

interface StudyListRequestType {
  page: number;
  order: OrderType;
  type: null | MeetingType;
  category: null | StudyCategoryType;
  status: null | RecruitmentStatusType;
  keyword?: null | string;
}

interface StudyListResponseType {
  totalPage: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  studyChannels: StudyListObjectType[];
}

type StudyRoleType = "LEADER" | "SUB_LEADER" | "STUDY_MEMBER";

interface StudyMemberType {
  memberId: number;
  name: string;
  imageUrl: string;
  badgeLevel: BadgeType;
  role: StudyRoleType;
}

interface MemberListResponseType {
  studyMembers: StudyMemberType[];
  leader: boolean;
}

interface AttendanceResponseType {
  memberId: number;
  studyMemberId: number;
  name: string;
  imageUrl: string;
  attendanceCount: number;
  attendanceRatio: number;
}

// ----------------------------------- store type
interface StudyStoreType {
  name: string;
  description: string;
  category: StudyCategoryType | "";
  recruitmentNumber: number;
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  minRecruitmentNumber: number;
  meetingType: MeetingType;
  region: string;
  chattingUrl: string;
  depositDescription: string;
  deposit: number;
  setField: (field: keyof Omit<StudyStoreType, "setField" | "resetForm">, value: any) => void;
  resetForm: () => void;
}

interface StudyListStoreType {
  studyList: StudyListObjectType[] | [];
  setStudyList: (studyList: StudyListObjectType[]) => void;
}

interface FilterStoreType {
  filter: StudyListRequestType;
  setFilter: (filter: StudyListRequestType) => void;
}

interface KeywordStoreType {
  keywordValue: null | string;
  setKeywordValue: (keyword: null | string) => void;
}

export type {
  StudyCategoryType,
  MeetingType,
  RecruitmentStatusType,
  OrderType,
  StudyInfoType,
  StudyInfoPutRequestType,
  StudyListObjectType,
  StudyListRequestType,
  StudyListResponseType,
  StudyRoleType,
  StudyMemberType,
  MemberListResponseType,
  AttendanceResponseType,
  StudyStoreType,
  StudyListStoreType,
  FilterStoreType,
  KeywordStoreType,
};
