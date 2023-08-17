/* eslint-disable no-debugger */
import { ProcessState } from "../types/processState";
import { GenerateId } from "@utils/generatePid";
import javascriptOs from "@inversify/inversify.config";
import types from "@ostypes/types";
import Thread from "./thread";
import ProcessesShape from "../interfaces/processesShape";
import { success } from "@core/kernel/commands/errors";
import File from "../../fileSystem/models/file";
import Metadata from "../types/processMetadata";
import MemoryMethodShape from "@core/memory/memoryMethodShape";
import Window from "@providers/gui/applicationWindow/applicationWindow";
import KernelMethodShape from "@core/kernel/kernelMethodShape";
import MqFlag from "../types/messageQueueFlags";
import Exit from "@providers/error/systemErrors/Exit";

export class Process {
  private readonly _processes = javascriptOs.get<ProcessesShape>(
    types.ProcessManager
  );
  private readonly _memory = javascriptOs.get<MemoryMethodShape>(types.Memory);

  protected readonly _kernel = javascriptOs.get<KernelMethodShape>(
    types.Kernel
  );

  pid: number;
  name: string;
  location: string;

  parentPid?: number;
  childPids: Array<number> = [];
  code: Thread;
  state: ProcessState;
  exitCode: number;

  messageBusses: Array<number> = [];
  fileHandles: Array<File> = [];
  memoryAllocations: Array<string> = [];
  windows: Array<Window> = [];

  constructor(name: string, location: string, parentPid?: number) {
    this.pid = GenerateId();
    this.state = ProcessState.New;
    this.exitCode = -1;
    this.code = new Thread(location);
    this.parentPid = parentPid;
    this.name = name;
    this.location = location;
  }

  public Initialise(args?: string): Exit | number {
    this.RegisterProcess();

    this.ListenToSysCalls(this.code.worker);

    const messageQueue = this._processes.OpenMessageQueue(this.pid, this.name, [
      MqFlag.CREATE,
      MqFlag.RDWR,
    ]);

    if (messageQueue instanceof Exit)
      return new Exit(-1, "Could not open message queue on default namespace");

    this.AddResource.messageBus(messageQueue.messageBusId);

    const metadata: Metadata = {
      parentPid: this.parentPid,
    };

    this.Startup(metadata, args);

    return 0;
  }

  private Startup(metadata: Metadata, args?: string): number {
    const code = this.code;

    code.Message({
      id: "startup",
      data: {
        metadata: metadata,
        args: args,
      },
    });

    return success;
  }

  private RegisterProcess() {
    if (!this.code) {
      return;
    }

    this._processes.RegisterProcess(this);
  }

  public get AddResource() {
    const childProcess = (pid: number) => {
      this.childPids.push(pid);
    };

    const appWindow = (applicationWindow: Window) => {
      window.addEventListener("message", ({ data }) => {
        console.log(data);
        if (Number(data.pid) !== this.pid || data.method === "startup") return;
        this._kernel.ProcessMethod({
          origin: this,
          pid: this.pid,
          ...data,
        });
      });

      //TODO: Create propper startup for window
      applicationWindow.OnLoad(() => {
        applicationWindow.Message({
          id: "startup",
          data: "",
        });
      });

      this.windows.push(applicationWindow);
    };

    const messageBus = (id: number) => {
      this.messageBusses.push(id);
    };

    const file = (file: File) => {
      this.fileHandles.push(file);
    };

    const memoryAllocation = (key: string) => {
      this.memoryAllocations.push(key);
    };

    return { childProcess, appWindow, messageBus, file, memoryAllocation };
  }

  public FreeResources() {
    this.messageBusses.forEach((messageBus) =>
      this._processes.FreeMessageBus(messageBus, this.pid)
    );
    this.messageBusses = [];

    this.fileHandles.forEach((file) => file.Free());
    this.fileHandles = [];

    this.memoryAllocations.forEach((key) => this._memory.DeAllocateMemory(key));
    this.memoryAllocations = [];
  }

  public Terminate(exitCode: number): void {
    this.FreeResources();
    this.code?.worker.terminate();
    this.state = ProcessState.Terminated;
    this.exitCode = exitCode;
  }

  private ListenToSysCalls(code: Worker) {
    code.addEventListener("message", ({ data }) => {
      if (data.id === "startup") return;

      this._kernel.ProcessMethod({
        origin: this,
        pid: this.pid,
        ...data,
      });
    });
  }
}
