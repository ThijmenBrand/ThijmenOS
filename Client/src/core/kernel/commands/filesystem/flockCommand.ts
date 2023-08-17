import { ICommand } from "@ostypes/CommandTypes";
import { Process } from "@core/processManager/processes/process";

class FLock implements ICommand {
  private readonly _fileHandle: number;

  constructor(fileHandle: number) {
    this._fileHandle = fileHandle;
  }

  public async Handle(process: Process): Promise<string | number> {
    const fileHandle = process.fileHandles.find(
      (handle) => (handle.id = this._fileHandle)
    );

    if (!fileHandle) return -1;

    fileHandle.Lock();

    return 0;
  }
}

export default FLock;
