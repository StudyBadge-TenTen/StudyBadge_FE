type RepeatCycleType = "DAILY" | "WEEKLY" | "MONTHLY";
type RepeatDailyType = "EVERYDAY";
type RepeatWeeklyType = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
type RepeatMonthlyType =
  | "MONTHLY_ONE"
  | "MONTHLY_TWO"
  | "MONTHLY_THREE"
  | "MONTHLY_FOUR"
  | "MONTHLY_FIVE"
  | "MONTHLY_SIX"
  | "MONTHLY_SEVEN"
  | "MONTHLY_EIGHT"
  | "MONTHLY_NINE"
  | "MONTHLY_TEN"
  | "MONTHLY_ELEVEN"
  | "MONTHLY_TWELVE"
  | "MONTHLY_THIRTEEN"
  | "MONTHLY_FOURTEEN"
  | "MONTHLY_FIFTEEN"
  | "MONTHLY_SIXTEEN"
  | "MONTHLY_SEVENTEEN"
  | "MONTHLY_EIGHTEEN"
  | "MONTHLY_NINETEEN"
  | "MONTHLY_TWENTY"
  | "MONTHLY_TWENTY_ONE"
  | "MONTHLY_TWENTY_TWO"
  | "MONTHLY_TWENTY_THREE"
  | "MONTHLY_TWENTY_FOUR"
  | "MONTHLY_TWENTY_FIVE"
  | "MONTHLY_TWENTY_SIX"
  | "MONTHLY_TWENTY_SEVEN"
  | "MONTHLY_TWENTY_EIGHT"
  | "MONTHLY_TWENTY_NINE"
  | "MONTHLY_THIRTY"
  | "MONTHLY_THIRTY_ONE";

interface ScheduleType {
  id: number;
  studyChannelId: number;
  scheduleName: string;
  scheduleContent: string;
  scheduleDate: "YYYY-MM-DD" | string;
  scheduleStartTime: "00:00:00" | string;
  scheduleEndTime: "00:00:00" | string;
  repeatCycle?: RepeatCycleType;
  repeatSituation?: RepeatDailyType | RepeatWeeklyType | RepeatMonthlyType;
  repeatEndDate?: "YYYY-MM-DD" | string;
  placeId?: number;
  placeAddress?: string;
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
  channelId: number;
  year: string;
  month: string;
}

interface ScheduleCalcResponseType {
  scheduleList: ScheduleType[];
  scheduleMarks: {
    scheduleId: number;
    marks: string[];
  }[];
}

type SelectorType = "" | "start-hour" | "start-minute" | "end-hour" | "end-minute" | "repeat-check" | "repeatEndDate";

interface TimeSelectorPropsType {
  selector: SelectorType;
  name: string;
  setTime: React.Dispatch<
    React.SetStateAction<{
      start: string[];
      end: string[];
    }>
  >;
}

type RepeatStateType = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";

interface RepeatSetterPropsType {
  repeatState: RepeatStateType;
  setRepeatState: React.Dispatch<React.SetStateAction<RepeatStateType>>;
  day: string | undefined;
  setSelector: React.Dispatch<React.SetStateAction<SelectorType>>;
}

interface SchedulePostType {
  type: "repeat" | "single";
  scheduleName: string;
  scheduleContent: string;
  scheduleDate: "YYYY-MM-DD" | string;
  scheduleStartTime: "00:00:00" | string;
  scheduleEndTime: "00:00:00" | string;
  repeatCycle?: RepeatCycleType;
  repeatSituation?: string | number;
  repeatEndDate?: "YYYY-MM-DD" | string;
  placeId?: number;
}

// -------- 임시) 장소 관련 ----------
interface PlaceParamsType {
  studyChannelId: number;
  placeId: number;
}
interface PlaceType {
  id: number;
  lat: number;
  lng: number;
  placeName: string;
  placeAddress: string;
}

export type {
  RepeatCycleType,
  RepeatDailyType,
  RepeatWeeklyType,
  ScheduleType,
  Value,
  DateStoreType,
  MonthStoreType,
  ScheduleParamsType,
  ScheduleCalcResponseType,
  SelectorType,
  TimeSelectorPropsType,
  RepeatStateType,
  RepeatSetterPropsType,
  SchedulePostType,
  //
  PlaceParamsType,
  PlaceType,
};
