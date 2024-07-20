import axios from "axios";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface SignUpData {
  email: string;
  name: string;
  nickname: string;
  introduction: string;
  accountBank: string;
  account: string;
  password: string;
  checkPassword: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/members/login", { email, password });
  return response.data;
};

export const initiateSocialLogin = (provider: "naver" | "kakao") => {
  window.location.href = `/api/auth/${provider}`; // 백엔드에서 소셜 로그인 URL을 생성하고 리다이렉트
};

export const handleSocialLoginCallback = async (provider: "naver" | "kakao", code: string, state?: string) => {
  const response = await axios.post<LoginResponse>(`/api/auth/${provider}/callback`, { code, state });
  return response.data;
};

export const signUp = async (userData: SignUpData): Promise<void> => {
  await axios.post("/api/members/sign-up", userData);
};
