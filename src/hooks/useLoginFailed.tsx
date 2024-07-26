import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

const useLoginFailed = () => {
  const { refreshToken, refreshAccessToken, isLoginFailed, setLoginFailed } = useAuthStore();
  useEffect(() => {
    if (refreshToken && !isLoginFailed) {
      const initAuth = async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error("Failed to refresh access token on load:", error);
          setLoginFailed(true); // 로그인 실패 시 상태 업데이트
        }
      };

      initAuth();
    }
  }, [refreshToken, refreshAccessToken, isLoginFailed, setLoginFailed]);

  return null;
};

export default useLoginFailed;
