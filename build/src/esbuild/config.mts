import { type BuildOptions, context } from 'esbuild';
import { glob } from 'glob';
import { buildLogger } from './buildLogger.js';
import { gitVersion } from './gitVersion.js';

const defaultOptions: BuildOptions = {
  format: 'esm',
  splitting: true,
  bundle: true,
  keepNames: true,
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  treeShaking: true,
  outdir: 'dist',
  tsconfig: 'tsconfig.json',
  plugins: [gitVersion, buildLogger],
  external: ['@azure/functions-core'],
  outExtension: { '.js': '.mjs' },
  inject: ['cjs-shim.mts'],
};

export const createBuildContext = async (userOptions: Partial<BuildOptions> = {}, watch = false) => {
  const entryPoints = await glob('./src/functions/function-*.ts');
  console.log('entryPoints', entryPoints);

  const options = {
    entryPoints,
    minify: !watch,
    ...defaultOptions,
    ...userOptions,
    plugins: [...(defaultOptions.plugins ?? []), ...(userOptions.plugins ?? [])],
  };

  return context(options);
};
