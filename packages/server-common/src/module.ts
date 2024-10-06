import { type IServiceCollection, IServiceModule } from "@shellicar/core-di";
import { IButton, IInput, IManager } from "./interfaces";
import { Button } from "./button";
import { Input } from "./input";
import { Manager } from "./Manager";

export class ManagerModule extends IServiceModule {
  registerServices(services: IServiceCollection): void {
    services.register(IButton).to(Button);
    services.register(IInput).to(Input);
    services.register(IManager).to(Manager);
  }
}
