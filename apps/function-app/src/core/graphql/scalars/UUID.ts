import type { UUID } from 'node:crypto';
import { type ASTNode, GraphQLError, GraphQLScalarType, type GraphQLScalarTypeConfig, Kind } from 'graphql';
import z from 'zod';

const uuidSchema = z
  .string()
  .uuid()
  .transform((x) => x as UUID);

const validate = (value: any, ast?: ASTNode) => {
  if (typeof value !== 'string') {
    throw new GraphQLError(`Value is not string: ${value}`, ast ? { nodes: ast } : undefined);
  }
  const parsed = uuidSchema.safeParse(value);
  if (!parsed.success) {
    throw new GraphQLError(`Value is not a valid UUID: ${value}`, ast ? { nodes: ast } : undefined);
  }
  return parsed.data;
};

const specifiedByURL = 'https://datatracker.ietf.org/doc/html/rfc9562';

export const GraphQLUUIDConfig: GraphQLScalarTypeConfig<UUID, string> = {
  name: 'UUID',
  description: `A field whose value is a generic Universally Unique Identifier: ${specifiedByURL}.`,
  serialize(value) {
    return validate(value);
  },
  parseValue(value) {
    return validate(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as UUIDs but got a: ${ast.kind}`, {
        nodes: ast,
      });
    }

    return validate(ast.value, ast);
  },
  specifiedByURL,
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      type: 'string',
      format: 'uuid',
    },
  },
};

export const GraphQLUUID = new GraphQLScalarType(GraphQLUUIDConfig);
