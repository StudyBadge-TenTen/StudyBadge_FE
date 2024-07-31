import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/auth-store";
// import { useState } from "react";

const ProfileBtn = (): JSX.Element => {
  // 실제 코드
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const handleClick = () => {
    // console.log("click profile btn");
    if (accessToken) {
      navigate("/profile/myInfo");
    } else {
      navigate("/login");
    }
  };

  // 프론트 dev 목데이터용 코드
  // const [fakeAccessToken, _] = useState(true);
  // const handleClick = () => {
  //   console.log("click profile btn");
  //   if (fakeAccessToken) {
  //     navigate("/profile/myInfo");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <button className="profile-btn mr-8 md:mr-4" onClick={() => handleClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#B4BDCB"
        className="bi bi-person-circle w-9 h-9 md:w-8 md:h-8"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>
    </button>
  );
};

export default ProfileBtn;
