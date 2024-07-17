import { StudyListRequestType } from "./study-channel-type";

interface PaginationPropsType {
  filter: StudyListRequestType;
  setFilter: (filter: StudyListRequestType) => void;
  dataListLength: number;
}

export type { PaginationPropsType };
