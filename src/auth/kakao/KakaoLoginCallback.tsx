import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoLoginCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    
    if (code) {
      // 실제로는 이 코드를 사용해 백엔드에서 인증을 처리해야 합니다.
      // 여기서는 간단히 로컬 스토리지를 사용해 로그인 상태를 시뮬레이션합니다.
      const mockUserData = {
        id: 'kakao_' + Math.random().toString(36).substr(2, 9),
        email: 'kakao_user@example.com',
        name: '카카오 사용자'
      };

      const existingUser = localStorage.getItem('userData');
      if (existingUser) {
        // 기존 사용자: 로그인 처리
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        // 신규 사용자: 회원가입 페이지로 이동
        localStorage.setItem('tempUserData', JSON.stringify(mockUserData));
        navigate('/SignUp');
      }
    } else {
      console.error('카카오 로그인 실패');
      navigate('/LoginUser');
    }
  }, [location, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginCallback;