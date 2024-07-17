import { create } from "zustand";
import { EditModeType } from "../types/common";

const useEditModeStore = create<EditModeType>((set) => ({
  isEditMode: false,
  setIsEditMode: (isEditMode) => set({ isEditMode: isEditMode }),
}));

export { useEditModeStore };
