import { type HttpHandler, app } from '@azure/functions';
import { button } from '@shellicar-foundation-core/server-common/button';
import { input } from '@shellicar-foundation-core/server-common/input';

const handler: HttpHandler = async (context, req) => {
  return {
    status: 200,
    body: JSON.stringify({
      message: 'hello world',
      input: input(),
      button: button(),
    }),
  };
};

app.http('HttpTrigger', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
