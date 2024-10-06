import { v4 } from '@as-integrations/azure-functions';
import { apolloServer } from './server';
import { createContext } from './context';

export const graphqlHandler = v4.startServerAndCreateHandler(apolloServer, {
  context: createContext,
});
