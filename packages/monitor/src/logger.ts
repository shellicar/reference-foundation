import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import { ApplicationInsightsVersion, createApplicationInsightsTransport } from '@shellicar/winston-azure-application-insights';
import type { TelemetryClient } from 'applicationinsights';
import winston, { format } from 'winston';
import { telemetryClient } from './telemetryClient';

const createWinstonLogger = (client: TelemetryClient) => {
  const transport = createApplicationInsightsTransport({
    client,
    version: ApplicationInsightsVersion.V3,
  });

  const logger = winston.createLogger({
    format: format.combine(format.errors({ stack: true }), format.splat(), format.json()),
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      new OpenTelemetryTransportV3(),
      transport,
    ],
  });

  return logger;
};
export const logger = createWinstonLogger(telemetryClient);
