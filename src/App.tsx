import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useSSE } from "./hooks/useSSE";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";
import useLoginFailed from "./hooks/useLoginFailed";
import { getCookie } from "./utils/get-cookie";

function App() {
  const { refreshAccessToken, setField } = useAuthStore();

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");

    console.log("refreshToken: ", refreshToken);
    if (refreshToken) {
      const initAuth = async () => {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error("Failed to refresh access token on load:", error);
        }
      };

      initAuth();
    }
  }, [refreshAccessToken]);

  useEffect(() => {
    // if (import.meta.env.DEV) {
    //   const storageToken = sessionStorage.getItem("accessToken");
    //   if (storageToken) {
    //     setField("accessToken", storageToken);
    //   }
    // }
  }, [setField]);

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
