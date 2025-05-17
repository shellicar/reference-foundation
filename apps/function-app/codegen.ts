import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['src/**/*.graphql'],
  generates: {
    'src/generated/graphql-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        preResolveTypes: false,
        resolversNonOptionalTypename: true,
        nonOptionalTypename: true,
        strictScalars: true,
        constEnums: false,
        enumsAsTypes: false,
        allowEnumStringTypes: false,
        scalars: {
          UUID: 'node:crypto#UUID',
          Instant: '@js-joda/core#Instant',
          EmailAddress: 'string',
        },
        mappers: {
          UUID: 'UUID',
        },
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        contextType: '../core/graphql/types#AppContext',
        maybeValue: 'T | null | undefined',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
