import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import typeDefs from '@shellicar/build-graphql/typedefs';
import { lexicographicSortSchema } from 'graphql';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

if (process.env.GRAPHQL__PRINT_SCHEMA) {
  console.log(printSchemaWithDirectives(lexicographicSortSchema(schema)));
}
