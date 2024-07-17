import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { PaymentMethodsWidget } from "../../types/payment-type";
import { nanoid } from "nanoid";
import { SelectAmountPropsType } from "../../types/payment-type";
import { useNavigate } from "react-router";
import { postPayment } from "../../services/payment-api";

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const widgetClientKey = import.meta.env.VITE_APP_TOSS_TEST_CLIENT_KEY;
const customerKey = nanoid();

const Checkout = ({
  setConfirm,
  chargeAmount,
}: {
  setConfirm: SelectAmountPropsType["setConfirm"];
  chargeAmount: SelectAmountPropsType["chargeAmount"];
}): JSX.Element => {
  const navigate = useNavigate();
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentWidgetRef = useRef<PaymentMethodsWidget | null>(null);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: chargeAmount },
      { variantKey: "DEFAULT" },
    );
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, chargeAmount]);

  useEffect(() => {
    const paymentMethodsWidget = paymentWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(chargeAmount);
  }, [chargeAmount]);

  // 결제버튼을 누르면 작동되는 함수
  const handlePayClick = async () => {
    try {
      const body = {
        payType: "CARD",
        amount: chargeAmount,
        orderName: "스터디뱃지 포인트 충전",
        successUrl: `${import.meta.env.PROD ? import.meta.env.VITE_APP_PRODUCTION_URL : ""}/api/v1/payments/toss/point-success`,
        failUrl: `${import.meta.env.PROD ? import.meta.env.VITE_APP_PRODUCTION_URL : ""}/api/v1/payments/toss/point-fail`,
      };
      // 서버에 post를 이용해 결제 생성
      const payInfo = await postPayment(body);

      // 서버에서 받은 데이터를 기반으로 토스 시스템에 요청
      await paymentWidget
        ?.requestPayment({
          orderId: payInfo.orderId,
          orderName: payInfo.orderName,
          customerName: payInfo.customerName,
          customerEmail: payInfo.customerEmail,
          successUrl: `${window.location.origin}/paymentSuccess/`,
          failUrl: `${window.location.origin}/paymentFail/`,
        })
        .catch((error: any) => {
          if (error.code === "USER_CANCEL") {
            console.log("사용자가 결제창을 닫았습니다.");
          } else if (error.code === "INVALID_CARD_COMPANY") {
            console.log("유효하지 않은 카드입니다.");
          } else {
            console.error("결제 요청 중 오류 발생:", error);
          }
        });
    } catch (err) {
      console.log("결제 요청 실패:", err);
    }
  };

  return (
    <div className="outside-modal fixed top-0 left-0 w-screen h-screen bg-Gray-3 bg-opacity-25 z-40 flex justify-center items-center">
      <div className="w-[550px] min-h-[600px] p-8 bg-white opacity-100 border border-solid border-Gray-2 rounded-[30px] fixed z-50 flex flex-col">
        <h2 className="text-2xl font-bold self-center">스터디 뱃지 포인트 충전</h2>
        {/* 결제 UI, 이용약관 UI 영역 */}
        <div id="payment-widget" />
        <div id="agreement" />
        {/* 결제하기 버튼 */}
        <div className="flex justify-center mt-[30px]">
          <button
            id="cancelBtn"
            className="button btn-blue mr-8"
            onClick={() => {
              navigate("/profile");
              setConfirm(() => false);
            }}
          >
            취소하기
          </button>
          <button id="paymentBtn" className="button btn-blue" onClick={() => handlePayClick()}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

// import { nanoid } from "nanoid";
// import { useEffect, useRef, useState } from "react";
// import { SelectAmountPropsType } from "../../types/payment-type";
// import { postPayment } from "../../services/payment-api";
// import { useNavigate } from "react-router";
// import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";

// const Checkout = ({
//   setConfirm,
//   chargeAmount,
// }: {
//   setConfirm: SelectAmountPropsType["setConfirm"];
//   chargeAmount: SelectAmountPropsType["chargeAmount"];
// }): JSX.Element => {
//   const navigate = useNavigate();
//   const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance>();
//   const paymentWidgetRef = useRef<PaymentMethodsWidget | null>(null);

//   const widgetClientKey = import.meta.env.VITE_APP_TOSS_TEST_CLIENT_KEY;
//   const customerKey = nanoid();

//   useEffect(() => {
//     const fetchPaymentWidget = async () => {
//       try {
//         const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
//         setPaymentWidget(() => loadedWidget);
//       } catch (error) {
//         console.error("Error fetching payment widget:", error);
//       }
//     };

//     fetchPaymentWidget();
//   }, []);

//   useEffect(() => {
//     if (paymentWidget == null) {
//       return;
//     }

//     const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
//       "#payment-widget",
//       { value: chargeAmount },
//       { variantKey: "DEFAULT" },
//     );

//     paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

//     paymentWidgetRef.current = paymentMethodsWidget;
//   }, [paymentWidget, chargeAmount]);

//   useEffect(() => {
//     const paymentMethodsWidget = paymentWidgetRef.current;

//     if (paymentMethodsWidget == null) {
//       return;
//     }

//     paymentMethodsWidget.updateAmount(chargeAmount);
//   }, [chargeAmount]);

//   const handlePayClick = async () => {
//     const paymentWidget = paymentWidgetRef.current;

//     try {
//       const body = {
//         payType: "CARD",
//         amount: chargeAmount,
//         orderName: "스터디뱃지 포인트 충전",
//         successUrl: `${import.meta.env.PROD ? import.meta.env.VITE_APP_PRODUCTION_URL : ""}/api/v1/payments/toss/point-success`,
//         failUrl: `${import.meta.env.PROD ? import.meta.env.VITE_APP_PRODUCTION_URL : ""}/api/v1/payments/toss/point-fail`,
//       };
//       const payInfo = await postPayment(body);
//       await paymentWidget
//         ?.requestPayment({
//           orderId: payInfo.orderId,
//           orderName: payInfo.orderName,
//           customerName: payInfo.customerName,
//           customerEmail: payInfo.customerEmail,
//           successUrl: `${payInfo.successUrl}/paymentSuccess`,
//           failUrl: `${payInfo.failUrl}/paymentFail`,
//         })
//         .catch((error: any) => {
//           if (error.code === "USER_CANCEL") {
//             console.log("사용자가 결제창을 닫았습니다.");
//           } else if (error.code === "INVALID_CARD_COMPANY") {
//             console.log("유효하지 않은 카드입니다.");
//           } else {
//             console.error("결제 요청 중 오류 발생:", error);
//           }
//         });
//     } catch (err) {
//       console.log("결제 요청 실패:", err);
//     }
//   };

//   return (
//     <div className="outside-modal fixed top-0 left-0 w-screen h-screen bg-Gray-3 bg-opacity-25 z-40 flex justify-center items-center">
//       <div className="w-[550px] min-h-[600px] p-8 bg-white opacity-100 border border-solid border-Gray-2 rounded-[30px] fixed z-50 flex flex-col">
//         <h2 className="text-2xl font-bold self-center">스터디 뱃지 포인트 충전</h2>
//         <div id="payment-widget" />
//         <div id="paymentAgreement"></div>
//         <div className="flex justify-center mt-[30px]">
//           <button
//             id="cancelBtn"
//             className="button btn-blue mr-8"
//             onClick={() => {
//               navigate("/profile");
//               setConfirm(() => false);
//             }}
//           >
//             취소하기
//           </button>
//           <button id="paymentBtn" className="button btn-blue" onClick={() => handlePayClick()}>
//             결제하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Checkout;
