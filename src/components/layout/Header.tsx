import { useNavigate } from "react-router";
import LOGO from "../../assets/logo/STUDY-BADGE-LOGO_PNG.png";
import ProfileBtn from "./header_contents/ProfileBtn";
import { useFilterStore } from "../../store/study-store";
import { useEffect, useState } from "react";
import Toast from "../common/Toast";
import { useNotificationStore } from "../../store/notification-store";
import { useAuthStore } from "../../store/auth-store";
import Modal from "../common/Modal";
import MobileSearchBar from "./header_contents/MobileSearchBar";
import { NEW_NOTIFICATION } from "@/constants/session-storage";
import { NEW_NOTI_ICON } from "@/constants/local-storage";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const { filter, setFilter } = useFilterStore();
  const { newNotification, setNewNotification } = useNotificationStore();
  const [newIcon, setNewIcon] = useState(false);
  const [newToast, setNewToast] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { accessToken, logout, reset } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  let toastTimeout: NodeJS.Timeout | undefined = undefined;

  useEffect(() => {
    return () => clearTimeout(toastTimeout);
  }, []);

  useEffect(() => {
    const storedNewIcon = localStorage.getItem(NEW_NOTI_ICON);
    if (storedNewIcon) {
      setNewIcon(() => true);
    }
    const storedNewNoti = localStorage.getItem(NEW_NOTIFICATION);
    if (storedNewNoti) {
      setNewNotification(JSON.parse(storedNewNoti));
    }
  }, [setNewIcon, setNewNotification]);

  useEffect(() => {
    if (newNotification) {
      setNewIcon(() => true);
      localStorage.setItem(NEW_NOTI_ICON, "true");
      setNewMessage(newNotification.content);
      setNewToast(true);

      toastTimeout = setTimeout(() => {
        sessionStorage.removeItem(NEW_NOTIFICATION);
        setNewToast(false);
        setNewMessage("");
      }, 5000);
    }
  }, [newNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter({ ...filter, keyword: inputValue ?? undefined });

    const studyList = document.getElementById("studyListContainer");
    studyList?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBellBtnClick = (accessToken: string | null) => {
    if (accessToken) {
      setNewIcon(() => false);
      localStorage.removeItem(NEW_NOTI_ICON);
      sessionStorage.removeItem(NEW_NOTIFICATION);
      navigate("/profile/notification");
    } else {
      alert("로그인 후 이용하실 수 있습니다.");
      navigate("/login");
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    reset();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <MobileSearchBar
        isOpen={isSearchOpen}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
      <section className="header w-full h-32 flex justify-center items-center bg-white fixed z-40 top-0 shadow-md">
        <div className="w-[1025px] flex justify-between md:justify-center items-center">
          <button
            type="button"
            onClick={() => setSearchOpen((origin) => !origin)}
            className="search-btn md:hidden ml-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#1C4587"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
          <img
            src={LOGO}
            className="h-24 md:h-16 cursor-pointer"
            alt="스터디 뱃지 로고"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          />
          <form className="hidden md:inline-block w-1/2 mx-8" onSubmit={handleSubmit}>
            <label htmlFor="searchBar" className="hidden">
              검색창
            </label>
            <input
              id="searchBar"
              type="text"
              name="keyword"
              value={inputValue}
              onChange={handleInputChange}
              className=" w-full h-12 border border-solid border-Gray-3 rounded-[50px] indent-5"
            />
          </form>
          <div className="user-container flex flex-col md:flex-row justify-center items-center">
            <div className="flex justify-center items-center">
              <ProfileBtn />
              <button
                type="button"
                className="bell-btn hidden md:inline-block mr-4 relative"
                onClick={() => handleBellBtnClick(accessToken)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#1C4587"
                  className="bi bi-bell"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                <div
                  className={`new-icon ${(!accessToken || !newIcon) && "hidden"} w-2 h-2 rounded-full bg-Red-2 absolute top-0 right-0`}
                ></div>
                {newToast && <Toast setNewIcon={setNewIcon} setNewToast={setNewToast} newMessage={newMessage} />}
              </button>
            </div>
            {accessToken ? (
              <button
                type="button"
                className={`hidden md:inline-block btn-blue`}
                onClick={async () => setModalOpen(() => true)}
              >
                로그아웃
              </button>
            ) : (
              <button type="button" className={`hidden md:inline-block btn-blue`} onClick={() => navigate("/login")}>
                로그인
              </button>
            )}
            {modalOpen && (
              <Modal>
                정말 로그아웃 하시겠습니까?
                <div className="flex justify-center items-center mt-4">
                  <button type="button" onClick={() => handleLogoutClick()} className="btn-blue w-10">
                    예
                  </button>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-blue w-10 ml-2">
                    아니요
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
