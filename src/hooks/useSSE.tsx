import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationStore } from "../store/notification-store";
import { EventSourcePolyfill } from "event-source-polyfill";
import { NotificationType } from "../types/notification-type";
import { LAST_EVENT_ID } from "../constants/local-storage";

export const useSSE = () => {
  const { accessToken } = useAuthStore();
  const API_BASE_URL = import.meta.env.DEV ? "/" : import.meta.env.VITE_APP_TEST_BASE_URL;
  const { notifications, setNotifications } = useNotificationStore();

  console.log("useSSE hook"); // useSSE작동 테스트

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(API_BASE_URL + `api/subscribe`, {
      headers: {
        "Last-Event-ID": localStorage.getItem(LAST_EVENT_ID) ?? "",
        // Authorization: `Bearer ${accessToken}`,
      },
      heartbeatTimeout: 30000, // 30초가 더 안전한 것 같아 30초로 수정해뒀습니다
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
          localStorage.setItem(LAST_EVENT_ID, e.lastEventId);
        } catch (error) {
          console.error("Failed to parse event data: ", error);
        }
      };

      eventSource.onerror = (err) => {
        console.log("Error receiving notifications", err);
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
