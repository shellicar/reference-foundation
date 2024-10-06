import { dependsOn } from '@shellicar/core-di';
import { IButton, IInput, IManager } from './interfaces';

export class Manager extends IManager {
  @dependsOn(IButton) private readonly button!: IButton;
  @dependsOn(IInput) private readonly input!: IInput;

  public async manage(): Promise<string> {
    return `${await this.button.button()} ${await this.input.input()}`;
  }
}
