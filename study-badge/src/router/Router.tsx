import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import Calendar from "../components/calendar/Calendar";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/calendar" element={<Calendar />} /> {/* 테스트용 라우트 */}
    </Routes>
  );
};

export default Router;
