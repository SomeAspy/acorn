// Code copied from Vesktop
// https://github.com/Vencord/Vesktop/blob/062b5366171918d03b5da7ba54834f4cd902e8ef/src/main/constants.ts#L64-L69

//SECTION - COPIED CODE
const VersionString = `AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome.split(".")[0]}.0.0.0 Safari/537.36`;
const BrowserUserAgents = {
	darwin: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ${VersionString}`,
	linux: `Mozilla/5.0 (X11; Linux x86_64) ${VersionString}`,
	windows: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) ${VersionString}`,
};
//!SECTION - COPIED CODE

export const BrowserUserAgent =
	BrowserUserAgents[(process.platform as "windows" | "darwin") || "linux"];
