import { test } from "vitest";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8080", // 안될 경우 'http://127.0.0.1:8000', 이런식으로 IP 명시
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
