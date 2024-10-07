import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { lexicographicSortSchema } from 'graphql';
import { resolvers } from './resolvers';
import * as typedefs from './typedefs';

export const schema = makeExecutableSchema({
  typeDefs: Object.values(typedefs),
  resolvers,
});

if (process.env.GRAPHQL__PRINT_SCHEMA) {
  console.log(printSchemaWithDirectives(lexicographicSortSchema(schema)));
}
