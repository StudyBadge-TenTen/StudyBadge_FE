const PaymentList = (): JSX.Element => {
  // todo
  // 결제내역 / 포인트내역 조회해서 리스트로 렌더링
  return (
    // 예시 코드
    <div className="w-full h-fit min-h-96">
      <div className="h-16 border-b border-solid border-Gray-2 p-4 flex justify-between items-center">
        <span className="text-sm text-Gray-4 text-center">결제날짜: 2024-07-22 / 시간: 02:01:11</span>
        <div className="flex items-center">
          <button className="btn-red px-2 py-1 mr-4">결제취소</button>
          <span>20,000원</span>
        </div>
      </div>
      <div className="h-16 border-b border-solid border-Gray-2 p-4 flex justify-between items-center">
        <span className="text-sm text-Gray-4 text-center">결제날짜: 2024-07-22 / 시간: 02:01:11</span>
        <span>20,000원</span>
      </div>
      <div className="h-16 border-b border-solid border-Gray-2 p-4 flex justify-between items-center">
        <span className="text-sm text-Gray-4 text-center">결제날짜: 2024-07-22 / 시간: 02:01:11</span>
        <span>20,000원</span>
      </div>
    </div>
  );
};

export default PaymentList;
