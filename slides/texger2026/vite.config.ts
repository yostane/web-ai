import { defineConfig } from "vite";

export default defineConfig({
	base: "/web-ai/slides-fblille2026/",
	server: {
		proxy: {
			"/web-ai/seamless-international-chat/": {
				target: "http://localhost:5173/web-ai/seamless-international-chat/",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/web-ai\/seamless-international-chat/, ""),
			},
		},
	},
});
