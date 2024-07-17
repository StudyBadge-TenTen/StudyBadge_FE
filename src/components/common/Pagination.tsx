import { useEffect, useState } from "react";
import { DATA_LENGTH_PER_PAGE, PAGE_COUNT } from "../../constants/page";
import { PaginationType } from "../../types/pagination-type";

const Pagination = ({ curPage, setCurPage, dataListLength }: PaginationType): JSX.Element => {
  const [curPageGroup, setCurPageGroup] = useState(1);
  const [pageList, setPageList] = useState<number[]>([]);
  const totalPage = Math.ceil(dataListLength / DATA_LENGTH_PER_PAGE);
  const lastPageGroup = Math.ceil(totalPage / DATA_LENGTH_PER_PAGE);

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
      if (curPageGroup === lastPageGroup) return;
      else {
        setCurPageGroup((origin) => origin + 1);
      }
    } else if (target.classList.contains("page-btn")) {
      setCurPage(() => Number(target.innerText));
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
          className={`page-btn btn-blue rounded-none mt-10 ${page === curPage && "bg-Blue-1"}`}
          onClick={(e) => handlePageClick(e)}
        >
          {page}
        </button>
      ))}
      <button
        className={`next-btn btn-blue rounded-l-none ml-1 ${curPageGroup === lastPageGroup && "cursor-default bg-Gray-2 hover:bg-Gray-2"}`}
        onClick={(e) => handlePageClick(e)}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
