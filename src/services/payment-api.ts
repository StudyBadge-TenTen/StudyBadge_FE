import { SuccessResponseType, PaymentBodyType, PaymentResponseType } from "../types/payment-type";
import { fetchCall } from "./common";

const postPayment = async (paymentBody: PaymentBodyType) => {
  const paymentResponse = await fetchCall<PaymentResponseType>(`/api/payments/toss`, "post", paymentBody);
  return paymentResponse;
};

const postSuccessResponse = async (paymentKey: string, orderId: string, amount: number) => {
  if (!paymentKey || !orderId || !amount) return;
  const successResponse = await fetchCall<SuccessResponseType>(
    `/api/payments/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`,
    "post",
  );
  return successResponse;
};

export { postPayment, postSuccessResponse };
