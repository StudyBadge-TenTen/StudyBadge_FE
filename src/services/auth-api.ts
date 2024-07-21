import axios from "axios";
import { fetchCall, setApiToken } from "./common";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpData {
  email: string;
  name: string;
  nickname: string;
  introduction: string;
  accountBank: string;
  account: string;
  password: string;
  checkPassword: string;
}

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "/api/members/login",
      { email, password },
      { withCredentials: true }, // withCredentials 옵션 추가
    );

    const accessTokenBearer = response.headers["authorization"] as string;
    const accessToken = accessTokenBearer.split(" ")[1];

    // 쿠키는 HTTP Only로 설정되었으므로, JavaScript를 통해 접근할 수 없음.
    // 브라우저가 자동으로 관리하도록 설정.

    setApiToken(accessToken);

    // refreshToken은 JavaScript를 통해 직접 접근 불가
    // const refreshToken = response.headers["Set-Cookie"];

    return { accessToken, refreshToken: "" }; // refreshToken을 빈 문자열로 반환
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const initiateSocialLogin = (provider: "naver" | "kakao") => {
  window.location.href = `/oauth2/authorization/${provider}`; // 백엔드에서 소셜 로그인 URL을 생성하고 리다이렉트
};

export const postSocialLoginCallback = async (provider: "naver" | "kakao", code: string) => {
  const response = await axios.post<LoginResponse>(`/oauth2/authorization/${provider}`, { code });
  const accessTokenBearer = response.headers["authorization"] as string;
  const accessToken = accessTokenBearer.split(" ")[1];

  setApiToken(accessToken);

  return { accessToken, refreshToken: "" };
};

// 서버 없이 구현 시
// export const postSocialLoginCallback = async (provider: "naver" | "kakao", code: string, state?: string) => {
//   const response = await axios.post<LoginResponse>(`/api/auth/${provider}/callback`, { code, state });
//   return response.data;
// };

export const signUp = async (userData: SignUpData): Promise<void> => {
  await axios.post("/api/members/sign-up", userData);
};

export const postLogout = async () => {
  await fetchCall(`/api/members/logout`, "post");
};
