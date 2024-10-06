import type { BaseContext } from '@apollo/server';
import type { v4 } from '@as-integrations/azure-functions';

export const createContext = async (_ctx: v4.AzureFunctionsContextFunctionArgument): Promise<BaseContext> => {
  return {};
}
