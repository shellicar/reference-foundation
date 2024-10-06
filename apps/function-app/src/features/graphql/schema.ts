import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import * as typedefs from './typedefs';

export const schema = makeExecutableSchema({
  typeDefs: Object.values(typedefs),
  resolvers,
});
