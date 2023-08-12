//DI
import "reflect-metadata";
import { injectable, inject } from "inversify";
import types from "@ostypes/types";

//Interfaces
import UpdateTime from "@utils/updateTime";
import Kernel from "@core/kernel/kernelMethodShape";
import ApplicationManager from "@core/applicationManager/applicationManagerMethods";

//Types
import Settings from "@core/settings/settingsMethodShape";
import StartupMethodShape from "./startupMethodShape";
import AuthenticationMethodShape from "@providers/authentication/authenticationMethodShape";
import StartProcess from "@core/kernel/commands/processes/startProcess";

@injectable()
class Startup implements StartupMethodShape {
  private readonly _kernel: Kernel;
  private readonly _appManager: ApplicationManager;
  private readonly _settings: Settings;
  private readonly _authenticationGuiProvider: AuthenticationGuiShape;
  private readonly _authenticationProvider: AuthenticationMethodShape;

  constructor(
    @inject(types.Kernel) kernel: Kernel,
    @inject(types.AppManager) appManager: ApplicationManager,
    @inject(types.Settings) settings: Settings,
    @inject(types.AuthenticationGui) authenticationGui: AuthenticationGuiShape,
    @inject(types.Authentication) authentication: AuthenticationMethodShape,
  ) {
    this._kernel = kernel;
    this._appManager = appManager;
    this._settings = settings;
    this._authenticationGuiProvider = authenticationGui;
    this._authenticationProvider = authentication;
  }

  public async InitialiseOperatingSystem() {
    await this._settings.Initialise();
    this._kernel.LoadKernel();

    const userAuthenticated =
      this._authenticationProvider.CheckAuthenticationState();

    if (!userAuthenticated) {
      this._authenticationGuiProvider.Authenticate();

      const loginPage = document.querySelector("#thijmen-os-login-page")!;

      loginPage.addEventListener("authenticated", () => {
        this.UserAuthenticated();
      });
    } else {
      this._authenticationGuiProvider.RemoveAuthorization();
      this.UserAuthenticated();
    }

    UpdateTime();

    setInterval(() => {
      UpdateTime();
    }, 1000);
  }

  private async UserAuthenticated() {
    this._appManager.FetchInstalledApps();

    new StartProcess({exePath: "C/OperatingSystem/thijm32/dsk/dsk.js"}).Handle();
  }
}

export default Startup;
