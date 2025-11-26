import { defineConfig } from "vite";

export default defineConfig({
  base: "/web-ai/transformersjs-audio-chat/",
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
