import type { v4 } from '@as-integrations/azure-functions';
import { createLoaders } from '../../features/test-relations/dataLoaders';
import type { AppContext } from './types';

export const createContext = async (_ctx: v4.AzureFunctionsContextFunctionArgument): Promise<AppContext> => {
  return {
    loaders: createLoaders(),
  };
};
