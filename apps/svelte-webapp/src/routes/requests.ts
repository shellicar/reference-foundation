import { graphqlClient } from '$lib/client/graphqlClient';
import { graphql } from '$lib/graphql';

const ValidateDoc = graphql(`query Validate($entity1Id: ID!) {
  entity1(id: $entity1Id) {
    id
    name
    created
    entities2 {
      edges {
        cursor
        node {
          id
          created
          description
        }
      }
      nodes {
        id
        created
        description
        entity1 {
          cursor
          node {
            id
            name
          }
        }
      }
      totalCount
    }
  }
}`);

export const Validate = async (entity1Id: string) => {
  return await graphqlClient.query({
    query: ValidateDoc,
    variables: {
      entity1Id,
    },
  });
};
