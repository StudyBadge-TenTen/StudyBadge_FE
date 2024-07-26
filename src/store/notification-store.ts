import { create } from "zustand";
import { NotificationStoreType } from "../types/notification-type";

const useNotificationStore = create<NotificationStoreType>((set, get) => ({
  newNotification: null,
  notificationList: [],
  setNewNotification: (newNotification) => set({ newNotification: newNotification }),
  setNotificationList: (newNotiList) => {
    const currentList = get().notificationList;

    // 중복 제거 로직
    const updatedList = newNotiList.reduce(
      (acc, newItem) => {
        if (!acc.find((item) => item.notificationId === newItem.notificationId)) {
          acc.unshift(newItem);
        }
        return acc;
      },
      [...currentList],
    );

    set({ notificationList: updatedList });
  },
}));

export { useNotificationStore };
