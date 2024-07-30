import { usePasswordResetStore } from "../../store/auth-store";
import { postVerificationEmail } from "@/services/auth-api";
import { useLocation } from "react-router-dom";
import PageScrollTop from "../common/PageScrollTop";
import { CustomErrorType } from "@/types/common";
import axios from "axios";

const PasswordReset: React.FC = () => {
  const { email, setEmail } = usePasswordResetStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postVerificationEmail(email ?? userEmail);
      console.log(response);
      if (axios.isAxiosError(response)) {
        const error = response.response?.data as CustomErrorType;
        alert(error.message);
      } else {
        alert("이메일로 인증 코드가 발송되었습니다. 확인부탁드립니다.");
      }
    } catch (error: any) {
      if (error) alert("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <PageScrollTop />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-[50px] shadow-card p-20 py-24">
          <div>
            <h2 className="text-2xl font-bold text-Blue-2 mb-4 text-center">비밀번호 초기화</h2>
            <form onSubmit={sendVerificationCode} className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="email" className="block text-Blue-2 text-sm font-bold mb-2">
                  이메일:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <button
                type="submit"
                className="btn-blue bg-blue-500 hover:btn-blue bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline mt-4"
              >
                인증 코드 전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
