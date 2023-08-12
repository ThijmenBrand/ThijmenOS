//DI

//Interfaces

//Types
import { WindowDataActions, windowSelectors } from "./defaults";

//Other
import { ThreadMessage } from "@core/processManager/types/threadMessage";
import { InitMovement } from "../helpers";
import WindowOptions from "@ostypes/WindowTypes";
import WindowElement from "./windowElement";
import Terminate from "@core/kernel/commands/processes/terminateProcess";

class ApplicationWindow {
  private windowElement: WindowElement;
  private windowContent: HTMLIFrameElement;
  private windowId: number

  constructor(
    windowId: number,
    windowOptions: WindowOptions,
    windowContent: HTMLIFrameElement
  ) {
    this.windowId = windowId;

    const winWidth = windowOptions.fullScreen ? window.innerWidth : windowOptions.width;
    const winHeight = windowOptions.fullScreen ? window.innerHeight : windowOptions.height;

    this.windowElement = new WindowElement({
      height: winHeight,
      width: winWidth, 
      windowId: windowId, 
      title: windowOptions.title
    });

    if(windowOptions.fullScreen) this.windowElement.FullSreen();

    this.windowElement.Action("click", (ev: Event) => this.Click(ev)).register();

    this.windowContent = windowContent;

    this.Render(windowContent);

    setTimeout(() => {
      InitMovement(windowId);
    }, 100);
  }

  private Click(ev: Event) {
    const target: HTMLDivElement = ev.target as HTMLDivElement;
    const hitButton: boolean = target.classList.contains(
      windowSelectors.windowOption
    );

    if (hitButton) {
      const action: WindowDataActions = target.getAttribute(
        "data-action"
      ) as WindowDataActions;

      if (action === WindowDataActions.Maximize)
        this.windowElement.FullSreen().yes();
      if (action === WindowDataActions.Minimize)
        this.windowElement.FullSreen().no();
      if (action === WindowDataActions.Close)
        new Terminate(this.windowId).Handle();
    }
  }

  private Render(windowContent: HTMLIFrameElement): void {
    this.windowElement.SetWindowContent(windowContent);
    this.windowElement.Render();
  }

  public Destroy() {
    this.windowElement.Destroy();
  }

  public OnLoad(action: any) {
    this.windowContent.addEventListener("load", action);
  }

  public Message(message: ThreadMessage): void {
    this.windowContent.contentWindow?.postMessage(message, "*");
  }
}

export default ApplicationWindow;
