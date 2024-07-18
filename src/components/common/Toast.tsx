import { useEffect, useState } from "react";
import { useNotificationStore } from "../../store/notification-store";

const Toast = () => {
  const [newToast, setNewToast] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { notifications, setNotifications } = useNotificationStore();

  const [count, setCount] = useState(1);

  // useEffect(() => {
  //   setInterval(intervalFn, 8000);
  // }, []);

  useEffect(() => {
    setCount((origin) => origin + 1);

    (async () => {
      const newNoti = notifications[notifications.length - 1];
      await makeToast();
      if (newNoti) {
        setNewMessage(() => newNoti.content);
      }
      setTimeout(() => setNewToast(() => false), 5000);
    })();
  }, [notifications]);

  // const intervalFn = () => {
  //   setNotifications([...notifications, { id: `${count}`, message: "스터디 일정이 변경되었습니다." }]);
  //   console.log("새로운 알림");
  // };

  const makeToast = async () => {
    setNewToast(() => true);
  };

  return (
    <>
      <div
        className={`w-52 h-14 bg-Gray-1 text-Blue-2 text-xs rounded-[10px] p-2 flex justify-center items-center absolute z-50 right-[5%] shadow-card transition-all ${newToast ? "top-28 opacity-100" : "top-20 opacity-0"}`}
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
        {newMessage}
      </div>
    </>
  );
};

export default Toast;
