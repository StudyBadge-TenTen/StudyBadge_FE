import Card from "../components/main/Card";

const Main = (): JSX.Element => {
  // 페이지 폴더 컴포넌트들은 여기에 로직 없이
  // return에 컴포넌트들을 담아 페이지에 보여주는 용으로만 사용하기로 해요!
  // 이렇게 해야 나중에 해당 페이지에 속한 컴포넌트를 금방 찾아갈 수 있습니다!
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center">
      <div className="carousel w-full min-h-40 max-h-96 bg-Gray-1 flex justify-center items-center mb-10">carousel</div>
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
      <div className="study-list w-full px-8 my-20 flex flex-col justify-center items-center">
        <div className="text-3xl font-bold text-Blue-2 mb-10">스터디 채널</div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center">
            <span>방식</span>
            <button className="btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2">오프라인</button>
            <button className="btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1">온라인</button>
            {/* 아래 오프라인 클릭 시 지역 선택 드롭다운 렌더링할 코드 */}
            <div></div>
          </div>
          <div className="flex items-center">
            <span>상태</span>
            <button className="btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2">모집중</button>
            <button className="btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1">모집완료</button>
            {/* 아래 오프라인 클릭 시 지역 선택 드롭다운 렌더링할 코드 */}
            <div></div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span>카테고리</span>
            <button className="btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2">컴퓨터/IT/개발</button>
            <button className="btn-blue rounded-none text-xs md:text-sm break-keep ml-1">언어/어학</button>
            <button className="btn-blue rounded-none text-xs md:text-sm break-keep ml-1">취업/이직</button>
            <button className="btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1">자기계발</button>
          </div>
        </div>
        <div className="study-cards-container w-full flex flex-wrap">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Main;
