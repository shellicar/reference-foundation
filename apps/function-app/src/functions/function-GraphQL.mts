import { app } from '@azure/functions';
import { createAsyncHandler } from '@shellicar-core-foundation/server-common/function-handler';

const handler = createAsyncHandler('GraphQL', () => import('./handlers/GraphQL.js'));

app.http('GraphQL', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler,
});
