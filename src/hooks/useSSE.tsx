import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationStore } from "../store/notification-store";
import { Event, EventSourcePolyfill, MessageEvent } from "event-source-polyfill";
import { NotificationType } from "../types/notification-type";
import { LAST_EVENT_ID } from "../constants/local-storage";
import { NEW_NOTIFICATION } from "@/constants/session-storage";

export const useSSE = () => {
  const { accessToken, setField, isLoginFailed } = useAuthStore();
  const API_BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_APP_LOCAL_BASE_URL
    : import.meta.env.VITE_APP_PRODUCTION_BASE_URL;
  const { notificationList, setNewNotification } = useNotificationStore();

  // console.log("useSSE hook"); // useSSE 작동 테스트

  useEffect(() => {
    if (import.meta.env.DEV || import.meta.env.PROD) {
      const storedAccessToken = sessionStorage.getItem("accessToken");
      if (storedAccessToken) {
        setField("accessToken", storedAccessToken);
      }
    }
  }, [setField]);

  useEffect(() => {
    // 로그인 상태가 아닐 경우, 재연결하지 않음
    if (isLoginFailed || !accessToken) {
      console.log("현재 로그인상태가 아닙니다.");
      return;
    }

    // 에러 시 재연결을 시도하면 새로운 EventSourcePolyfill객체가 생성되도록하기 위해 이렇게 작성했습니다.
    let eventSource: EventSourcePolyfill | null = null;
    let retryTimeout: NodeJS.Timeout | null = null; // 메인페이지에서 계속 쿼리가 실행되는 것 디버깅하기 위한 코드

    const connect = () => {
      eventSource = new EventSourcePolyfill(`${API_BASE_URL}/api/notifications/subscribe`, {
        headers: {
          "Last-Event-ID": localStorage.getItem(LAST_EVENT_ID) ?? "",
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 120000, // 서버와 동일하게 설정하는 것이 맞다고 함
        withCredentials: true,
      });

      eventSource.onmessage = onMessage;
      eventSource.onerror = onError;
      eventSource.onopen = onOpen;
    };

    const onMessage = (ev: MessageEvent) => {
      if (!accessToken) return;

      // console.log("Event received: ", ev.data); // 디버깅 로그 추가
      try {
        const parsedData = JSON.parse(ev.data);
        // 추가해야할 코드 : 더미 데이터일 경우 return
        if (parsedData.isDummy) {
          console.log("연결 더미데이터 수신");
          return;
        } else {
          const newNotification: NotificationType = parsedData;
          // console.log("Parsed notification: ", newNotification); // 디버깅 로그 추가

          sessionStorage.setItem(NEW_NOTIFICATION, JSON.stringify(newNotification));
          localStorage.setItem(LAST_EVENT_ID, ev.lastEventId);
          // 중복 알림 필터링
          // const isDuplicate = notificationList.some((noti) => noti.notificationId === newNotification.notificationId);
          // if (!isDuplicate) {
          // }
        }
      } catch (error) {
        console.error("Failed to parse event data: ", error);
      }
    };

    const onError = (err: Event) => {
      console.log("Error receiving notifications", err);
      if (eventSource) {
        eventSource.close();
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout); // 클리어하는 코드 추가
      }
      // 재연결
      retryTimeout = setTimeout(connect, 3000);
    };

    const onOpen = () => {
      console.log("SSE 연결");
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout); // 클리어하는 코드 추가
      }
    };
  }, [accessToken, API_BASE_URL, notificationList, setNewNotification, isLoginFailed]);

  return null;
};
