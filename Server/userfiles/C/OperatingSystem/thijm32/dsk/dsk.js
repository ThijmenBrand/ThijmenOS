// import { NO_USER_SIGNED_IN } from "../../../ProgramFiles/bin/errors/userErrors.js";
// import * as OS from "../../../ProgramFiles/bin/index.js";
// import { desktopElement, memoryKey } from "./constants.js";
// import FileIcon from "./fileIcon/fileIcon.js";

import { createWindow } from "../../../ProgramFiles/bin/index.js";

const windowId = await createWindow("C/OperatingSystem/thijm32/dsk/dsk.html", {
  windowTitle: "My new Window",
  fullScreen: true,
});
