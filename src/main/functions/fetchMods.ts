import {app} from "electron";
import {writeFileSync} from "fs";
import {join} from "path";

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
    await fetchMod("shelter.js", "https://raw.githubusercontent.com/uwu/shelter-builds/main/shelter.js");
}
