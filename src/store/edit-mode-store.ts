import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EditModeType } from "../types/common";

const editModeStore = (set: any): EditModeType => ({
  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode: isEditMode }),
});

export const useEditModeStore = create(import.meta.env.DEV ? devtools(editModeStore) : editModeStore);
