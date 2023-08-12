import * as OS from "../bin/index.js";

OS.startup(startup);

function startup(args) {
  OS.createWindow("C/ProgramFiles/taskManager/index.html", {
    title: "Task manager",
    height: 400,
    width: 700,
  });

  new OS.exit(1);
}
