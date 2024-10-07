import { type HttpRequest, type HttpResponseInit, type InvocationContext, app } from '@azure/functions';
import { graphqlHandler } from '../core/graphql/handler';

export const handler = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
  return await graphqlHandler(request, context);
};

app.http('GraphQL', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler,
});
