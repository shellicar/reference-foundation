import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';

export const buildLoggerFactory: UnpluginFactory<void> = () => ({
  name: 'build-logger',
  buildStart() {
    console.log('ESBuild - build started');
  },
  buildEnd() {
    console.log('ESBuild - build done');
  },
});

export const buildLogger = createUnplugin(buildLoggerFactory);

export default buildLogger;

// Export for each bundler
export const vite = buildLogger.vite;
export const esbuild = buildLogger.esbuild;
