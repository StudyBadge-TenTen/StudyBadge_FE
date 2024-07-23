import { BadgeType } from "./profile-type";

type StudyCategoryType = "IT" | "LANGUAGE" | "EMPLOYMENT" | "SELF_DEVELOPMENT";
type MeetingType = "ONLINE" | "OFFLINE";
type RecruitmentStatusType = "RECRUITING" | "RECRUIT_COMPLETED";
type OrderType = "RECENT" | "VIEW_COUNT";
type ApproveType = "APPROVE_WAITING" | string;

interface BasicStudyInfoType {
  name: string;
  description: string;
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  category: StudyCategoryType | "";
  meetingType: MeetingType;
  deposit: number;
}

interface postStudyRequestType extends BasicStudyInfoType {
  recruitmentNumber: number;
  minRecruitmentNumber: number;
  region: string;
  chattingUrl: string;
  depositDescription: string;
}

// 스터디 채널 정보 상세 타입
interface StudyInfoType extends BasicStudyInfoType {
  studyChannelId: number;
  studyChannelName: string;
  studyChannelDescription: string;
  chattingUrl: string | null;
  capacity: number;
  region: null | string; // ONLINE 일 경우 null, 오프라인일 경우 "서울시 ~~구" 반환
  leaderName: string;
  subLeaderName: string;
  isLeader: boolean;
}

interface StudyInfoPutRequestType {
  name: string;
  description: string;
  chattingUrl: string;
}

interface StudyListObjectType extends BasicStudyInfoType {
  studyChannelId: number;
  recruitmentStatus: RecruitmentStatusType;
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

interface RecruitmentInfoType {
  studyChannelId: number;
  recruitmentStatus: RecruitmentStatusType;
  participants: {
    memberId: number;
    imageUrl: string;
    name: string;
    banCnt: number;
    badgeLevel: BadgeType;
    participationId: number;
    participationStatus: ApproveType;
  }[];
}

interface newSubLeaderStateType {
  name: string;
  id: undefined | number;
}

type SetNewSubLeaderType = React.Dispatch<React.SetStateAction<newSubLeaderStateType>>;

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
  BasicStudyInfoType,
  postStudyRequestType,
  StudyInfoType,
  StudyInfoPutRequestType,
  StudyListObjectType,
  StudyListRequestType,
  StudyListResponseType,
  StudyRoleType,
  StudyMemberType,
  MemberListResponseType,
  AttendanceResponseType,
  RecruitmentInfoType,
  newSubLeaderStateType,
  SetNewSubLeaderType,
  // ---------------- store type
  StudyStoreType,
  StudyListStoreType,
  FilterStoreType,
  KeywordStoreType,
};
