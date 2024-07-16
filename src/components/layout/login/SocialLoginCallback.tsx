import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth-store';

const SocialLoginCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSocialLoginCallback } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const provider = location.pathname.includes('naver') ? 'naver' : 'kakao';

    if (code) {
      handleSocialLoginCallback(provider, code, state || undefined)
        .then(() => {
          navigate('/'); // 로그인 성공 시 홈페이지로 이동
        })
        .catch((error) => {
          console.error('Social login failed:', error);
          navigate('/login'); // 실패 시 로그인 페이지로 이동
        });
    } else {
      navigate('/login');
    }
  }, [location, navigate, handleSocialLoginCallback]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginCallback;