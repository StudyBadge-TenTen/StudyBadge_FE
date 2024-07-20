import { create } from "zustand";
import axios from "axios";
import { signUp, initiateSocialLogin, postSocialLoginCallback, postLogin, LoginResponse } from "../services/auth";
import { PasswordResetStore } from "../types/auth-type";
import { setApiToken } from "../services/common";

export interface AuthStore {
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
  setField: (field: keyof Omit<AuthStore, "setField" | "resetForm" | "login" | "signUp">, value: string) => void;
  login: (email: string, password: string) => Promise<void>;
  signUp: () => Promise<void>;
  reset: () => void;
  initiateSocialLogin: (provider: "naver" | "kakao") => void;
  handleSocialLoginCallback: (provider: "naver" | "kakao", code: string, state?: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  email: "",
  name: "",
  nickname: "",
  introduction: "",
  accountBank: "",
  account: "",
  password: "",
  checkPassword: "",
  accessToken: null,
  refreshToken: null,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  login: async (email, password) => {
    try {
      const { accessToken, refreshToken } = await postLogin(email, password);
      set({ accessToken, refreshToken });
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  signUp: async () => {
    const { email, name, nickname, introduction, accountBank, account, password, checkPassword } = get();
    try {
      await signUp({ email, name, nickname, introduction, accountBank, account, password, checkPassword });
      set({
        email: "",
        name: "",
        nickname: "",
        introduction: "",
        accountBank: "",
        account: "",
        password: "",
        checkPassword: "",
      });
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  },
  reset: () =>
    set({
      email: "",
      name: "",
      nickname: "",
      introduction: "",
      accountBank: "",
      account: "",
      password: "",
      checkPassword: "",
      accessToken: null,
      refreshToken: null,
    }),

  initiateSocialLogin: (provider) => {
    initiateSocialLogin(provider);
  },

  handleSocialLoginCallback: async (provider, code) => {
    try {
      const { accessToken, refreshToken } = await postSocialLoginCallback(provider, code);
      set({ accessToken, refreshToken });
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await axios.post<LoginResponse>(
        "/api/token/re-issue",
        { refreshToken: get().refreshToken },
        { withCredentials: true },
      );

      const accessTokenBearer = response.headers["authorization"] as string;
      const accessToken = accessTokenBearer.split(" ")[1];

      // 토큰을 설정합니다.
      setApiToken(accessToken);

      // 새로운 accessToken과 refreshToken을 상태에 저장합니다.
      set({ accessToken, refreshToken: "" });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },
}));

const usePasswordResetStore = create<PasswordResetStore>((set) => ({
  email: "",
  newPassword: "",
  confirmPassword: "",
  verificationCode: "",
  showVerificationForm: false,
  showNewPasswordForm: false,
  error: "",
  setEmail: (email) => set({ email }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setVerificationCode: (verificationCode) => set({ verificationCode }),
  setShowVerificationForm: (showVerificationForm) => set({ showVerificationForm }),
  setShowNewPasswordForm: (showNewPasswordForm) => set({ showNewPasswordForm }),
  setError: (error) => set({ error }),
}));

export { usePasswordResetStore };
