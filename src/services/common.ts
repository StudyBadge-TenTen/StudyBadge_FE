import axios, { AxiosError } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "../utils/cookie";
import { useAuthStore } from "@/store/auth-store";
import { postLogout } from "./auth-api";

export const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_LOCAL_BASE_URL
  : import.meta.env.VITE_APP_PRODUCTION_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const MAX_RETRIES = 3;

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }
    // console.log("Request config:", config); // 디버깅을 위해 추가
    return config;
  },
  (error) => {
    console.error("Request error:", error); // 디버깅을 위해 추가
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response headers:", response.headers); // 디버깅을 위해 추가
    return response.data;
  },
  async (error) => {
    const axiosError = error as AxiosError;
    const originalRequest = error.config;

    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    console.error("Response error:", axiosError.response?.data); // 디버깅을 위해 추가

    // 에러 처리 로직 구현
    if (axiosError.response?.status === 401 && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount += 1;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          console.error("No refresh token available");
          try {
            alert("다시 로그인 해주시기 바랍니다.");
          } catch (error) {
            console.log(error);
          } finally {
            removeAccessToken();
            removeRefreshToken();
            window.location.reload();
            return Promise.reject(axiosError); // 요청 중단
          }
        }

        const response = await axios.post(`${API_BASE_URL}/api/token/re-issue`, null, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const accessTokenBearer = response.headers["authorization"] as string;

        if (accessTokenBearer) {
          const newAccessToken = accessTokenBearer.replace("Bearer ", "");
          setAccessToken(newAccessToken);
          useAuthStore.getState().setField("accessToken", newAccessToken);
          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        try {
          await postLogout();
          alert("다시 로그인 해주시기 바랍니다.");
        } catch (error) {
          console.log(error);
        } finally {
          removeAccessToken();
          removeRefreshToken();
          window.location.reload();
          return Promise.reject(axiosError); // 요청 중단
        }
      }
    }
    return Promise.reject(axiosError);
  },
);

async function fetchCall<T>(
  url: string,
  method: "get" | "post" | "put" | "delete" | "patch",
  data?: any,
  params?: Record<string, any>,
): Promise<T> {
  const config = {
    method,
    url,
    ...(data && { data }),
    ...(params && { params }),
  };
  // console.log("Fetch call config:", config); // 디버깅을 위해 추가
  return axiosInstance(config);
}

export { fetchCall, axiosInstance };
