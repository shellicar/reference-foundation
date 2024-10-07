import type { Entity1Document, Entity2Document } from './types';

export const entity1Data: Entity1Document[] = [
  { id: '1', name: 'Entity1 A', entity2Ids: ['2', '3'] },
  { id: '2', name: 'Entity1 B', entity2Ids: ['4'] },
];

export const entity2Data: Entity2Document[] = [
  { id: '2', description: 'Entity2 A', entity1Id: '1' },
  { id: '3', description: 'Entity2 B', entity1Id: '1' },
  { id: '4', description: 'Entity2 C', entity1Id: '2' },
];
