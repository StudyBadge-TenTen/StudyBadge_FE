import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FilterStoreType, StudyListRequestType, StudyListStoreType, StudyStoreType } from "../types/study-channel-type";

const useStudyStore = create<StudyStoreType>((set) => ({
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
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
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
}));

const useStudyListStore = create<StudyListStoreType>((set) => ({
  studyList: [],
  setStudyList: (studyList) => set({ studyList: studyList }),
}));

const initialFilter: StudyListRequestType = {
  type: undefined,
  category: undefined,
  status: undefined,
  order: "RECENT",
  page: 1,
  keyword: undefined,
};

const useFilterStore = create(
  persist<FilterStoreType>(
    (set) => ({
      filter: initialFilter,
      setFilter: (filter) => set(() => ({ filter: filter })),
    }),
    {
      name: "filterStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useStudyStore, useStudyListStore, initialFilter, useFilterStore };
