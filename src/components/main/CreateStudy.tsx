import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudyStore } from "../../store/study-store";
import { koreanRegions } from "../common/KoreanRegions";
import moment from "moment";
import { postStudyChannel } from "../../services/channel-api";
import { PENALTY_SYSTEM } from "../../constants/penalty-system-info";
import { useSelectedDateStore } from "@/store/schedule-store";

const CreateStudy: React.FC = () => {
  const study = useStudyStore();
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();
  const { selectedDate } = useSelectedDateStore();

  useEffect(() => {
    return study.resetForm();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!study.name) {
      alert("스터디 이름을 작성해주세요");
      return;
    }
    if (!study.description) {
      alert("스터디 소개글을 작성해주세요");
      return;
    }
    if (!study.category) {
      alert("스터디의 카테고리를 선택해주세요");
      return;
    }
    if (study.meetingType === "OFFLINE" && !study.region) {
      alert("스터디모임이 주로 모임을 가질 지역을 선택해주세요");
      return;
    }
    if (!study.startDate) {
      alert("스터디의 시작 날짜를 선택해주세요");
      return;
    }
    if (!study.endDate) {
      alert("스터디의 종료 날짜를 선택해주세요");
      return;
    }
    if (!study.endDate) {
      alert("스터디의 종료 날짜를 선택해주세요");
      return;
    }
    if (!moment(study.startDate).isBefore(study.endDate)) {
      alert("스터디 종료 날짜는 반드시 시작 날짜보다 이후로 설정해야 합니다.");
      return;
    }
    if (study.minRecruitmentNumber < 3) {
      alert("스터디의 최소인원은 3명입니다.");
      return;
    }
    if (study.deposit < 10000 || study.deposit > 50000) {
      alert("스터디 예치금 허용 범위는 10,000원 ~ 50,000원 입니다.");
      return;
    }

    try {
      const response = await postStudyChannel(study);
      console.log("Study created:", response.studyChannelId);
      alert("스터디 채널 생성이 완료되었습니다.");
      study.resetForm();
      if (response) {
        navigate(`/channel/${response.studyChannelId}/schedule/${selectedDate}`);
      }
    } catch (error) {
      console.error("Failed to create study:", error);
      alert(
        "스터디 채널 생성에 실패하였습니다. 문제가 반복될 경우 studybadge04@gmail.com 해당 주소로 문의 메일을 보내주시면 감사하겠습니다.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 my-20">
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-6">스터디 생성하기</h2>
      <p className="text-Red-2 text-sm mb-16 text-center">* 항목은 필수 기재 및 선택 항목입니다.</p>
      <div className="mb-4">
        <label className="block mb-2 text-Blue-2">스터디명 *</label>
        <input
          type="text"
          value={study.name}
          onChange={(e) => study.setField("name", e.target.value)}
          className="input"
          maxLength={30}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-Blue-2">소개 *</label>
        <textarea
          value={study.description}
          onChange={(e) => study.setField("description", e.target.value)}
          className="w-full border border-solid border-Gray-2 rounded-[10px] px-3 py-2 resize-none mb-8"
          rows={5}
          cols={30}
          maxLength={1000}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-Blue-2">스터디 카테고리 *</label>
        <select
          value={study.category}
          onChange={(e) => study.setField("category", e.target.value)}
          className="w-48 p-1 border border-solid border-Gray-2 rounded-[10px] mt-2 mb-8"
          required
        >
          <option value="">선택해주세요</option>
          <option value="IT">컴퓨터/IT/개발</option>
          <option value="LANGUAGE">언어/어학</option>
          <option value="EMPLOYMENT">취업/이직</option>
          <option value="SELF_SELF_DEVELOPMENT">자기계발</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-Blue-2">진행 방식 *</label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="meetingType"
              value="OFFLINE"
              checked={study.meetingType === "OFFLINE"}
              onChange={(e) => study.setField("meetingType", e.target.value)}
              className="mr-2"
            />
            오프라인
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="meetingType"
              value="ONLINE"
              checked={study.meetingType === "ONLINE"}
              onChange={(e) => study.setField("meetingType", e.target.value)}
              className="mr-2"
            />
            온라인
          </label>
        </div>
      </div>

      {study.meetingType === "OFFLINE" && (
        <div className="mb-4">
          <label className="block mb-2 text-Blue-2">지역 *</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-1 border border-solid border-Gray-2 rounded-[10px]"
            required
          >
            <option value="">시/도 선택</option>
            {koreanRegions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
          {selectedRegion && (
            <select
              value={study.region}
              onChange={(e) => study.setField("region", e.target.value)}
              className="w-full p-1 border border-solid border-Gray-2 rounded-[10px] mt-2"
              required
            >
              <option value="">구/군 선택</option>
              {koreanRegions
                .find((region) => region.name === selectedRegion)
                ?.districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          )}
        </div>
      )}

      <div className="mb-14 flex gap-4">
        <div>
          <label className="block mb-2 text-Blue-2">시작 *</label>
          <input
            type="date"
            value={study.startDate}
            onChange={(e) => study.setField("startDate", e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-Blue-2">종료 *</label>
          <input
            type="date"
            value={study.endDate}
            onChange={(e) => study.setField("endDate", e.target.value)}
            className="input"
            required
          />
        </div>
      </div>

      <div className="mb-14">
        <label className="block mb-2 text-Blue-2">인원 *</label>
        <div className="flex items-center">
          <span className="mr-2 text-Blue-2">모집인원</span>
          <input
            type="number"
            value={study.minRecruitmentNumber}
            onChange={(e) => study.setField("minRecruitmentNumber", Math.max(3, parseInt(e.target.value)))}
            className="input w-24"
            min="3"
            required
          />
          <span className="ml-2">명</span>
        </div>
        <p className="text-Gray-3 text-sm mt-1">
          최소인원은 스터디장 포함 3명입니다. 모집인원을 3명 이상으로 설정해주세요.
        </p>
      </div>

      <div className="mb-14">
        <label className="block mb-2 text-Blue-2">예치금 *</label>
        <div className="flex items-center">
          <input
            type="number"
            value={study.deposit}
            onChange={(e) => study.setField("deposit", parseInt(e.target.value))}
            className="input w-40"
            min="10000"
            max="50000"
            step="1000"
            required
          />
          <span className="ml-2">원</span>
        </div>
        <p className="text-Gray-3 text-sm mt-1">예치금은 10,000원 ~ 50,000원 사이로 설정 가능합니다.</p>
      </div>

      <div className="mb-16">
        <label className="block mb-2 text-Blue-2">소통 링크</label>
        <input
          type="text"
          value={study.chattingUrl}
          onChange={(e) => study.setField("chattingUrl", e.target.value)}
          className="input"
          placeholder="스터디 내 소통을 위한 카카오톡 오픈채팅 링크를 입력해주세요."
        />
      </div>

      <div className="mb-8">
        <label className="block mb-3 text-lg font-semibold text-Blue-2">벌금/보상 시스템 안내</label>
        <textarea
          className="w-full h-60 border border-solid border-Gray-2 rounded-[10px] px-3 py-2 text-sm resize-none mb-8 custom-scroll"
          value={PENALTY_SYSTEM}
          readOnly
        />
      </div>

      <div className="flex justify-between mt-8">
        <button type="button" className="px-4 py-2 text-Red-2 rounded" onClick={() => navigate("/")}>
          취소
        </button>
        <button type="submit" className="px-4 py-2 btn-blue text-white" onClick={(e) => handleSubmit(e)}>
          스터디 생성
        </button>
      </div>
    </form>
  );
};

export default CreateStudy;
