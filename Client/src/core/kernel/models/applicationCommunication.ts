import { Process } from "@core/processManager/processes/process";
import Exit from "@providers/error/systemErrors/Exit";
interface ApplicationCommunicationModel<T> {
  worker: Process;
  exit: Exit<T>;
}

export default ApplicationCommunicationModel;
