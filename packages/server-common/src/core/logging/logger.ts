import winston, { format } from 'winston';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import { ApplicationInsightsExceptionTransport } from '../insights/winston-error-transport';
import type { TelemetryClient } from 'applicationinsights';
import { telemetryClient } from '../insights/client';
import { testLogging } from './testLogging';

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

  testLogging(logger);
  return logger;
};
export const logger = createWinstonLogger(telemetryClient);
