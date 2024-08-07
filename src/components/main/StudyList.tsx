import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import Card from "./Card";
import { initialFilter, useFilterStore, useStudyListStore } from "../../store/study-store";
import { getStudyList } from "../../services/study-list-api";
import { useLocation, useNavigate, useParams } from "react-router";
import Filter from "./Filter";
import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "../skeleton/CardSkeleton";
import { StudyListResponseType } from "../../types/study-channel-type";
import { skeletonList } from "@/constants/skeletonList";
// import { useAuthStore } from "@/store/auth-store";

const StudyList = (): JSX.Element => {
  // const { accessToken } = useAuthStore();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { studyList, setStudyList } = useStudyListStore();
  const { filter, setFilter } = useFilterStore();
  const [openOrderFilter, setOpenOrderFilter] = useState(false);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const { data, error, isLoading } = useQuery<StudyListResponseType, Error>({
    queryKey: ["studyList", filter.category, filter.keyword, filter.order, filter.page, filter.status, filter.type],
    queryFn: () => getStudyList(filter),
  });
  const element = document.getElementById("root");

  // useEffect(() => {
  //   console.log("Current accessToken in state:", accessToken);
  // }, [accessToken]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 필터가 바뀔 때마다 최상단으로 이동하지 않도록
  useEffect(() => {
    if (
      location.pathname === "/" ||
      (params.type === "ALL" &&
        params.status === "ALL" &&
        params.category === "ALL" &&
        params.keyword === "NONE" &&
        params.order === "RECENT" &&
        params.page === "1")
    ) {
      setFilter(initialFilter);
      window.scrollTo(0, 0);
    } else {
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    }
  }, [location, params, element]);

  // 필터와 키워드 상태가 바뀔 때마다
  useEffect(() => {
    const { type, category, status, order, page, keyword } = filter;
    const newLocation = `/${type ?? "ALL"}/${status ?? "ALL"}/${category ?? "ALL"}/${keyword ?? "NONE"}/${order ?? "RECENT"}/${page}`;

    if (data) {
      setStudyList(data.studyChannels);
      setTotalDataLength(() => data.totalCount);
    }

    if (error) {
      console.log("error: ", error);
    }

    navigate(newLocation);
  }, [data, filter]);

  const handleOrderClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === "recentOrder") {
      setFilter({ ...filter, order: "RECENT" });
    } else {
      setFilter({ ...filter, order: "VIEW_COUNT" });
    }
  };

  return (
    <div
      id="studyListContainer"
      className="study-list w-full px-8 my-20 mt-40 flex flex-col justify-center items-center scroll-mt-32"
    >
      <h2 className="text-3xl font-bold text-Blue-2 mb-10">스터디 채널</h2>
      <Filter />
      <div className="order-container w-full flex justify-end px-8 mb-4 relative">
        <div
          className="bg-white border border-solid border-Gray-2 px-2 py-1 rounded-[10px] flex items-center cursor-pointer"
          onClick={() => setOpenOrderFilter((origin) => !origin)}
        >
          {/* 최신순/조회순 두 가지 정렬 */}
          {filter.order === "RECENT" ? "최신순" : "조회순"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill text-Gray-2 ml-2"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        {/* 클릭하면 뜨게 할 선택드롭다운 */}
        <div
          className={`${!openOrderFilter && "hidden"} absolute top-8 w-[84px] bg-white border border-solid border-Gray-2 rounded-[10px] flex flex-col`}
        >
          <div
            id="recentOrder"
            className={`w-full px-2 py-1 border-b border-solid border-Gray-2 rounded-t-[10px] text-center hover:bg-Gray-1 cursor-pointer ${filter.order === "RECENT" && "bg-Gray-1"}`}
            onClick={(e) => {
              setOpenOrderFilter(() => false);
              handleOrderClick(e);
            }}
          >
            최신순
          </div>
          <div
            id="viewCountOrder"
            className={`w-full px-2 py-1 text-center rounded-b-[10px] hover:bg-Gray-1 cursor-pointer ${filter.order === "VIEW_COUNT" && "bg-Gray-1"}`}
            onClick={(e) => {
              setOpenOrderFilter(() => false);
              handleOrderClick(e);
            }}
          >
            조회순
          </div>
        </div>
      </div>
      <div className="study-cards-container w-full flex justify-center items-center flex-wrap">
        {/* 받은 채널 리스트의 길이만큼 map을 이용해 Card 생성 or 스켈레톤 렌더링 */}
        {isLoading && skeletonList.map((card) => <CardSkeleton key={card} />)}
        {!isLoading &&
          data &&
          Array.isArray(studyList) &&
          (studyList.length === 0 ? (
            <div>조건에 해당하는 스터디채널이 없습니다.</div>
          ) : (
            studyList.map((studyChannel) => <Card studyInfo={studyChannel} key={studyChannel.studyChannelId} />)
          ))}
      </div>
      <Pagination type="CHANNEL" filter={filter} setFilter={setFilter} dataListLength={totalDataLength} />
    </div>
  );
};

export default StudyList;
