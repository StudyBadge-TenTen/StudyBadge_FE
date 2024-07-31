import { PaymentHistoryType, PointHistoryType } from "./profile-type";
import { StudyListRequestType } from "./study-channel-type";

interface PaginationPropsType {
  type: "CHANNEL" | "HISTORY" | "NOTIFICATION";
  filter?: StudyListRequestType;
  setFilter?: (filter: StudyListRequestType) => void;
  dataListLength: number;
  pageState?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  historyList?: PaymentHistoryType[] | PointHistoryType[];
}

export type { PaginationPropsType };
