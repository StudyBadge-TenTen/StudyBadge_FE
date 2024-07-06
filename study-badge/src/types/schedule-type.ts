type RepeatDailyType = "DAILY_ONE" | "DAILY_TWO" | "DAILY_THREE" | "DAILY_FOUR" | "DAILY_FIVE" | "DAILY_SIX";
type RepeatWeeklyType = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

interface ScheduleType {
  id: number | string;
  studyChannelId: number | string;
  scheduleName: string;
  scheduleContent: string;
  scheduleDate: "YYYY-MM-DD" | string;
  scheduleStartTime: "00:00:00" | string;
  scheduleEndTime: "00:00:00" | string;
  repeatCycle: null | "DAILY" | "WEEKLY" | "MONTHLY";
  repeatSituation: null | RepeatDailyType | RepeatWeeklyType;
  repeatEndDate: "YYYY-MM-DD" | string;
  placeId: number | string;
  repeated: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateStoreType {
  selectedDate: "YYYY-MM-DD" | string;
  setSelectedDate: (selectedDate: DateStoreType["selectedDate"]) => void;
}

interface MonthStoreType {
  selectedMonth: string;
  setSelectedMonth: (selectedMonth: string) => void;
}

interface ScheduleParamsType {
  channelId: string;
  year: string;
  month: string;
}

interface ScheduleCalcResponseType {
  scheduleList: ScheduleType[];
  scheduleMarks: {
    scheduleId: string | number;
    marks: string[];
  }[];
}

interface ScheduleInfoType {
  name: string;
  content: string;
  time: string[];
  placeAddress: string;
}

// -------- 임시) 장소 관련 ----------
interface PlaceParamsType {
  scheduleId: string | number;
  placeId: string | number;
}
interface PlaceType {
  id: string | number;
  lat: number;
  lng: number;
  placeName: string;
  placeAddress: string;
}

export type {
  RepeatDailyType,
  RepeatWeeklyType,
  ScheduleType,
  Value,
  DateStoreType,
  MonthStoreType,
  ScheduleParamsType,
  ScheduleCalcResponseType,
  ScheduleInfoType,
  PlaceParamsType,
  PlaceType,
};
