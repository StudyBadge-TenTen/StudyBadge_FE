import { useParams } from "react-router";
import CROWN from "../../assets/CROWN_PNG.png";
import { useEffect, useState } from "react";
import { useAttendanceList } from "@/hooks/useQuery";
import { AttendanceResponseType } from "@/types/study-channel-type";
import { useAuthStore } from "@/store/auth-store";
import PersonIcon from "../common/PersonIcon";

const KingOfAttendance = () => {
  // params에서 channelId를 가져와 멤버별 출석현황 조회 -> 가장 높은 출석률 값 구하기 -> 해당 출석률인 멤버들 렌더링
  const { accessToken, isMember } = useAuthStore();
  const { channelId } = useParams();
  const [bestMembers, setBestMembers] = useState<AttendanceResponseType[]>();
  const { data, error, isLoading } = useAttendanceList(Number(channelId), accessToken, isMember);

  useEffect(() => {
    if (channelId && Array.isArray(data)) {
      const ratioList = data.map((attendanceInfo) => attendanceInfo.attendanceRatio);
      const bestAttendanceRatio = Math.max(...ratioList);
      const newBestMembers = data.filter((attendanceInfo) => attendanceInfo.attendanceRatio === bestAttendanceRatio);

      setBestMembers(() => [...newBestMembers]);
    }
  }, [channelId, data]);

  if (!isMember) {
    return <div className="text-white">해당 스터디 멤버에게만 공개되는 컨텐츠입니다.</div>;
  }

  if (bestMembers) {
    if (bestMembers.length === 0) {
      return <div className="text-white">아직 이달의 출석왕이 선정되지 않았습니다.</div>;
    } else {
      return (
        <>
          <h2 className="text-white text-2xl my-4 mb-12">이달의 출석왕</h2>
          <div className="flex justify-center items-center">
            {bestMembers.map((member) => (
              <div key={member.studyMemberId} className="w-fit h-full flex flex-col justify-center items-center mr-2">
                <div className="relative">
                  <img src={CROWN} className="w-16 absolute left-2 bottom-[76px]" />
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt="프로필 이미지"
                      className="object-cover w-20 h-20 rounded-full bg-white"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                      <PersonIcon color="text-Gray-3" size={[60, 60]} />
                    </div>
                  )}
                </div>
                <span className="text-white">{member.name}</span>
              </div>
            ))}
          </div>
        </>
      );
    }
  }

  if (error) {
    return <div className="text-white">이달의 출석왕을 불러오는 데에 실패하였습니다.</div>;
  }

  if (isLoading) {
    <>
      <h2 className="text-white text-2xl my-4 mb-12">이달의 출석왕</h2>
      <div className="text-white">Loading...</div>
    </>;
  }

  if (!bestMembers) {
    <div className="text-white">아직 이달의 출석왕이 선정되지 않았습니다.</div>;
  }

  return <></>;
};

export default KingOfAttendance;
