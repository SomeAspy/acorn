import { app, Menu, nativeImage, Tray, type WebContents } from "electron";
import icon from "../../resources/placeholderTrayIcon.png?asset";

export function startTray(pageData: WebContents) {
	const tray = new Tray(icon as string);
	tray.setToolTip("Acorn");
	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: "Quit",
				click() {
					app.quit();
				},
			},
		]),
	);
	pageData.on("page-favicon-updated", (_, favicons) => {
		try {
			let favicon = nativeImage.createFromDataURL(favicons[0]!);
			if (process.platform === "win32") {
				favicon = favicon.resize({ height: 32 }); // Windows scaling disaster
			}
			tray.setImage(favicon);
		} catch {
			return; // Discord will send a URL before fully loaded
		}
	});
}
