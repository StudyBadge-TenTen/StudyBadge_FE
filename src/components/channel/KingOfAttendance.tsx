import CROWN from "../../assets/CROWN_PNG.png";

const KingOfAttendance = () => {
  // todo: params에서 channelId를 가져와 멤버별 출석현황 조회 -> 가장 높은 출석률 값 구하기 -> 해당 출석률인 멤버들 렌더링

  return (
    <>
      <h2 className="text-white text-2xl my-4 mb-12">이달의 출석왕</h2>
      <div className="relative">
        <img src={CROWN} className="w-16 absolute left-2 bottom-[76px]" />
        <div className="w-20 h-20 rounded-full bg-white"></div>
      </div>
      <span className="text-white">홍길동</span>
    </>
  );
};

export default KingOfAttendance;
