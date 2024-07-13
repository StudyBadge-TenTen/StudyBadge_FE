import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NaverLoginCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const handleNaverLogin = async (code: string, state: string) => {
      try {
        // 백엔드에 네이버 인증 코드와 state를 전송하고 로그인 처리를 요청
        const response = await axios.post('/api/naver-login', { code, state });
        
        if (response.data.success) {
          // 로그인 성공
          localStorage.setItem('isLoggedIn', 'true');
          // 필요한 경우 사용자 정보를 저장
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          navigate('/'); // 메인 페이지로 이동
        } else {
          // 로그인 실패
          console.error('네이버 로그인 실패:', response.data.message);
          navigate('/LoginUser'); // 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('네이버 로그인 처리 중 오류 발생:', error);
        navigate('/LoginUser'); // 오류 발생 시 로그인 페이지로 이동
      }
    };

    if (code && state) {
      handleNaverLogin(code, state);
    } else {
      console.error('네이버 로그인 실패: 인증 코드 또는 state 없음');
      navigate('/LoginUser');
    }
  }, [location, navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverLoginCallback;