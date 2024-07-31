import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL, fetchCall } from "./common";
import { LoginResponse, SignUpData } from "../types/auth-type";
import { useAuthStore } from "@/store/auth-store";
import { removeAccessToken, removeRefreshToken } from "@/utils/cookie";

export const postLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/api/members/login`,
      { email, password },
      { withCredentials: true }, // withCredentials 옵션 추가
    );

    const accessTokenBearer = response.headers["authorization"] as string;
    const accessToken = accessTokenBearer.split(" ")[1];

    useAuthStore.getState().setField("accessToken", accessToken);

    return { accessToken, refreshToken: response.data.refreshToken };
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
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/sign-up`, "post", userData);
  return response;
};

export const getAuthEmail = async (email: string, code: string) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/auth?email=${email}&code=${code}`, "get");
  return response;
};

export const postEmailResend = async (email: string) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/resend?email=${email}`, "post");
  return response;
};

export const postLogout = async () => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/logout`, "post");
    return response;
  } catch (error) {
    console.log(error); // 디버깅 로그
  } finally {
    removeAccessToken();
    removeRefreshToken();
    window.location.reload(); // 새로고침하여 로그아웃 상태를 반영
  }
};

export const postVerificationEmail = async (email: string) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/password`, "post", null, {
    email,
  });
  return response;
};

export const getCodeVerification = async (email: string, code: string) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/auth/password`, "get", null, {
    email,
    code,
  });
  return response;
};

export const patchResetPassword = async (email: string, newPassword: string) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(`/api/members/password/reset`, "patch", null, {
    email,
    newPassword,
  });
  return response;
};
