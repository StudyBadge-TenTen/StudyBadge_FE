import { AuthStoreType } from "../types/auth-type";

const nameToType = (formName: string) => {
  let name;
  switch (formName) {
    case "이메일":
      name = "email";
      break;
    case "비밀번호":
      name = "password";
      break;
    case "비밀번호확인":
      name = "password";
      break;
    default:
      name = "text";
      break;
  }
  return name;
};

const returnPlaceholder = (formName: string) => {
  let placeholder;
  switch (formName) {
    case "이메일":
      placeholder = "studybadge09@email.com";
      break;
    case "이름":
      placeholder = "이름을 입력해주세요";
      break;
    case "소개":
      placeholder = "소개글을 입력해주세요";
      break;
    case "닉네임":
      placeholder = "닉네임을 입력해주세요";
      break;
    case "계좌번호":
      placeholder = "계좌번호를 입력해주세요 (숫자만 입력)";
      break;
    case "비밀번호":
      placeholder = "(영문,특수문자 포함 6~12자리)";
      break;
    case "비밀번호확인":
      placeholder = "비밀번호를 한 번 더 입력해주세요";
      break;
  }
  return placeholder;
};

const nameToField = (formName: string) => {
  let fieldName: keyof Omit<AuthStoreType, "setField" | "resetForm" | "login" | "signUp"> = "introduction";
  switch (formName) {
    case "이메일":
      fieldName = "email";
      break;
    case "이름":
      fieldName = "name";
      break;
    case "소개":
      fieldName = "introduction";
      break;
    case "닉네임":
      fieldName = "nickname";
      break;
    case "금융기관":
      fieldName = "accountBank";
      break;
    case "계좌번호":
      fieldName = "account";
      break;
    case "비밀번호":
      fieldName = "password";
      break;
    case "비밀번호확인":
      fieldName = "checkPassword";
      break;
  }
  return fieldName;
};

export { nameToType, returnPlaceholder, nameToField };
