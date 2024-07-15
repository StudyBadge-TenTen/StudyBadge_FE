interface SelectAmountPropsType {
  // setIsPaying: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  chargeAmount: number;
  setChargeAmount: React.Dispatch<React.SetStateAction<number>>;
}

interface PaymentBodyType {
  payType: string;
  amount: number;
  orderName: string;
  successUrl: string;
  failUrl: string;
}

interface PaymentResponseType {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
  customerEmail: string;
}

interface ConfirmResponseType {
  mid: string;
  version: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  method: string;
  totalAmount: string;
  balanceAmount: string;
  suppliedAmount: string;
  vat: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: string;
  cultureExpense: string;
  type: string;
}

interface FailResponseType {
  errorCode: string;
  errorMessage: string;
  orderId: string;
}

// 혹시 타입 인식이 안될 경우를 위해 따로 빼놓음
interface PaymentMethodsWidget {
  updateAmount: (amount: number, reason?: string | string[]) => void;
  UPDATE_REASON: {
    COUPON: string;
    POINT: string;
  };
  on: (eventName: string, callback: (selectedPaymentMethod: string) => unknown) => void;
  getSelectedPaymentMethod: () => {
    type: "NORMAL" | "BRANDPAY" | "KEYIN" | "CUSTOM";
    method?: string;
    easyPay?: {
      provider: string;
    };
    paymentMethodKey?: string;
  };
}

export type {
  SelectAmountPropsType,
  PaymentBodyType,
  PaymentResponseType,
  ConfirmResponseType,
  FailResponseType,
  PaymentMethodsWidget,
};
