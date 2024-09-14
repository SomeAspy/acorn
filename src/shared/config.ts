import {app} from "electron";
import {Config} from "../@types/config.js";
import {readFileSync, writeFileSync} from "fs";

const configLocation = `${app.getPath("userData")}/config.json`;

function makeConfig() {
    const config = {
        fileExistsDoNotTouch: true,
        channel: "stable",
        multiInstance: false,
        mods: ["vencord"],
        autoHideMenuBar: true
    } as Config;
    writeFileSync(configLocation, JSON.stringify(config, null, 2), {encoding: "utf8", flag: "w"});
}

function readConfig() {
    try {
        const config = JSON.parse(readFileSync(configLocation, {encoding: "utf8", flag: "r"})) as Config;
        if (!config.fileExistsDoNotTouch) {
            throw SyntaxError("fileExistsDoNotTouch is not as expected");
        }
        return config;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.startsWith("ENOENT")) {
                console.error("[Config]: File does not exist!");
            } else if (error instanceof SyntaxError) {
                console.error("[Config]: File is malformed!");
            } else {
                throw error;
            }
        }
        makeConfig();
        console.log("[Config]: Reset to defaults!");
        return readConfig();
    }
}

export function setConfig<ConfigKey extends keyof Config>(key: ConfigKey, value: Config[ConfigKey]) {
    readConfig()[key] = value;
}

export function getConfig<ConfigKey extends keyof Config>(key: ConfigKey) {
    return readConfig()[key];
}
