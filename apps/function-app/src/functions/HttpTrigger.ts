import { type HttpHandler, app } from '@azure/functions';

const handler: HttpHandler = async (context, req) => {
  return {
    status: 200,
    body: JSON.stringify('hello world'),
  };
};

app.http('HttpTrigger', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
