import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import Error from "../pages/Error";
import ChannelPage from "../pages/ChannelPage";
import ScheduleEditPage from "../pages/ScheduleEditPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PasswordReset from "../pages/PasswordReset";
import SocialLoginCallback from "../components/layout/login/SocialLoginCallback";
import ProfilePage from "../pages/ProfilePage";
import PaymentListPage from "../pages/PaymentListPage";
import Success from "../components/payment/Success";
import Fail from "../components/payment/Fail";
import CreateStudy from "../pages/CreateStudy";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/PasswordReset" element={<PasswordReset />} />
      <Route path="/SocialLoginCallback" element={<SocialLoginCallback />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/payment" element={<ProfilePage />} />
      <Route path="/paymentSuccess/*" element={<Success />} />
      <Route path="/paymentFail/*" element={<Fail />} />
      <Route path="/paymentList" element={<PaymentListPage />} />
      {/* 임시 채널 테스트용 경로 */}
      <Route path="/channel" element={<ChannelPage />} />
      {/* 임시 채널 테스트용 경로 */}
      <Route path="/channel/:channelId" element={<ChannelPage />} />
      <Route path="/channel/:channelId/schedule_edit" element={<ScheduleEditPage />} />
      <Route path="/createStudy" element={<CreateStudy />} />
    </Routes>
  );
};

export default Router;
