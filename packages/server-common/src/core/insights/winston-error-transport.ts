import type { ExceptionTelemetry, KnownSeverityLevel, TelemetryClient, TraceTelemetry } from 'applicationinsights';
import TransportStream from 'winston-transport';

export abstract class ITelemetryFilter {
  public filterException(trace: ExceptionTelemetry, client: TelemetryClient): boolean {
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

const isErrorLike = (obj: unknown): obj is Error => {
  if (obj instanceof Error) {
    return true;
  }
  if (typeof obj === 'object' && obj != null) {
    return ('stack' in obj && 'message' in obj);
  }
  return false;
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

  private handleException(info: PlainObject, message: string | undefined, logMeta: PlainObject): void {
    let exception: Error | undefined;

    if (isErrorLike(info)) {
      exception = info;
    } else if (isErrorLike(message)) {
      exception = message as unknown as Error;
    } else if (isErrorLike(logMeta)) {
      exception = logMeta;
    } else {
      console.warn('not error like');
      return;
    }
    const exceptionProps: PlainObject = {};

    if (typeof message === 'string' && exception.message !== message) {
      exceptionProps.message = message;
    }

    if (exception !== logMeta) {
      Object.assign(exceptionProps, logMeta);
    }

    this.trackExceptionV3({ exception, properties: exceptionProps });
  }

  private trackExceptionV3(telemetry: ExceptionTelemetry): void {
    for (const f of (this.options.filters ?? []) as ITelemetryFilter[]) {
      if (!f.filterException(telemetry, this.options.client)) {
        return;
      }
    }
    this.options.client.trackException(telemetry);
  }

  override log(info: PlainObject, callback: () => void): void {
    const { level, message } = info;
    const severity = this.getSeverity(level);
    const splat = Reflect.get(info, Symbol.for('splat')) ?? [];
    const logMeta = splat.length ? splat[0] : {};

    if (severity >= LogLevel.Error) {
      this.handleException(info, message, logMeta);
    }

    callback();
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
