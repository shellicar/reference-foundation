import type { FieldPolicy } from '@apollo/client/cache/inmemory/policies';

export const emailAddressTypePolicy: FieldPolicy<string | null, string | null> = {
  merge: (_, incoming) => {
    if (incoming == null) {
      return null;
    }
    return incoming;
  },
};
