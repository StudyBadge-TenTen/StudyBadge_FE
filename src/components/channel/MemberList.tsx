import NONE_BADGE from "../../assets/NONE-BADGE_PNG.png";
import BRONZE_BADGE from "../../assets/BRONZE-BADGE_PNG.png";
import SILVER_BADGE from "../../assets/SILVER-BADGE_PNG.png";
import GOLD_BADGE from "../../assets/GOLD-BADGE_PNG.png";
import { useQuery } from "@tanstack/react-query";
import { MemberListResponseType } from "../../types/study-channel-type";
import { getMemberList, postSubLeader } from "../../services/channel-api";
import { useParams } from "react-router";
import { useState } from "react";
import Modal from "../common/Modal";

const banishContent = `해당 멤버를 스터디에서 퇴출시키겠습니까?\n(퇴출 시 총 예치금에서 퇴출 멤버가 지불한 예치금을 전액 제외합니다.)`;

const MemberList = (): JSX.Element => {
  const { channelId } = useParams();
  const { data, error, isLoading } = useQuery<MemberListResponseType, Error>({
    queryKey: ["memberList", channelId],
    queryFn: () => getMemberList(Number(channelId)),
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    content: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id === "subLeaderBtn") {
      setModalState(() => ({
        isOpen: true,
        type: "SUB_LEADER",
        content: "해당 멤버를 서브리더로 임명하시겠습니까?",
      }));
    }
    if (target.id === "banishBtn") {
      setModalState(() => ({
        isOpen: true,
        type: "BANISH",
        content: banishContent,
      }));
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, memberId: number) => {
    const target = e.target as HTMLButtonElement;
    if (modalState.type === "SUB_LEADER") {
      if (target.classList.contains("yes-btn")) postSubLeader(Number(channelId), { studyMemberId: memberId });
    }
    if (modalState.type === "BANISH") {
      // if (target.classList.contains("yes-btn"))
      // 퇴출 api 호출
    }
    setModalState((origin) => ({ ...origin, isOpen: false }));
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-2">스터디 멤버</h2>
      <div className="w-full h-[500px] flex flex-wrap justify-center items-center px-10 sm:px-12 py-4 overflow-y-scroll custom-scroll">
        {isLoading ? (
          <div className="w-60 h-80 border border-solid border-Gray-3 rounded-[50px] flex flex-col justify-between items-center px-4 py-8 m-2">
            <div className="w-28 h-28 bg-Gray-2 rounded-full"></div>
            <div className="w-1/3 h-4 bg-Gray-2 rounded-[50px]"></div>
            {/* 리더에게만 보여질 버튼 */}
            <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
            <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
          </div>
        ) : (
          data &&
          data.studyMembers.map((member) => (
            <div
              key={member.memberId}
              className={`w-[210px] h-80 border border-solid border-Gray-3 rounded-[50px] flex flex-col ${data.leader ? "justify-between" : "justify-center"} items-center px-4 py-8 m-2 relative`}
            >
              {member.badgeLevel === "NONE" && <img src={NONE_BADGE} className="absolute w-16 right-8" />}
              {member.badgeLevel === "BRONZE" && <img src={BRONZE_BADGE} className="absolute w-16 right-8" />}
              {member.badgeLevel === "SILVER" && <img src={SILVER_BADGE} className="absolute w-16 right-8" />}
              {member.badgeLevel === "GOLD" && <img src={GOLD_BADGE} className="absolute w-16 right-8" />}
              <img
                src={member.imageUrl}
                alt="프로필 이미지"
                className="object-cover w-28 h-28 rounded-full bg-Gray-1"
              />
              <p className={`${data.leader ? "text-xl" : "text-2xl mt-10"} font-bold text-Blue-2`}>{member.name}</p>
              {/* 리더에게만 보여질 버튼 */}
              {data.leader && (
                <>
                  <button id="subLeaderBtn" className="btn-blue px-3 py-2 w-28" onClick={(e) => handleClick(e)}>
                    서브리더로 지정
                  </button>
                  <button id="banishBtn" className="btn-red px-3 py-2 w-28" onClick={(e) => handleClick(e)}>
                    퇴출
                  </button>
                  {modalState.isOpen && (
                    <Modal>
                      <div className="w-60 px-6 flex flex-col justify-center items-center text-center whitespace-pre-wrap">
                        {modalState.content}
                        <div className="flex justify-center items-center mt-10">
                          <button
                            className="yes-btn btn-blue w-10 mr-4"
                            onClick={(e) => handleConfirm(e, member.memberId)}
                          >
                            예
                          </button>
                          <button
                            className="no-btn btn-blue"
                            onClick={() => setModalState((origin) => ({ ...origin, isOpen: false }))}
                          >
                            아니요
                          </button>
                        </div>
                      </div>
                    </Modal>
                  )}
                </>
              )}
            </div>
          ))
        )}
        {error && (
          <div>
            멤버를 불러오는 데 실패하였습니다. errorName: {error.name} , errorMessage: {error.message}
          </div>
        )}
      </div>
    </>
  );
};

export default MemberList;
