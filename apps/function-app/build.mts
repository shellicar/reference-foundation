import { createBuildContext } from '@shellicar-core-foundation/build/esbuild/config';
import { createPlugins } from '@shellicar-core-foundation/build/esbuild/graphqlLoader';

const watch = process.argv.includes('--watch');
const grpahqlPlugins = createPlugins('src/**/*.graphql', 'src/core/graphql/typedefs.ts');
const ctx = await createBuildContext(
  {
    plugins: grpahqlPlugins,
  },
  watch,
);

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  ctx.dispose();
}
