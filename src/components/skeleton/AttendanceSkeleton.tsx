const AttendanceSkeleton = (): JSX.Element => {
  return (
    <div className="w-full h-fit px-2 py-4 flex justify-center items-center animate-pulse">
      <div className="flex flex-col justify-center items-center mr-10">
        <div className="w-28 h-28 rounded-full bg-Gray-1"></div>
      </div>
      <span className="inline-block mr-8"></span>
      <div className="w-full h-8 bg-Gray-1 rounded-[30px] relative"></div>
    </div>
  );
};

export default AttendanceSkeleton;
