import { create } from "zustand";

interface ProfileEditState {
  isEditing: boolean;
  isViewingPayments: boolean;
  isViewingProfile: boolean;
  profilePhoto: string | null;
  nickname: string;
  toggleEditMode: () => void;
  toggleViewPayments: () => void;
  toggleViewProfile: () => void;
  setProfilePhoto: (photo: string | null) => void;
  setNickname: (nickname: string) => void;
}

const useProfileEditStore = create<ProfileEditState>((set) => ({
  isEditing: false,
  isViewingPayments: false,
  isViewingProfile: true,
  profilePhoto: null,
  nickname: "홍길동",
  toggleEditMode: () =>
    set((state) => ({ isEditing: !state.isEditing, isViewingProfile: !state.isEditing, isViewingPayments: false })),
  toggleViewPayments: () => set(() => ({ isViewingPayments: true, isEditing: false, isViewingProfile: false })),
  toggleViewProfile: () => set(() => ({ isViewingProfile: true, isEditing: false, isViewingPayments: false })),
  setProfilePhoto: (photo) => set({ profilePhoto: photo }),
  setNickname: (nickname: string) => set({ nickname }),
}));

export default useProfileEditStore;
