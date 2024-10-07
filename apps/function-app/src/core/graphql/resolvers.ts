import { GraphQLEmailAddress } from 'graphql-scalars';
import { testEntityResolvers } from '../../features/test-relations/resolvers';
import { versionResolvers } from '../../features/version/resolvers';
import type { Resolvers } from '../../generated/graphql-types';
import { GraphQLUUID } from './scalars/UUID';
import type { AppContext } from './types';

const resolverList: Resolvers<AppContext>[] = [testEntityResolvers, versionResolvers];

export const resolvers: Resolvers<AppContext>[] = [
  ...resolverList,
  {
    EmailAddress: GraphQLEmailAddress,
    UUID: GraphQLUUID,
  },
];
