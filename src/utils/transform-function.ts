import { ParticipationStatusType } from "@/types/profile-type";
import { AuthStoreType } from "../types/auth-type";
import { StudyCategoryType } from "@/types/study-channel-type";

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

const ParticipateEnToKr = (participateState: ParticipationStatusType) => {
  let result;
  switch (participateState) {
    case "APPROVED":
      result = "수락";
      break;
    case "APPROVE_WAITING":
      result = "대기중";
      break;
    case "CANCELED":
      result = "신청취소";
      break;
    case "REJECTED":
      result = "거절";
      break;
  }
  return result;
};

const stateToColorClassName = (participateState: ParticipationStatusType) => {
  let result;
  switch (participateState) {
    case "APPROVED":
      result = "text-Green-1";
      break;
    case "APPROVE_WAITING":
      result = "text-Gray-3";
      break;
    case "CANCELED":
      result = "text-Gray-3";
      break;
    case "REJECTED":
      result = "text-Red-2";
      break;
  }
  return result;
};

const categoryEnToKr = (category: StudyCategoryType) => {
  let result;
  switch (category) {
    case "IT":
      result = "컴퓨터/IT/개발";
      break;
    case "LANGUAGE":
      result = "언어/어학";
      break;
    case "EMPLOYMENT":
      result = "취업/이직";
      break;
    case "SELF_DEVELOPMENT":
      result = "자기계발";
      break;
  }
  return result;
};

export { nameToType, returnPlaceholder, nameToField, ParticipateEnToKr, stateToColorClassName, categoryEnToKr };
