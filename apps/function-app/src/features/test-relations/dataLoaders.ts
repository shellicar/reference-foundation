import { entity1Data, entity2Data } from './data';
import { Entity1Loader, Entity2Loader } from './types';

export const createLoaders = () => {
  const entity1Loader = new Entity1Loader(async (ids) => {
    console.log(`Loading Entity1 for IDs: ${ids}`);
    if (Math.random() >= 0.25) {
      console.error('Error getting data from DB');
      throw new Error('Error getting data from DB');
    }
    return ids.map((id) => entity1Data.find((e) => e.id === id));
  });

  const entity2Loader = new Entity2Loader(async (ids) => {
    console.log(`Loading Entity2 for IDs: ${ids}`);
    if (Math.random() >= 0.5) {
      console.error('Error getting data from DB');
      throw new Error('Error getting data from DB');
    }
    return ids.map((id) => entity2Data.find((e) => e.id === id));
  });
  return {
    entity1Loader,
    entity2Loader,
  };
};
