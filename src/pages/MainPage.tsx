import Card from "../components/main/Card";

const Main = (): JSX.Element => {
  // 페이지 폴더 컴포넌트들은 여기에 로직 없이
  // return에 컴포넌트들을 담아 페이지에 보여주는 용으로만 사용하기로 해요!
  // 이렇게 해야 나중에 해당 페이지에 속한 컴포넌트를 금방 찾아갈 수 있습니다!
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="carousel w-full h-96 bg-Gray-1 flex justify-center items-center my-20">carousel</div>
      <div className="create-study w-full h-96 flex flex-col sm:flex-row px-8">
        <div className="w-full sm:w-1/2 h-full flex flex-col justify-center items-center sm:items-start text-Blue-2">
          <p className="text-2xl sm:text-3xl font-bold mb-4">스터디 그룹을 생성하세요!</p>
          <p className="mb-8 text-center sm:text-start break-keep">
            지금 바로 새로운 스터디 그룹을 생성하고, 멤버들을 모아보세요!
          </p>
          <button className="btn-blue w-fit">스터디 생성하기</button>
        </div>
        <div className="w-full sm:w-1/2 h-full bg-Gray-2 flex justify-center items-center mt-4 sm:mt-0 sm:ml-4">
          image
        </div>
      </div>
      <div className="study-list w-full px-8 my-20 mt-40 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-Blue-2 mb-10">스터디 채널</h2>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-20">
          <div className="flex flex-col justify-center items-center">
            <span className="text-Gray-4">방식</span>
            <div className="flex items-center mt-2">
              <button id="offlineFilter" className="btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2">
                오프라인
              </button>
              <button id="onlineFilter" className="btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1">
                온라인
              </button>
            </div>
            {/* 아래 오프라인 클릭 시 지역 선택 드롭다운 렌더링할 코드 */}
            <div></div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-Gray-4">상태</span>
            <div className="flex items-center mt-2">
              <button id="recruitingFilter" className="btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2">
                모집중
              </button>
              <button id="recruitedFilter" className="btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1">
                모집완료
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
            <span className="text-Gray-4">카테고리</span>
            <div className="flex flex-wrap sm:flex-nowrap justify-center items-center mt-2">
              <button id="computerCategory" className="btn-blue sm:rounded-r-none text-xs md:text-sm break-keep ml-2">
                컴퓨터/IT/개발
              </button>
              <button id="languageCategory" className="btn-blue sm:rounded-none text-xs md:text-sm break-keep ml-1">
                언어/어학
              </button>
              <button id="employmentCategory" className="btn-blue sm:rounded-none text-xs md:text-sm break-keep ml-1">
                취업/이직
              </button>
              <button
                id="selfDevelopCategory"
                className="btn-blue sm:rounded-l-none text-xs md:text-sm break-keep ml-1 mt-2 sm:mt-0"
              >
                자기계발
              </button>
            </div>
          </div>
        </div>
        <div className="study-cards-container w-full flex justify-center items-center flex-wrap">
          {/* 받은 채널 리스트의 길이만큼 map을 이용해 Card 생성 */}
          <Card studyInfo={""} />
          <Card studyInfo={""} />
          <Card studyInfo={""} />
          <Card studyInfo={""} />
          <Card studyInfo={""} />
          <Card studyInfo={""} />
        </div>
        {/* 페이지네이션 컴포넌트 */}
      </div>
    </div>
  );
};

export default Main;
