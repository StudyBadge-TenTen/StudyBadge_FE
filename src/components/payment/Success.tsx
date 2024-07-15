import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getConfirmResponse } from "../../services/payment-api";
import Modal from "../common/Modal";

const Success = (): JSX.Element => {
  // 결제 요청이 정상적이었을 시 리다이렉트되는 페이지
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    // -> 결제 금액 등을 지역상태로 관리하고 있었는데 전역상태로 관리해야하나..?
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const { paymentKey, orderId, amount } = requestData;

      try {
        if (paymentKey && orderId && amount) {
          const response = await getConfirmResponse(paymentKey, orderId, Number(amount));
          // response의 data를 저장할 필요가 생길 경우 아래 로직 작성
          console.log(response);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        navigate(`/paymentFail/?message=${error.message}&code=${error.code}`);
      }
    }
    confirm();
  }, []);

  return (
    <Modal>
      <div className="w-60 h-60 result wrapper flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-4">결제가 완료되었습니다</h2>
        <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>
        <button className="btn-blue w-1/2 mt-10" onClick={() => navigate("/profile")}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default Success;
