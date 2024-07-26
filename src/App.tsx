import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useSSE } from "./hooks/useSSE";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";

function App() {
  const { refreshToken, refreshAccessToken, setField } = useAuthStore();

  useEffect(() => {
    console.log(location.origin);
    if (import.meta.env.DEV) {
      const storageToken = localStorage.getItem("accessToken");
      storageToken && setField("accessToken", storageToken);
    }
  }, [setField]);

  useEffect(() => {
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

  useSSE();

  return (
    <BrowserRouter>
      <Header />
      <section className="main min-h-screen flex justify-center items-center">
        <div className="w-[1025px] min-h-screen flex justify-center items-center">
          <Router />
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
