import { useEffect, useState } from "react";
import { useNotificationStore } from "../../store/notification-store";
import { useNavigate } from "react-router";
import { NEW_NOTIFICATION } from "@/constants/session-storage";
import { NEW_NOTI_ICON } from "@/constants/local-storage";

const Toast = ({
  setNewIcon,
  setNewToast,
  newMessage,
}: {
  setNewIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setNewToast: React.Dispatch<React.SetStateAction<boolean>>;
  newMessage: string;
}) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const { newNotification, setNewNotification } = useNotificationStore();

  useEffect(() => {
    setToast(() => true);
  }, [setNewToast]);

  const handleClick = () => {
    if (newNotification) {
      setNewIcon(() => false);
      setNewToast(false);
      setNewNotification(null);
      sessionStorage.removeItem(NEW_NOTI_ICON);
      sessionStorage.removeItem(NEW_NOTIFICATION);
      navigate(`/profile/notification`);
    }
  };

  return (
    <>
      <div
        onClick={() => handleClick()}
        className={`w-52 h-14 bg-Gray-1 text-Blue-2 text-xs rounded-[10px] p-2 flex justify-center items-center absolute z-50 left-[5%] shadow-card transition-all ${toast ? "top-20 opacity-100" : "top-14 opacity-0 pointer-events-none"}`}
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
