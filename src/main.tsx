import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { worker } from "./mocks/worker.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// if (import.meta.env.DEV) {
//   worker.start();
// }

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
