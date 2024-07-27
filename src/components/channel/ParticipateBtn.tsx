import { useState } from "react";
import Modal from "../common/Modal";
import { postParticipate } from "@/services/channel-api";
import { useParams } from "react-router";
import { useApplicationList, useGetStudyInfo, useMemberList, useRecruitment } from "@/hooks/useQuery";
import { useAuthStore } from "@/store/auth-store";

const ParticipateBtn = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const { channelId } = useParams();
  const [modalOpen, setModalInfo] = useState(false);
  const { data } = useGetStudyInfo(Number(channelId));
  const recruitmentData = useRecruitment(Number(channelId), accessToken);
  const applicationData = useApplicationList(accessToken);
  const memberListData = useMemberList(Number(channelId), accessToken);

  const handleClick = async (isModal: boolean) => {
    if (!isModal) {
      setModalInfo(() => true);
      return;
    }
    if (isModal && channelId) {
      await postParticipate(Number(channelId));
      setModalInfo(() => false);
      return;
    }
  };

  // 유저 정보 조회시 멤버 id도 같이 넘겨줄 수 있는지
  if (!accessToken || memberListData.data?.leader) return <></>;

  if (applicationData.data && Array.isArray(applicationData.data)) {
    if (
      applicationData.data.find(
        (channel) => channel.studyChannelId === Number(channelId) && channel.participationStatus === "APPROVE_WAITING",
      )
    ) {
      return <div className="btn-blue px-6 py-4 bg-Gray-3 hover:bg-Gray-3">신청 대기중입니다.</div>;
    }
    if (
      applicationData.data.find(
        (channel) => channel.studyChannelId === Number(channelId) && channel.participationStatus === "APPROVED",
      )
    ) {
      return <div className="btn-blue px-6 py-4 bg-Gray-3 hover:bg-Gray-3">소속된 스터디입니다.</div>;
    }
  }

  if (recruitmentData.data && recruitmentData.data.recruitmentStatus === "RECRUITING") {
    return (
      <>
        <button onClick={() => handleClick(false)} className="btn-blue px-6 py-4">
          스터디 신청하기
        </button>
        {modalOpen && (
          <Modal>
            <p className="mb-4 self-center">해당 스터디에 참여를 신청하시겠습니까?</p>
            <div className="flex flex-col justify-center items-center mb-4">
              <span>스터디 이름 : {data?.studyChannelName}</span>
              <span>스터디 예치금 : {data?.deposit.toLocaleString()}원</span>
            </div>
            <p className="self-center">스터디 예치금은 충전된 포인트에서 차감됩니다.</p>
            <div className="flex justify-center items-center mt-4">
              <button onClick={() => handleClick(true)} className="btn-blue w-10">
                예
              </button>
              <button onClick={() => setModalInfo(() => false)} className="btn-blue w-10 ml-2">
                아니요
              </button>
            </div>
          </Modal>
        )}
      </>
    );
  }
  return <></>;
};

export default ParticipateBtn;
