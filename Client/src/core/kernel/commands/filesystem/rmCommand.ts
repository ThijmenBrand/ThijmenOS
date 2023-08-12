import { Path, Permissions } from "@thijmen-os/common";
import { ICommand } from "@ostypes/CommandTypes";
import { RemoveFile } from "@providers/filesystemEndpoints/filesystem";
import javascriptOs from "@inversify/inversify.config";
import types from "@ostypes/types";
import FileSystem from "@core/fileSystem/interfaces/fileSystem";
import { FileAccessOptions } from "@core/fileSystem/enums/fileAccess";

class RmCommand implements ICommand {
  private readonly _fileSystem = javascriptOs.get<FileSystem>(types.FileSystem);

  private readonly _props: Path;

  readonly requiredPermission = Permissions.fileSystem;
  private readonly _access = FileAccessOptions.w;

  constructor(props: Path) {
    this._props = props;
  }

  public async Handle(): Promise<number> {
    const validated = this._fileSystem.ValidateAccess(
      this._props,
      this._access
    );
    if (!validated) -1;

    const result = await RemoveFile(this._props);

    if (!result) return -1;

    return 0;
  }
}

export default RmCommand;
