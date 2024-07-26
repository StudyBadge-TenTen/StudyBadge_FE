import { usePasswordResetStore } from "@/store/auth-store";
import { getCodeVerification, patchResetPassword } from "@/services/auth-api";
import { useLocation } from "react-router";

const EmailCodeAuth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");
  const {
    email,
    newPassword,
    confirmPassword,
    verificationCode,
    showNewPasswordForm,
    error,
    setNewPassword,
    setConfirmPassword,
    setVerificationCode,
    setShowNewPasswordForm,
  } = usePasswordResetStore();

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getCodeVerification(userEmail ?? email, verificationCode);
      if (response.status === 200) {
        setShowNewPasswordForm(true);
      } else {
        alert(response.data.message || "인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      alert(
        "오류가 발생했습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await patchResetPassword(userEmail ?? email, newPassword);
      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        window.location.href = "/login";
      } else {
        alert(response.data.message || "비밀번호 재설정에 실패했습니다.");
      }
    } catch (error) {
      alert(
        "비밀번호 재설정에 실패하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
      alert("오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-[50px] shadow-card p-20">
        {!showNewPasswordForm ? (
          <div>
            <h2 className="text-2xl font-bold text-Blue-2 mb-4 text-center">인증 코드 확인</h2>
            <form onSubmit={verifyCode} className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-Blue-2 text-sm font-bold mb-2">
                  인증 코드:
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="input"
                />
              </div>
              <button
                type="submit"
                className="btn-blue bg-blue-500 hover:btn-blue bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline mt-4"
              >
                인증 코드 확인
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-Blue-2 mb-4 text-center">새 비밀번호 설정</h2>
            <form onSubmit={resetPassword} className="flex flex-col">
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-Blue-2 text-sm font-bold mb-2">
                  새 비밀번호:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-Blue-2 text-sm font-bold mb-2">
                  새 비밀번호 확인:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                />
              </div>
              <button
                type="submit"
                className="btn-blue bg-blue-500 hover:btn-blue bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline mt-4"
              >
                비밀번호 변경
              </button>
            </form>
          </div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default EmailCodeAuth;
