import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationStore } from "../store/notification-store";
import { Event, EventSourcePolyfill, MessageEvent } from "event-source-polyfill";
import { NotificationType } from "../types/notification-type";
import { LAST_EVENT_ID } from "../constants/local-storage";
import { NEW_NOTIFICATION } from "@/constants/session-storage";
import { getAccessToken } from "@/utils/cookie";

export const useSSE = () => {
  const { setField, isLoginFailed, accessToken } = useAuthStore();
  const API_BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_APP_LOCAL_BASE_URL
    : import.meta.env.VITE_APP_PRODUCTION_BASE_URL;
  const { setNewNotification } = useNotificationStore();

  // console.log("useSSE hook"); // useSSE 작동 테스트

  useEffect(() => {
    const storageAccessToken = getAccessToken();
    if (storageAccessToken) {
      setField("accessToken", storageAccessToken);
    }
  }, [setField]);

  useEffect(() => {
    // 목데이터용 코드 (서버 없이 msw 이용 시 sse 연결하지 않음)
    if (accessToken) {
      console.log("useSSE - 현재 로그인상태가 아닙니다. 로그인 상태가 아닐 경우, 재연결하지 않음");
      return;
    }

    // 로그인 상태가 아닐 경우, 재연결하지 않음
    if (isLoginFailed || !accessToken) {
      console.log("useSSE - 현재 로그인상태가 아닙니다. 로그인 상태가 아닐 경우, 재연결하지 않음");
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
        heartbeatTimeout: 3600000, // 서버와 동일하게 설정하는 것이 맞다고 함
        withCredentials: true,
      });

      eventSource.onmessage = onMessage;
      eventSource.onerror = onError;
      eventSource.onopen = onOpen;
    };

    const onMessage = (ev: MessageEvent) => {
      if (!accessToken) return;

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
          setNewNotification(newNotification);
        }
      } catch (error) {
        console.log("useSSE onMessage error: ", error);
      }
    };

    const onError = (err: Event) => {
      console.log("useSSE onError error: ", err);

      if (eventSource) {
        eventSource.close();
        console.log("eventSource close");
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout); // 클리어하는 코드 추가
        console.log("기존 timeout clear");
      }
      // 재연결
      retryTimeout = setTimeout(connect, 3000);
      console.log("현재 시점으로부터 3초 뒤 재연결");
    };

    const onOpen = () => {
      console.log("SSE 연결");
    };

    connect();

    return () => {
      if (eventSource) {
        eventSource.close();
        console.log("eventSource close");
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout); // 클리어하는 코드 추가
        console.log("기존 timeout clear");
      }
    };
  }, [accessToken, API_BASE_URL, setNewNotification, isLoginFailed]);

  return null;
};
