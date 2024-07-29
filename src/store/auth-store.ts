import { create } from "zustand";
import axios from "axios";
import { postLogin, postLogout, postSignUp } from "../services/auth-api";
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
  isLoginFailed: false,
  isMember: false,
  setLoginFailed: (status) => set((state) => ({ ...state, isLoginFailed: status })),
  setIsMember: (isMember) => set({ isMember }),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  login: async (email, password) => {
    try {
      const { accessToken, refreshToken } = await postLogin(email, password);
      console.log("postLogin token:", accessToken);

      set({ accessToken: accessToken, refreshToken: refreshToken });

      // dev 모드 시
      if (import.meta.env.DEV) {
        const expirationTime = new Date().getTime() + 7200000; // 2시간
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("accessTokenExpiration", expirationTime.toString());
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
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
    console.log("postSignUp 응답 : " + response); // 서버 응답 체크 로그
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
        set({ accessToken: accessToken });
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await postLogout();
      if (import.meta.env.DEV) {
        sessionStorage.removeItem("accessToken");
      }
      setApiToken("");
    } catch (error) {
      alert(
        "로그아웃에 실패하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
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
}));

export { usePasswordResetStore };
