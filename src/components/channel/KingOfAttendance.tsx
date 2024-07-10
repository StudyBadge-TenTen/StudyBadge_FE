import CROWN from "../../assets/CROWN_PNG.png";

const KingOfAttendance = () => {
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
