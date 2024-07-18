interface NotificationType {
  id: number;
  content: string;
  isRead: boolean;
  notificationType: "일정 생성";
  receiverId: number;
  url: string;
}

interface NotificationStoreType {
  notifications: NotificationType[];
  setNotifications: (newNotifications: NotificationType[]) => void;
}

export type { NotificationType, NotificationStoreType };
