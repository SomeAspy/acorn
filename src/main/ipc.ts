import {app, ipcMain} from "electron";
import {readFileSync} from "fs";
import {join} from "path";

ipcMain.handle("getShelter", () => {
    return readFileSync(join(app.getPath("userData"), "shelter.js"), {encoding: "utf8"});
});
