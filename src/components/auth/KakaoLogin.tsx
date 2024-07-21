import React from "react";
import KAKAO_BTN_SMALL from "../../assets/social/KAKAO_BTN_SMALL.png";
import KAKAO_BTN_BIG from "../../assets/social/KAKAO_BTN_BIG.png";

const KakaoLogin: React.FC = () => {
  // 서버 없을 시
  // const CLIENT_ID = import.meta.env.VITE_APP_KAKAO_LOGIN_CLIENT_KEY; // 실제 카카오 클라이언트 ID로 교체 필요
  // const REDIRECT_URL = import.meta.env.DEV
  //   ? import.meta.env.VITE_APP_KAKAO_REDIRECT_URL_DEV
  //   : import.meta.env.VITE_APP_KAKAO_REDIRECT_URL_PROD;

  const URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_HOST : import.meta.env.VITE_APP_PRODUCTION_URL;

  const handleKakaoLogin = () => {
    // 서버 없을 시
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
    // window.location.href = kakaoAuthUrl;

    window.location.href = `${URL}/oauth2/authorization/naver`;
  };

  return (
    <>
      <img onClick={handleKakaoLogin} src={KAKAO_BTN_BIG} className="hidden md:inline-block mt-2 cursor-pointer" />
      <img onClick={handleKakaoLogin} src={KAKAO_BTN_SMALL} className="md:hidden mt-2 cursor-pointer" />
    </>
  );
};

export default KakaoLogin;
