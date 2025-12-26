import GraphQLPlugin from '@shellicar/build-graphql/esbuild';
import { createBuildContext, defineConfig } from '@shellicar-core-foundation/build/esbuild';

const watch = process.argv.includes('--watch');
const graphqlPlugins = GraphQLPlugin({
  globPattern: 'src/**/*.graphql',
});

const configuration = defineConfig((x) => {
  x.plugins.push(graphqlPlugins);
  x.minify = !watch;
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
