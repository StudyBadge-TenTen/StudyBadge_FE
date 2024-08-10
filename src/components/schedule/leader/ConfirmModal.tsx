import { useNavigate } from "react-router";
import Modal from "../../common/Modal";
import { useSelectedDateStore } from "../../../store/schedule-store";
import { deleteSchedule, postSchedule, putSchedule } from "../../../services/schedule-api";
import { ConfirmModalPropsType } from "../../../types/schedule-type";
import { useUserInfo } from "@/hooks/useQuery";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

const ConfirmModal = ({
  channelId,
  originInfo,
  modalInfo,
  setModalInfo,
  newSchedule,
  repeatState,
}: ConfirmModalPropsType): JSX.Element => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();
  const { selectedDate } = useSelectedDateStore();
  const userInfo = useUserInfo(accessToken);

  const handleModalBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    props: ConfirmModalPropsType,
  ) => {
    const { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState } = props;
    const target = e.target as HTMLButtonElement;

    // 취소 버튼 누를 시
    if (target.classList.contains("cancel-confirm")) {
      setModalInfo(() => ({
        isOpen: false,
        modalFor: "EDIT",
        isAfterCheck: false,
      }));
      return;
    }

    try {
      if (!originInfo) {
        // 일정 생성일 때
        let response;
        if (target.classList.contains("yes")) {
          response = await postSchedule(Number(channelId), newSchedule, repeatState);
          console.log("post schedule");

          if (axios.isAxiosError(response)) {
            return;
          } else {
            navigate(`/channel/${channelId}/schedule/${selectedDate}`);
          }
        } else if (target.classList.contains("no")) {
          setModalInfo(() => ({
            isOpen: false,
            modalFor: "EDIT",
            isAfterCheck: false,
          }));
          return;
        }
      } else if (modalInfo.modalFor === "EDIT" && originInfo) {
        let response;
        if (modalInfo.isAfterCheck) {
          if (target.classList.contains("yes")) {
            response = await putSchedule(Number(channelId), newSchedule, true);
            console.log("put schedule");
          } else if (target.classList.contains("no")) {
            response = await putSchedule(Number(channelId), newSchedule, false);
            console.log("put schedule");
          }
        } else {
          if (target.classList.contains("yes")) {
            response = await putSchedule(Number(channelId), newSchedule);
            console.log("put schedule");
          } else if (target.classList.contains("no")) {
            setModalInfo(() => ({
              isOpen: false,
              modalFor: "EDIT",
              isAfterCheck: false,
            }));
            return;
          }
        }
        if (axios.isAxiosError(response)) {
          return;
        } else {
          navigate(`/channel/${channelId}/schedule/${selectedDate}`);
        }
      } else if (modalInfo.modalFor === "DELETE") {
        let response;
        if (originInfo && userInfo.data) {
          const deleteRequestBody = {
            memberId: userInfo.data.memberId,
            scheduleId: originInfo.id,
            selectedDate: selectedDate,
          };
          if (modalInfo.isAfterCheck) {
            if (target.classList.contains("yes")) {
              response = await deleteSchedule(Number(channelId), deleteRequestBody, true);
              console.log("delete schedule");
            } else if (target.classList.contains("no")) {
              response = await deleteSchedule(Number(channelId), deleteRequestBody, false);
              console.log("delete schedule");
            }
          } else {
            if (target.classList.contains("yes")) {
              response = await deleteSchedule(Number(channelId), deleteRequestBody);
              console.log("delete schedule");
            } else if (target.classList.contains("no")) {
              setModalInfo(() => ({
                isOpen: false,
                modalFor: "EDIT",
                isAfterCheck: false,
              }));
              return;
            }
          }
          if (axios.isAxiosError(response)) {
            return;
          } else {
            navigate(`/channel/${channelId}/schedule/${selectedDate}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert("일정 저장에 실패했습니다.");
      return;
    }
  };

  return (
    <>
      {modalInfo.isOpen &&
        (modalInfo.isAfterCheck ? (
          <Modal>
            <div className="my-8">이후 일정에도 적용하시겠습니까?</div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={(e) =>
                  handleModalBtnClick(e, { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState })
                }
                className="yes btn-blue w-16"
              >
                예
              </button>
              <button
                type="button"
                onClick={(e) =>
                  handleModalBtnClick(e, { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState })
                }
                className="no btn-blue w-16 ml-4"
              >
                아니요
              </button>
            </div>
            <button
              type="button"
              onClick={(e) =>
                handleModalBtnClick(e, { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState })
              }
              className="cancel-confirm btn-blue bg-Gray-2 hover:bg-Gray-3 text-black hover:text-white mt-8"
            >
              취소
            </button>
          </Modal>
        ) : (
          <Modal>
            <div className="my-8">일정을 {modalInfo.modalFor === "EDIT" ? "저장" : "삭제"}하시겠습니까?</div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={(e) =>
                  handleModalBtnClick(e, { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState })
                }
                className="yes btn-blue w-16"
              >
                예
              </button>
              <button
                type="button"
                onClick={(e) =>
                  handleModalBtnClick(e, { channelId, originInfo, modalInfo, setModalInfo, newSchedule, repeatState })
                }
                className="no btn-blue w-16 ml-4"
              >
                아니요
              </button>
            </div>
          </Modal>
        ))}
    </>
  );
};

export default ConfirmModal;
