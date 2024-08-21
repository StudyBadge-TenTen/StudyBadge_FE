import { create } from "zustand";
import { NotificationStoreType } from "../types/notification-type";
import { devtools } from "zustand/middleware";

const notificationStore = (set: any, get: any): NotificationStoreType => ({
  newNotification: null,
  notificationList: [],
  setNewNotification: (newNotification) => set({ newNotification: newNotification }),
  setNotificationList: (newNotiList) => {
    const currentList = get().notificationList;

    if (Array.isArray(newNotiList)) {
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
    }
  },
});

export const useNotificationStore = create(import.meta.env.DEV ? devtools(notificationStore) : notificationStore);
