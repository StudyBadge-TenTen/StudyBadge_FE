interface PaginationType {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  dataListLength: number;
}

export type { PaginationType };
