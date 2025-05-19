import type { FieldPolicy } from '@apollo/client/cache/inmemory/policies';
import { Instant } from '@js-joda/core';

export const instantTypePolicy: FieldPolicy<Instant | null, string | null> = {
  merge: (_, incoming) => {
    if (incoming == null) {
      return null;
    }
    return Instant.parse(incoming);
  },
};
