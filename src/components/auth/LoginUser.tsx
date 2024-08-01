import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import { useAuthStore } from "../../store/auth-store";
import PageScrollTop from "../common/PageScrollTop";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const { email, password, setField, login, reset } = useAuthStore();

  const moveSignUpPage = () => {
    navigate("/SignUp");
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
      await login(email, password);
      // console.log("로그인 성공");
      reset();
      navigate("/");
      // window.location.reload();
    } catch (error) {
      // console.error("로그인 실패:", error);
      console.log(error);
    }
  };

  return (
    <>
      <PageScrollTop />
      <div className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5">
        <h1 className="text-3xl text-Blue-2 font-bold mb-12">LOGIN</h1>
        <form className="w-full flex flex-col justify-center items-center mb-10" onSubmit={submitLogin}>
          <div className="sm:w-96 flex justify-between items-center my-2">
            <label className="w-16 text-Blue-2">이메일</label>
            <input
              type="email"
              name="email"
              className="input w-40 sm:w-56 sm:ml-12 placeholder:text-slate-400 placeholder:text-xs"
              placeholder="example@example.com"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="sm:w-96 flex justify-between items-center mb-2">
            <label className="w-16 text-Blue-2">비밀번호</label>
            <input
              type="password"
              name="password"
              className="input w-40 sm:w-56 sm:ml-12 placeholder:text-xs"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-[183px] md:w-[300px] btn-blue text-white py-2 mt-6 hover:bg-blue-600 transition-all"
          >
            LOGIN
          </button>
        </form>
        <NaverLogin />
        <KakaoLogin />
        <div className="flex justify-between items-center w-full max-w-80 mb-12">
          <button type="button" className="btn-blue w-24 mt-12 transition-all" onClick={moveSignUpPage}>
            회원가입
          </button>
          <button
            type="button"
            className="btn-blue w-24 mt-12 transition-all"
            onClick={() => navigate("/sendEmail_PasswordReset")}
          >
            비밀번호 재설정
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
