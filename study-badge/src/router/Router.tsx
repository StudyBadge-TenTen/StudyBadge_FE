import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import Profile from "../pages/Profile";
import ChannelPage from "../pages/ChannelPage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/channel" element={<ChannelPage />} />
    </Routes>
  );
};

export default Router;
