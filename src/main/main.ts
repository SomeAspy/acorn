import {app} from "electron";
import {createDiscordWindow} from "./discord/discordWindow.js";
import "./startup.js";
import "./ipc.js";
import {fetchMods} from "./functions/fetchMods.js";

await fetchMods();

void app.whenReady().then(async () => {
    await createDiscordWindow();
});
