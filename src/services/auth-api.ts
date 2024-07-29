import axios, { AxiosResponse } from "axios";
import { fetchCall, setApiToken } from "./common";
import { LoginResponse, SignUpData } from "../types/auth-type";

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_PRODUCTION_BASE_URL}/api/members/login`,
      { email, password },
      { withCredentials: true }, // withCredentials 옵션 추가
    );

    const accessTokenBearer = response.headers["authorization"] as string;
    const accessToken = accessTokenBearer.split(" ")[1];
    // console.log("Access token received:", accessToken); // 디버깅을 위해 추가

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

// export const initiateSocialLogin = (provider: "naver" | "kakao") => {
//   window.location.href = `/oauth2/authorization/${provider}`; // 백엔드에서 소셜 로그인 URL을 생성하고 리다이렉트
// };

// axios로 oauth 소셜로그인 구현 시
// export const postSocialLoginCallback = async (provider: "naver" | "kakao") => {
//   const response = await fetchCall<Response>(
//     `${import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_PRODUCTION_BASE_URL}/oauth2/authorization/${provider}`,
//     "post",
//   );
//   const accessTokenBearer = response.headers.get("authorization") as string;
//   let accessToken;

//   if (accessTokenBearer) {
//     accessToken = accessTokenBearer.replace("Bearer ", "");
//     setApiToken(accessToken);
//   } else {
//     throw new Error("Authorization header is missing");
//   }

//   return { accessToken };
// };

// 서버 없이 구현 시
// export const postSocialLoginCallback = async (provider: "naver" | "kakao", code: string, state?: string) => {
//   const response = await axios.post<LoginResponse>(`/api/auth/${provider}/callback`, { code, state });
//   return response.data;
// };

export const postSignUp = async (userData: SignUpData) => {
  const response = await fetchCall<AxiosResponse>(`/api/members/sign-up`, "post", userData);
  return response;
};

export const getAuthEmail = async (email: string, code: string) => {
  try {
    await fetchCall<AxiosResponse>(`/api/members/auth?email=${email}&code=${code}`, "get");
  } catch (error) {
    console.log(error);
  }
};

export const postLogout = async () => {
  await fetchCall<AxiosResponse>(`/api/members/logout`, "post");
};

export const postVerificationEmail = async (email: string) => {
  const response = await fetchCall<AxiosResponse>(`/api/members/password`, "post", null, { email });
  return response;
};

export const getCodeVerification = async (email: string, code: string) => {
  const response = await fetchCall<AxiosResponse>(`/api/members/auth/password`, "get", null, { email, code });
  return response;
};

export const patchResetPassword = async (email: string, newPassword: string) => {
  const response = await fetchCall<AxiosResponse>(`/api/members/password/reset`, "patch", null, { email, newPassword });
  return response;
};
