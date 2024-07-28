import ApplicationList from "@/components/profile/ApplicationList";
import PageScrollTop from "../components/common/PageScrollTop";

const ApplicationListPage = (): JSX.Element => {
  return (
    <>
      <PageScrollTop />
      <div className="w-full min-h-52 border border-solid border-Gray-3 rounded-[30px] p-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-Blue-2 my-10">스터디 신청내역</h3>
        <ApplicationList />
      </div>
    </>
  );
};

export default ApplicationListPage;
