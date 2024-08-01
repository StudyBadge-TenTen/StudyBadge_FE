import { useEffect, useState } from "react";
import { useMemberList } from "../../../hooks/useQuery";
import { useEditModeStore } from "../../../store/edit-mode-store";
import { postAttendList } from "../../../services/schedule-api";
import { AttendMemberType, AttendScheduleInfoType, PostAttendObjectType } from "../../../types/schedule-type";
import { useAuthStore } from "@/store/auth-store";

const CheckAttend = ({
  channelId,
  scheduleInfo,
  dataUpdate,
  nowAttendList,
}: {
  channelId: number;
  scheduleInfo: AttendScheduleInfoType;
  dataUpdate: () => void;
  nowAttendList: { data: AttendMemberType[] | undefined; error: Error | null; isLoading: boolean };
}) => {
  // console.log("CheckAttend props:", { channelId, scheduleInfo }); // 디버깅 로그
  const { accessToken } = useAuthStore();
  const memberListData = useMemberList(channelId, accessToken);
  const [attendList, setAttendList] = useState<PostAttendObjectType[]>([]);
  const { setIsEditMode } = useEditModeStore();

  useEffect(() => {
    return () => setIsEditMode(false);
  }, []);

  useEffect(() => {
    console.log("attendList: ", attendList);
  }, [attendList]);

  useEffect(() => {
    console.log("CheckAttend 렌더링", channelId, scheduleInfo);
  }, [channelId, scheduleInfo]);

  useEffect(() => {
    if (memberListData.error) {
      console.error("멤버 리스트를 불러오는 데 실패하였습니다.", memberListData.error);
    } else {
      // console.log(data); // 디버깅 로그
    }
  }, [memberListData.data, memberListData.error]);

  useEffect(() => {
    // console.log("CheckAttend useEffect", { data, error, isLoading }); // 디버깅 로그
    // 기존에 출석리스트가 있다면 셋
    if (nowAttendList.data) {
      const attendList = nowAttendList.data.map((member) => {
        return { studyMemberId: member.studyMemberId, isAttendance: member.attendance };
      });
      setAttendList(() => [...attendList]);
      return;
    }
    if (memberListData.data) {
      const attendList = memberListData.data.studyMembers.map((member) => {
        return { studyMemberId: member.studyMemberId, isAttendance: false };
      });
      setAttendList(() => [...attendList]);
      // console.log("멤버 데이터:", data); // 디버깅 로그
      // console.log("초기 출석 리스트:", attendList); // 디버깅 로그
    } else {
      console.log("멤버 리스트 데이터가 없습니다");
    }
  }, [channelId, memberListData.data, nowAttendList.data]);

  // useEffect(() => {
  //   console.log(attendList); // 디버깅로그
  // }, [attendList]);

  if (memberListData.isLoading) {
    return <div className="text-Gray-3 text-center">멤버 리스트를 로딩중입니다...</div>;
  }
  if (memberListData.error) {
    return (
      <div className="text-Gray-3 text-center">
        멤버 리스트를 불러오는 데 실패하였습니다. errorName:{memberListData.error.name}. errorMessage:
        {memberListData.error.message}
      </div>
    );
  }

  if (!memberListData.isLoading && memberListData.data) {
    const handleCheckClick = (studyMemberId: number) => {
      const newPostAttendList = attendList.map((attendObj) => {
        if (attendObj.studyMemberId === studyMemberId) {
          return { studyMemberId: studyMemberId, isAttendance: !attendObj.isAttendance };
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
      dataUpdate();
    };

    return (
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="h-28 flex flex-wrap">
          {!memberListData.isLoading &&
            memberListData.data &&
            Array.isArray(memberListData.data.studyMembers) &&
            memberListData.data.studyMembers.map((member) => (
              <button
                key={member.studyMemberId}
                onClick={() => handleCheckClick(member.studyMemberId)}
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
                {attendList &&
                  Array.isArray(attendList) &&
                  attendList.map(
                    (attendObj) =>
                      attendObj.studyMemberId === member.studyMemberId &&
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
