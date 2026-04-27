import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://north-stars.app",
      dynamicRoutes: [
        "/",
        "/login",
        "/register",
        "/forgot-password",
        "/dashboard",
        "/chat",
        "/universities",
        "/profile",
        "/programs",
        "/prep",
        "/report-issue",
      ],
      // Add this line if it's still not generating
      outDir: "dist",
    }),
  ],
});
