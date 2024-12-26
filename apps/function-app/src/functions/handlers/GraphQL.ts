import type { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { graphqlHandler } from '../../core/graphql/handler';

export const handler = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
  return await graphqlHandler(request, context);
};
