// schedule data
export const scheduleList = [
  {
    id: 0,
    studyChannelId: 1,
    scheduleName: "One-time Meeting",
    scheduleContent: "Discussion on project progress and planning",
    scheduleDate: "2024-07-05",
    scheduleStartTime: "10:00:00",
    scheduleEndTime: "11:00:00",
    placeId: 1,
    repeated: false,
  },
  {
    id: 1,
    studyChannelId: 1,
    scheduleName: "Weekly Team Meeting",
    scheduleContent: "Discussion on project progress and planning",
    scheduleDate: "2024-07-05",
    scheduleStartTime: "10:00:00",
    scheduleEndTime: "11:00:00",
    repeatCycle: "WEEKLY",
    repeatSituation: "MONDAY",
    repeatEndDate: "2024-12-31",
    repeated: true,
  },
  {
    id: 2,
    studyChannelId: 1,
    scheduleName: "Monthly Team Meeting",
    scheduleContent: "Discussion on project progress and planning",
    scheduleDate: "2024-07-05",
    scheduleStartTime: "10:00:00",
    scheduleEndTime: "11:00:00",
    repeatCycle: "MONTHLY",
    repeatSituation: "MONTHLY_FIVE",
    repeatEndDate: "2024-12-31",
    repeated: true,
  },
];

export const placeInfo = {
  id: 1,
  lat: 45.12,
  lng: 123.15,
  placeName: "스터디 카페 25시",
  placeAddress: "서울시 OO구 OO동 OO로 1길",
};

// userInfo data
export const userInfo = {
  email: "studybadge@email.com",
  name: "홍길동",
  nickname: "김스뱃",
  badgeLevel: "NONE",
  account: "12345678901",
  introduction: "안녕하세요, 프론트엔드 개발자 김스뱃입니다",
  imgUrl: "",
  point: 20000,
  banCnt: 0,
};
export const myStudyList = [
  {
    studyId: 1,
    studyName: "모각코",
    role: "LEADER",
  },
  {
    studyId: 2,
    studyName: "이런 북스터디",
    role: "MEMBER",
  },
  {
    studyId: 3,
    studyName: "내일은 코딩왕",
    role: "MEMBER",
  },
];

// payment data
export const paymentResponse = {
  payType: "CARD",
  amount: 10000,
  orderName: "포인트 충전",
  orderId: "sdht489sfsg",
  customerEmail: "studybadge@email.com",
  customerName: "홍길동",
  successUrl: `/success?paymentType=NORMAL&orderId=sdht489sfsg&paymentKey=woighogvh8593hff&amount=10000`,
  failUrl: `/fail?code=REJECT_CARD_COMPANY&message=REJECT_CARD_COMPANY
&orderId=sdht489sfsg`,
  failReason: "failReason",
  cancelYN: true,
  cancelReason: "cancelReason",
  createdAt: "createdAt",
};
export const paymentSuccessResponse = {
  paymentKey: "woighogvh8593hff",
  orderId: "sdht489sfsg",
  orderName: "포인트 충전",
  method: "CARD",
  totalAmount: 10000,
  requestedAt: new Date(),
  approvedAt: new Date(),
};

// studyList data
export const studyListResponse = {
  totalPage: 2,
  totalCount: 8,
  pageNumber: 1,
  pageSize: 6,
  studyChannels: [
    {
      studyChannelId: 1,
      name: "A 북스터디",
      category: "IT",
      description:
        "A 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "ONLINE",
      startDate: "2024.06.01",
      endDate: "2024.09.01",
      deposit: 10000,
      viewCount: 45,
      memberId: 15125,
      memberName: "홍길동",
    },
    {
      studyChannelId: 2,
      name: "B 북스터디",
      category: "SELF_DEVELOPMENT",
      description:
        "B 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15126,
      memberName: "홍길동",
    },
    {
      studyChannelId: 3,
      name: "C 북스터디",
      category: "IT",
      description:
        "A 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "ONLINE",
      startDate: "2024.06.01",
      endDate: "2024.09.01",
      deposit: 10000,
      viewCount: 45,
      memberId: 15127,
      memberName: "홍길동",
    },
    {
      studyChannelId: 4,
      name: "D 북스터디",
      category: "SELF_DEVELOPMENT",
      description:
        "B 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15128,
      memberName: "홍길동",
    },
    {
      studyChannelId: 5,
      name: "E 북스터디",
      category: "IT",
      description:
        "A 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "ONLINE",
      startDate: "2024.06.01",
      endDate: "2024.09.01",
      deposit: 10000,
      viewCount: 45,
      memberId: 15129,
      memberName: "홍길동",
    },
    {
      studyChannelId: 6,
      name: "F 북스터디",
      category: "SELF_DEVELOPMENT",
      description:
        "B 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다.",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15130,
      memberName: "홍길동",
    },
  ],
};

// studyInfo data
export const studyInfoResponse = {
  studyChannelId: 1,
  studyChannelName: "내일은 코딩왕",
  studyChannelDescription:
    "내일은 코딩왕 스터디 모임입니다. 매주 모여서 코딩을 합니다. 코딩에 관심있으신 분들 신청주세요!",
  chattingUrl: "http://study-chattingurl",
  capacity: 10,
  category: "IT",
  meetingType: "OFFLINE",
  region: "서울시 성동구",
  startDate: "2023-06-01",
  endDate: "2023-08-31",
  deposit: 20000,
  leaderName: "홍길동",
  subLeaderName: "김스뱃",
  isLeader: true,
};

// memberList data
export const memberListResponse = {
  studyMembers: [
    {
      memberId: 1,
      name: "홍길동",
      imageUrl: "",
      badgeLevel: "GOLD",
      role: "LEADER",
    },
    {
      memberId: 2,
      name: "김스뱃",
      imageUrl: "",
      badgeLevel: "NONE",
      role: "STUDY_MEMBER",
    },
    {
      memberId: 3,
      name: "김철수",
      imageUrl: "",
      badgeLevel: "SILVER",
      role: "STUDY_MEMBER",
    },
  ],
  leader: true,
};

export const attendanceResponse = [
  {
    memberId: 1,
    studyMemberId: 1,
    name: "홍길동",
    imageUrl: "imageUrl",
    attendanceCount: 10,
    attendanceRatio: 100,
  },
  {
    memberId: 1,
    studyMemberId: 2,
    name: "김스뱃",
    imageUrl: "imageUrl",
    attendanceCount: 5,
    attendanceRatio: 50,
  },
  {
    memberId: 1,
    studyMemberId: 3,
    name: "김철수",
    imageUrl: "imageUrl",
    attendanceCount: 8,
    attendanceRatio: 80,
  },
];

export const recruitmentResponse = {
  studyChannelId: 1,
  recruitmentStatus: "RECRUITING",
  participants: [
    {
      memberId: 7,
      imageUrl: "imageUrl",
      name: "이스뱃",
      banCnt: 0,
      badgeLevel: "NONE",
      participationId: 1,
      participationStatus: "APPROVE_WAITING",
    },
    {
      memberId: 8,
      imageUrl: "imageUrl",
      name: "박스뱃",
      banCnt: 3,
      badgeLevel: "GOLD",
      participationId: 2,
      participationStatus: "APPROVE_WAITING",
    },
    {
      memberId: 9,
      imageUrl: "imageUrl",
      name: "강스뱃",
      banCnt: 1,
      badgeLevel: "BRONZE",
      participationId: 3,
      participationStatus: "APPROVE_WAITING",
    },
  ],
};

// notification data
export const notificationList = [
  {
    notificationId: 3,
    receiverId: 1,
    notificationType: "출석 변동",
    content: "스터디 채널 내일은 코딩왕의 2024년 9월 10이의 출석 체크가 변경되었습니다.",
    url: "http://localhost:5173/channel/1/schedule",
    isRead: false,
  },
  {
    notificationId: 2,
    receiverId: 1,
    notificationType: "일정 변경",
    content: "스터디 채널 내일은 코딩왕의 2024년 9월 5이의 일정이 변경되었습니다.",
    url: "http://localhost:5173/channel/1/schedule",
    isRead: true,
  },
  {
    notificationId: 1,
    receiverId: 1,
    notificationType: "일정 생성",
    content: "스터디 채널 내일은 코딩왕의 2024년 9월 1이의 단일 일정이 생성되었습니다.",
    url: "http://localhost:5173/channel/1/schedule",
    // 이건 백엔드 api :/api/study-channels/%d/schedules/date?year=%d&month=%d
    isRead: true,
  },
];
