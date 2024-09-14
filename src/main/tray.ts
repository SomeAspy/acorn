import {app, Menu, nativeImage, Tray, type WebContents} from "electron";
import icon from "../../resources/placeholderTrayIcon.png?asset";

export function startTray(pageData: WebContents) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const tray = new Tray(icon as string);
    tray.setToolTip("Acorn");
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: "Quit",
                click() {
                    app.quit();
                }
            }
        ])
    );
    pageData.on("page-favicon-updated", (_, favicons) => {
        try {
            tray.setImage(nativeImage.createFromDataURL(favicons[0]!));
        } catch {
            return; // NOTE - Discord will send a URL before fully loaded
        }
    });
}
