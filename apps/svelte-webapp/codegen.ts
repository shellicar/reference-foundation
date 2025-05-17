import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../function-app/src/**/*.graphql',
  documents: ['src/**/requests.ts', '../../packages/ui-svelte/**/requests.ts'],
  generates: {
    'src/lib/graphql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        preResolveTypes: false,

        resolversNonOptionalTypename: true,
        nonOptionalTypename: true,

        strictScalars: true,
        constEnums: false,
        enumsAsTypes: false,
        allowEnumStringTypes: true,
        scalars: {
          UUID: 'node:crypto#UUID',
          EmailAddress: 'string',
          Cursor: 'string',
          LocalDate: '@js-joda/core#LocalDate',
          Instant: '@js-joda/core#Instant',
          LocalTime: '@js-joda/core#LocalTime',
          TimeZone: 'string',
          OffsetDateTime: '@js-joda/core#OffsetDateTime',
          LocalDateTime: '@js-joda/core#LocalDateTime',
          Upload: 'File',
        },
      },
    },
    'src/lib/graphql/scalarTypePolicies.ts': {
      plugins: ['@homebound/graphql-typescript-scalar-type-policies'],
      config: {
        scalarTypePolicies: {
          Instant: './policies/Instant#instantTypePolicy',
          LocalDate: './policies/LocalDate#localDateTypePolicy',
          LocalDateTime: './policies/LocalDateTime#localDateTimeTypePolicy',
          LocalTime: './policies/LocalTime#localTimeTypePolicy',
          OffsetDateTime: './policies/OffsetDateTime#offsetDateTimeTypePolicy',
          Timezone: './policies/TimeZone#timeZoneTypePolicy',
          EmailAddress: './policies/EmailAddress#emailAddressTypePolicy',
        },
      },
    },
    'src/lib/graphql/fragment-matcher.ts': {
      plugins: ['fragment-matcher'],
    },
  },
};
export default config;
