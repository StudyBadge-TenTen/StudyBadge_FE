import { useEffect, useState } from "react";
import { HISTORY_LENGTH_PER_PAGE } from "../../constants/page";
import { getPaymentsHistory, getPointHistory, postPaymentCancel } from "../../services/profile-api";
import Pagination from "../common/Pagination";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistoryType, PointHistoryType } from "../../types/profile-type";
import Modal from "../common/Modal";

const HistoryList = ({ type }: { type: "POINT" | "PAYMENT" }): JSX.Element => {
  const skeletonList = [1, 2, 3, 4, 5];
  const [latestPointList, setLatestPointList] = useState<PointHistoryType[]>([]);
  const [page, setPage] = useState(1);
  const [cancelPayKey, setCancelPayKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const paymentQuery = useQuery<PaymentHistoryType[], Error>({
    queryKey: ["paymentList", type, page],
    queryFn: () => getPaymentsHistory(page, HISTORY_LENGTH_PER_PAGE),
  });
  const pointQuery = useQuery<PointHistoryType[], Error>({
    queryKey: ["pointList", type, page],
    queryFn: () => getPointHistory(page, HISTORY_LENGTH_PER_PAGE),
  });

  useEffect(() => {
    try {
      getPointHistory(1, 10).then((latestPointList) => latestPointList && setLatestPointList(() => latestPointList));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isPossibleCancel = (data: PaymentHistoryType) => {
    const paymentDate = new Date(data.createdAt);

    for (const pointHistory of latestPointList) {
      if (!pointHistory) false;

      const historyDate = new Date(pointHistory.createdAt);

      // 결제 이후에 발생한 포인트 사용 내역을 찾음
      if (historyDate > paymentDate) {
        // 포인트 사용 내역이 있으면 false 반환
        if (pointHistory.historyType === "SPENT" || pointHistory.historyType === "DEDUCTED") {
          return false;
        }
      }
    }

    return true;
  };

  const handleCancelClick = async (isModal: boolean, paymentKey: string) => {
    if (!isModal && paymentKey) {
      setCancelPayKey(() => paymentKey);
      setModalOpen(() => true);
      return;
    }
    if (isModal && paymentKey) {
      await postCancel(paymentKey);
      setModalOpen(() => false);
      return;
    }
  };

  const postCancel = async (paymentKey: string) => {
    await postPaymentCancel(paymentKey);
    window.location.reload();
  };

  // 결제내역 / 포인트내역 조회해서 리스트로 렌더링
  if (type === "PAYMENT") {
    if (paymentQuery.data && Array.isArray(paymentQuery.data)) {
      if (paymentQuery.data.length === 0) return <div>결제 내역이 존재하지 않습니다.</div>;
      return (
        <>
          <div className="w-full h-fit min-h-96">
            {paymentQuery.data.map(
              (data) =>
                data.paymentKey && (
                  <div
                    key={data.paymentKey}
                    className="h-fit sm:h-16 border-b border-solid border-Gray-2 p-4 flex flex-col sm:flex-row justify-between items-center"
                  >
                    <span className="text-sm text-Gray-4 text-center">
                      결제날짜: {moment(data.createdAt).format("YYYY-MM-DD")} / 시간:{" "}
                      {moment(data.createdAt).format("hh:mm")}
                    </span>
                    <div className="flex items-center">
                      {isPossibleCancel(data) ? (
                        <>
                          <button
                            className="btn-red px-2 py-1 mr-4"
                            onClick={() => handleCancelClick(false, data.paymentKey)}
                          >
                            결제취소
                          </button>
                          {modalOpen && (
                            <Modal>
                              해당 결제를 취소하시겠습니까?
                              <div className="flex justify-center items-center mt-4">
                                <button onClick={() => handleCancelClick(true, cancelPayKey)} className="btn-blue w-10">
                                  예
                                </button>
                                <button onClick={() => setModalOpen(() => false)} className="btn-blue w-10 ml-2">
                                  아니오
                                </button>
                              </div>
                            </Modal>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-Gray-3 px-2 py-1 mr-4">결제완료</span>
                      )}
                      <span>{data.amount.toLocaleString()}원</span>
                    </div>
                  </div>
                ),
            )}
          </div>
          <Pagination
            type="HISTORY"
            dataListLength={HISTORY_LENGTH_PER_PAGE}
            pageState={page}
            setPage={setPage}
            historyList={paymentQuery.data}
          />
        </>
      );
    } else if (paymentQuery.isLoading) {
      return (
        <div className="w-full h-fit min-h-96 flex flex-col justify-center items-center">
          {skeletonList.map((value) => (
            <div key={`skeleton_${value}`} className="w-full h-4 bg-Gray-1 my-6 rounded-[50px] animate-pulse"></div>
          ))}
        </div>
      );
    } else if (paymentQuery.error) {
      return (
        <div>
          결제 내역을 불러오는데 실패하였습니다. errorName:{paymentQuery.error.name}. errorMessage:
          {paymentQuery.error.message}
        </div>
      );
    }
  } else if (type === "POINT") {
    if (pointQuery.data && Array.isArray(pointQuery.data)) {
      if (pointQuery.data.length === 0) return <div>포인트 내역이 존재하지 않습니다.</div>;
      return (
        <>
          <div className="w-full h-fit min-h-96">
            {pointQuery.data.map((data) => (
              <div
                key={new Date(data.createdAt).toDateString()}
                className="h-16 border-b border-solid border-Gray-2 p-4 flex flex-col sm:flex-row justify-between items-center justify-between items-center"
              >
                <span className="text-sm text-Gray-4 text-center">
                  날짜: {moment(data.createdAt).format("YYYY-MM-DD")} / 시간: {moment(data.createdAt).format("hh:mm")}
                </span>
                <div className="flex items-center">
                  {data.transferType === "PAYMENT_CANCEL" && (
                    <span className="text-Red-2 mr-4">
                      <b>-</b>결제취소
                    </span>
                  )}
                  {data.transferType === "PAYMENT_CHARGE" && (
                    <span className="text-Green-1 mr-4">
                      <b>+</b>충전
                    </span>
                  )}
                  {data.transferType === "STUDY_DEPOSIT" && (
                    <span className="text-Red-2 mr-4">
                      <b>-</b>예치금
                    </span>
                  )}
                  {data.transferType === "STUDY_REWARD" && (
                    <span className="text-Green-1 mr-4">
                      <b>+</b>환급
                    </span>
                  )}

                  <span>{data.amount.toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            type="HISTORY"
            dataListLength={HISTORY_LENGTH_PER_PAGE}
            pageState={page}
            setPage={setPage}
            historyList={pointQuery.data}
          />
        </>
      );
    } else if (pointQuery.isLoading) {
      return (
        <div className="w-full h-fit min-h-96 flex flex-col justify-center items-center">
          {skeletonList.map((value) => (
            <div key={`skeleton_${value}`} className="w-full h-4 bg-Gray-1 my-6 rounded-[50px] animate-pulse"></div>
          ))}
        </div>
      );
    } else if (pointQuery.error) {
      return (
        <div>
          결제 내역을 불러오는데 실패하였습니다. errorName:{pointQuery.error.name}. errorMessage:
          {pointQuery.error.message}
        </div>
      );
    }
  }
  return <></>;
};

export default HistoryList;
