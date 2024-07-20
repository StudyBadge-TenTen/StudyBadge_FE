import { useFilterStore } from "../../store/study-store";

const Filter = (): JSX.Element => {
  const { filter, setFilter } = useFilterStore();

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;

    switch (target.id) {
      case "offlineFilter":
        filter.type === "OFFLINE" ? setFilter({ ...filter, type: "" }) : setFilter({ ...filter, type: "OFFLINE" });
        break;
      case "onlineFilter":
        filter.type === "ONLINE" ? setFilter({ ...filter, type: "" }) : setFilter({ ...filter, type: "ONLINE" });
        break;
      case "recruitingFilter":
        filter.status === "RECRUITING"
          ? setFilter({ ...filter, status: "" })
          : setFilter({ ...filter, status: "RECRUITING" });
        break;
      case "recruitedFilter":
        filter.status === "RECRUIT_COMPLETED"
          ? setFilter({ ...filter, status: "" })
          : setFilter({ ...filter, status: "RECRUIT_COMPLETED" });
        break;
      case "computerCategory":
        filter.category === "IT" ? setFilter({ ...filter, category: "" }) : setFilter({ ...filter, category: "IT" });
        break;
      case "languageCategory":
        filter.category === "LANGUAGE"
          ? setFilter({ ...filter, category: "" })
          : setFilter({ ...filter, category: "LANGUAGE" });
        break;
      case "employmentCategory":
        filter.category === "EMPLOYMENT"
          ? setFilter({ ...filter, category: "" })
          : setFilter({ ...filter, category: "EMPLOYMENT" });
        break;
      case "selfDevelopCategory":
        filter.category === "SELF_DEVELOPMENT"
          ? setFilter({ ...filter, category: "" })
          : setFilter({ ...filter, category: "SELF_DEVELOPMENT" });
        break;
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-20">
      <div className="flex flex-col justify-center items-center">
        <span className="text-Gray-4">방식</span>
        <div className="flex items-center mt-2">
          <button
            id="offlineFilter"
            className={`btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2 ${filter.type === "OFFLINE" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            오프라인
          </button>
          <button
            id="onlineFilter"
            className={`btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1 ${filter.type === "ONLINE" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            온라인
          </button>
        </div>
        {/* 아래 오프라인 클릭 시 지역 선택 드롭다운 렌더링할 코드 */}
        <div></div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-Gray-4">상태</span>
        <div className="flex items-center mt-2">
          <button
            id="recruitingFilter"
            className={`btn-blue rounded-r-none text-xs md:text-sm break-keep ml-2 ${filter.status === "RECRUITING" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            모집중
          </button>
          <button
            id="recruitedFilter"
            className={`btn-blue rounded-l-none text-xs md:text-sm break-keep ml-1 ${filter.status === "RECRUIT_COMPLETED" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            모집완료
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 md:mt-0">
        <span className="text-Gray-4">카테고리</span>
        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center mt-2">
          <button
            id="computerCategory"
            className={`btn-blue sm:rounded-r-none text-xs md:text-sm break-keep ml-2 ${filter.category === "IT" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            컴퓨터/IT/개발
          </button>
          <button
            id="languageCategory"
            className={`btn-blue sm:rounded-none text-xs md:text-sm break-keep ml-1 ${filter.category === "LANGUAGE" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            언어/어학
          </button>
          <button
            id="employmentCategory"
            className={`btn-blue sm:rounded-none text-xs md:text-sm break-keep ml-1 ${filter.category === "EMPLOYMENT" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            취업/이직
          </button>
          <button
            id="selfDevelopCategory"
            className={`btn-blue sm:rounded-l-none text-xs md:text-sm break-keep ml-1 mt-2 sm:mt-0 ${filter.category === "SELF_DEVELOPMENT" && "bg-Blue-1"}`}
            onClick={(e) => handleFilterClick(e)}
          >
            자기계발
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
