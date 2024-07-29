import { AxiosResponse } from "axios";
import {
  AttendanceResponseType,
  MemberListResponseType,
  postStudyRequestType,
  RecruitmentInfoType,
  StudyInfoPutRequestType,
  StudyInfoType,
} from "../types/study-channel-type";
import { fetchCall } from "./common";

const getIsMember = async (studyChannelId: number) => {
  const response = await fetchCall<boolean>(`/api/study-channels/${studyChannelId}/check`, "get");

  return response ?? false;
};

const postStudyChannel = async (requestBody: postStudyRequestType) => {
  const response = await fetchCall<{ studyChannelId: number }>(`/api/study-channels`, "post", requestBody);
  return response;
};

const getStudyInfo = async (studyChannelId: number) => {
  const studyInfoResponse = await fetchCall<StudyInfoType>(`/api/study-channels/${studyChannelId}`, "get");
  return studyInfoResponse;
};

const putStudyInfo = async (studyChannelId: number, newStudyInfo: StudyInfoPutRequestType) => {
  try {
    await fetchCall<AxiosResponse>(`/api/study-channels/${studyChannelId}`, "put", newStudyInfo);
    alert("변경한 스터디 정보가 성공적으로 반영되었습니다.");
  } catch (error) {
    console.log(error);
    alert(
      "스터디 정보 변경에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const getMemberList = async (studyChannelId: number) => {
  const memberList = await fetchCall<MemberListResponseType>(`/api/study-channels/${studyChannelId}/members`, "get");
  return memberList ?? [];
};

const postSubLeader = async (studyChannelId: number, requestBody: { studyMemberId: number }) => {
  try {
    await fetchCall<AxiosResponse>(`/api/study-channels/${studyChannelId}/members/assign-role`, "post", requestBody);
  } catch (error) {
    console.log(error);
  }
};

const getAttendance = async (studyChannelId: number) => {
  const attendance = await fetchCall<AttendanceResponseType[]>(
    `/api/study-channels/${studyChannelId}/attendances`,
    "get",
  );
  return attendance ?? [];
};

const getRecruitment = async (studyChannelId: number) => {
  const recruitList = await fetchCall<RecruitmentInfoType>(
    `/api/study-channels/${studyChannelId}/participation-status`,
    "get",
  );
  return recruitList ?? [];
};

const postApprove = async (studyChannelId: number, participationId: number) => {
  try {
    await fetchCall<ResponseType>(
      `/api/study-channels/${studyChannelId}/participation/${participationId}/approve`,
      "post",
    );
    alert("해당 멤버의 신청 수락이 성공적으로 완료되었습니다.");
  } catch (error) {
    console.log(error);
    alert(
      "해당 멤버의 신청을 수락하는 것에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const postReject = async (studyChannelId: number, participationId: number) => {
  try {
    await fetchCall<AxiosResponse>(
      `/api/study-channels/${studyChannelId}/participation/${participationId}/reject`,
      "post",
    );
    alert("해당 멤버의 신청 거절이 성공적으로 완료되었습니다.");
  } catch (error) {
    console.log(error);
    alert(
      "해당 멤버의 신청을 거절하는 것에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const postParticipate = async (studyChannelId: number) => {
  try {
    await fetchCall<AxiosResponse>(`/api/study-channels/${studyChannelId}/participation`, "post");
    alert("해당 스터디에 성공적으로 신청이 접수되었습니다");
  } catch (error) {
    console.log(error);
    alert(
      "해당 스터디에 신청을 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

const postBanish = async (studyChannelId: number, studyMemberId: number) => {
  try {
    await fetchCall(`/api/study-channels/${studyChannelId}/members/${studyMemberId}/ban`, "post");
    alert("해당 멤버가 퇴출되었습니다.");
  } catch (error) {
    console.log(error);
    alert(
      "해당 멤버의 퇴출에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
    );
  }
};

// 화면에서 환급금 보여줄 때 요청할 api
const endStudyRefunds = () => {};

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
  endStudyRefunds,
};
