import { getMonitor } from './monitor';

export const client = getMonitor();

// let client: ReturnType<typeof getMonitor> | null = null;

// const createClient = (name: string) => {
//   if (!client) {
//     client = getMonitor({
//       enableLiveMetrics: true,
//       service: {
//         name,
//         namespace: '@shellicar-foundation-core',
//       },
//     });
//   }
//   return client;
// };

// export { createClient };
