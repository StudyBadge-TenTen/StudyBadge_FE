import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import Profile from "../pages/Profile";
import ChannelPage from "../pages/ChannelPage";
import ScheduleEditPage from "../pages/ScheduleEditPage";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/channel/:channelId" element={<ChannelPage />} />
      <Route path="/channel/:channelId/schedule_edit" element={<ScheduleEditPage />} />
    </Routes>
  );
};

export default Router;
