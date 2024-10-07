import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import type { Plugin } from 'esbuild';

const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

const getRootDir = (): string => {
  return execCommand('pnpm root -w');
};

const generateVersionInfo = () => {
  const sha = execCommand('git rev-parse HEAD');
  const shortSha = sha.substring(0, 7);
  return {
    buildDate: new Date().toISOString(),
    branch: execCommand('git rev-parse --abbrev-ref HEAD'),
    sha,
    shortSha,
    commitDate: execCommand('git log -1 --format=%cI'),
    version: execCommand('gitversion -showvariable SemVer'),
  };
};

export const gitVersion: Plugin = {
  name: 'git-version',
  setup(build) {
    const rootDir = getRootDir();
    const versionFilePath = resolve(rootDir, '../version.json');

    build.onResolve({ filter: /\/version\.json$/ }, (args) => {
      const resolved = resolve(args.resolveDir, args.path);
      if (resolved === versionFilePath) {
        return { path: args.path, namespace: 'git-version' };
      }
    });

    const versionInfo = generateVersionInfo();
    console.log(versionInfo);

    build.onLoad({ filter: /\/version\.json$/, namespace: 'git-version' }, () => {
      return {
        contents: JSON.stringify(versionInfo, null, 2),
        loader: 'json',
      };
    });
  },
};
