import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import Profile from "../pages/Profile";
import ChannelPage from "../pages/ChannelPage";
import ScheduleEditPage from "../pages/ScheduleEditPage";
import LoginUser from "../pages/LoginUser";
import SignUpUser from "../pages/SignUp";
import PasswordReset from "../pages/PasswordReset";
import KakaoLoginCallback from "../auth/kakao/KakaoLoginCallback";
import NaverLoginCallback from "../auth/naver/NaverLoginCallback";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/SignUp" element={<SignUpUser />} />
      <Route path="/PasswordReset" element={<PasswordReset />} />
      <Route path="/auth/kakao/KakaoLoginCallback" element={<KakaoLoginCallback />} />
      <Route path="/auth/naver/NaverLoginCallback" element={<NaverLoginCallback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/channel/:channelId" element={<ChannelPage />} />
      <Route path="/channel/:channelId/schedule_edit" element={<ScheduleEditPage />} />
    </Routes>
  );
};

export default Router;
