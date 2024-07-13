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

export type { SelectAmountPropsType, PaymentBodyType, PaymentResponseType, ConfirmResponseType, FailResponseType };
