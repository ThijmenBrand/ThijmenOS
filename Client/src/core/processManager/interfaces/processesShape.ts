import Exit from "@providers/error/systemErrors/Exit";
import MessageBus from "../ipc/messageBus";
import { Process } from "../processes/process";
import MqFlag from "../types/messageQueueFlags";

interface ProcessesShape {
  RegisterProcess(process: Process): void;
  FindProcess(pid: number): Process | Exit;
  RemoveProcess(pid: number): Exit;
  OpenMessageQueue(
    pid: number,
    name: string,
    args: MqFlag[],
    bufferSize?: number
  ): Exit | MessageBus;
  FreeMessageBus(id: number, pid: number): Exit;
  FindMessageBus(msgBusId: number): MessageBus | Exit;
  GetAllProcesses(): Array<Process>;
}

export default ProcessesShape;
