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
  account: "000000000000",
  introduction: "안녕하세요, 프론트엔드 개발자 김스뱃입니다",
  imgUrl: "",
};

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
