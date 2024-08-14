import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { worker } from "./mocks/worker.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setAccessToken, setRefreshToken } from "./utils/cookie.ts";

worker.start();
setAccessToken(import.meta.env.VITE_APP_ACCESSTOKEN);
setRefreshToken(import.meta.env.VITE_APP_REFRESHTOKEN);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
