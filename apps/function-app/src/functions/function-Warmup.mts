import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-core-foundation/server-common/function-handler';

const handler = createAsyncHandler('Warmup', () => import('./handlers/Warmup.js'));

app.warmup('Warmup', {
  handler,
});
