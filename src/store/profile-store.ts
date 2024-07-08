import create from "zustand";

interface ProfileEditState {
  isEditing: boolean;
  isViewingPayments: boolean;
  isViewingProfile: boolean;
  nickname: string;
  isOpen: boolean;
  toggleEditMode: () => void;
  toggleViewPayments: () => void;
  toggleViewProfile: () => void;
  setNickname: (nickname: string) => void;
  handleUpload: () => void;
  handleDelete: () => void;
  toggleSidebar: () => void;
}

const useProfileStore = create<ProfileEditState>((set) => ({
  isEditing: false,
  isViewingPayments: false,
  isViewingProfile: true,
  nickname: "홍길동",
  isOpen: false,
  toggleEditMode: () =>
    set((state) => ({ isEditing: !state.isEditing, isViewingProfile: !state.isEditing, isViewingPayments: false })),
  toggleViewPayments: () => set(() => ({ isViewingPayments: true, isEditing: false, isViewingProfile: false })),
  toggleViewProfile: () => set(() => ({ isViewingProfile: true, isEditing: false, isViewingPayments: false })),
  setNickname: (nickname: string) => set({ nickname }),
  handleUpload: () => {
    console.log("사진 업로드 기능 구현");
  },
  handleDelete: () => {
    console.log("사진 삭제 기능 구현");
  },
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useProfileStore;
