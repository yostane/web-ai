import { defineConfig } from "vite";

export default defineConfig({
  base: "/web-ai/opencvjs-demo/",
  build: {
    chunkSizeWarningLimit: 15000,
  },
});
