import type { Plugin } from 'esbuild';

export const buildLogger: Plugin = {
  name: 'logger',
  setup(build) {
    build.onStart(() => {
      console.log('ESBuild - build started');
    });
    build.onEnd(() => {
      console.log('ESBuild - build done');
    });
  },
};
