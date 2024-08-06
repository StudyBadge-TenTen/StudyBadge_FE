import { useNotificationStore } from "../../store/notification-store";
import { Link } from "react-router-dom";
import { getNotifications, patchReadNoti } from "../../services/notification-api";
import PageScrollTop from "../common/PageScrollTop";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import moment from "moment";

const Notification = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const [page, setPage] = useState(1);
  const { setNotificationList } = useNotificationStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", accessToken, page],
    queryFn: () => getNotifications(page, 10),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data && data.content) {
      setNotificationList(data.content);
    }
  }, [data, page, accessToken]);

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
        {data &&
          data.content &&
          Array.isArray(data.content) &&
          data.content.map((noti) => (
            <Link
              to={noti.url}
              key={noti.notificationId}
              onClick={() => handleClick(noti.notificationId)}
              className="w-full h-fit bg-Gray-1 rounded-[10px] flex flex-col justify-center items-center text-Blue-2 px-8 py-10 sm:pt-4 sm:pb-10 mb-2"
            >
              <div className="w-full flex justify-between items-center text-Gray-4 text-sm mb-4">
                <div className="flex flex-col sm:flex-row justify-center items-center">
                  <span className="inline-block mr-2 text-xs sm:text-sm">{noti.notificationType}</span>
                  <span className="text-xs sm:text-sm">{`${moment(new Date(noti.createdAt)).format("YYYY-MM-DD")} ${moment(new Date(noti.createdAt)).format("hh:mm:ss")}`}</span>
                </div>
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
      {data && (
        <Pagination type={"NOTIFICATION"} dataListLength={data.totalElements} pageState={page} setPage={setPage} />
      )}
    </>
  );
};

export default Notification;
