import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      {/* Header(Nav) 컴포넌트 삽입 예정 */}
      <section className="main min-h-96 flex justify-center items-center">
        <div className="w-[80vw] min-h-96 flex justify-center items-center">
          <Router />
        </div>
      </section>
      {/* Footer 컴포넌트 삽입 예정 */}
    </BrowserRouter>
  );
}

export default App;
