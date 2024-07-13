import { useNavigate } from "react-router";
import LOGO from "../../assets/logo/STUDY-BADGE-LOGO_PNG.png";
import ProfileBtn from "./header_contents/ProfileBtn";

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className="header h-32 flex justify-center items-center bg-white sticky top-0 shadow-md z-50">
      <div className="w-[1025px] flex justify-between md:justify-center items-center">
        <button className="md:hidden search-btn ml-8">
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
        <img src={LOGO} className="h-24 md:h-16" alt="STUDY-BADGE-LOGO" />
        <input
          type="text"
          className="hidden md:inline-block w-1/2 h-12 border border-solid border-Gray-3 rounded-[50px] indent-5 mx-8"
        />
        <div className="user-container flex flex-col md:flex-row justify-center items-center">
          <div className="flex justify-center items-center">
            <ProfileBtn />
            <button className="bell-btn hidden md:inline-block mr-4">
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
            </button>
          </div>
          <button className="hidden md:inline-block btn-blue" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;