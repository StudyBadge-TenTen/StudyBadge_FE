type BadgeType = "NONE" | "BRONZE" | "SILVER" | "GOLD";
type PointType = "EARNED" | "SPENT" | "DEDUCTED";
type TransferType = "STUDY_REWARD" | "PAYMENT_CHARGE" | "STUDY_DEPOSIT" | "PAYMENT_CANCEL";
// STUDY_REWARD, // 정산(환급)    PaymentHistory.EARNED (+)
// PAYMENT_CHARGE, // 충전    PaymentHistory.EARNED (+)
// STUDY_DEPOSIT,// 예치금  PaymentHistory.SPENT (-)
// PAYMENT_CANCEL // 취소 PaymentHistory.DEDUCTED (-)

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
  point: number;
  banCnt: number;
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

interface PaymentHistoryType {
  paymentKey: string;
  createdAt: Date;
  amount: number;
}

interface PointHistoryType {
  historyType: PointType;
  transferType: TransferType;
  amount: number;
  createdAt: Date;
}

export type {
  BadgeType,
  ProfileInfoType,
  ProfilePutType,
  UserInfoType,
  MyStudyMockType,
  MyStudyType,
  PaymentHistoryType,
  PointHistoryType,
};
