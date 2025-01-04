import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { lexicographicSortSchema } from 'graphql';
import { resolvers } from './resolvers';
import typeDefs from '@shellicar/build-graphql/typedefs';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

if (process.env.GRAPHQL__PRINT_SCHEMA) {
  console.log(printSchemaWithDirectives(lexicographicSortSchema(schema)));
}
