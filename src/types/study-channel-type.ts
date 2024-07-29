import { BadgeType } from "./profile-type";

type StudyCategoryType = "IT" | "LANGUAGE" | "EMPLOYMENT" | "SELF_DEVELOPMENT";
type MeetingType = "ONLINE" | "OFFLINE";
type RecruitmentStatusType = "RECRUITING" | "RECRUIT_COMPLETED";
type OrderType = "RECENT" | "VIEW_COUNT";
type ApproveType = "APPROVE_WAITING" | string;

interface BasicStudyInfoType {
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  category: StudyCategoryType | "";
  meetingType: MeetingType;
  deposit: number;
}

interface postStudyRequestType extends BasicStudyInfoType {
  name: string;
  description: string;
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
  recruitmentStatus: RecruitmentStatusType;
  studyEnd: boolean;
  // 이 아래로는 현재 info를 조회하는 이용자에 대한 정보
  studyMember: boolean;
  leader: boolean;
  memberName: string | null;
  attendanceRatio: number | null;
  refundsAmount: number;
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
  type: undefined | MeetingType;
  category: undefined | StudyCategoryType;
  status: undefined | RecruitmentStatusType;
  keyword: undefined | string;
}

interface StudyListResponseType {
  totalPage: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  studyChannels: StudyListObjectType[];
}

// 멤버
type StudyRoleType = "LEADER" | "SUB_LEADER" | "STUDY_MEMBER";

interface MemberListPropsType {
  setNewSubLeader?: SetNewSubLeaderType;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isStudyEnd: boolean;
}

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
  MemberListPropsType,
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
};
