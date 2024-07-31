import axios, { AxiosError } from "axios";
import { postLogout } from "./auth-api";

// 공통 axios 만들기
const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_LOCAL_BASE_URL // .env파일 - VITE_APP_LOCAL_BASE_URL=localhost:8080
  : import.meta.env.VITE_APP_PRODUCTION_BASE_URL; // 서버 도메인 정해지면 환경변수에 등록
let API_TOKEN = "";

const setApiToken = (token: string) => {
  API_TOKEN = token;
  axiosInstance.defaults.headers.common["authorization"] = `Bearer ${API_TOKEN}`;
  console.log("Token set in setApiToken:", API_TOKEN); // 디버깅을 위해 추가

  // dev 모드 시
  if (import.meta.env.DEV || import.meta.env.PROD) {
    const expirationTime = new Date().getTime() + 7200000; // 2시간
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("accessTokenExpiration", expirationTime.toString());
  }
};

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
    // 요청 헤더에 인증 토큰 추가

    // const refreshToken = sessionStorage.getItem("refreshToken");
    //
    // if (refreshToken && !config.headers["authorization"]) {
    //   try {
    //     const response = await axios.post(`${API_BASE_URL}/api/token/re-issue`, null, {
    //       headers: {
    //         Authorization: `Bearer ${refreshToken}`,
    //       },
    //     });
    //     const newAccessToken = response.headers["authorization"].split(" ")[1];
    //     // 새로운 토큰 저장 및 요청 헤더에 추가
    //     setApiToken(newAccessToken);
    //     config.headers["authorization"] = `Bearer ${newAccessToken}`;
    //   } catch (refreshError) {
    //     console.error("Token refresh error:", refreshError); // 디버깅을 위해 추가
    //     // 로그아웃 처리
    //     try {
    //       await postLogout();
    //       console.log("Token refresh error - try logout:", refreshError);
    //     } catch (logoutError) {
    //       console.error("Logout error:", logoutError);
    //     } finally {
    //       alert("다시 로그인 해주시기 바랍니다.");
    //     }
    //     return Promise.reject(refreshError);
    //   }
    // }

    if (import.meta.env.DEV || import.meta.env.PROD) {
      console.log("this is dev mode");
      try {
        const storageToken = sessionStorage.getItem("accessToken");
        config.headers["authorization"] = `Bearer ${storageToken}`;
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError); // 디버깅을 위해 추가
        // 로그아웃 처리
        try {
          await postLogout();
          console.log("Token refresh error - try logout:", refreshError);
        } catch (logoutError) {
          console.error("Logout error:", logoutError);
        } finally {
          alert("다시 로그인 해주시기 바랍니다.");
        }
        return Promise.reject(refreshError);
      }
    } else {
      console.log("this is prod mode"); // 디버깅을 위해 추가
      config.headers["authorization"] = `Bearer ${API_TOKEN}`;
    }
    console.log("Request config:", config); // 디버깅을 위해 추가
    return config;
  },
  (error) => {
    // 요청 에러 처리
    console.error("Request error:", error); // 디버깅을 위해 추가
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리하고 반환
    console.log("Response headers:", response.headers); // 디버깅을 위해 추가
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

      if (import.meta.env.DEV || import.meta.env.PROD) {
        try {
          const storageToken = sessionStorage.getItem("accessToken");
          originalRequest.headers["authorization"] = `Bearer ${storageToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError); // 디버깅을 위해 추가
          // 로그아웃 처리
          try {
            await postLogout();
            console.log("Token refresh error - try logout:", refreshError);
          } catch (logoutError) {
            console.error("Logout error:", logoutError);
          } finally {
            alert("다시 로그인 해주시기 바랍니다.");
          }
          return Promise.reject(refreshError);
        }
      }

      // const refreshToken = sessionStorage.getItem("refreshToken");

      // if (refreshToken) {
      //   try {
      //     const response = await axios.post(`${API_BASE_URL}/api/token/re-issue`, null, {
      //       headers: {
      //         Authorization: `Bearer ${refreshToken}`,
      //       },
      //     });
      //     const newAccessToken = response.headers["authorization"].split(" ")[1];

      //     // 새로운 토큰 저장 및 요청 헤더에 추가
      //     setApiToken(newAccessToken);
      //     originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;

      //     // 원래 요청을 다시 시도
      //     // return axiosInstance(originalRequest);
      //   } catch (refreshError) {
      //     console.error("Token refresh error:", refreshError); // 디버깅을 위해 추가
      //     // 로그아웃 처리
      //     try {
      //       await postLogout();
      //       console.log("Token refresh error - try logout:", refreshError);
      //     } catch (logoutError) {
      //       console.error("Logout error:", logoutError);
      //     } finally {
      //       alert("다시 로그인 해주시기 바랍니다.");
      //     }
      //     return Promise.reject(refreshError);
      //   }
      // } else {
      //   console.error("No refresh token available");
      //   await postLogout();
      //   alert("다시 로그인 해주시기 바랍니다.");
      //   return Promise.reject(axiosError);
      // }
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
    ...(data && { data }), // data가 있을 경우에만 data 속성 추가
    ...(params && { params }), // params가 있을 경우에만 params 속성 추가
  };
  console.log("Fetch call config:", config); // 디버깅을 위해 추가
  return axiosInstance(config);
}

// Usage
// const id = 123;
// const result = await fetchCall<{ message: string }>(`/posts`, "post", { itemId: id });
// console.log(result.message);

export { fetchCall, setApiToken };
