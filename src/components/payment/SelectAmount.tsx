import Modal from "../common/Modal";
import { SelectAmountPropsType } from "../../types/payment-type";
import { useNavigate } from "react-router";

const SelectAmount = ({ setConfirm, chargeAmount, setChargeAmount }: SelectAmountPropsType): JSX.Element => {
  const navigate = useNavigate();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "chargeAmount") {
      if (Number.isNaN(Number(e.target.value))) {
        setChargeAmount((origin) => origin);
        alert("숫자만 입력해주세요");
      } else {
        setChargeAmount(() => Number(e.target.value));
      }
    }
  };

  return (
    <>
      <Modal>
        <p>충전하실 금액을 입력해 주세요</p>
        <h3 className="text-2xl font-bold">{chargeAmount.toLocaleString()}원</h3>
        <input
          type="text"
          id="chargeAmount"
          value={chargeAmount}
          onChange={handleAmountChange}
          className="border border-solid border-Gray-2 p-3 rounded-[10px] mt-4"
        />
        <button className="btn-blue mt-8" onClick={() => setConfirm(() => true)}>
          결제하기
        </button>
        <button className="mt-8 self-center text-Red-2" onClick={() => navigate("/profile")}>
          취소
        </button>
      </Modal>
    </>
  );
};

export default SelectAmount;
