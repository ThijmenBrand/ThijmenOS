import MemoryMethodShape from "@core/memory/memoryMethodShape";
import { Process } from "@core/processManager/processes/process";
import javascriptOs from "@inversify/inversify.config";
import { ICommand } from "@ostypes/CommandTypes";
import { errors } from "../errors";
import types from "@ostypes/types";

class ReadMemory implements ICommand {
  private readonly _memory = javascriptOs.get<MemoryMethodShape>(types.Memory);

  private _memoryKey: string;

  constructor(memoryKey: string) {
    this._memoryKey = memoryKey;
  }

  public Handle(Process: Process): number | unknown {
    if (!this._memoryKey) {
      return errors.ParameterError;
    }

    const result = this._memory.LoadFromMemory(Process.pid, this._memoryKey);

    return result;
  }
}

export default ReadMemory;
