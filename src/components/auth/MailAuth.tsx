import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../common/Modal";
import { getAuthEmail, postEmailResend } from "@/services/auth-api";

const MailAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const handleClick = async () => {
    if (email && code) {
      try {
        const response = await getAuthEmail(email, code);
        if (response.status === 400) {
          postEmailResend(email);
        } else {
          navigate("/login");
        }
      } catch (error) {
        alert("이메일 인증에 실패하였습니다.");
        navigate("/");
      }
    }
  };

  return (
    <Modal>
      <div className="flex flex-col justify-center items-center">
        이메일 인증을 위해 확인 버튼을 눌러주세요
        <button onClick={() => handleClick()} className="btn-blue mt-4 w-10">
          확인
        </button>
      </div>
    </Modal>
  );
};

export default MailAuth;
