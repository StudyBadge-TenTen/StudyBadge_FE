type NotificationCategoryType = "SCHEDULE_CREATE" | "SCHEDULE_UPDATE" | "SCHEDULE_DELETE" | "SCHEDULE_REMINDER";

interface NotificationType {
  notificationId: number;
  receiverId: number;
  notificationType: NotificationCategoryType;
  content: string;
  url: string;
  isRead: boolean;
  // 이건 백엔드 api :/api/study-channels/%d/schedules/date?year=%d&month=%d
}

interface NotificationStoreType {
  newNotification: NotificationType | null;
  notificationList: NotificationType[];
  setNewNotification: (newNotification: NotificationType | null) => void;
  setNotificationList: (newNotiList: NotificationType[]) => void;
}

export type { NotificationCategoryType, NotificationType, NotificationStoreType };
