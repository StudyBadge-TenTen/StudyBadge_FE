import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";

const SocialLoginCallback = ({ first }: { first: boolean }): JSX.Element => {
  const navigate = useNavigate();
  const { setField } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");

    try {
      if (accessToken) {
        console.log(accessToken); // 디버깅 로그 추가

        setField("accessToken", accessToken);
        if (import.meta.env.DEV) {
          localStorage.setItem("accessToken", accessToken);
        }
        if (first) {
          navigate("/profile/myInfo", { state: { social: true } });
        } else {
          navigate("/");
        }
      } else {
        alert("로그인에 실패하였습니다");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate, setField, location]);

  // axios로 소셜 로그인 요청하고 토큰 받는 방법일 때
  // useEffect(() => {
  //   const provider = location.pathname.includes("naver") ? "naver" : "kakao";

  //   handleSocialLoginCallback(provider)
  //     .then(() => {
  //       // 로그인 성공 시 정보 수정 페이지로 이동 (계좌정보 입력을 위해)
  //       navigate("/profile/myInfo", { state: { social: true } });
  //     })
  //     .catch((error) => {
  //       alert("로그인에 실패하였습니다");
  //       console.error("Social login failed:", error);
  //       navigate("/login"); // 실패 시 로그인 페이지로 이동
  //     });
  // }, [location, navigate, handleSocialLoginCallback]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginCallback;
