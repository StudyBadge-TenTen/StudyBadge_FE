import { create } from "zustand";
import moment from "moment";
import { DateStoreType, MonthStoreType } from "../types/schedule-type";

const useSelectedDateStore = create<DateStoreType>((set) => ({
  selectedDate: moment(new Date()).format("YYYY-MM-DD"),
  setSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
}));

const useSelectedMonthStore = create<MonthStoreType>((set) => ({
  selectedMonth: moment(new Date()).format("YYYY-MM"),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth: selectedMonth }),
}));

export { useSelectedDateStore, useSelectedMonthStore };
