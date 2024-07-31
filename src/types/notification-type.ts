interface NotificationType {
  notificationId: number;
  receiverId: number;
  notificationType: string;
  content: string;
  url: string;
  isRead: boolean;
  // 이건 백엔드 api :/api/study-channels/%d/schedules/date?year=%d&month=%d
}

interface NotificationListType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: NotificationType[];
}

interface NotificationStoreType {
  newNotification: NotificationType | null;
  notificationList: NotificationType[];
  setNewNotification: (newNotification: NotificationType | null) => void;
  setNotificationList: (newNotiList: NotificationType[]) => void;
}

export type { NotificationType, NotificationListType, NotificationStoreType };
