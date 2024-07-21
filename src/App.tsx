import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useSSE } from "./hooks/useSSE";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";

function App() {
  useSSE();
  const { refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.error("Failed to refresh access token on load:", error);
      }
    };

    initAuth();
  }, [useSSE, refreshAccessToken]);

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
