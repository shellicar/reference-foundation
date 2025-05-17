import { DateTimeFormatter, Instant } from '@js-joda/core';
import type { ValueNode } from 'graphql';
import { GraphQLScalarType, Kind } from 'graphql';

export const localDateFormatter = DateTimeFormatter.ISO_INSTANT;

const parseValue = (inputValue: unknown): Instant => {
  if (typeof inputValue === 'string') {
    return Instant.parse(inputValue);
  }
  throw new Error('Instant must be of type string');
};

const parseLiteral = (valueNode: ValueNode): Instant => {
  if (valueNode.kind === Kind.STRING) {
    return Instant.parse(valueNode.value);
  }
  throw new Error('Instant must be of type string');
};

const serialize = (outputValue: unknown): string => {
  if (outputValue instanceof Instant) {
    return localDateFormatter.format(outputValue);
  }
  throw new Error('Instant must be of type Instant');
};

export const InstantGraphQLType = new GraphQLScalarType<Instant, string>({
  name: 'Instant',
  description: 'A date-time string at UTC, such as `2007-12-03T10:15:30Z`, is compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.',
  parseLiteral: parseLiteral,
  parseValue: parseValue,
  serialize: serialize,
});
