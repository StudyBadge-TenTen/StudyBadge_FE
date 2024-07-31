import Cookies from "js-cookie";

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    console.log(parts.pop()?.split(";").shift());

    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const setRefreshToken = (refreshToken: string) => {
  Cookies.set("refreshToken", refreshToken, { expires: 3, path: "/" }); // 7일 동안 유효, 경로는 '/'로 설정
};

export const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

export const removeRefreshToken = () => {
  Cookies.remove("refreshToken");
};

export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 1 / 24 });
};

export const getAccessToken = () => {
  return Cookies.get("accessToken");
};

export const removeAccessToken = () => {
  Cookies.remove("accessToken");
};
