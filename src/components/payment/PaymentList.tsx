const PaymentList = (): JSX.Element => {
  return (
    <div className="w-full h-fit min-h-96">
      <div className="h-16 border-b border-solid border-Gray-2 p-4 flex justify-between items-center">
        <span className="text-sm text-Gray-4 text-center">결제날짜: 2024-07-22 / 시간: 02:01:11</span>
        <span>20,000원</span>
      </div>
    </div>
  );
};

export default PaymentList;
