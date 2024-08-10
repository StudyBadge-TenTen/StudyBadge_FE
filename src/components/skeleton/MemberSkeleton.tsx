const MemberSkeleton = (): JSX.Element => {
  return (
    <div className="w-60 h-80 border border-solid border-Gray-3 bg-Gray-1 rounded-[50px] flex flex-col justify-between items-center px-4 py-8 m-2 animate-pulse">
      <div className="w-28 h-28 bg-Gray-2 rounded-full"></div>
      <div className="w-1/3 h-4 bg-Gray-2 rounded-[50px]"></div>
      <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
      <div className="w-2/3 h-4 bg-Gray-2 rounded-[50px]"></div>
    </div>
  );
};

export default MemberSkeleton;
