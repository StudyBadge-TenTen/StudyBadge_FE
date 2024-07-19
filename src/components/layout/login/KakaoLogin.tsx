import React from "react";
import KAKAO_BTN_SMALL from "../../../assets/social/KAKAO_BTN_SMALL.png";
import KAKAO_BTN_BIG from "../../../assets/social/KAKAO_BTN_BIG.png";

const KakaoLogin: React.FC = () => {
  const clientId = "VITE_APP_KAKAO_LOGIN_CLIENT_KEY"; // 실제 카카오 클라이언트 ID로 교체 필요
  const redirectUri = encodeURIComponent("http://localhost:3000/auth/kakao/callback");

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <>
      <img src={KAKAO_BTN_BIG} className="hidden md:inline-block mt-2" />
      <img src={KAKAO_BTN_SMALL} className="md:hidden mt-2" />
    </>
    // <button
    //   onClick={handleKakaoLogin}
    //   className="w-full max-w-80 btn-blue text-black py-2 rounded mt-4 hover:bg-yellow-500 transition-all"
    // >
    //   카카오 로그인
    // </button>
  );
};

export default KakaoLogin;
