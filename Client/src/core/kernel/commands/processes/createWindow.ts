import { Process } from "@core/processManager/processes/process";
import { ICommand } from "@ostypes/CommandTypes";
import { WindowOptions } from "@ostypes/WindowTypes";
import WindowBuilder from "@providers/gui/applicationWindow/windowConstructor";

interface CreateWindowCommand {
  path: string;
  windowOptions: WindowOptions;
}

class CreateWindow implements ICommand {
  private readonly _command: CreateWindowCommand;

  constructor(command: CreateWindowCommand) {
    this._command = command;
  }

  async Handle(process: Process): Promise<number> {
    const windowBuilder = new WindowBuilder(
      this._command.path,
      process.pid,
      this._command.windowOptions
    );

    const appWindow = await windowBuilder.Construct();

    process.AddResource.appWindow(appWindow);

    return appWindow.id;
  }
}

export default CreateWindow;
