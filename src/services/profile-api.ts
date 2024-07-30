import { CustomErrorType } from "@/types/common";
import {
  ApplicationType,
  MyStudyType,
  PaymentHistoryType,
  PointHistoryType,
  UserInfoType,
} from "../types/profile-type";
import { fetchCall } from "./common";
import axios, { AxiosError, AxiosResponse } from "axios";

const getProfile = async () => {
  const userInfo = await fetchCall<UserInfoType | AxiosError>(`/api/members/my-info`, "get");
  if (axios.isAxiosError(userInfo)) {
    const error = userInfo.response?.data as CustomErrorType;
    alert(error.message);
    throw new Error();
  } else {
    return userInfo;
  }
};

const getMyStudy = async () => {
  const myStudy = await fetchCall<MyStudyType[] | AxiosError>(`/api/members/my-study`, "get");
  if (axios.isAxiosError(myStudy)) {
    if (myStudy.response?.status === 404) {
      return [];
    } else {
      const error = myStudy.response?.data as CustomErrorType;
      console.log(error.message);
      return [];
    }
  } else {
    return myStudy ?? [];
  }
};

const getPaymentsHistory = async (page: number, size: number) => {
  const paymentsHistory = await fetchCall<PaymentHistoryType[] | AxiosError>(
    `/api/payments/history?page=${page}&size=${size}`,
    "get",
  );
  if (axios.isAxiosError(paymentsHistory)) {
    if (paymentsHistory.response?.status === 404) {
      return [];
    } else {
      const error = paymentsHistory.response?.data as CustomErrorType;
      if (error.errorCode === "NOT_FOUND_PAYMENT") {
        return [];
      } else {
        console.log(error.message);
        return [];
      }
    }
  } else {
    return paymentsHistory ?? [];
  }
};

const getPointHistory = async (page: number, size: number) => {
  const pointHistory = await fetchCall<PointHistoryType[] | AxiosError>(
    `/api/points/my-point?page=${page}&size=${size}`,
    "get",
  );
  if (axios.isAxiosError(pointHistory)) {
    if (pointHistory.response?.status === 404) {
      return [];
    } else {
      const error = pointHistory.response?.data as CustomErrorType;
      if (error.errorCode === "NOT_FOUND_POINT") {
        return [];
      } else {
        console.log(error.message);
        return [];
      }
    }
  } else {
    return pointHistory ?? [];
  }
};

const postPaymentCancel = async (paymentKey: string) => {
  const requestBody = { paymentKey: paymentKey, cancelReason: "포인트 충전 취소" };
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(`/api/payments/cancel`, "post", requestBody);
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("결제 취소가 완료되었습니다.");
    }
  } catch (error) {
    console.log("error: " + error);
    alert(
      "결제 취소 처리에 문제가 발생하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const getApplicationList = async () => {
  try {
    const participationList = await fetchCall<ApplicationType[] | AxiosError>(`/api/members/my-apply`, "get");
    if (axios.isAxiosError(participationList)) {
      if (participationList.response?.status === 404) {
        return [];
      } else {
        const error = participationList.response?.data as CustomErrorType;
        if (error.errorCode === "NOT_FOUND_PARTICIPATION") {
          return [];
        } else {
          console.log(error.message);
          return [];
        }
      }
    } else {
      return participationList ?? [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteAccount = async () => {
  try {
    const response = await fetchCall(`/api/members/withdrawal`, "delete");
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("탈퇴가 완료되었습니다.");
    }
  } catch (error) {
    console.log("error: " + error);
    alert(
      "탈퇴 처리에 문제가 발생하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

export {
  getProfile,
  getMyStudy,
  getPaymentsHistory,
  getPointHistory,
  postPaymentCancel,
  getApplicationList,
  deleteAccount,
};
