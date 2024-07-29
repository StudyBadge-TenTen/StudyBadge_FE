import { AxiosResponse } from "axios";
import { CustomErrorType } from "./common";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
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

interface AuthStoreType {
  email: string;
  name: string;
  nickname: string;
  introduction: string;
  accountBank: string;
  account: string;
  password: string;
  checkPassword: string;
  accessToken: string | null;
  refreshToken: string | null;
  isLoginFailed: boolean;
  isMember: boolean;
  setLoginFailed: (status: boolean) => void;
  setIsMember: (isMember: boolean) => void;
  setField: (field: keyof Omit<AuthStoreType, "setField" | "resetForm" | "login" | "signUp">, value: string) => void;
  login: (email: string, password: string) => Promise<void>;
  signUp: () => Promise<AxiosResponse | CustomErrorType>;
  reset: () => void;
  // initiateSocialLogin: (provider: "naver" | "kakao") => void;
  // handleSocialLoginCallback: (provider: "naver" | "kakao") => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

interface PasswordResetStore {
  email: string;
  newPassword: string;
  confirmPassword: string;
  verificationCode: string;
  showVerificationForm: boolean;
  showNewPasswordForm: boolean;
  error: string;
  setEmail: (email: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setVerificationCode: (code: string) => void;
  setShowVerificationForm: (show: boolean) => void;
  setShowNewPasswordForm: (show: boolean) => void;
}

export type { LoginResponse, SignUpData, AuthStoreType, PasswordResetStore };
