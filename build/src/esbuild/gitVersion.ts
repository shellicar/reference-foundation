import { execSync } from 'node:child_process';
import type { Plugin } from 'esbuild';

const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

export const gitVersion: Plugin = {
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
