import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { setAccessToken } from "@/utils/cookie";

const SocialLoginCallback = ({ first }: { first: boolean }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setField } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");

    try {
      if (accessToken) {
        // console.log(accessToken); // 디버깅 로그 추가

        setAccessToken(accessToken);
        setField("accessToken", accessToken);
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
  }, [navigate, setField, location, first]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginCallback;
