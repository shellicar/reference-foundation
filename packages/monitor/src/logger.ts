import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import type { TelemetryClient } from 'applicationinsights';
import winston, { format } from 'winston';
import { telemetryClient } from './telemetryClient';
import { ApplicationInsightsExceptionTransport } from './winston-error-transport';

const createWinstonLogger = (client: TelemetryClient) => {
  const logger = winston.createLogger({
    format: format.combine(format.errors({ stack: true }), format.splat(), format.json()),
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      new OpenTelemetryTransportV3(),
      new ApplicationInsightsExceptionTransport({
        client,
      }),
    ],
  });

  return logger;
};
export const logger = createWinstonLogger(telemetryClient);
