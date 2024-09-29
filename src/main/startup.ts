// To be run at every startup

import { app } from "electron";
import { getConfig } from "../shared/config.js";
app.setPath("sessionData", `${app.getPath("userData")}/sessionData`);

getConfig("fileExistsDoNotTouch");
