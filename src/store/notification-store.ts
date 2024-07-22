import { create } from "zustand";
import { NotificationStoreType } from "../types/notification-type";

const useNotificationStore = create<NotificationStoreType>((set) => ({
  newNotification: null,
  notificationList: [],
  setNewNotification: (newNotification) => set({ newNotification: newNotification }),
  setNotificationList: (newNotiList) => set({ notificationList: newNotiList }),
}));

export { useNotificationStore };
