import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { scalarTypePolicies } from '~/src/lib/graphql/scalarTypePolicies';

export const cache = new InMemoryCache({
  typePolicies: scalarTypePolicies,
});
