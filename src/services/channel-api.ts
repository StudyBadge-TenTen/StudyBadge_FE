import axios, { AxiosError, AxiosResponse } from "axios";
import {
  AttendanceResponseType,
  MemberListResponseType,
  postStudyRequestType,
  RecruitmentInfoType,
  StudyInfoPutRequestType,
  StudyInfoType,
} from "../types/study-channel-type";
import { fetchCall } from "./common";
import { CustomErrorType } from "@/types/common";

const getIsMember = async (studyChannelId: number) => {
  try {
    const response = await fetchCall<boolean>(`/api/study-channels/${studyChannelId}/check`, "get");
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
      return false;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const postStudyChannel = async (requestBody: postStudyRequestType) => {
  const response = await fetchCall<{ studyChannelId: number } | AxiosError>(`/api/study-channels`, "post", requestBody);
  return response;
};

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType | AxiosError>(`/api/study-channels/${studyChannelId}`, "get");
  if (axios.isAxiosError(studyInfoResponse)) {
    const error = studyInfoResponse.response?.data as CustomErrorType;
    alert(error.message);
    throw new Error();
  } else {
    return studyInfoResponse;
  }
};

const putStudyInfo = async (studyChannelId: number, newStudyInfo: StudyInfoPutRequestType) => {
  try {
    console.log("스터디 수정 데이터 전송 시도", studyChannelId, newStudyInfo);
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}`,
      "put",
      newStudyInfo,
    );
    console.log("스터디 수정 데이터 전송 완료");

    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
      throw new Error();
    } else {
      alert("변경한 스터디 정보가 성공적으로 반영되었습니다.");
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const customError = error.response?.data as CustomErrorType;
      alert(customError.message);
    } else {
      alert(
        "스터디 정보 변경에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  }
};

const getMemberList = async (studyChannelId: number) => {
  const memberList = await fetchCall<MemberListResponseType | AxiosError>(
    `/api/study-channels/${studyChannelId}/members`,
    "get",
  );
  if (axios.isAxiosError(memberList)) {
    const error = memberList.response?.data as CustomErrorType;
    console.log(error);
    return { studyMembers: [], leader: false };
  } else {
    return memberList ?? {};
  }
};

const postSubLeader = async (studyChannelId: number, requestBody: { studyMemberId: number }) => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/members/assign-role`,
      "post",
      requestBody,
    );
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAttendance = async (studyChannelId: number) => {
  const attendance = await fetchCall<AttendanceResponseType[] | AxiosError>(
    `/api/study-channels/${studyChannelId}/attendances`,
    "get",
  );
  if (axios.isAxiosError(attendance)) {
    const error = attendance.response?.data as CustomErrorType;
    console.log(error);
    return [];
  } else {
    return attendance ?? [];
  }
};

const getRecruitment = async (studyChannelId: number) => {
  const recruitList = await fetchCall<RecruitmentInfoType | AxiosError>(
    `/api/study-channels/${studyChannelId}/participation-status`,
    "get",
  );
  console.log(recruitList);
  if (axios.isAxiosError(recruitList)) {
    const error = recruitList.response?.data as CustomErrorType;
    console.log(error);
  } else {
    return recruitList ?? {};
  }
};

const postApprove = async (studyChannelId: number, participationId: number) => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/participation/${participationId}/approve`,
      "post",
    );
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("해당 멤버의 신청 수락이 성공적으로 완료되었습니다.");
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const customError = error.response?.data as CustomErrorType;
      alert(customError.message);
    } else {
      alert(
        "해당 멤버의 신청을 수락하는 것에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  }
};

const postReject = async (studyChannelId: number, participationId: number) => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/participation/${participationId}/reject`,
      "post",
    );
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("해당 멤버의 신청 거절이 성공적으로 완료되었습니다.");
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const customError = error.response?.data as CustomErrorType;
      alert(customError.message);
    } else {
      alert(
        "해당 멤버의 신청을 거절하는 것에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  }
};

const postParticipate = async (studyChannelId: number) => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/participation`,
      "post",
    );
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("해당 스터디에 성공적으로 신청이 접수되었습니다");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseError = error.response?.data as CustomErrorType;
      alert(responseError.message);
    } else {
      console.log(error);
      alert(
        "해당 스터디에 신청을 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다." +
          error,
      );
    }
  }
};

const postBanish = async (studyChannelId: number, studyMemberId: number) => {
  try {
    const response = await fetchCall<AxiosResponse | AxiosError>(
      `/api/study-channels/${studyChannelId}/members/${studyMemberId}/ban`,
      "post",
    );
    if (axios.isAxiosError(response)) {
      const error = response.response?.data as CustomErrorType;
      alert(error.message);
    } else {
      alert("해당 멤버가 퇴출되었습니다.");
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const customError = error.response?.data as CustomErrorType;
      alert(customError.message);
    } else {
      alert(
        "해당 멤버의 퇴출에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  }
};

const postRecruitStart = async (studyChannelId: number) => {
  const response = await fetchCall<AxiosResponse | AxiosError>(
    `/api/study-channels/${studyChannelId}/recruitment/start`,
    "post",
  );
  if (axios.isAxiosError(response)) {
    const error = response.response?.data as CustomErrorType;
    alert(error.message);
  } else {
    alert("스터디 채널 모집을 오픈했습니다.");
  }
  return response;
};

const postRecruitEnd = async (studyChannelId: number) => {
  const response = await fetchCall(`/api/study-channels/${studyChannelId}/recruitment/close`, "post");
  if (axios.isAxiosError(response)) {
    const error = response.response?.data as CustomErrorType;
    alert(error.message);
  } else {
    alert("스터디 채널 모집을 마감했습니다.");
  }
  return response;
};

export {
  getIsMember,
  postStudyChannel,
  getStudyInfo,
  putStudyInfo,
  getMemberList,
  postSubLeader,
  getAttendance,
  getRecruitment,
  postReject,
  postApprove,
  postParticipate,
  postBanish,
  postRecruitStart,
  postRecruitEnd,
};
