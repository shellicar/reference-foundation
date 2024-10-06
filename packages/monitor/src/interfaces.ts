import type { AttributeValue } from '@opentelemetry/api';

export abstract class IDisposable {
  private disposed = false;
  public [Symbol.dispose]() {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    this.dispose();
  }
  public abstract dispose(): void;
}

export abstract class IOperation extends IDisposable {
  public abstract setAttribute(key: string, value: AttributeValue): void;
  public abstract success(message?: string): void;
  public abstract error(message?: string): void;
}
