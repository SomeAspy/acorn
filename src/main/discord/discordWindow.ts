import { join } from "node:path";
import RPCServer from "arrpc";
import { BrowserWindow } from "electron";
import { getConfig } from "../../shared/config.js";

export async function createDiscordWindow() {
	const window = new BrowserWindow({
		webPreferences: {
			backgroundThrottling: false,
			preload: join(import.meta.dirname, "../preload/preload.mjs"),
			nodeIntegration: true,
		},
		autoHideMenuBar: true,
	});

	const channel = getConfig("channel");
	if (channel === "stable") {
		await window.loadURL("https://discord.com/app");
	} else {
		await window.loadURL(`https://${getConfig("channel")}.discord.com/app`);
	}

	new RPCServer();

	//SECTION - Block Analytics
	window.webContents.session.webRequest.onBeforeRequest(
		{
			urls: [
				"https://*/api/v*/science",
				"https://sentry.io/*",
				"https://*.nel.cloudflare.com/*",
				"https://discord.com/assets/sentry*",
			],
		},
		(_, callback) => {
			callback({ cancel: true });
		},
	);
	return window;
}
