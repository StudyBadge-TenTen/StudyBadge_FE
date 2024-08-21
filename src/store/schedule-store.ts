import { create } from "zustand";
import { DateStoreType, MonthStoreType, NewScheduleStoreType } from "../types/schedule-type";
import { devtools } from "zustand/middleware";

const selectedDateStore = (set: any): DateStoreType => ({
  selectedDate: "",
  setSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
});
const useSelectedDateStore = create(import.meta.env.DEV ? devtools(selectedDateStore) : selectedDateStore);

const selectedMonthStore = (set: any): MonthStoreType => ({
  selectedMonth: "",
  setSelectedMonth: (selectedMonth) => set({ selectedMonth: selectedMonth }),
});
const useSelectedMonthStore = create(import.meta.env.DEV ? devtools(selectedMonthStore) : selectedMonthStore);

const newScheduleStore = (set: any): NewScheduleStoreType => ({
  newSchedule: {},
  setNewSchedule: (newSchedule) => set({ newSchedule: newSchedule }),
});
const useNewScheduleStore = create(import.meta.env.DEV ? devtools(newScheduleStore) : newScheduleStore);

export { useSelectedDateStore, useSelectedMonthStore, useNewScheduleStore };
