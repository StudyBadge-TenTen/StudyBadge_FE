import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./router/Router";
import LoginUser from "../src/pages/LoginUser";
import SignUpUser from "../src/pages/SignUp";
import PasswordReset from "../src/pages/PasswordReset";
import KakaoLoginCallback from "../src/auth/kakao/KakaoLoginCallback";
import NaverLoginCallback from "../src/auth/naver/NaverLoginCallback";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="main min-h-96 flex justify-center items-center">
        <div className="w-[1025px] min-h-96 flex justify-center items-center">
          <Routes>
            <Route path="/*" element={<Router />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/SignUp" element={<SignUpUser />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/auth/kakao/KakaoLoginCallback" element={<KakaoLoginCallback />} />
            <Route path="/auth/naver/NaverLoginCallback" element={<NaverLoginCallback />} />
          </Routes>
          <Router />
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;