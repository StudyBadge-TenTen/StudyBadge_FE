import { ConfirmResponseType, PaymentBodyType, PaymentResponseType } from "../types/payment-type";
import fetchCall from "./common";

const postPayment = async (paymentBody: PaymentBodyType) => {
  const paymentResponse = await fetchCall<PaymentResponseType>(`/api/v1/payments/toss`, "post", paymentBody);
  return paymentResponse;
};

const getConfirmResponse = async (paymentKey: string, orderId: string, amount: number) => {
  const confirmResponse = await fetchCall<ConfirmResponseType>(
    `/api/v1/payments/toss/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
    "get",
  );
  return confirmResponse;
};

export { postPayment, getConfirmResponse };
