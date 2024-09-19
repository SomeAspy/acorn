import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { app } from "electron";
import { getConfig } from "../../shared/config.js";

async function fetchMod(fileName: string, url: string) {
	try {
		await fetch(url).then(async (data) => {
			if (data.ok) {
				await data.text().then((fileContent) => {
					writeFileSync(join(app.getPath("userData"), fileName), fileContent);
				});
			} else {
				throw new Error(`[FetchMods]: Failed to fetch ${fileName} from ${url}`);
			}
		});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchMods() {
	console.log("[FetchMods]: Fetching Shelter");
	await fetchMod(
		"shelter.js",
		"https://raw.githubusercontent.com/uwu/shelter-builds/main/shelter.js",
	);

	if (getConfig("mods").includes("vencord")) {
		console.log("[FetchMods]: Fetching Vencord");
		await fetchMod(
			"vencord.js",
			"https://github.com/Vendicated/Vencord/releases/download/devbuild/browser.js",
		);
		await fetchMod(
			"vencord.css",
			"https://github.com/Vendicated/Vencord/releases/download/devbuild/browser.css",
		);
	}
}
