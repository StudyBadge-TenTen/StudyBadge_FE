import { useEffect, useState } from "react";
import { PAGE_COUNT } from "../../constants/page";

const Pagination = ({
  curPage,
  setCurPage,
}: {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
  // PAGE_COUNT = 5 (한 번에 노출할 페이지버튼 개수)
  // DATA_LENGTH_PER_PAGE = 6 (한 페이지당 보여질 데이터 개수)
  // 예)
  // dataList length === 43
  // const lastPageGroup = 2; // 전체 dataList길이에 따라 달라져야 함
  // totalPage = Math.ceil(dataList length / DATA_LENGTH_PER_PAGE) = 8
  // lastPageGroup = Math.ceil(totalPage / DATA_LENGTH_PER_PAGE) = 2
  // curPageGroup = 이전/다음 버튼 클릭 시 변화
  // pageList = [1,2,3,4,5] [6,7,8,9,10] [11,12,13,14,15]
  const [curPageGroup, setCurPageGroup] = useState(1);
  const [pageList, setPageList] = useState<number[]>([]);

  useEffect(() => {
    let newPageList = [];
    const lastPage = curPageGroup * PAGE_COUNT;
    const firstPage = lastPage - (PAGE_COUNT - 1);

    for (let page = firstPage; page <= lastPage; page++) {
      newPageList.push(page);
    }

    setPageList(() => newPageList);
  }, [curPageGroup]);

  return (
    <div>
      <button className={`btn-blue rounded-r-none mr-1`}>{`<`}</button>
      {pageList.map((page) => (
        <button key={`page_${page}`} className={`btn-blue rounded-none ${page === curPage && "bg-Blue-1"} mt-10`}>
          {page}
        </button>
      ))}
      <button className={`btn-blue rounded-l-none ml-1`}>{`>`}</button>
    </div>
  );
};

export default Pagination;
