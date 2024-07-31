import { NotificationListType } from "@/types/notification-type";
import { fetchCall } from "./common";
import { AxiosResponse } from "axios";

const getNotifications = async (page: number, size: number): Promise<NotificationListType> => {
  try {
    const notificationsListData = await fetchCall<NotificationListType>(
      `/api/notifications?page=${page}&size=${size}&sort=createdAt`,
      "get",
    );
    return notificationsListData;
  } catch (error) {
    console.log(error);
    return { totalPages: 1, totalElements: 1, size: 1, content: [] };
  }
};

const patchReadNoti = async (notificationId: number) => {
  try {
    await fetchCall<AxiosResponse>(`/api/notifications`, "patch", { notificationId });
  } catch (error) {
    console.log(error);
  }
};

export { getNotifications, patchReadNoti };
