import { IButton } from './interfaces';

export class Button extends IButton {
  public button(): Promise<string> {
    return Promise.resolve('i am button');
  }
}
