import { fetchCall } from "./common";

const patchReadNoti = async (notificationId: number) => {
  try {
    await fetchCall<ResponseType>(`/api/notifications`, "patch", notificationId);
  } catch (error) {
    console.log(error);
  }
};

export { patchReadNoti };
