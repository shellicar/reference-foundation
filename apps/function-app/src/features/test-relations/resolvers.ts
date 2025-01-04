import type { AppContext } from '../../core/graphql/types';
import type { Entity1Edge, Entity2Connection, Entity2Edge, Resolvers } from '../../generated/graphql-types';
import { mapEntity1, mapEntity2 } from './mapping';
import type { Entity2Document } from './types';

export const testEntityResolvers = {
  Query: {
    entity1: (_, { id }, { loaders }) => {
      return loaders.entity1Loader.load(id).then(mapEntity1);
    },
    entity2: (_, { id }, { loaders }) => {
      return loaders.entity2Loader.load(id).then(mapEntity2);
    },
  },
  Entity1: {
    entities2: async (parent, _, { loaders }) => {
      const entity1Document = await loaders.entity1Loader.load(parent.id);

      if (!entity1Document?.entity2Ids) {
        return {
          __typename: 'Entity2Connection',
          edges: [],
          nodes: [],
          totalCount: 0,
        } satisfies Entity2Connection;
      }

      const relatedEntities = (await loaders.entity2Loader.loadMany(entity1Document.entity2Ids)) as (Error | Entity2Document)[];

      return {
        __typename: 'Entity2Connection',
        edges: relatedEntities.map(
          (entity, index) =>
            ({
              __typename: 'Entity2Edge',
              cursor: Buffer.from(`cursor-${index}`).toString('base64'),
              node: mapEntity2(entity),
            }) satisfies Entity2Edge,
        ),
        nodes: relatedEntities.filter((entity) => entity !== null).map(mapEntity2),
        totalCount: relatedEntities.length,
      } satisfies Entity2Connection;
    },
  },
  Entity2: {
    entity1: async (parent, _, { loaders }) => {
      const entity2Document = await loaders.entity2Loader.load(parent.id);

      if (!entity2Document?.entity1Id) {
        throw new Error('Parent not found?');
      }

      const relatedEntity1 = await loaders.entity1Loader.load(entity2Document.entity1Id);

      if (!relatedEntity1) {
        throw new Error('Edge not found?');
      }

      return {
        __typename: 'Entity1Edge',
        cursor: Buffer.from(`cursor-${entity2Document.entity1Id}`).toString('base64'), // Generate a cursor
        node: mapEntity1(relatedEntity1),
      } satisfies Entity1Edge;
    },
  },
} satisfies Resolvers<AppContext>;
