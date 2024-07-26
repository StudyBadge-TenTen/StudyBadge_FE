import { Link } from "react-router-dom";

const Error = (): JSX.Element => {
  // 함수 작성 금지

  return (
    <div className="flex-col mt-20 sm:mt-28 mb-48">
      <h1 className="text-center text-4xl sm:text-9xl font-bold">404</h1>
      <p className="mt-4 mb-5 sm:mb-10 text-center text-lg sm:text-3xl">페이지를 찾을 수 없습니다.</p>
      <div className="text-center">
        <Link to="/" className="btn-blue sm:text-xl">
          메인으로
        </Link>
      </div>
    </div>
  );
};

export default Error;
