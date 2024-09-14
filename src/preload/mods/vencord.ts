import {ipcRenderer, webFrame} from "electron";

try {
    await ipcRenderer.invoke("getVencord").then(async (data: {js: string; css: string; enabled: boolean}) => {
        if (data.enabled) {
            await webFrame.executeJavaScript(data.js);
            webFrame.insertCSS(data.css);
        }
    });
} catch (error) {
    console.error(error);
}
