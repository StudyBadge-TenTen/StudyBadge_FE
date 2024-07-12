// export interface ProfileEditState {
//   isEditing: boolean;
//   isViewingPayments: boolean;
//   isViewingProfile: boolean;
//   nickname: string;
//   toggleEditMode: () => void;
//   toggleViewPayments: () => void;
//   toggleViewProfile: () => void;
//   setNickname: (nickname: string) => void;
// }

// export interface SidebarStoreState {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }

type BadgeType = "NONE" | "BRONZE" | "SILVER" | "GOLD";

interface ProfileInfoType {
  nickname: string;
  introduction: string;
  account: string;
  imgUrl: string;
}

interface ProfilePutType {
  memberUpdateRequest: ProfileInfoType;
  file: File | undefined;
}

interface UserInfoType {
  email: string;
  name: string;
  nickname: string;
  badgeLevel: BadgeType;
  account: string;
  introduction: string;
  imgUrl: string;
}

export type { BadgeType, ProfileInfoType, ProfilePutType, UserInfoType };
