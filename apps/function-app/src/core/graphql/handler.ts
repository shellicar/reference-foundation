import { v4 } from '@as-integrations/azure-functions';
import { createContext } from './context';
import { apolloServer } from './server';

export const graphqlHandler = v4.startServerAndCreateHandler(apolloServer, {
  context: createContext,
});
