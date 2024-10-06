import type { ExceptionTelemetry, TelemetryClient } from 'applicationinsights';
import TransportStream from 'winston-transport';

export abstract class ITelemetryFilter {
  public filterException(_trace: ExceptionTelemetry, _client: TelemetryClient): boolean {
    return true;
  }
}

type PlainObject = Record<string, any>;

type AzureLogLevels = Record<string, LogLevel>;

enum LogLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

const defaultLogLevels: AzureLogLevels = {
  error: LogLevel.Error,
  warn: LogLevel.Warning,
  http: LogLevel.Information,
  info: LogLevel.Information,
  verbose: LogLevel.Verbose,
  debug: LogLevel.Verbose,
  silly: LogLevel.Verbose,
};

export type AzureApplicationInsightsLoggerOptions = {
  levels?: AzureLogLevels;
  filters?: ITelemetryFilter[];
  client: TelemetryClient;
  defaultLevel?: string;
  silent?: boolean;
};

export class ApplicationInsightsExceptionTransport extends TransportStream {
  readonly name: string;

  public get client(): TelemetryClient {
    return this.options.client;
  }

  constructor(private readonly options: AzureApplicationInsightsLoggerOptions) {
    super({ level: options.defaultLevel ?? 'info', silent: options.silent ?? false });
    this.name = 'applicationinsightslogger';
  }

  private toException(errorLike: Error | any): { exception: Error; properties?: Record<string, string> } {
    if (errorLike instanceof Error) {
      return { exception: errorLike };
    }
    const exception = new Error();
    const { message, stack, name, ...properties } = errorLike;
    exception.message = errorLike.message;
    exception.stack = errorLike.stack;
    exception.name = errorLike.name ?? 'Error';
    return { exception, properties };
  }

  private isErrorLike(obj: unknown): obj is Error {
    if (obj instanceof Error) {
      return true;
    }
    if (typeof obj === 'object' && obj != null) {
      return 'stack' in obj && 'message' in obj;
    }
    return false;
  }

  private handleException(info: PlainObject, message: string | undefined, logMeta: PlainObject): void {
    let error: Error | undefined;

    if (this.isErrorLike(info)) {
      error = info;
    } else if (this.isErrorLike(message)) {
      error = message;
    } else if (this.isErrorLike(logMeta)) {
      error = logMeta;
    } else {
      return;
    }

    const { exception, properties } = this.toException(error);
    const exceptionProps: PlainObject = {
      ...properties,
    };

    if (typeof message === 'string' && error.message !== message) {
      exception.message = message;
    }

    if (exceptionProps !== logMeta) {
      Object.assign(exceptionProps, logMeta);
    }

    const telemetry: ExceptionTelemetry = { exception, properties: exceptionProps };
    for (const f of (this.options.filters ?? []) as ITelemetryFilter[]) {
      if (!f.filterException(telemetry, this.client)) {
        return;
      }
    }
    this.client.trackException(telemetry);
  }

  override log(info: PlainObject, callback: () => void): void {
    try {
      this.logInternal(info);
    } catch (err) {
      if (err instanceof Error) {
        this.client.trackException({ exception: err });
      }
      return;
    } finally {
      callback();
    }
  }

  logInternal(info: PlainObject): void {
    const { level, ...rest } = info;
    const severity = this.getSeverity(level);
    const splat = Reflect.get(info, Symbol.for('splat')) ?? [];
    const logMeta = splat.length ? splat[0] : {};

    if (severity >= LogLevel.Error) {
      this.handleException(rest, rest.message, logMeta);
    }
  }

  private getSeverity(level: string): LogLevel {
    const levels = this.options.levels ?? defaultLogLevels;
    let severity = levels[level];
    if (severity == null) {
      if (this.options.defaultLevel) {
        severity = levels[this.options.defaultLevel];
      }
    }
    if (severity == null) {
      severity = LogLevel.Information;
    }
    return severity;
  }
}
