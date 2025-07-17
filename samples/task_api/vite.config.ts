// vite.config.js
import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://mattrossman.com/2024/03/15/https-with-the-vite-development-server
export default defineConfig({
  // plugins: [basicSsl()],
});
