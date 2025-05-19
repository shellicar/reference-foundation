import { DefaultApolloClient } from '@vue/apollo-composable';
import { graphqlClient } from './apolloClient/graphqlClient';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(DefaultApolloClient, graphqlClient);
});
