import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postSuccessResponse } from "../../services/payment-api";
import Modal from "../common/Modal";
import { SuccessResponseType } from "../../types/payment-type";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const Success = (): JSX.Element => {
  // 결제 요청이 정상적이었을 시 리다이렉트되는 페이지
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const paymentKey = searchParams.get("paymentKey");
  const { data, error, isLoading } = useQuery<SuccessResponseType | undefined, Error>({
    queryKey: ["tossSuccess", orderId, amount, paymentKey],
    queryFn: () => postSuccessResponse(paymentKey ?? "", orderId ?? "", Number(amount)),
    enabled: !!paymentKey && !!orderId && !!amount,
  });

  useEffect(() => {
    async function confirm() {
      try {
        // if (data) {
        //   console.log(data); // 디버깅로그
        // }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        navigate(`/paymentFail/?message=${error.message}&code=${error.code}`);
      }
    }
    confirm();
  }, [searchParams]);

  return (
    <Modal>
      {isLoading ? (
        <div className="w-60 h-60 flex justify-center items-center">결제응답을 기다리는 중입니다...</div>
      ) : error ? (
        <div className="">
          서버 응답에 문제가 발생하였습니다. error name:{error.name}. error message:{error.message}
        </div>
      ) : (
        data && (
          <div className="w-60 h-60 result wrapper flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-center mb-4">결제가 완료되었습니다</h2>
            <p>{`주문번호: ${data.orderId}`}</p>
            <p className="mb-2">
              결제 금액:
              <b>{" " + Number(searchParams.get("amount")).toLocaleString()}</b>원
            </p>
            <p>{`결제 승인 일시:`}</p>
            <p>{`${moment(data.approvedAt).format("YYYY-MM-DD")} ${moment(data.approvedAt).format("hh:mm:ss")}`}</p>
            <button className="btn-blue w-1/2 mt-10" onClick={() => navigate("/profile/myInfo")}>
              확인
            </button>
          </div>
        )
      )}
    </Modal>
  );
};

export default Success;
