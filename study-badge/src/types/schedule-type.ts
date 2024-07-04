type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateStoreType {
  selectedDate: "YYYY-MM-DD" | string;
  setSelectedDate: (selectedDate: DateStoreType["selectedDate"]) => void;
}

export type { Value, DateStoreType };
