import type { Entity1, Entity2 } from '../../generated/graphql-types';
import type { Entity1Document, Entity2Document } from './types';

export const mapEntity1 = <T extends Entity1Document | Error | undefined | null>(entity1: T): T extends null | undefined ? null : Entity1 => {
  type Z = T extends null | undefined ? null : Entity1;
  if (!entity1) {
    return null as Z;
  }
  if (entity1 instanceof Error) {
    return entity1 as unknown as Z;
  }

  const result: Entity1 = {
    ...entity1,
    id: entity1.id,
    name: entity1.name,
    __typename: 'Entity1',
    entities2: null!,
  };
  return result as Z;
};

export const mapEntity2 = <T extends Entity2Document | undefined | null | Error>(entity2: T): T extends null | undefined ? null : Entity2 => {
  type Z = T extends null | undefined ? null : Entity2;
  if (!entity2) {
    return null as Z;
  }
  if (entity2 instanceof Error) {
    return entity2 as unknown as Z;
  }

  const result: Entity2 = {
    ...entity2,
    id: entity2.id,
    description: entity2.description,
    __typename: 'Entity2',
    entity1: null!,
  };
  return result as Z;
};
