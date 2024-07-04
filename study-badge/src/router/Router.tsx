import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import ChannelPage from "../pages/ChannelPage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      {/* 테스트용 라우트 경로 임시 추가 */}
      <Route path="/channel/:id" element={<ChannelPage />} />
    </Routes>
  );
};

export default Router;
