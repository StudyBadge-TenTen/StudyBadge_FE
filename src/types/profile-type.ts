type BadgeType = "NONE" | "BRONZE" | "SILVER" | "GOLD";

interface ProfileInfoType {
  nickname: string;
  introduction: string;
  account: string;
  imgUrl: string;
}

interface ProfilePutType {
  memberUpdateRequest: ProfileInfoType;
  file: File | undefined;
}

interface UserInfoType {
  email: string;
  name: string;
  nickname: string;
  badgeLevel: BadgeType;
  account: string;
  introduction: string;
  imgUrl: string;
  point: 0;
  banCnt: 0;
}

interface MyStudyMockType {
  body: {
    studyId: number;
    studyName: string;
    role: string;
  }[];
}

interface MyStudyType {
  studyId: number;
  studyName: string;
  role: "LEADER" | string;
}

export type { BadgeType, ProfileInfoType, ProfilePutType, UserInfoType, MyStudyMockType, MyStudyType };
