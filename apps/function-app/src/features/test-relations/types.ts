import type { Instant } from '@js-joda/core';
import DataLoader from 'dataloader';

export type Entity1Document = {
  id: string;
  name: string;
  created: Instant;
  entity2Ids: string[];
};

export type Entity2Document = {
  id: string;
  description: string;
  created: Instant;
  entity1Id: string;
};

export class Entity1Loader extends DataLoader<string, Entity1Document | undefined> {}
export class Entity2Loader extends DataLoader<string, Entity2Document | undefined> {}
