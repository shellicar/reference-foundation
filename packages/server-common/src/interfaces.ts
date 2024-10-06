
export abstract class IButton {
  public abstract button(): Promise<string>;
}

export abstract class IInput {
  public abstract input(): Promise<string>;
}

export abstract class IManager {
  public abstract manage(): Promise<string>;
}
