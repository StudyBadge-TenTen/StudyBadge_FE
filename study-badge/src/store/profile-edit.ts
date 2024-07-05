import { create } from "zustand";
import { ProfileEditState } from "../types/profile";

const useProfileEditStore = create<ProfileEditState>((set) => ({
  isEditing: false,
  isViewingPayments: false,
  isViewingProfile: true,
  nickname: "홍길동",
  toggleEditMode: () =>
    set((state) => ({
      isEditing: !state.isEditing,
      isViewingProfile: !state.isEditing,
      isViewingPayments: false,
    })),
  toggleViewPayments: () =>
    set(() => ({
      isViewingPayments: true,
      isEditing: false,
      isViewingProfile: false,
    })),
  toggleViewProfile: () =>
    set(() => ({
      isViewingProfile: true,
      isEditing: false,
      isViewingPayments: false,
    })),
  setNickname: (nickname) => set({ nickname }),
}));

export default useProfileEditStore;
