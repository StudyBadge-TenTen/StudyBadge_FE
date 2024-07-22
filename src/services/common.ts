import axios, { AxiosError } from "axios";

// 공통 axios 만들기
const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_BASE_URL_LOCAL // .env파일 - VITE_APP_BASE_URL_LOCAL=localhost:8080
  : import.meta.env.VITE_APP_PRODUCTION_BASE_URL; // 서버 도메인 정해지면 환경변수에 등록
let API_TOKEN = "";

const setApiToken = (token: string) => {
  API_TOKEN = token;
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
  console.log("Token set:", API_TOKEN); // 디버깅을 위해 추가
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 헤더에 인증 토큰 추가
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    console.log("Request headers:", config.headers); // 디버깅을 위해 추가
    return config;
  },
  (error) => {
    // 요청 에러 처리
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
  (error) => {
    // 응답 에러 처리
    const axiosError = error as AxiosError;
    console.error("Response error:", axiosError.response?.data); // 디버깅을 위해 추가
    // 여기서 에러 처리 로직 구현
    return Promise.reject(axiosError);
  },
);

async function fetchCall<T>(url: string, method: "get" | "post" | "put" | "delete" | "patch", data?: any): Promise<T> {
  const config = {
    method,
    url,
    ...(data && { data }), // data가 있을 경우에만 data 속성 추가
  };
  return axiosInstance(config);
}

// Usage
// const id = 123;
// const result = await fetchCall<{ message: string }>(`/posts`, "post", { itemId: id });
// console.log(result.message);

export { fetchCall, setApiToken };
