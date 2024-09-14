import {app, ipcMain} from "electron";
import {readFileSync} from "fs";
import {join} from "path";
import {getConfig} from "../shared/config.js";

ipcMain.handle("getShelter", () => {
    return readFileSync(join(app.getPath("userData"), "shelter.js"), {encoding: "utf8"});
});

ipcMain.handle("getVencord", () => {
    return {
        js: readFileSync(join(app.getPath("userData"), "vencord.js"), {encoding: "utf8"}),
        css: readFileSync(join(app.getPath("userData"), "vencord.css"), {encoding: "utf8"}),
        enabled: getConfig("mods").includes("vencord")
    };
});
