import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-core-foundation/server-common/function-handler';

const handler = createAsyncHandler('GraphQL', () => import('./handlers/HttpTrigger.js'));

app.http('HttpTrigger', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
