import React, { useState } from "react";
import { create } from "zustand";
import axios from 'axios';

interface SignUpStore {
  email: string;
  name: string;
  nickname: string;
  introduction: string;
  account: string;
  password: string;
  checkPassword: string;
  isEmailVerified: boolean;
  setField: (field: string, value: string | boolean) => void;
  resetForm: () => void;
}

const useSignUpStore = create<SignUpStore>((set) => ({
  email: '',
  name: '',
  nickname: '',
  introduction: '',
  account: '',
  password: '',
  checkPassword: '',
  isEmailVerified: false,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  resetForm: () => set({
    email: '',
    name: '',
    nickname: '',
    introduction: '',
    account: '',
    password: '',
    checkPassword: '',
    isEmailVerified: false,
  }),
}));

const SignUpUser: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEmailSent, setIsEmailSent] = useState(false);
  const store = useSignUpStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!store.email) newErrors.email = "이메일을 입력해주세요.";
    if (!store.isEmailVerified) newErrors.email = "이메일 인증을 완료해주세요.";
    if (!store.name) newErrors.name = "이름을 입력해주세요.";
    if (!store.nickname) newErrors.nickname = "닉네임을 입력해주세요.";
    if (!store.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (store.password !== store.checkPassword) newErrors.checkPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('/api/signup', store);
      console.log('회원가입 성공:', response.data);
      store.resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('회원가입 실패:', error.response?.data);
      } else {
        console.error('회원가입 오류:', error);
      }
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post('/api/send-verification-email', { email: store.email });
      setIsEmailSent(true);
      alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('인증 이메일 전송 실패:', error.response?.data);
      } else {
        console.error('인증 이메일 전송 오류:', error);
      }
    }
  };

  const renderInput = (label: string, name: keyof SignUpStore, type: string, placeholder: string) => (
    <div className="w-full sm:w-96 flex justify-between items-center mb-2">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        className="w-44 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
        placeholder={placeholder}
        value={store[name] as string}
        onChange={(e) => store.setField(name, e.target.value)}
        disabled={name === 'email' && isEmailSent}
      />
      {errors[name] && <span className="text-red-500 text-xs">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-12">회원가입</h1>
      <div className="w-full sm:w-96 flex justify-between items-center mb-2">
        {renderInput("이메일", "email", "email", "example@example.com")}
        <button
          type="button"
          className="btn-blue bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleSendVerificationEmail}
          disabled={isEmailSent || store.isEmailVerified}
        >
          {store.isEmailVerified ? "인증 완료" : (isEmailSent ? "재전송" : "인증 메일 전송")}
        </button>
      </div>
      {renderInput("이름", "name", "text", "이름을 입력해주세요")}
      {renderInput("닉네임", "nickname", "text", "닉네임을 입력해주세요")}
      {renderInput("소개", "introduction", "text", "소개를 입력해주세요")}
      {renderInput("계좌", "account", "text", "계좌번호를 입력해주세요")}
      {renderInput("비밀번호", "password", "password", "(영문,특수문자 포함 6~12자리)")}
      {renderInput("비밀번호 확인", "checkPassword", "password", "비밀번호를 한 번 더 입력해주세요")}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        disabled={!store.isEmailVerified}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpUser;