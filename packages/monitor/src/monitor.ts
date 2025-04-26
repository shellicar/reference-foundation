import { type AzureMonitorOpenTelemetryOptions, useAzureMonitor } from '@azure/monitor-opentelemetry';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { ATTR_SERVICE_INSTANCE_ID, ATTR_SERVICE_NAMESPACE } from '@opentelemetry/semantic-conventions/incubating';
import { TelemetryClient } from 'applicationinsights';

export type AzureMonitorConfig = {
  service?: ServiceType;
  samplingRatio?: number;
  enableLiveMetrics?: boolean;
};

export type ServiceType = {
  name?: string;
  namespace?: string;
  instanceId?: string;
};

export const getMonitor = (config: AzureMonitorConfig = {}) => {
  const customResource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.service?.name,
    [ATTR_SERVICE_NAMESPACE]: config.service?.namespace,
    [ATTR_SERVICE_INSTANCE_ID]: config.service?.instanceId,
  });

  const options: AzureMonitorOpenTelemetryOptions = {
    instrumentationOptions: {
      winston: { enabled: true },
      http: { enabled: true },
      azureSdk: { enabled: true },
      mongoDb: { enabled: true },
      mySql: { enabled: false },
      postgreSql: { enabled: false },
      redis: { enabled: true },
      redis4: { enabled: true },
    },
    enableLiveMetrics: config.enableLiveMetrics ?? true,
    samplingRatio: config.samplingRatio,
    resource: customResource,
    azureMonitorExporterOptions: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    },
  };

  useAzureMonitor(options);
  const telemetryClient = new TelemetryClient();

  return telemetryClient;
};
