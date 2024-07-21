import React from "react";
import NAVER_ICON from "../../assets/social/NAVER_ICON.png";

const NaverLogin: React.FC = () => {
  // 서버 없이 작업 시
  // const CLIENT_ID = import.meta.env.VITE_APP_NAVER_LOGIN_CLIENT_KEY; // 실제 카카오 클라이언트 ID로 교체 필요
  // const REDIRECT_URL = import.meta.env.DEV
  //   ? import.meta.env.VITE_APP_NAVER_REDIRECT_URL_DEV
  //   : import.meta.env.VITE_APP_NAVER_REDIRECT_URL_PROD;
  const URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_HOST : import.meta.env.VITE_APP_PRODUCTION_URL;

  const handleNaverLogin = () => {
    // 서버 없이 작업 시
    // const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${Math.random().toString(36).substr(2, 11)}`;
    // window.location.href = naverLoginUrl;
    window.location.href = `${URL}/oauth2/authorization/naver`;
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
