import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationStore } from "../store/notification-store";
import { EventSourcePolyfill } from "event-source-polyfill";
import { NotificationType } from "../types/notification-type";

export const useSSE = () => {
  const { accessToken } = useAuthStore();
  const API_BASE_URL = import.meta.env.DEV ? "/" : import.meta.env.VITE_APP_TEST_BASE_URL;
  const { notifications, setNotifications } = useNotificationStore();

  console.log("useSSE hook");

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(API_BASE_URL + `api/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    const connect = () => {
      if (!accessToken) return;

      eventSource.onmessage = (e) => {
        console.log("Event received: ", e.data); // 디버깅 로그 추가
        try {
          const newNotification: NotificationType = JSON.parse(e.data);
          console.log("Parsed notification: ", newNotification); // 디버깅 로그 추가
          setNotifications([...notifications, newNotification]);
        } catch (error) {
          console.error("Failed to parse event data: ", error);
        }
      };

      eventSource.onerror = (err) => {
        const newNotification: NotificationType = { id: "error", message: "Error receiving notifications" };
        console.log("Error receiving notifications", err);
        setNotifications([...notifications, newNotification]);
        // setError();
        eventSource.close();
        // 재연결
        setTimeout(connect, 3000);
      };

      eventSource.onopen = () => {
        console.log("SSE 연결");
      };
    };
    connect();

    return () => eventSource.close();
  }, [accessToken]);
};
