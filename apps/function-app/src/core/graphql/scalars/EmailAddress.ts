import { type ASTNode, GraphQLError, GraphQLScalarType, type GraphQLScalarTypeConfig, Kind } from 'graphql';
import z from 'zod';

const emailSchema = z.string().email().toLowerCase();

const validate = (value: any, ast?: ASTNode): string => {
  if (typeof value !== 'string') {
    throw new GraphQLError(`Value is not string: ${value}`, { nodes: ast });
  }
  const parsed = emailSchema.safeParse(value);
  if (!parsed.success) {
    throw new GraphQLError(`Value is not a valid email address: ${value}`, { nodes: ast });
  }
  return parsed.data;
};

const specifiedByURL = 'https://datatracker.ietf.org/doc/html/rfc6854';

export const GraphQLEmailAddressConfig: GraphQLScalarTypeConfig<string, string> = /*#__PURE__*/ {
  name: 'EmailAddress',
  description: `A field whose value conforms to the standard internet email address format as specified in HTML Spec: ${specifiedByURL}.`,
  serialize: validate,
  parseValue: validate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`, { nodes: ast });
    }
    return validate(ast.value, ast);
  },
  specifiedByURL,
  extensions: {
    codegenScalarType: 'string',
    jsonSchema: {
      type: 'string',
      format: 'email',
    },
  },
};

export const GraphQLEmailAddress = new GraphQLScalarType(GraphQLEmailAddressConfig);
