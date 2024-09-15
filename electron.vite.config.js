// @ts-check
import { defineConfig } from "electron-vite";

export default defineConfig(() => {
    return {
        main: {
        },
        preload: {
            build: {
                lib: {
                    entry: "src/preload/preload.mts",
                }
            }
        }
    }
})