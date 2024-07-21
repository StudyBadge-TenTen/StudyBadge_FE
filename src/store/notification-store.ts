import { create } from "zustand";
import { NotificationStoreType } from "../types/notification-type";

const useNotificationStore = create<NotificationStoreType>((set) => ({
  notifications: [],
  setNotifications: (newNotifications) => set({ notifications: newNotifications }),
}));

export { useNotificationStore };
