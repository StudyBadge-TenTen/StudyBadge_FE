import NONE_BADGE from "../../assets/NONE-BADGE_PNG.png";
import BRONZE_BADGE from "../../assets/BRONZE-BADGE_PNG.png";
import SILVER_BADGE from "../../assets/SILVER-BADGE_PNG.png";
import GOLD_BADGE from "../../assets/GOLD-BADGE_PNG.png";
import { useParams } from "react-router";
import { postApprove, postRecruitEnd, postRecruitStart, postReject } from "../../services/channel-api";
import { BAN_COUNT } from "../../constants/ban-count";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useGetStudyInfo, useRecruitment } from "@/hooks/useQuery";
import { useAuthStore } from "@/store/auth-store";
import PersonIcon from "../common/PersonIcon";

const Recruitment = (): JSX.Element => {
  const { accessToken } = useAuthStore();
  const skeletonList = [1, 2, 3, 4, 5];
  const { channelId } = useParams();
  const studyInfo = useGetStudyInfo(Number(channelId));
  const { data, error, isLoading } = useRecruitment(Number(channelId), accessToken);
  const [participateId, setParticipateId] = useState<number>();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    content: "",
  });

  useEffect(() => {
    // console.log(studyInfo.data);
  }, [studyInfo]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setParticipateId(() => Number(target.id.split("-")[0]));

    if (target.classList.contains("yes-btn")) {
      setModalState(() => ({
        isOpen: true,
        type: "YES",
        content: "신청을 승인하시겠습니까?",
      }));
    } else if (target.classList.contains("no-btn")) {
      setModalState(() => ({
        isOpen: true,
        type: "NO",
        content: "신청을 거절하시겠습니까?",
      }));
    }
  };

  const handleRecruitStart = async () => {
    if (channelId) {
      try {
        await postRecruitStart(Number(channelId));
      } catch (error) {
        console.log(error);
        alert("모집 오픈에 문제가 발생하였습니다.");
      }
    }
  };

  const handleRecruitEnd = async () => {
    if (channelId) {
      try {
        await postRecruitEnd(Number(channelId));
      } catch (error) {
        console.log(error);
        alert("모집 마감에 문제가 발생하였습니다.");
      }
    }
  };

  const handleConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    channelId: number,
    participateId: number,
  ) => {
    const target = e.target as HTMLButtonElement;
    e.stopPropagation();
    // if (studyInfo.data?.capacity === studyInfo.data.)

    if (modalState.type === "YES") {
      if (target.classList.contains("yes-btn")) {
        try {
          await postApprove(Number(channelId), participateId);
        } catch (error) {
          console.log("승인 에러");
          console.log(error);
        }
      }
    }
    if (modalState.type === "NO") {
      if (target.classList.contains("yes-btn")) {
        try {
          await postReject(Number(channelId), participateId);
        } catch (error) {
          console.log("거절 에러");
          console.log(error);
        }
      }
    }
    setModalState((origin) => ({ ...origin, isOpen: false }));
    window.location.reload();
  };

  if (data && data.recruitmentStatus === "RECRUIT_COMPLETED") {
    return (
      <>
        <div className="w-full h-[600px] border border-solid border-Gray-3 rounded-[50px]">
          <div className="h-[15%] bg-Blue-2 rounded-t-[50px] flex justify-center items-center">
            <h2 className="text-2xl font-bold text-white">신청 멤버</h2>
          </div>
          <div className="h-[85%] bg-white rounded-b-[50px] px-4 py-4 sm:px-14 sm:py-10">
            <div className="h-full overflow-y-scroll custom-scroll px-4 flex flex-col justify-center items-center">
              <p className="text-Gray-3">현재 모집 마감 상태입니다</p>
              <p className="text-Gray-3">멤버를 모집하시겠습니까?</p>
              <button onClick={() => handleRecruitStart()} className="btn-blue w-24 mt-8">
                모집 시작
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (studyInfo.data && studyInfo.data.recruitmentStatus === "RECRUITING") {
    return (
      <>
        <div className="w-full h-[600px] border border-solid border-Gray-3 rounded-[50px]">
          <div className="h-[15%] bg-Blue-2 rounded-t-[50px] flex justify-center items-center">
            <h2 className="text-2xl font-bold text-white">신청 멤버</h2>
          </div>
          <div className="h-[85%] bg-white rounded-b-[50px] px-4 py-4 sm:px-14 sm:py-10">
            <div className="h-full overflow-y-scroll custom-scroll px-4">
              {isLoading &&
                skeletonList.map((value) => (
                  <div
                    key={`skeleton_${value}`}
                    className="w-full h-40 border border-solid border-Gray-3 bg-white rounded-[30px] mb-2 animate-pulse"
                  ></div>
                ))}
              {!isLoading &&
                data &&
                data.participants &&
                (data.participants.length !== 0 ? (
                  data.participants.map((participant) => (
                    <div
                      key={participant.participationId}
                      className="w-full sm:h-40 border border-solid border-Gray-3 rounded-[30px] flex flex-col sm:flex-row justify-between items-center py-4 sm:py-2 px-4 sm:px-10 mb-2"
                    >
                      <div className="flex justify-center items-center">
                        {participant.imageUrl ? (
                          <img
                            src={participant.imageUrl}
                            alt="프로필 이미지"
                            className="object-cover w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-Gray-1 mr-6"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-Gray-3 flex justify-center items-center">
                            <PersonIcon color="text-white" size={[60, 60]} />
                          </div>
                        )}
                        <div className="w-fit h-full flex flex-col justify-center items-center">
                          {participant.badgeLevel === "NONE" && <img src={NONE_BADGE} className="w-16" />}
                          {participant.badgeLevel === "BRONZE" && <img src={BRONZE_BADGE} className="w-16" />}
                          {participant.badgeLevel === "SILVER" && <img src={SILVER_BADGE} className="w-16" />}
                          {participant.badgeLevel === "GOLD" && <img src={GOLD_BADGE} className="w-16" />}
                          <p className="text-xl font-bold mt-2">{participant.name}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        {participant.banCnt >= BAN_COUNT && <p className="text-Red-2">3회 이상 퇴출됨</p>}
                        {participant.participationStatus === "APPROVE_WAITING" ? (
                          <div className="flex mt-2">
                            <button
                              id={`${participant.participationId}-noBtn`}
                              onClick={handleClick}
                              className="no-btn btn-blue w-10 mr-4"
                            >
                              거절
                            </button>
                            <button
                              id={`${participant.participationId}-yesBtn`}
                              onClick={handleClick}
                              className="yes-btn btn-blue w-10 "
                            >
                              수락
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-Gray-3">이미 처리된 신청입니다.</p>
                        )}
                        {modalState.isOpen && channelId && participateId && (
                          <Modal>
                            <div className="w-60 px-6 flex flex-col justify-center items-center text-center whitespace-pre-wrap">
                              {modalState.content}
                              <div className="flex justify-center items-center mt-10">
                                <button
                                  id={`${participant.participationId}-modal-yes`}
                                  className="yes-btn btn-blue w-10 mr-4"
                                  onClick={(e) => handleConfirm(e, Number(channelId), participateId)}
                                >
                                  예
                                </button>
                                <button
                                  id={`${participant.participationId}-modal-no`}
                                  className="no-btn btn-blue"
                                  onClick={(e) => handleConfirm(e, Number(channelId), participateId)}
                                >
                                  아니요
                                </button>
                              </div>
                            </div>
                          </Modal>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">아직 신청한 사람이 없습니다.</div>
                ))}
              {error && (
                <p>
                  신청 리스트를 불러오는데 실패하였습니다. errorName: {error.name}. errorMessage: {error.message}
                </p>
              )}
              <div className="w-full flex justify-center items-center">
                <button onClick={() => handleRecruitEnd()} className="btn-blue w-24 mt-8">
                  모집마감
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

export default Recruitment;
