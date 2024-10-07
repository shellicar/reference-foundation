import versionJson from '../../../../../version.json';
import type { AppContext } from '../../core/graphql/types';
import type { Resolvers } from '../../generated/graphql-types';

export const versionResolvers: Resolvers<AppContext> = {
  Query: {
    version: () => {
      return {
        __typename: 'Version',
        ...versionJson,
      };
    },
    validate: (_1, { input }, _3) => {
      return {
        __typename: 'Validate',
        emailAddress: input.emailAddress,
        field1: crypto.randomUUID(),
        field2: crypto.randomUUID(),
      };
    },
  },
};
