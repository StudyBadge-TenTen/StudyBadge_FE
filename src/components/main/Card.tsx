import { categoryEnToKr } from "@/utils/transform-function";
import { StudyCategoryType, StudyListObjectType } from "../../types/study-channel-type";
import { useNavigate } from "react-router";

const Card = ({ studyInfo }: { studyInfo: StudyListObjectType }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/channel/${studyInfo.studyChannelId}/information`)}
      className="w-72 h-[22rem] border border-solid border-Gray-3 rounded-[50px] p-6 m-4 cursor-pointer"
    >
      <div className="badge flex justify-between items-center mb-2">
        <div className={`badge-basic ${studyInfo.meetingType === "ONLINE" ? "bg-Green-1" : "bg-Red-1"} text-white`}>
          {studyInfo.meetingType === "ONLINE" ? "온라인" : "오프라인"}
        </div>
        <div className="badge-basic bg-Blue-2 text-white">
          {categoryEnToKr(studyInfo.category as StudyCategoryType)}
        </div>
      </div>
      <div className="study-period text-xs">
        스터디 기간 | {studyInfo.startDate} ~ {studyInfo.endDate}
      </div>
      <div className="study-content flex flex-col justify-center items-center mt-6">
        <h3 className="w-full text-xl font-bold mb-4 text-ellipsis overflow-hidden whitespace-nowrap">
          {studyInfo.name}
        </h3>
        <p className="w-full h-24 line-clamp-4 overflow-y-hidden">{studyInfo.description}</p>
        <div className="w-28 h-8 bg-Gray-1 font-bold rounded-[30px] mt-4 flex justify-center items-center">
          {studyInfo.deposit.toLocaleString()}원
        </div>
      </div>
      <div className="bottom-info flex justify-between items-center mt-4">
        <div className="views flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
          {studyInfo.viewCnt}
        </div>
        <div>리더 : {studyInfo.memberName}</div>
      </div>
    </div>
  );
};

export default Card;
