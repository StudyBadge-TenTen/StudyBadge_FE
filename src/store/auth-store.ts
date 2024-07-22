import { create } from "zustand";
import axios from "axios";
import { signUp, postLogin, postLogout } from "../services/auth-api";
import { AuthStoreType, LoginResponse, PasswordResetStore } from "../types/auth-type";
import { setApiToken } from "../services/common";

export const useAuthStore = create<AuthStoreType>((set, get) => ({
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
      accessToken: "",
      refreshToken: null,
    }),

  // initiateSocialLogin: (provider) => {
  //   initiateSocialLogin(provider);
  // },

  // handleSocialLoginCallback: async (provider) => {
  //   try {
  //     const { accessToken } = await postSocialLoginCallback(provider);
  //     set({ accessToken });
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  //   } catch (error) {
  //     console.error(`${provider} login failed:`, error);
  //     throw error;
  //   }
  // },

  refreshAccessToken: async () => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_PRODUCTION_BASE_URL}/api/token/re-issue`,
        // { refreshToken: get().refreshToken },
        {}, // 토큰 재발급시 refresh token을 쿠키로 받는다면 위 코드가 필요없다고 함
        { withCredentials: true },
      );

      const accessTokenBearer = response.headers["authorization"] as string;

      if (accessTokenBearer) {
        const accessToken = accessTokenBearer.replace("Bearer ", "");

        // 토큰을 설정합니다.
        setApiToken(accessToken);

        // 새로운 accessToken을 저장, refreshToken은 쿠키에 있고 App컴포넌트에 새로고침 시 받아오는 코드 있음
        set({ accessToken });
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error("Logout failed:", error);
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
