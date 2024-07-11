import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
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
