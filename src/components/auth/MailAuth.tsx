import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../common/Modal";
import { getAuthEmail, postEmailResend } from "@/services/auth-api";
import axios from "axios";
import { CustomErrorType } from "@/types/common";
import { useState } from "react";

const MailAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    if (email && code) {
      try {
        const response = await getAuthEmail(email, code);
        if (axios.isAxiosError(response)) {
          const error = response.response?.data as CustomErrorType;
          alert(error.message + "재전송된 이메일을 확인해주세요.");
          postEmailResend(email);
        } else {
          setSuccess(() => true);
        }
      } catch (error) {
        alert("이메일 인증에 실패하였습니다.");
        navigate("/");
      }
    }
  };

  return (
    <>
      {!success ? (
        <Modal>
          <div className="flex flex-col justify-center items-center">
            이메일 인증을 위해 확인 버튼을 눌러주세요
            <button onClick={() => handleClick()} className="btn-blue mt-4 w-10">
              확인
            </button>
          </div>
        </Modal>
      ) : (
        <Modal>
          <div className="flex flex-col justify-center items-center">
            이메일 인증에 성공하였습니다
            <button
              onClick={() => {
                setSuccess(() => false);
                navigate("/login");
              }}
              className="btn-blue mt-4"
            >
              로그인 하러가기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MailAuth;
