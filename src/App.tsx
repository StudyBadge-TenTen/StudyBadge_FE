import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useSSE } from "./hooks/useSSE";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";
import useLoginFailed from "./hooks/useLoginFailed";
import { getRefreshToken } from "./utils/cookie";

function App() {
  const { refreshAccessToken } = useAuthStore();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (refreshToken) {
      const reAuth = async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error("Failed to refresh access token on load:", error);
        }
      };
      reAuth();
    }
  }, [refreshAccessToken]);

  useLoginFailed();
  useSSE();

  return (
    <BrowserRouter>
      <div id="topContainer" className="w-screen h-screen relative">
        <Header />
        <section className="main min-h-screen flex justify-center items-center pt-36">
          <div className="w-[1025px] min-h-screen flex justify-center items-center">
            <Router />
          </div>
        </section>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
