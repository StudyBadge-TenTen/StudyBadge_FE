import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { StudyInfoType } from "../../types/study-channel-type";
import { useQuery } from "@tanstack/react-query";
import { getStudyInfo, putStudyInfo } from "../../services/channel-api";
import { useEditModeStore } from "../../store/edit-mode-store";

const Information = (): JSX.Element => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [studyDetailList, setStudyDetailList] = useState<(string | number | null)[]>();
  const { isEditMode, setIsEditMode } = useEditModeStore();
  const infoTitles = ["정원", "방식", "커뮤니케이션", "예치금", "기간", "리더", "서브리더"];
  const { data, error, isLoading } = useQuery<StudyInfoType, Error>({
    queryKey: ["studyInfo", channelId],
    queryFn: () => getStudyInfo(Number(channelId)),
  });
  const [newStudyInfo, setNewStudyInfo] = useState({
    name: "",
    description: "",
    chattingUrl: "",
  });

  useEffect(() => {
    return setIsEditMode(false);
  }, []);

  useEffect(() => {
    if (!isEditMode) navigate(`/channel/${channelId}/information`);
  }, [isEditMode]);

  useEffect(() => {
    //channelId를 이용해 채널 정보 get api호출
    // "정원", "방식", "커뮤니케이션", "예치금", "기간", "리더", "서브리더", "지역" 이 순서로
    // studyDetailList에 저장
    if (data) {
      const detailList = [
        data.capacity,
        data.meetingType,
        data.chattingUrl,
        data.deposit,
        `${data.startDate} ~ ${data.endDate}`,
        data.leaderName,
        data.subLeaderName,
      ];
      if (data.meetingType === "OFFLINE") {
        detailList.push(data.region);
      }
      setStudyDetailList(() => detailList);
    }
    console.log(error);
  }, [channelId]);

  useEffect(() => {
    if (location.pathname.includes("information_edit")) {
      setIsEditMode(true);
      if (data) {
        setNewStudyInfo(() => ({
          name: data.studyChannelName,
          description: data.studyChannelDescription,
          chattingUrl: data.chattingUrl ?? "",
        }));
      }
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.id === "studyNameEdit") {
      setNewStudyInfo((origin) => ({
        ...origin,
        name: e.target.value,
      }));
    } else if (e.target.id === "descriptionEdit") {
      setNewStudyInfo((origin) => ({
        ...origin,
        description: e.target.value,
      }));
    } else if (e.target.id === "chattingUrlEdit") {
      setNewStudyInfo((origin) => ({
        ...origin,
        chattingUrl: e.target.value,
      }));
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-2">스터디 정보</h2>
      {/* 리더에게만 보일 수정 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (isEditMode) {
              // 수정 데이터 put으로 서버에 전송
              putStudyInfo(Number(channelId), newStudyInfo);
              setIsEditMode(false);
              // navigate(`/channel/${channelId}/information`);
            } else {
              navigate("information_edit", { state: { tab: "정보", edit: true } });
            }
          }}
          className="btn-blue mb-4"
        >
          {isEditMode ? "저장" : "정보수정"}
        </button>
        {isEditMode && (
          <button
            onClick={() => {
              setIsEditMode(false);
              navigate(`/channel/${channelId}/information`);
            }}
            className="btn-blue self-end ml-2 mb-4"
          >
            취소
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* 채널 이름/카테고리/소개 */}
        <div className="basic-info w-80 h-[393px] border border-solid border-Gray-3 rounded-[50px] p-4 mt-4 md:mt-0 md:ml-4 flex flex-col justify-center items-center">
          <p className="text-Blue-2 p-1 border-b border-solid border-Gray-2 flex justify-center items-center">
            <b>이름:</b>{" "}
            {isEditMode ? (
              <input
                type="text"
                id="studyNameEdit"
                name="studyNameEdit"
                className="input w-2/3 ml-2"
                value={newStudyInfo.name}
                onChange={handleInputChange}
              ></input>
            ) : (
              <span className="pl-1">{data?.studyChannelName}</span>
            )}
          </p>
          <p className="text-Blue-2 p-2">
            <b>카테고리:</b> 컴퓨터/IT/개발
          </p>
          <div className="w-full">
            <b className="inline-block text-Blue-2 pl-4 my-2">소개</b>
            {isEditMode ? (
              <textarea
                id="descriptionEdit"
                name="descriptionEdit"
                className="border border-solid border-Gray-2 rounded-[10px] px-3 py-2 resize-none"
                rows={8}
                cols={30}
                value={newStudyInfo.description}
                onChange={handleInputChange}
              ></textarea>
            ) : (
              <div className="w-full h-[230px] border border-solid border-Gray-3 rounded-[50px] p-6">
                {data?.studyChannelDescription}
              </div>
            )}
          </div>
        </div>
        {/* 채널 상세 정보 */}
        <div className="detail-info w-80 h-[393px] border border-solid border-Gray-3 rounded-[50px] mt-4 md:mt-0 md:ml-4 flex">
          <div className="w-2/5 h-full font-bold text-Blue-2 border-r border-solid border-Gray-2 p-4 py-8 flex flex-col justify-between items-center">
            {infoTitles.map((infoTitle) => (
              <span key={infoTitle}>{infoTitle}</span>
            ))}
            {/* 오프라인 스터디채널일 경우 지역 렌더링 */}
            {data?.meetingType === "OFFLINE" && <span>지역</span>}
          </div>
          <div className="w-3/5 h-full p-4 py-8 flex flex-col justify-between items-start">
            {isLoading || !data
              ? infoTitles.map((title) => (
                  <div key={`skeleton_${title}`} className="w-full h-4 bg-Gray-1 rounded-[50px]"></div>
                ))
              : data &&
                studyDetailList &&
                studyDetailList.map((detail, index) =>
                  data?.chattingUrl === detail && isEditMode ? (
                    <input
                      key={`edit${index}`}
                      id="chattingUrlEdit"
                      name="chattingUrlEdit"
                      className="input h-7 text-sm"
                      value={newStudyInfo.chattingUrl}
                      onChange={handleInputChange}
                    ></input>
                  ) : (
                    <span
                      key={index}
                      className="inline-block w-full text-sm overflow-x-scroll whitespace-nowrap break-all scrollbar-hide"
                    >
                      {index === 3
                        ? detail?.toLocaleString()
                        : detail !== null
                          ? detail
                          : "해당 스터디 멤버에게만 공개"}
                      {isEditMode && data?.subLeaderName === detail && (
                        <button className="btn-blue h-6 text-sm text-center px-2 py-1 ml-4">변경</button>
                      )}
                    </span>
                  ),
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
