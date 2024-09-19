export interface Config {
	fileExistsDoNotTouch?: true;
	channel: "stable" | "ptb" | "canary";
	multiInstance: boolean;
	mods: "vencord"[];
	tray: boolean;
}
