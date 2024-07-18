import { useEffect } from "react";
import { useNotificationStore } from "../../store/notification-store";

const Notification = (): JSX.Element => {
  const { notifications } = useNotificationStore();

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-[30px] p-6 flex flex-col items-center">
      {notifications.map((noti) => (
        <div
          key={noti.id}
          className="w-full h-16 bg-Gray-1 rounded-[10px] flex justify-center items-center text-Blue-2 mb-2"
        >
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
      ))}
    </div>
  );
};

export default Notification;
