export interface ProfileEditState {
  isEditing: boolean;
  isViewingPayments: boolean;
  isViewingProfile: boolean;
  nickname: string;
  toggleEditMode: () => void;
  toggleViewPayments: () => void;
  toggleViewProfile: () => void;
  setNickname: (nickname: string) => void;
}

export interface SidebarStoreState {
  isOpen: boolean;
  toggleSidebar: () => void;
}
