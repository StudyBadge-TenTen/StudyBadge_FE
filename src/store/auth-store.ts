import { create } from "zustand";
import axios from "axios";
import { postLogin, postLogout, postSignUp } from "../services/auth-api";
import { AuthStoreType, PasswordResetStore } from "../types/auth-type";
import { CustomErrorType } from "@/types/common";
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/cookie";
import { API_BASE_URL } from "@/services/common";

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
  isLoginFailed: false,
  isMember: false,
  setLoginFailed: (status) => set((state) => ({ ...state, isLoginFailed: status })),
  setIsMember: (isMember) => set({ isMember }),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  login: async (email, password) => {
    try {
      const { accessToken, refreshToken } = await postLogin(email, password);
      // console.log("postLogin token: ", accessToken, "posLogin refreshToken: ", refreshToken);

      set({ accessToken: accessToken, refreshToken: refreshToken });

      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      setAccessToken(accessToken);
      axios.defaults.headers.common["authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as CustomErrorType;
        alert(errorData.message);
      }
      console.error("Login failed:", error);
      throw error;
    }
  },
  signUp: async () => {
    const { email, name, nickname, introduction, accountBank, account, password, checkPassword } = get();
    const response = await postSignUp({
      email,
      name,
      nickname,
      introduction,
      accountBank,
      account,
      password,
      checkPassword,
    });
    // console.log("postSignUp 응답 : " + response); // 서버 응답 체크 로그
    return response;
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

  refreshAccessToken: async () => {
    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        alert("다시 로그인 해주시기 바랍니다");
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/token/re-issue`, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const accessTokenBearer = response.headers["authorization"] as string;

      if (accessTokenBearer) {
        const accessToken = accessTokenBearer.replace("Bearer ", "");
        setAccessToken(accessToken);
        set({ accessToken: accessToken });
      }
    } catch (error) {
      alert("다시 로그인 해주시기 바랍니다");
      return;
    }
  },

  logout: async () => {
    try {
      const response = await postLogout();
      if (axios.isAxiosError(response)) {
        const error = response.response?.data as CustomErrorType;
        alert(error.message);
      }
    } catch (error) {
      alert("로그아웃에 문제가 발생하였습니다.");
      console.error("Logout failed:", error);
      throw error;
    } finally {
      set({ accessToken: null, refreshToken: null });
      removeAccessToken();
      removeRefreshToken();
      window.location.reload();
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
}));

export { usePasswordResetStore };
