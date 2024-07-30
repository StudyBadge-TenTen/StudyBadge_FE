// import { useEffect } from "react";
import { useNotificationStore } from "../../store/notification-store";
// import { notificationList } from "../../mocks/data"; // 프론트용 msw 알림
import { Link } from "react-router-dom";
import { getNotifications, patchReadNoti } from "../../services/notification-api";
import PageScrollTop from "../common/PageScrollTop";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

const Notification = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", accessToken],
    queryFn: () => getNotifications(),
    enabled: !!accessToken,
  });
  const { notificationList, setNotificationList } = useNotificationStore();

  useEffect(() => {
    if (data) {
      setNotificationList(data);
    }
  }, [accessToken]);

  const handleClick = (notificationId: number) => {
    if (notificationId) {
      patchReadNoti(notificationId);
    }
  };

  return (
    <>
      <PageScrollTop />
      {isLoading && <div>is Loading...</div>}
      {error && <div>알림 내역을 불러오는 데 실패하였습니다.</div>}
      <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-[30px] p-6 flex flex-col items-center">
        {notificationList.map((noti) => (
          <Link
            to={noti.url}
            key={noti.notificationId}
            onClick={() => handleClick(noti.notificationId)}
            className="w-full h-fit bg-Gray-1 rounded-[10px] flex flex-col justify-center items-center text-Blue-2 px-8 py-4 pb-10 mb-2"
          >
            <div className="w-full flex justify-between items-center text-Gray-4 text-sm mb-4">
              <span>{noti.notificationType}</span>
              {noti.isRead ? <span>읽음</span> : <span className="text-Red-2">new</span>}
            </div>
            <div className="flex justify-center items-center text-Blue-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell-fill mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              {noti.content}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Notification;
