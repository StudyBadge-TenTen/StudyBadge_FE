import { NotificationType } from "@/types/notification-type";
import { fetchCall } from "./common";

const getNotifications = async () => {
  try {
    const notificationsList = await fetchCall<NotificationType[]>(`/api/notifications`, "get");
    return notificationsList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const patchReadNoti = async (notificationId: number) => {
  try {
    await fetchCall<ResponseType>(`/api/notifications`, "patch", notificationId);
  } catch (error) {
    console.log(error);
  }
};

export { getNotifications, patchReadNoti };
