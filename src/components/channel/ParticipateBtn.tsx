import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { postParticipate } from "@/services/channel-api";
import { useNavigate, useParams } from "react-router";
import { useApplicationList, useGetStudyInfo, useUserInfo } from "@/hooks/useQuery";
import { useAuthStore } from "@/store/auth-store";
import moment from "moment";

const ParticipateBtn = (): JSX.Element => {
  const navigate = useNavigate();
  const { accessToken, isMember } = useAuthStore();
  const { channelId } = useParams();
  const [modalOpen, setModalInfo] = useState(false);
  const [isStudyEnd, setIsStudyEnd] = useState(false);
  const { data } = useGetStudyInfo(Number(channelId));
  const userInfo = useUserInfo(accessToken);
  const applicationData = useApplicationList(accessToken);
  const today = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    if (data && new Date(data.endDate) < new Date(today)) {
      setIsStudyEnd(() => true);
    }
  }, [data]);

  const handleClick = async (isModal: boolean) => {
    if (!isModal) {
      setModalInfo(() => true);
      return;
    }
    if (isModal && channelId && userInfo.data && data) {
      if (userInfo.data.point >= data.deposit) {
        await postParticipate(Number(channelId));
        setModalInfo(() => false);
        return;
      } else {
        alert("포인트가 부족합니다.");
        navigate("/profile/myInfo");
      }
    }
  };

  if (isStudyEnd || !accessToken || (data && data.leader)) return <></>;

  if (isMember) {
    return <div className="btn-blue px-6 py-4 bg-Gray-3 hover:bg-Gray-3">소속된 스터디입니다.</div>;
  } else if (applicationData.data && Array.isArray(applicationData.data)) {
    if (
      applicationData.data.find(
        (channel) => channel.studyChannelId === Number(channelId) && channel.participationStatus === "APPROVE_WAITING",
      )
    ) {
      return <div className="btn-blue px-6 py-4 bg-Gray-3 hover:bg-Gray-3">신청 대기중입니다.</div>;
    }
  }

  // 해당 코드 백엔드와 논의 후 스터디 정보에서 데이터를 얻어서 판별하는 것으로 수정
  if (data && data.recruitmentStatus === "RECRUITING") {
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
