import {BrowserWindow} from "electron";
import {getConfig} from "../../shared/config.js";
import { join } from "path";

export async function createDiscordWindow() {
    const window = new BrowserWindow({
        webPreferences: {
            backgroundThrottling: false,
            preload: join(import.meta.dirname, "../preload/preload.mjs"),
            nodeIntegration: true
        },
        autoHideMenuBar: getConfig("autoHideMenuBar")
    });

    const channel = getConfig("channel");
    if (channel === "stable") {
        await window.loadURL(`https://discord.com/app`);
    } else {
        await window.loadURL(`https://${getConfig("channel")}.discord.com/app`);
    }

    //!SECTION Block Analytics
    window.webContents.session.webRequest.onBeforeRequest(
        {
            urls: [
                "https://*/api/v*/science",
                "https://sentry.io/*",
                "https://*.nel.cloudflare.com/*",
                "https://discord.com/assets/sentry*"
            ]
        },
        (_, callback) => {
            callback({cancel: true});
        }
    );
}
