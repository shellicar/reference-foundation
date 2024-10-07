import type { Entity1Loader, Entity2Loader } from '../../features/test-relations/types';

export type AppContext = {
  loaders: {
    entity1Loader: Entity1Loader;
    entity2Loader: Entity2Loader;
  };
};
