import {app} from "electron";
import {createDiscordWindow} from "./discord/discordWindow.js";
import "./startup.js";
import "./ipc.js";
import {fetchMods} from "./functions/fetchMods.js";
import {startTray} from "./tray.js";
import {getConfig} from "../shared/config.js";

await fetchMods();

void app.whenReady().then(async () => {
    const Acorn = await createDiscordWindow();
    if (getConfig("tray")) {
        startTray(Acorn.webContents);
    }
});
