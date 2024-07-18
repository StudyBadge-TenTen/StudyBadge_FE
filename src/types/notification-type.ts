interface NotificationType {
  id: string;
  message: string;
}

interface NotificationStoreType {
  notifications: NotificationType[];
  setNotifications: (newNotifications: NotificationType[]) => void;
}

export type { NotificationType, NotificationStoreType };
