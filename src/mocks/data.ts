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
export const placeId = { id: 1 };
export const attendList = [
  {
    memberId: 1,
    studyMemberId: 1,
    name: "홍길동",
    imageUrl: "imageUrl",
    attendanceStatus: "ATTENDANCE",
    attendance: true,
  },
  {
    memberId: 1,
    studyMemberId: 2,
    name: "김스뱃",
    imageUrl: "imageUrl",
    attendanceStatus: "NO_ATTENDANCE",
    attendance: false,
  },
  {
    memberId: 1,
    studyMemberId: 3,
    name: "김철수",
    imageUrl: "imageUrl",
    attendanceStatus: "ATTENDANCE",
    attendance: true,
  },
];

// userInfo(profile) data
export const userInfo = {
  memberId: 1,
  email: "studybadge@email.com",
  name: "홍길동",
  nickname: "홍길동",
  badgeLevel: "NONE",
  account: "12345678901",
  accountBank: "우리은행",
  isAccountCert: true,
  introduction: "안녕하세요, 프론트엔드 개발자 홍길동입니다",
  imgUrl: "",
  point: 20000,
  banCnt: 0,
};
export const myStudyList = [
  {
    studyId: 1,
    studyName: "모각코",
    role: "LEADER",
    attendanceRatio: 80,
  },
  {
    studyId: 2,
    studyName: "이런 북스터디",
    role: "MEMBER",
    attendanceRatio: 60,
  },
  {
    studyId: 3,
    studyName: "내일은 코딩왕",
    role: "LEADER",
    attendanceRatio: 100,
  },
];
export const paymentsList = [
  {
    paymentKey: "this-is-paymentKey-hd2849-82hso",
    createdAt: "2024-07-22T08:42:22.490Z",
    amount: 15000,
  },
  {
    paymentKey: "this-is-paymentKey-wei74-tie39",
    createdAt: "2024-06-01T07:08:08.440Z",
    amount: 25000,
  },
];
export const pointList = [
  {
    historyType: "EARNED",
    transferType: "STUDY_REWARD",
    amount: 11500,
    createdAt: "2024-08-05T08:42:22.490Z",
  },
  {
    historyType: "EARNED",
    transferType: "PAYMENT_CHARGE",
    amount: 15000,
    createdAt: "2024-07-22T08:42:22.490Z",
  },
  {
    historyType: "SPENT",
    transferType: "STUDY_DEPOSIT",
    amount: 20000,
    createdAt: "2024-06-08T07:08:08.440Z",
  },
  {
    historyType: "EARNED",
    transferType: "PAYMENT_CHARGE",
    amount: 25000,
    createdAt: "2024-06-01T07:08:08.440Z",
  },
];
export const applicationList = [
  {
    studyChannelId: 10,
    studyChannelName: "책과 커피",
    participationStatus: "APPROVE_WAITING",
  },
  {
    studyChannelId: 11,
    studyChannelName: "불타는 취준생들",
    participationStatus: "APPROVED",
  },
  {
    studyChannelId: 12,
    studyChannelName: "내일은 발명왕",
    participationStatus: "CANCELED",
  },
];

// payment data
export const paymentResponse = {
  payType: "CARD",
  amount: 10000,
  orderName: "포인트 충전",
  orderId: "this-is-order-id-489",
  customerEmail: "studybadge@email.com",
  customerName: "홍길동",
  successUrl: `/success?paymentType=NORMAL&orderId=this-is-order-id-489&paymentKey=this-is-paymentKey-8593hff&amount=10000`,
  failUrl: `/fail?code=REJECT_CARD_COMPANY&message=REJECT_CARD_COMPANY
&orderId=this-is-order-id-489`,
  failReason: "failReason",
  cancelYN: true,
  cancelReason: "cancelReason",
  createdAt: "createdAt",
};
export const paymentSuccessResponse = {
  paymentKey: "this-is-paymentKey-8593hff",
  orderId: "this-is-order-id-489",
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
      name: "모각코",
      category: "IT",
      description: "모여서 코딩 공부하는 스터디 모임입니다! 온라인 모임이니 관심 있으신 분들 편하게 신청부탁드려요~",
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
      name: "이런 북스터디",
      category: "SELF_DEVELOPMENT",
      description:
        "이런 북스터디는 OO책의 12단원 중 각자 1단원씩 맡아 다른 스터디원들에게 설명하는 발표형식 스터디입니다. 독서에도 관심있으면서, 사람들 앞에서 말하는 연습을 하고 싶은 분들을 찾습니다! 오프라인 모임이니 지역도 확인 부탁드려요!",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15126,
      memberName: "김스뱃",
    },
    {
      studyChannelId: 3,
      name: "내일은 코딩왕",
      category: "IT",
      description:
        "내일은 코딩왕 스터디 모임은 코딩 테스트를 준비 중인 사람들끼리 모여서 대비하는 스터디 모임입니다. 매일 5개의 문제를 필수로 푸는 걸 목표로 하고 있습니다. 꾸준히 참여 가능하신 분들 신청부탁드립니다!",
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
      name: "책과 커피",
      category: "SELF_DEVELOPMENT",
      description:
        "책과 커피는 카페에서 모여 조용히 커피를 곁들어 독서의 시간을 느끼는 스터디 모임입니다! 그냥 조금씩 읽고 그 날 읽은 부분 중에 인상깊은 부분을 한 줄 정도 정리해서 공유하는 식으로 진행할 예정이라 독서에 부담이 있으신 분들도 편하게 참여 가능해요!",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15128,
      memberName: "김철수",
    },
    {
      studyChannelId: 5,
      name: "불타는 취준생들",
      category: "EMPLOYMENT",
      description:
        "불타는 취준생들은 같이 모여 마케팅 취업 면접을 준비하는 스터디 모임입니다! 다른 사람들의 객관적인 평가를 듣고 싶거나 사람들 앞에서 면접 연습을 하고 싶은 사람들이 모이길 기대하는 스터디 모임이니 관심 있으신 분들 신청 부탁드립니다!",
      recruitmentStatus: "RECRUITING",
      meetingType: "ONLINE",
      startDate: "2024.06.01",
      endDate: "2024.09.01",
      deposit: 10000,
      viewCount: 45,
      memberId: 15129,
      memberName: "이영희",
    },
    {
      studyChannelId: 6,
      name: "말하는 영어",
      category: "LANGUAGE",
      description:
        "말하는 영어는 영어 회화 연습을 위한 스터디 모임입니다. 오프라인으로 직접 사람들과 특정 주제를 정해 대화하는 방식으로 진행할 예정입니다! 관심 있으신 분들 신청해주세요!",
      recruitmentStatus: "RECRUITING",
      meetingType: "OFFLINE",
      startDate: "2024.09.01",
      endDate: "2024.11.01",
      deposit: 20000,
      viewCount: 80,
      memberId: 15130,
      memberName: "지니",
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
  leaderName: "홍길동",
  subLeaderName: "김스뱃",
  recruitmentStatus: "RECRUITING",
  studyEnd: false,
  startDate: "2023-06-01",
  endDate: "2025-08-31",
  deposit: 10000,

  studyMember: true,
  leader: true,
  memberName: "김스뱃",
  attendanceRatio: "100",
  refundsAmount: 10000,
};

// memberList data
export const memberListResponse = {
  studyMembers: [
    {
      memberId: 11,
      studyMemberId: 1,
      name: "홍길동",
      imageUrl: "",
      badgeLevel: "GOLD",
      role: "LEADER",
    },
    {
      memberId: 12,
      studyMemberId: 2,
      name: "김스뱃",
      imageUrl: "",
      badgeLevel: "NONE",
      role: "STUDY_MEMBER",
    },
    {
      memberId: 13,
      studyMemberId: 3,
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
export const notificationList = {
  totalPages: 10,
  totalElements: 95,
  size: 10,
  content: [
    {
      notificationId: 94,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[모각코]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: false,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 93,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[이런 북스터디]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 92,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[이런 북스터디]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 91,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[모각코]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: false,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 90,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[모각코]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 89,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[모각코]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 88,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[이런 북스터디]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 87,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[모각코]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 86,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[내일은 코딩왕]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
    {
      notificationId: 85,
      receiverId: 1,
      notificationType: "일정 생성",
      content: "[내일은 코딩왕]의 2024-08-14 새로운 단일 일정이 생성되었습니다.",
      url: "/channel/1/schedule/2024-08-14",
      isRead: true,
      createdAt: new Date("2024-08-14 T10:20:05"),
    },
  ],
};
