import { create } from "zustand";
import { DateStoreType, MonthStoreType, NewScheduleStoreType } from "../types/schedule-type";

const useSelectedDateStore = create<DateStoreType>((set) => ({
  selectedDate: "",
  setSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
}));

const useSelectedMonthStore = create<MonthStoreType>((set) => ({
  selectedMonth: "",
  setSelectedMonth: (selectedMonth) => set({ selectedMonth: selectedMonth }),
}));

const useNewScheduleStore = create<NewScheduleStoreType>((set) => ({
  newSchedule: {},
  setNewSchedule: (newSchedule) => set({ newSchedule: newSchedule }),
}));

export { useSelectedDateStore, useSelectedMonthStore, useNewScheduleStore };
