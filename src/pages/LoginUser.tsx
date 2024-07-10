import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import NaverLogin from "../components/login/NaverLogin";
import KakaoLogin from "../components/login/KakaoLogin";

// Zustand store 정의
interface LoginStore {
  email: string;
  password: string;
  setField: (field: "email" | "password", value: string) => void;
  reset: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  email: '',
  password: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({ email: '', password: '' }),
}));

// 가상의 로그인 함수 (실제로는 백엔드 API를 호출해야 합니다)
const checkCredentials = async (email: string, password: string): Promise<boolean> => {
  // 여기서 실제로 백엔드 API를 호출하여 이메일과 비밀번호를 확인해야 합니다
  // 이 예제에서는 간단히 true를 반환합니다
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // 실제로는 서버 응답에 따라 true 또는 false를 반환해야 합니다
    }, 1000); // 서버 응답을 시뮬레이트하기 위한 지연
  });
};

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const { email, password, setField, reset } = useLoginStore();

  const moveSignUpPage = () => {
    navigate('/SignUp');  // 회원가입 페이지 경로
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as "email" | "password", e.target.value);
  };

  const submitLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }
    
    try {
      const isValid = await checkCredentials(email, password);
      if (isValid) {
        console.log("로그인 성공");
        reset();
        navigate('/');
      } else {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5">
      <h1 className="text-3xl font-bold mb-12">LOGIN</h1>
      <form className="w-full flex flex-col justify-center items-center" onSubmit={submitLogin}>
        <div className="sm:w-96 flex justify-between items-center my-2">
          <label className="w-16">이메일</label>
          <input
            type="email"
            name="email"
            className="w-40 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-slate-400 placeholder:text-xs indent-2.5 py-1"
            placeholder="example@example.com"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="sm:w-96 flex justify-between items-center mb-2">
          <label className="w-16">비밀번호</label>
          <input
            type="password"
            name="password"
            className="w-40 sm:w-56 border-solid border-2 border-gray-200 rounded sm:ml-12 placeholder:text-xs indent-2.5 py-1"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full max-w-80 bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-all"
        >
          LOGIN
        </button>
      </form>
      <NaverLogin />
      <KakaoLogin />
      <div className="flex justify-between items-center w-full max-w-80 mb-12">
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
          onClick={moveSignUpPage}
        >
          회원가입
        </button>
        <button
          type="button"
          className="border-solid border-2 border-gray-200 rounded px-4 py-1 mt-12 hover:bg-gray-200 transition-all"
          onClick={() => navigate("/PasswordReset")}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default LoginUser;