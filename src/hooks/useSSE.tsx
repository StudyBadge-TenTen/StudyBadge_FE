import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationStore } from "../store/notification-store";
import { Event, EventSourcePolyfill, MessageEvent } from "event-source-polyfill";
import { NotificationType } from "../types/notification-type";
import { LAST_EVENT_ID } from "../constants/local-storage";

export const useSSE = () => {
  const { accessToken } = useAuthStore();
  const API_BASE_URL = import.meta.env.DEV ? "/" : import.meta.env.VITE_APP_TEST_BASE_URL;
  const { setNewNotification } = useNotificationStore();

  console.log("useSSE hook"); // useSSE 작동 테스트

  useEffect(() => {
    if (!accessToken) return;

    // 에러 시 재연결을 시도하면 새로운 EventSourcePolyfill객체가 생성되도록하기 위해 이렇게 작성했습니다.
    let eventSource: EventSourcePolyfill | null = null;

    const connect = () => {
      eventSource = new EventSourcePolyfill(API_BASE_URL + `api/notifications/subscribe`, {
        headers: {
          "Last-Event-ID": localStorage.getItem(LAST_EVENT_ID) ?? "",
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 30000, // 30초가 더 안전한 것 같아 30초로 수정해뒀습니다
        withCredentials: true,
      });

      eventSource.onmessage = onMessage;
      eventSource.onerror = onError;
      eventSource.onopen = onOpen;
    };

    const onMessage = (ev: MessageEvent) => {
      console.log("Event received: ", ev.data); // 디버깅 로그 추가
      try {
        const newNotification: NotificationType = JSON.parse(ev.data);
        console.log("Parsed notification: ", newNotification); // 디버깅 로그 추가
        setNewNotification(newNotification); // 토스트에 넣을 새로운 알림
        localStorage.setItem(LAST_EVENT_ID, ev.lastEventId);
      } catch (error) {
        console.error("Failed to parse event data: ", error);
      }
    };

    const onError = (err: Event) => {
      console.log("Error receiving notifications", err);
      if (eventSource) {
        eventSource.close();
      }
      // 재연결
      setTimeout(connect, 3000);
    };

    const onOpen = () => {
      console.log("SSE 연결");
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [accessToken, API_BASE_URL, setNewNotification]);

  return null;
};
