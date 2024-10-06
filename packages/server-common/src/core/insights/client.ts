import { getMonitor } from './monitor';

let client: ReturnType<typeof getMonitor> | null = null;

type BaseSettings = {
  name?: string;
  samplingRatio?: number;
  enableLiveMetrics?: boolean;
}

const createClient = (settings?: BaseSettings) => {
  if (!client) {
    client = getMonitor({
      enableLiveMetrics: settings?.enableLiveMetrics,
      samplingRatio: settings?.samplingRatio,
      service: {
        name: settings?.name,
        namespace: '@shellicar-foundation-core',
      },
    });
  }
  return client;
};

export { createClient };
