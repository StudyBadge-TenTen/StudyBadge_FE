import { test } from "vitest";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { find: "@", replacement: resolve(__dirname, "src") },
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
  },
  server: {
    proxy: {
      // "/api": {
      //   target: "https://study-badge.shop",
      //   changeOrigin: true,
      //   secure: true,
      // },
      "/api": {
        target: "http://localhost:8080", // 안될 경우 'http://127.0.0.1:8000', 이런식으로 IP 명시
        changeOrigin: true,
      },
    },
  },
});

// 서버 중단 - vercel.json에서 아래 코드 제거
// {
//   "source": "/api/:path*",
//   "destination": "https://study-badge.shop/:path*"
// },
// {
//   "source": "/api/:path*/",
//   "destination": "https://study-badge.shop/:path*/"
// }
