import { ApolloClient } from '@apollo/client/core/ApolloClient';
import type { ApolloLink } from '@apollo/client/link/core/ApolloLink';
import { from } from '@apollo/client/link/core/from';
import { HttpLink } from '@apollo/client/link/http/HttpLink';
import { cache } from './cache';

export const createClient = () => {
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    headers: {
      'apollo-require-preflight': 'true',
    },
  });

  const link: ApolloLink = from([httpLink]);

  return new ApolloClient({
    cache,
    link,
  });
};
