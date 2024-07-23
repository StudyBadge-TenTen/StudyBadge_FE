import { getParticipation } from "@/services/profile-api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Participation = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ["participation"],
    queryFn: () => getParticipation(),
  });

  if (isLoading) {
    return (
      <div className="border border-solid border-Gray-3 bg-Gray-1 w-full h-24 p-10 rounded-[30px] mt-10 animate-pulse"></div>
    );
  }

  if (error) {
    return (
      <div>
        신청한 스터디를 불러오는 데 실패하였습니다. errorName:{error.name}. errorMessage:{error.message}
      </div>
    );
  }

  if (data) {
    if (data.length === 0) {
      return <div>현재 신청한 스터디가 없습니다.</div>;
    } else {
      return (
        <>
          {data.map((studyChannel) => (
            <div
              key={studyChannel.studyChannelId}
              onClick={() => navigate(`/channel/${studyChannel.studyChannelId}/schedule`)}
              className="border border-solid border-Gray-3 w-full h-fit p-10 rounded-[30px] flex flex-col sm:flex-row justify-center lg:justify-between items-center mt-10 flex-wrap"
            >
              <div className="flex items-center">
                <h3 className="font-bold text-xl md:text-2xl text-Blue-2">{studyChannel.studyChannelName}</h3>
              </div>
              {/* todo : 신청 상태에 따라 렌더링 */}
              {/* <p></p> */}
            </div>
          ))}
        </>
      );
    }
  }
  return <></>;
};

export default Participation;
