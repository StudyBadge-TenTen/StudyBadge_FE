import React from "react";
// import { useNavigate } from 'react-router-dom';

const NaverLogin: React.FC = () => {
  // const navigate = useNavigate();
  const clientId = "K0QHPjde2ULw2GQ6IyMP";
  const redirectUri = encodeURIComponent("./auth/naver/NaverLoginCallback");

  const handleNaverLogin = () => {
    const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${Math.random().toString(36).substr(2, 11)}`;
    window.location.href = naverLoginUrl;
  };

  return (
    <button onClick={handleNaverLogin} className="w-full max-w-80 btn-blue text-white py-2 rounded mt-4">
      네이버 로그인
    </button>
  );
};

export default NaverLogin;
