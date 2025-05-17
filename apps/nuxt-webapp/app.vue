<script setup lang="ts">
import { DateTimeFormatter, Instant } from '@js-joda/core';
import version from '@shellicar/build-version/version';
import { useQuery } from '@vue/apollo-composable';
import { graphql } from './src/lib/graphql';

const versionPaths = [version.version, version.commitDate, version.shortSha];
const versionText = versionPaths.filter(Boolean).join(' - ');

const { result, error } = useQuery(
  graphql(`query Validate($entity1Id: ID!) {
  entity1(id: $entity1Id) {
    id
    name
    created
    entities2 {
      edges {
        cursor
        node {
          id
          created
          description
        }
      }
      nodes {
        id
        created
        description
        entity1 {
          cursor
          node {
            id
            name
          }
        }
      }
      totalCount
    }
  }
}`),
  {
    entity1Id: '1',
  },
);

const data = computed(() => {
  if (result.value?.entity1?.__typename === 'Entity1') {
    return result.value.entity1;
  }
  return null;
});

const format = DateTimeFormatter.ISO_INSTANT;

const created = computed(() => {
  return data.value?.created ?? null;
});

const formatInstant = (x: Instant | null) => {
  if (x == null) {
    return null;
  }
  return format.format(x);
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <p>{{versionText}}</p>
    <pre>Created: {{ formatInstant(created) }}</pre>
    <pre v-if="data">Data: {{ data }}</pre>
    <pre v-if="error">Error: {{ error.message }}</pre>
  </div>
</template>
