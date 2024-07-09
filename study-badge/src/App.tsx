import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./router/Router";
import LoginUser from "../src/pages/LoginUser";
import SignUpUser from "../src/pages/SignUp";
import PasswordReset from "../src/pages/PasswordReset";
import KakaoLoginCallback from "./auth/kakao/KakaoLoginCallback";
import NaverLoginCallback from "./auth/naver/NaverLoginCallback";

function App() {
  return (
    <BrowserRouter>
      {/* Header(Nav) 컴포넌트 삽입 예정 */}
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
        </div>
      </section>
      {/* Footer 컴포넌트 삽입 예정 */}
    </BrowserRouter>
  );
}

export default App;