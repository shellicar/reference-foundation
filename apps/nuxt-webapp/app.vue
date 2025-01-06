<script setup lang="ts">
import version from '@shellicar/build-version/version';

const versionPaths = [version.version, version.commitDate, version.shortSha];
const versionText = versionPaths.filter(Boolean).join(' - ');
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <p>{{versionText}}</p>
  </div>
</template>
