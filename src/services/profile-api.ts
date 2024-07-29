import {
  ApplicationType,
  MyStudyType,
  PaymentHistoryType,
  PointHistoryType,
  ProfilePutType,
  UserInfoType,
} from "../types/profile-type";
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
  return myStudy ?? [];
};

const getPaymentsHistory = async (page: number, size: number) => {
  const paymentsHistory = await fetchCall<PaymentHistoryType[]>(
    `/api/payments/history?page=${page}&size=${size}`,
    "get",
  );
  return paymentsHistory ?? [];
};

const getPointHistory = async (page: number, size: number) => {
  const pointHistory = await fetchCall<PointHistoryType[]>(`/api/points/my-point?page=${page}&size=${size}`, "get");
  return pointHistory ?? [];
};

const postPaymentCancel = async (paymentKey: string) => {
  const requestBody = { paymentKey: paymentKey, cancelReason: "" };
  try {
    await fetchCall<ResponseType>(`/api/payments/cancel`, "post", requestBody);
    alert("결제 취소가 완료되었습니다.");
  } catch (error) {
    console.log("error: " + error);
    alert(
      "결제 취소 처리에 문제가 발생하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const getApplicationList = async () => {
  const participationList = await fetchCall<ApplicationType[]>(`/api/members/my-apply`, "get");
  return participationList ?? [];
};

const deleteAccount = async () => {
  try {
    await fetchCall(`/api/members/withdrawal`, "delete");
    alert("탈퇴가 완료되었습니다.");
  } catch (error) {
    console.log("error: " + error);
    alert(
      "탈퇴 처리에 문제가 발생하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

export {
  getProfile,
  putProfile,
  getMyStudy,
  getPaymentsHistory,
  getPointHistory,
  postPaymentCancel,
  getApplicationList,
  deleteAccount,
};
