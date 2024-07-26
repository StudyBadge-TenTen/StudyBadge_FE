import { useEffect, useState } from "react";
import { useNotificationStore } from "../../store/notification-store";
import { useNavigate } from "react-router";

const Toast = ({ setNewIcon }: { setNewIcon: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  const [newToast, setNewToast] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { newNotification, notificationList, setNewNotification, setNotificationList } = useNotificationStore();

  useEffect(() => {
    if (newNotification) {
      // 중복 렌더링을 피하기 위해 한 번 거름
      const isDuplicate = notificationList.some((noti) => noti.notificationId === newNotification.notificationId);
      if (!isDuplicate) {
        setNotificationList([newNotification, ...notificationList]);
      }
      (async () => {
        await makeToast();
        if (newNotification) {
          setNewMessage(() => newNotification.content);
        }
        setTimeout(() => {
          // 5초 후에 초기화
          setNewToast(() => false);
          setNewNotification(null);
        }, 5000);
      })();
    }
  }, [newNotification, notificationList, setNewNotification, setNotificationList]);

  const makeToast = async () => {
    setNewToast(() => true);
  };

  const handleClick = () => {
    if (newNotification) {
      setNewIcon(() => false);
      navigate(`/profile/notification`);
    }
  };

  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`w-52 h-14 bg-Gray-1 text-Blue-2 text-xs rounded-[10px] p-2 flex justify-center items-center absolute z-50 left-[5%] shadow-card transition-all ${newToast ? "top-20 opacity-100" : "top-14 opacity-0 pointer-events-none"}`}
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
