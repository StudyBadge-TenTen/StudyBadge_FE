import { useEffect, useState } from "react";
import { DATA_LENGTH_PER_PAGE, PAGE_COUNT } from "../../constants/page";
import { PaginationPropsType } from "../../types/pagination-type";

const Pagination = ({
  type,
  filter,
  setFilter,
  dataListLength,
  pageState,
  setPage,
  historyList,
}: PaginationPropsType): JSX.Element => {
  const [curPageGroup, setCurPageGroup] = useState(1);
  const [pageList, setPageList] = useState<number[]>([]);
  const totalPage = type === "CHANNEL" ? Math.ceil(dataListLength / DATA_LENGTH_PER_PAGE) : Number.MAX_SAFE_INTEGER;
  const lastPageGroup = type === "CHANNEL" ? Math.ceil(totalPage / DATA_LENGTH_PER_PAGE) : Number.MAX_SAFE_INTEGER;

  useEffect(() => {
    let newPageList = [];
    const lastPage = curPageGroup * PAGE_COUNT;
    const firstPage = lastPage - (PAGE_COUNT - 1);

    for (let page = firstPage; page <= lastPage; page++) {
      newPageList.push(page);
    }

    setPageList(() => newPageList);
  }, [curPageGroup]);

  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;

    if (target.classList.contains("prev-btn")) {
      if (curPageGroup === 1) return;
      else {
        setCurPageGroup((origin) => origin - 1);
      }
    } else if (target.classList.contains("next-btn")) {
      if (type === "CHANNEL") {
        if (curPageGroup === lastPageGroup) return;
        else {
          setCurPageGroup((origin) => origin + 1);
        }
      }
      if (type === "HISTORY") {
        if (!historyList || historyList.length === 0) return;
        else {
          setCurPageGroup((origin) => origin + 1);
        }
      }
    } else if (target.classList.contains("page-btn")) {
      if (type === "CHANNEL") {
        if (filter && setFilter) {
          setFilter({
            ...filter,
            page: Number(target.innerText),
          });
        }
      }
      if (type === "HISTORY" && setPage) {
        if (!historyList || historyList.length === 0) return;
        else setPage(() => Number(target.innerText));
      }
    }
  };

  return (
    <div>
      <button
        className={`prev-btn btn-blue rounded-r-none mr-1 ${curPageGroup === 1 && "cursor-default bg-Gray-2 hover:bg-Gray-2"}`}
        onClick={(e) => handlePageClick(e)}
      >{`<`}</button>
      {pageList.map((page) => (
        <button
          key={`page_${page}`}
          className={`page-btn btn-blue rounded-none mt-10 ${type === "CHANNEL" ? filter && page === filter.page && "bg-Blue-1" : pageState === page && "bg-Blue-1"}`}
          onClick={(e) => handlePageClick(e)}
        >
          {page}
        </button>
      ))}
      <button
        className={`next-btn btn-blue rounded-l-none ml-1 ${type === "CHANNEL" ? curPageGroup === lastPageGroup && "cursor-default bg-Gray-2 hover:bg-Gray-2" : (!historyList || historyList.length === 0) && "cursor-default bg-Gray-2 hover:bg-Gray-2"}`}
        onClick={(e) => handlePageClick(e)}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
