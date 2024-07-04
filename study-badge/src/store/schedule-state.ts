import { create } from "zustand";
import moment from "moment";
import { DateStoreType } from "../types/schedule-type";

const useSelectedDateStore = create<DateStoreType>((set) => ({
  selectedDate: moment(new Date()).format("YYYY-MM-DD"),
  setSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
}));

export default useSelectedDateStore;
