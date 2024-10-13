import { createBuildContext, defineConfig } from '@shellicar-core-foundation/build/esbuild/config';
import { createPlugins } from '@shellicar-core-foundation/build/esbuild/graphqlLoader';

const watch = process.argv.includes('--watch');
const graphqlPlugins = createPlugins('src/**/*.graphql', 'src/core/graphql/typedefs.ts');

const configuration = defineConfig((x) => {
  x.plugins.push(...graphqlPlugins);
  x.minify = watch;
  return x;
});

const ctx = await createBuildContext(configuration);

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  ctx.dispose();
}
