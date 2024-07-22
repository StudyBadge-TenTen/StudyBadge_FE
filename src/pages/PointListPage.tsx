import HistoryList from "../components/profile/HistoryList";

const PointListPage = (): JSX.Element => {
  return (
    <>
      <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-[30px] p-6 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold text-Blue-2 my-10">포인트내역</h3>
        <HistoryList type="POINT" />
      </div>
    </>
  );
};

export default PointListPage;
