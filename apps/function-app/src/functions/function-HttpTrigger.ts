import { type HttpHandler, app } from '@azure/functions';
import { container } from '../core/di/container';
import { IManager } from '@shellicar-foundation-core/server-common/interfaces';

const handler: HttpHandler = async (context, req) => {
  const manager = container.resolve(IManager);
  return {
    status: 200,
    body: JSON.stringify({
      message: 'hello world',
      manager: await manager.manage(),
    }),
  };
};

app.http('HttpTrigger', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
