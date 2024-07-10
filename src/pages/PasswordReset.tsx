import React from 'react';
import { create } from 'zustand';

interface PasswordResetStore {
  email: string;
  newPassword: string;
  confirmPassword: string;
  verificationCode: string;
  showVerificationForm: boolean;
  showNewPasswordForm: boolean;
  error: string;
  setEmail: (email: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setVerificationCode: (code: string) => void;
  setShowVerificationForm: (show: boolean) => void;
  setShowNewPasswordForm: (show: boolean) => void;
  setError: (error: string) => void;
}

const usePasswordResetStore = create<PasswordResetStore>((set) => ({
  email: '',
  newPassword: '',
  confirmPassword: '',
  verificationCode: '',
  showVerificationForm: false,
  showNewPasswordForm: false,
  error: '',
  setEmail: (email) => set({ email }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setVerificationCode: (verificationCode) => set({ verificationCode }),
  setShowVerificationForm: (showVerificationForm) => set({ showVerificationForm }),
  setShowNewPasswordForm: (showNewPasswordForm) => set({ showNewPasswordForm }),
  setError: (error) => set({ error }),
}));

const PasswordReset: React.FC = () => {
  const { 
    email, 
    newPassword,
    confirmPassword,
    verificationCode, 
    showVerificationForm,
    showNewPasswordForm,
    error, 
    setEmail, 
    setNewPassword,
    setConfirmPassword,
    setVerificationCode,
    setShowVerificationForm,
    setShowNewPasswordForm,
    setError 
  } = usePasswordResetStore();

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setShowVerificationForm(true);
        setError('');
      } else {
        setError(data.message || '인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode }),
      });
      const data = await response.json();
      if (data.success) {
        setShowNewPasswordForm(true);
        setError('');
      } else {
        setError(data.message || '인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, verificationCode }),
      });
      const data = await response.json();
      if (data.success) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.href = '/login';
      } else {
        setError(data.message || '비밀번호 재설정에 실패했습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {!showVerificationForm && !showNewPasswordForm ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">비밀번호 초기화</h2>
            <form onSubmit={sendVerificationCode}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  이메일:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                인증 코드 전송
              </button>
            </form>
          </div>
        ) : showVerificationForm && !showNewPasswordForm ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">인증 코드 확인</h2>
            <form onSubmit={verifyCode}>
              <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-gray-700 text-sm font-bold mb-2">
                  인증 코드:
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                인증 코드 확인
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">새 비밀번호 설정</h2>
            <form onSubmit={resetPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                  새 비밀번호:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                  새 비밀번호 확인:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default PasswordReset;