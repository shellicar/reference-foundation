import { type IServiceCollection, IServiceModule } from '@shellicar/core-di';
import { Manager } from './Manager';
import { Button } from './button';
import { Input } from './input';
import { IButton, IInput, IManager } from './interfaces';

export class ManagerModule extends IServiceModule {
  registerServices(services: IServiceCollection): void {
    services.register(IButton).to(Button);
    services.register(IInput).to(Input);
    services.register(IManager).to(Manager);
  }
}
