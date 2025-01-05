import { join } from 'node:path';
import VersionPlugin from '@shellicar/build-version/esbuild';
import { type BuildOptions, context } from 'esbuild';
import { glob } from 'glob';
import { esbuild as LoggingPlugin } from '../logging/plugin.js';

const tsconfig = join(process.cwd(), 'tsconfig.json');

const defaultOptions = {
  format: 'esm',
  splitting: true,
  bundle: true,
  keepNames: true,
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  treeShaking: true,
  outdir: 'dist',
  tsconfig,
  plugins: [LoggingPlugin(), VersionPlugin({})],
  external: ['@azure/functions-core'],
  outExtension: { '.js': '.mjs' },
  inject: ['cjs-shim.mts'],
  entryPoints: ['./src/functions/function-*.mts'],
} satisfies BuildOptions;
export type ExtendOptions = Omit<BuildOptions, 'entryPoints'> & typeof defaultOptions;

export const defineConfig = (configModifier: (options: ExtendOptions) => ExtendOptions): ExtendOptions => {
  const modifiedOptions = { ...defaultOptions };
  return configModifier(modifiedOptions);
};

export const createBuildContext = async (userOptions: ExtendOptions) => {
  const entryPoints: string[] = [];

  for (const e of userOptions.entryPoints) {
    const result = await glob(e as string);
    entryPoints.push(...result);
  }
  userOptions.entryPoints = entryPoints;
  console.log('entryPoints', userOptions.entryPoints);
  return context(userOptions);
};
