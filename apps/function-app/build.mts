import { execSync } from 'node:child_process';
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

const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

const gitMetadataPlugin: esbuild.Plugin = {
  name: 'git-version',
  setup(build) {
    build.onResolve({ filter: /\/version\.json$/ }, (args) => {
      if (args.path === '../../../../version.json') {
        return { path: args.path, namespace: 'git-version' };
      }
    });

    build.onLoad({ filter: /\/version\.json$/, namespace: 'git-version' }, () => {
      const sha = execCommand('git rev-parse HEAD');
      const shortSha = sha.substring(0, 7);
      const version = {
        buildDate: new Date().toISOString(),
        branch: execCommand('git rev-parse --abbrev-ref HEAD'),
        sha,
        shortSha,
        commitDate: execCommand('git log -1 --format=%cI'),
        version: execCommand('gitversion -showvariable SemVer'),
      };
      console.log(version);

      return {
        contents: JSON.stringify(version, null, 2),
        loader: 'json',
      };
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
  plugins: [gitMetadataPlugin, buildLogger],
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
