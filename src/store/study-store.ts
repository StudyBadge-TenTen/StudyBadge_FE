import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { FilterStoreType, StudyListRequestType, StudyListStoreType, StudyStoreType } from "../types/study-channel-type";

const studyStore = (set: any): StudyStoreType => ({
  name: "",
  description: "",
  category: "",
  recruitmentNumber: 3,
  startDate: "",
  endDate: "",
  minRecruitmentNumber: 3,
  meetingType: "OFFLINE",
  region: "",
  chattingUrl: "",
  depositDescription: "",
  deposit: 10000,
  setField: (field, value) => set((state: StudyStoreType) => ({ ...state, [field]: value })),
  resetForm: () =>
    set({
      name: "",
      description: "",
      category: "",
      recruitmentNumber: 3,
      startDate: "",
      endDate: "",
      minRecruitmentNumber: 3,
      meetingType: "OFFLINE",
      region: "",
      chattingUrl: "",
      depositDescription: "",
      deposit: 10000,
    }),
});
const useStudyStore = create(import.meta.env.DEV ? devtools(studyStore) : studyStore);

const studyListStore = (set: any): StudyListStoreType => ({
  studyList: [],
  setStudyList: (studyList) => set({ studyList: studyList }),
});
const useStudyListStore = create(import.meta.env.DEV ? devtools(studyListStore) : studyListStore);

const initialFilter: StudyListRequestType = {
  type: undefined,
  category: undefined,
  status: undefined,
  order: "RECENT",
  page: 1,
  keyword: undefined,
};

const filterStore = (set: any): FilterStoreType => ({
  filter: initialFilter,
  setFilter: (filter) => set(() => ({ filter: filter })),
});
const useFilterStore = create<FilterStoreType, [["zustand/persist", unknown], ["zustand/devtools", never]]>(
  import.meta.env.DEV
    ? persist(devtools(filterStore), {
        name: "filterStorage",
        storage: createJSONStorage(() => sessionStorage),
      })
    : persist(filterStore, {
        name: "filterStorage",
        storage: createJSONStorage(() => sessionStorage),
      }),
);

export { useStudyStore, useStudyListStore, initialFilter, useFilterStore };
