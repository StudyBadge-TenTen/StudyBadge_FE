interface NotificationType {
  id: number;
  content: string;
  isRead: boolean;
  notificationType: string;
  receiverId: number;
  url: string;
}

interface NotificationStoreType {
  notifications: NotificationType[];
  setNotifications: (newNotifications: NotificationType[]) => void;
}

export type { NotificationType, NotificationStoreType };
