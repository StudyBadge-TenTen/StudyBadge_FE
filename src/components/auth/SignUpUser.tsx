import React, { useState } from "react";
import { useAuthStore } from "../../store/auth-store";
import { nameToField, nameToType, returnPlaceholder } from "../../utils/transform-function";
import { BANK_LIST } from "../../constants/bank-list";
import PageScrollTop from "../common/PageScrollTop";
import { CustomErrorType } from "@/types/common";

const SignUp: React.FC = () => {
  const formListFirst = ["이메일", "이름", "비밀번호", "비밀번호확인"];
  const formListSecond = ["계좌번호", "닉네임", "소개"];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const authStore = useAuthStore();

  // useEffect(() => {
  //   console.log(authStore);
  // }, [authStore]);

  const validateForm = (): boolean => {
    let result = true;
    if (!authStore.email) {
      alert("이메일 입력은 필수입니다.");
      result = false;
    } else if (!authStore.name) {
      alert("이름을 입력해주세요.");
      result = false;
    } else if (!authStore.nickname) {
      alert("닉네임을 입력해주세요.");
      result = false;
    } else if (!authStore.accountBank) {
      alert("금융기관을 선택해주세요.");
      result = false;
    } else if (!authStore.account) {
      alert("계좌번호 입력은 필수입니다.");
      result = false;
    } else if (!authStore.password) {
      alert("비밀번호 입력은 필수입니다.");
      result = false;
    } else if (authStore.password !== authStore.checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      result = false;
    }
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, formName: string) => {
    if (e.target.id === "계좌번호") {
      if (Number.isNaN(Number(e.target.value))) {
        authStore.setField("account", authStore.account);
        alert("숫자만 입력해주세요");
        return;
      }
    }
    authStore.setField(nameToField(formName), e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await authStore.signUp();
      console.log("signUp()호출 결과 : " + response); // 서버 응답 체크 로그
      if (!response) {
        alert("회원가입이 완료되었습니다.");
        authStore.reset();
        setIsSubmitted(true);
      } else {
        const error = response as CustomErrorType;
        if (error.errorCode === "ALREADY_EXIST_EMAIL") {
          alert("이미 가입되어 있는 이메일 계정입니다.");
        }
      }
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(
        "회원가입에 실패하였습니다. 나중에 다시 시도해 주세요. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5">
        <h2 className="text-2xl font-bold mb-4">회원가입 신청 완료</h2>
        <p>이메일을 통해 인증을 완료해주세요. 인증 링크가 포함된 이메일을 발송했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <PageScrollTop />
      <form className="flex flex-col justify-center items-center mt-24 mb-20 w-4/5" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-Blue-2 font-bold mb-12">회원가입</h1>
        <p className="mb-10 text-sm text-Red-2">* 항목은 필수 입력 항목입니다.</p>
        {formListFirst.map((formName) => (
          <div key={formName} className="w-full sm:w-96 flex justify-between items-center mb-6">
            <label className="text-Blue-2">
              {formName}
              <span>*</span>
            </label>
            <input
              type={nameToType(formName)}
              id={formName}
              name={formName}
              className="input w-44 sm:w-56 sm:ml-12 placeholder:text-slate-400 placeholder:text-xs"
              placeholder={returnPlaceholder(formName)}
              value={authStore[nameToField(formName)] as string}
              onChange={(e) => handleChange(e, formName)}
            />
          </div>
        ))}
        <select
          name="accountBank"
          id="accountBank"
          className="w-fit p-1 border border-solid border-Gray-2 rounded-[10px] mt-8 mb-2"
          value={authStore.accountBank}
          onChange={(e) => handleChange(e, "금융기관")}
        >
          <option value="">-- 금융기관을 선택해주세요 --</option>
          {BANK_LIST.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        {formListSecond.map((formName) => (
          <React.Fragment key={formName}>
            {formName === "계좌번호" && (
              <div className="w-full max-w-96 text-xs text-Gray-4 mb-2">계좌번호는 환급금 송금을 위한 항목입니다.</div>
            )}
            <div
              key={formName}
              className={`w-full sm:w-96 flex justify-between items-center ${formName === "계좌번호" ? "mb-14" : "mb-6"}`}
            >
              <label className="text-Blue-2">
                {formName}
                {formName !== "소개" && <span>*</span>}
              </label>
              <input
                type={nameToType(formName)}
                id={formName}
                name={formName}
                className={`input w-44 sm:w-56 sm:ml-12 placeholder:text-slate-400 placeholder:text-xs`}
                placeholder={returnPlaceholder(formName)}
                value={authStore[nameToField(formName)] as string}
                onChange={(e) => handleChange(e, formName)}
              />
            </div>
          </React.Fragment>
        ))}
        <button type="submit" className="btn-blue hover:bg-blue-700 text-white mt-10">
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
