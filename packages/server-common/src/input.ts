import { IInput } from "./interfaces";

export class Input extends IInput {
  public input(): Promise<string> {
    return Promise.resolve('i am input');
  }
}
