import React, { useState } from "react";
import { useAuthStore } from "../../../store/auth-store";

const SignUp: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const store = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!store.email) newErrors.email = "이메일을 입력해주세요.";
    if (!store.name) newErrors.name = "이름을 입력해주세요.";
    if (!store.nickname) newErrors.nickname = "닉네임을 입력해주세요.";
    if (!store.bankName) newErrors.bankName = "은행 이름을 입력해주세요.";
    if (!store.account) newErrors.account = "계좌번호를 입력해주세요.";
    if (!store.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (store.password !== store.checkPassword) newErrors.checkPassword = "비밀번호가 일치하지 않습니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await store.signUp();
      setIsSubmitted(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const renderInput = (
    label: string,
    name: keyof Omit<typeof store, "setField" | "resetForm" | "login" | "signUp">,
    type: string,
    placeholder: string,
  ) => (
    <div className="w-full sm:w-96 flex justify-between items-center mb-2">
      <label className="text-Blue-2">{label}</label>
      <input
        type={type}
        name={name}
        className="input w-44 sm:w-56 sm:ml-12 placeholder:text-slate-400 placeholder:text-xs"
        placeholder={placeholder}
        value={store[name] as string}
        onChange={(e) => store.setField(name, e.target.value)}
      />
      {errors[name] && <span className="text-red-500 text-xs">{errors[name]}</span>}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5">
        <h2 className="text-2xl font-bold mb-4">회원가입 신청 완료</h2>
        <p>이메일을 통해 인증을 완료해주세요. 인증 링크가 포함된 이메일을 발송했습니다.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5" onSubmit={handleSubmit}>
      <h1 className="text-3xl text-Blue-2 font-bold mb-12">회원가입</h1>
      {renderInput("이메일", "email", "email", "example@example.com")}
      {renderInput("이름", "name", "text", "이름을 입력해주세요")}
      {renderInput("닉네임", "nickname", "text", "닉네임을 입력해주세요")}
      {renderInput("소개", "introduction", "text", "소개를 입력해주세요")}
      {renderInput("은행 이름", "bankName", "text", "은행 이름을 입력해주세요")}
      {renderInput("계좌번호", "account", "text", "계좌번호를 입력해주세요")}
      {renderInput("비밀번호", "password", "password", "(영문,특수문자 포함 6~12자리)")}
      {renderInput("비밀번호 확인", "checkPassword", "password", "비밀번호를 한 번 더 입력해주세요")}
      <button type="submit" className="btn-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
        회원가입
      </button>
    </form>
  );
};

export default SignUp;