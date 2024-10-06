import { createBuildContext } from '@shellicar-core-foundation/build/esbuild/config';

const watch = process.argv.includes('--watch');

const ctx = await createBuildContext({}, watch);

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  ctx.dispose();
}

// import { context } from 'esbuild';
// import { glob } from 'glob';
// import { gitVersion } from '@shellicar-core-foundation/build/esbuild/gitVersion';
// import { buildLogger } from '@shellicar-core-foundation/build/esbuild/buildLogger';

// const watch = process.argv.some((x) => x === '--watch');

// const entryPoints = await glob('./src/functions/function-*.ts');
// console.log('entryPoints', entryPoints);

// const minify = !watch;

// const ctx = await context({
//   entryPoints: entryPoints,
//   format: 'esm',
//   splitting: true,
//   minify,
//   bundle: true,
//   keepNames: true,
//   platform: 'node',
//   target: 'node20',
//   sourcemap: true,
//   treeShaking: true,
//   outdir: 'dist',
//   tsconfig: 'tsconfig.json',
//   plugins: [gitVersion, buildLogger],
//   external: ['@azure/functions-core'],
//   outExtension: { '.js': '.mjs' },
//   inject: ['cjs-shim.mts'],
// });

// if (watch) {
//   await ctx.watch();
//   console.log('watching...');
// } else {
//   await ctx.rebuild();
//   ctx.dispose();
// }
