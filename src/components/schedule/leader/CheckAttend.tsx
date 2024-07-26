import { useEffect, useState } from "react";
import { useMemberList } from "../../../hooks/useQuery";
import { useEditModeStore } from "../../../store/edit-mode-store";
import { postAttendList } from "../../../services/schedule-api";
import { AttendScheduleInfoType, PostAttendObjectType } from "../../../types/schedule-type";

const CheckAttend = ({ channelId, scheduleInfo }: { channelId: number; scheduleInfo: AttendScheduleInfoType }) => {
  const { data, error, isLoading } = useMemberList(channelId);
  const [attendList, setAttendList] = useState<PostAttendObjectType[]>([]);
  const { setIsEditMode } = useEditModeStore();

  useEffect(() => {
    return () => setIsEditMode(false);
  }, []);

  useEffect(() => {
    if (data) {
      const attendList = data.studyMembers.map((member) => {
        return { studyMemberId: member.memberId, isAttendance: false };
      });
      setAttendList(() => [...attendList]);
    } else {
      console.log("멤버 리스트 데이터가 없습니다");
    }
  }, [channelId, data]);

  // useEffect(() => {
  //   console.log(attendList); // 디버깅로그
  // }, [attendList]);

  if (isLoading) {
    return <div className="text-Gray-3 text-center">멤버 리스트를 로딩중입니다...</div>;
  }
  if (error) {
    return (
      <div className="text-Gray-3 text-center">
        멤버 리스트를 불러오는 데 실패하였습니다. errorName:{error.name}. errorMessage:{error.message}
      </div>
    );
  }

  if (!isLoading && data) {
    const handleCheckClick = (memberId: number) => {
      const newPostAttendList = attendList.map((attendObj) => {
        if (attendObj.studyMemberId === memberId) {
          return { studyMemberId: memberId, isAttendance: !attendObj.isAttendance };
        } else {
          return { studyMemberId: attendObj.studyMemberId, isAttendance: attendObj.isAttendance };
        }
      });
      setAttendList(() => [...newPostAttendList]);
    };

    const handleSubmitClick = async () => {
      // 서버로 출석체크 데이터 보내기
      const postRequestBody = {
        ...scheduleInfo,
        attendanceMembers: attendList,
      };
      await postAttendList(channelId, postRequestBody);
      setIsEditMode(false);
    };

    return (
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="h-28 flex flex-wrap">
          {data?.studyMembers.map((member) => (
            <button
              key={member.memberId}
              onClick={() => handleCheckClick(member.memberId)}
              className="member w-fit h-fit flex flex-col justify-center items-center mx-2 relative"
            >
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt="프로필이미지"
                  className="w-16 h-16 object-cover rounded-full bg-Gray-2"
                />
              ) : (
                <div className="w-16 h-16 bg-Gray-2 rounded-full"></div>
              )}
              <span>{member.name}</span>
              {attendList.map(
                (attendObj) =>
                  attendObj.studyMemberId === member.memberId &&
                  attendObj.isAttendance && (
                    <svg
                      key={`check_${attendObj.studyMemberId}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="currentColor"
                      className="bi bi-check2-circle text-Green-1 absolute top-0 z-30"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                    </svg>
                  ),
              )}
            </button>
          ))}
        </div>
        <button onClick={() => handleSubmitClick()} className="btn-blue self-center">
          체크완료
        </button>
      </div>
    );
  }

  return <></>;
};

export default CheckAttend;
