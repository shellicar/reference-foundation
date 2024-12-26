export class Deferred<T = void> {
  promise: Promise<T>;
  resolve: (value: T) => void = () => {};
  reject: (reason?: any) => void = () => {};

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
