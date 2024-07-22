import { MyStudyType, PaymentHistoryType, PointHistoryType, ProfilePutType, UserInfoType } from "../types/profile-type";
import { fetchCall } from "./common";

const getProfile = async () => {
  const userInfo = await fetchCall<UserInfoType>(`/api/members/my-info`, "get");
  return userInfo;
};

const putProfile = async (profileObj: ProfilePutType) => {
  const userInfo = await fetchCall<UserInfoType>(`/api/members/my-info/update`, "put", profileObj);
  return userInfo;
};

const getMyStudy = async () => {
  const myStudy = await fetchCall<MyStudyType[]>(`/api/members/my-study`, "get");
  return myStudy;
};

const getPaymentsHistory = async (page: number, size: number) => {
  const paymentsHistory = await fetchCall<PaymentHistoryType[]>(
    `/api/payments/history?page=${page}&size=${size}`,
    "get",
  );
  return paymentsHistory;
};

const getPointHistory = async (page: number, size: number) => {
  const pointHistory = await fetchCall<PointHistoryType[]>(`/api/points/history?page=${page}&size=${size}`, "get");
  return pointHistory;
};

const postPaymentCancel = async (paymentKey: string) => {
  const requestBody = { paymentKey: paymentKey, cancelReason: "" };
  await fetchCall<ResponseType>(`/api/payments/cancel`, "post", requestBody);
};

export { getProfile, putProfile, getMyStudy, getPaymentsHistory, getPointHistory, postPaymentCancel };
