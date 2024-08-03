import CREATE_STUDY_SVG from "../assets/image/CREATE_STUDY_SVG.svg";
import StudyList from "../components/main/StudyList";
import { Link } from "react-router-dom";
import MainCarousel from "../components/common/Carousel";

const Main = (): JSX.Element => {
  // 함수 작성 금지

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <MainCarousel />
      <div className="create-study w-full h-96 flex flex-col sm:flex-row px-8">
        <div className="w-full sm:w-1/2 h-full flex flex-col justify-center items-center sm:items-start text-Blue-2">
          <p className="text-2xl sm:text-3xl font-bold mb-4">스터디 그룹을 생성하세요!</p>
          <p className="mb-8 text-center sm:text-start break-keep">
            지금 바로 새로운 스터디 그룹을 생성하고, 멤버들을 모아보세요!
          </p>
          <Link to={"/createStudy"} className="btn-blue w-fit">
            스터디 생성하기
          </Link>
        </div>
        <div className="w-full sm:w-1/2 h-full bg-Gray-2 flex justify-center items-center mt-4 sm:mt-0 sm:ml-4">
          <img src={CREATE_STUDY_SVG} alt="스터디 일러스트" />
        </div>
      </div>
      <StudyList />
    </div>
  );
};

export default Main;
