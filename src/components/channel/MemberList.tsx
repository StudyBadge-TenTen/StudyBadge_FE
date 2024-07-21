import SAMPLE_IMG from "../../assets/image/CAROUSEL_IMG_1.jpg";
import BADGE from "../../assets/GOLD-BADGE_PNG.png";
import { useQuery } from "@tanstack/react-query";
import { MemberListResponseType } from "../../types/study-channel-type";
import { getMemberList } from "../../services/channel-api";
import { useParams } from "react-router";

const MemberList = (): JSX.Element => {
  const { channelId } = useParams();
  const { data, error, isLoading } = useQuery<MemberListResponseType, Error>({
    queryKey: ["memberList", channelId],
    queryFn: () => getMemberList(Number(channelId)),
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-Blue-2 text-center mb-2">스터디 멤버</h2>
      <div className="w-full h-[500px] flex flex-wrap items-center px-10 sm:px-20 py-4 overflow-y-scroll custom-scroll">
        {isLoading ? (
          <div className="w-60 h-80 border border-solid border-Gray-3 rounded-[50px] flex flex-col justify-between items-center px-4 py-8 m-2">
            <div className="w-28 h-28 bg-Gray-2 rounded-full"></div>
            <div className="w-1/3 h-4 bg-Gray-2 rounded-[50px]"></div>
            {/* 리더에게만 보여질 버튼 */}
            <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
            <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
          </div>
        ) : (
          data && (
            <div className="w-60 h-80 border border-solid border-Gray-3 rounded-[50px] flex flex-col justify-between items-center px-4 py-8 m-2 relative">
              <img src={BADGE} className="absolute w-16 right-8" />
              <img src={SAMPLE_IMG} alt="프로필 이미지" className="object-cover w-28 h-28 rounded-full" />
              <p className="text-xl font-bold text-Blue-2">홍길동</p>
              {/* 리더에게만 보여질 버튼 */}
              <button className="btn-blue px-3 py-2 w-28">서브리더로 지정</button>
              <button className="btn-red px-3 py-2 w-28">퇴출</button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MemberList;
