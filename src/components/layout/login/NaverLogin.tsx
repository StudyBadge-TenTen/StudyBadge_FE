import React from "react";
import NAVER_ICON from "../../../assets/social/NAVER_ICON.png";
// import { useNavigate } from 'react-router-dom';

const NaverLogin: React.FC = () => {
  // const navigate = useNavigate();
  const clientId = "VITE_APP_NAVER_LOGIN_CLIENT_KEY";
  const redirectUri = encodeURIComponent("./auth/naver/NaverLoginCallback");

  const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${Math.random().toString(36).substr(2, 11)}`;
    window.location.href = naverLoginUrl;
  };

  return (
    <button
      onClick={handleNaverLogin}
      className="w-[183px] md:w-[300px] btn-blue bg-[#00C73C] hover:bg-[#00C73C] text-white p-0 py-1 rounded mt-4 flex justify-center items-center"
    >
      <img src={NAVER_ICON} className="w-8" />
      네이버 로그인
    </button>
  );
};

export default NaverLogin;
