import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default Router;
