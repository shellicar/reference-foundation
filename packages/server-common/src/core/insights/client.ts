import z from 'zod';
import { getMonitor } from './monitor';

const boolSchema = z.enum(['1', '0', 'true', 'false']).transform((value) => {
  return value === '1' || value === 'true';
});

const schema = z.object({
  LOGGING__LIVE_METRICS: boolSchema.optional(),
  LOGGING__SAMPLING_RATIO: z.coerce.number()
  .min(0, { message: 'Value must be at least 0' })
  .max(1, { message: 'Value must be at most 1' }).optional(),
  LOGGING__NAME: z.string().optional(),
  LOGGING__NAMESPACE: z.string().optional(),
  LOGGING__INSTANCE_ID: z.string().optional(),
 });

const createClient = () => {
  const s = schema.parse(process.env);
  return getMonitor({
    enableLiveMetrics: s.LOGGING__LIVE_METRICS ?? true,
    samplingRatio: s.LOGGING__SAMPLING_RATIO,
    service: {
      name: process.env.LOGGING__NAME,
      namespace: process.env.LOGGING__NAMESPACE,
      instanceId: process.env.LOGGING__INSTANCE_ID,
    },
  });
};

export const telemetryClient = createClient();
