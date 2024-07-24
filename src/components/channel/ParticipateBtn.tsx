import { useState } from "react";
import Modal from "../common/Modal";
import { postParticipate } from "@/services/channel-api";
import { useParams } from "react-router";
import { useGetStudyInfo, useRecruitment } from "@/hooks/useQuery";

const ParticipateBtn = (): JSX.Element => {
  const { channelId } = useParams();
  const [modalOpen, setModalInfo] = useState(false);
  const { data } = useGetStudyInfo(Number(channelId));
  const recriutmentData = useRecruitment(Number(channelId));

  const handleClick = async (isModal: boolean) => {
    if (!isModal) {
      setModalInfo(() => true);
      return;
    }
    if (isModal && channelId) {
      // todo: 먼저 유저의 포인트를 확인하고, 충분한 포인트가 없으면 프로필 페이지로 이동
      await postParticipate(Number(channelId));
      setModalInfo(() => false);
      return;
    }
  };

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
};

export default ParticipateBtn;
