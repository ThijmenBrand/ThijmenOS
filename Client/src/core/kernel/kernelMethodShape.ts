import { Process } from "@core/processManager/processes/process";
import { JsOsCommunicationMessage } from "./kernelTypes";
import { ICommand } from "@ostypes/CommandTypes";

export default interface KernelMethodShape {
  LoadKernel(): void;
  ProcessCommand(command: ICommand, process: Process): unknown;
  ProcessMethod(props: JsOsCommunicationMessage): void;
}
