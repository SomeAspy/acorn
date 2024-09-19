import { defineConfig, externalizeDepsPlugin } from "electron-vite";

export default defineConfig(() => {
	return {
		main: {
			plugins: [externalizeDepsPlugin({ include: ["ws"] })],
		},
		preload: {
			build: {
				lib: {
					entry: "src/preload/preload.mts",
				},
			},
		},
	};
});
