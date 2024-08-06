import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { useAttendanceList } from "@/hooks/useQuery";
import PersonIcon from "../common/PersonIcon";

const Attendance = (): JSX.Element => {
  const { accessToken, isMember } = useAuthStore();
  const skeleton = [1, 2, 3, 4, 5];
  const { channelId } = useParams();
  const { data, error, isLoading } = useAttendanceList(Number(channelId), accessToken, isMember);

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-2">스터디 출석 현황</h2>
      <div className="w-full h-fit min-h-[500px] overflow-y-scroll custom-scroll flex flex-col justify-center items-center">
        {!isMember ? (
          <div className="w-full h-full"></div>
        ) : (
          <>
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
            {!isLoading &&
              data &&
              Array.isArray(data) &&
              data.map((member) => (
                <div
                  key={member.studyMemberId}
                  className="w-full h-fit px-2 py-4 flex flex-col md:flex-row justify-center items-center"
                >
                  <div className="flex flex-col grow justify-center items-center md:mr-10">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt="프로필 이미지"
                        className="object-cover w-28 h-28 rounded-full bg-Gray-1"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-white flex justify-center items-center">
                        <PersonIcon color="text-Gray-3" size={[60, 60]} />
                      </div>
                    )}
                    <p className="text-lg text-Blue-2 font-bold">{member.name}</p>
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col sm:flex-row px-5 md:px-6">
                    <span className="inline-block mr-8">{Math.round(member.attendanceRatio)}%</span>
                    <div className="w-full h-8 bg-Gray-1 relative z-10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: member.attendanceRatio * 0.01 }}
                        transition={{ duration: 0.5, originX: 0, originY: 1 }}
                        style={{ transformOrigin: "0% 100%" }}
                        className={`w-full h-8 bg-Blue-2 absolute top-0 left-0 z-20`}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            {error && <div className="text-center">출석 그래프를 로딩하는데 실패하였습니다.</div>}
          </>
        )}
      </div>
    </>
  );
};

export default Attendance;
