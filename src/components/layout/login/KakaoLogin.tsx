import React from 'react';

const KakaoLogin: React.FC = () => {
  const clientId = '85bbde02c7d3dc6eb93cab57d6c599c3'; // 실제 카카오 클라이언트 ID로 교체 필요
  const redirectUri = encodeURIComponent('http://localhost:3000/auth/kakao/callback');

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="w-full max-w-80 btn-blue text-black py-2 rounded mt-4 hover:bg-yellow-500 transition-all"
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLogin;