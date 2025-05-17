import { scalarTypePolicies } from '$lib/graphql/scalarTypePolicies';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';

export const cache = new InMemoryCache({
  typePolicies: scalarTypePolicies,
});
