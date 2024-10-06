import * as esbuild from 'esbuild';
import { glob } from 'glob';

const buildLogger: esbuild.Plugin = {
  name: 'logger',
  setup: (build) => {
    build.onStart(() => {
      console.log('ESBuild - build started');
    });
    build.onEnd(() => {
      console.log('ESBuild - build done');
    });
  },
};

const watch = process.argv.some((x) => x === '--watch');

const entryPoints = await glob('./src/functions/function-*.ts');
console.log('entryPoints', entryPoints);

const minify = !watch;

const ctx = await esbuild.context({
  entryPoints: entryPoints,
  format: 'esm',
  splitting: true,
  minify,
  bundle: true,
  keepNames: true,
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  treeShaking: true,
  outdir: 'dist',
  tsconfig: 'tsconfig.json',
  plugins: [buildLogger],
  external: ['@azure/functions-core'],
  outExtension: { '.js': '.mjs' },
  inject: ['cjs-shim.mts'],
});

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  ctx.dispose();
}
