import React from "react";
import KAKAO_BTN_SMALL from "../../assets/social/KAKAO_BTN_SMALL.png";
import KAKAO_BTN_BIG from "../../assets/social/KAKAO_BTN_BIG.png";

const KakaoLogin: React.FC = () => {
  // 서버 없을 시
  // const CLIENT_ID = import.meta.env.VITE_APP_KAKAO_LOGIN_CLIENT_KEY; // 실제 카카오 클라이언트 ID로 교체 필요
  // const REDIRECT_URL = import.meta.env.DEV
  //   ? import.meta.env.VITE_APP_KAKAO_REDIRECT_URL_DEV
  //   : import.meta.env.VITE_APP_KAKAO_REDIRECT_URL_PROD;

  const URL = import.meta.env.DEV
    ? import.meta.env.VITE_APP_LOCAL_BASE_URL
    : import.meta.env.VITE_APP_PRODUCTION_BASE_URL;

  const handleKakaoLogin = () => {
    // 서버 없을 시
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    // window.location.href = kakaoAuthUrl;

    window.location.href = `${URL}/oauth2/authorization/kakao`;
  };

  return (
    <>
      <img
        onClick={handleKakaoLogin}
        src={KAKAO_BTN_BIG}
        alt="카카오 로그인 버튼"
        className="hidden md:inline-block mt-2 cursor-pointer"
      />
      <img
        onClick={handleKakaoLogin}
        src={KAKAO_BTN_SMALL}
        alt="카카오 로그인 버튼"
        className="md:hidden mt-2 cursor-pointer"
      />
    </>
  );
};

export default KakaoLogin;
