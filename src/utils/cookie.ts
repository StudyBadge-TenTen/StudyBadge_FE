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

export const setRefreshCookie = (refreshToken: string) => {
  Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" }); // 7일 동안 유효, 경로는 '/'로 설정
};
