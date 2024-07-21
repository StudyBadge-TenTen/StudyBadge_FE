import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { AttendanceResponseType } from "../../types/study-channel-type";
import { getAttendance } from "../../services/channel-api";
import { useEffect } from "react";

const Attendance = (): JSX.Element => {
  const skeleton = [1, 2, 3, 4, 5];
  const { channelId } = useParams();
  const { data, error, isLoading } = useQuery<AttendanceResponseType[], Error>({
    queryKey: ["attendance", channelId],
    queryFn: () => getAttendance(Number(channelId)),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-2">스터디 출석 현황</h2>
      <div className="w-full h-[500px] overflow-y-scroll custom-scroll">
        {isLoading &&
          skeleton.map((value) => (
            <div
              key={`skeleton_${value}`}
              className="w-full h-fit px-2 py-4 flex justify-center items-center animate-pulse"
            >
              <div className="flex flex-col justify-center items-center mr-10">
                <div className="w-28 h-28 rounded-full bg-Gray-1"></div>
              </div>
              <span className="inline-block mr-8"></span>
              <div className="w-full h-8 bg-Gray-1 rounded-[30px] relative"></div>
            </div>
          ))}
        {data &&
          Array.isArray(data) &&
          data.map((member) => (
            <div key={member.studyMemberId} className="w-full h-fit px-2 py-4 flex justify-center items-center">
              <div className="flex flex-col justify-center items-center mr-10">
                <img
                  src={member.imageUrl}
                  alt="프로필 이미지"
                  className="object-cover w-28 h-28 rounded-full bg-Gray-1"
                />
                <p className="text-lg text-Blue-2 font-bold">{member.name}</p>
              </div>
              <div className="w-full flex flex-col sm:flex-row">
                <span className="inline-block mr-8">{member.attendanceRatio}%</span>
                <div className="w-full h-8 bg-Gray-1 rounded-[30px] relative z-10">
                  <div
                    className={`${member.attendanceRatio === 100 ? "w-full" : `w-[${String(member.attendanceRatio)}%]`} h-8 bg-Blue-2 rounded-[30px] absolute top-0 left-0 z-20`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        {error && <div>출석 그래프를 로딩하는데 실패하였습니다.</div>}
      </div>
    </>
  );
};

export default Attendance;
