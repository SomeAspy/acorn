import {ipcRenderer, webFrame} from "electron";

try {
    await ipcRenderer.invoke("getShelter").then(async (shelter: string) => {
        await webFrame.executeJavaScript(shelter);
    });
} catch (error) {
    console.error(error)
}
