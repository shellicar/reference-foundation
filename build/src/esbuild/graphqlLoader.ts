import path from 'node:path';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';
import type { Plugin } from 'esbuild';
import { glob } from 'glob';
import { v3 } from 'uuid';

const escapeString = (str: string): RegExp => {
  const escaped = str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  return RegExp(escaped);
};

const generateNamespace = () => {
  const currentDir = process.cwd();
  return v3(currentDir, 'de9f5966-0f82-42bb-aa3a-d7847170a778');
};
const namespace = generateNamespace();

const cleanFilename = (filename: string) => {
  return `file_${v3(filename, namespace).replace(/-/g, '')}`;
};

const findGraphQLFiles = async (globPattern: string) => {
  const files = await glob(globPattern);

  return files.map((file) => {
    const relativePath = path.relative(path.dirname(file), file);
    const importStatement = `export { default as ${cleanFilename(file)} } from './${relativePath.replace(/\\/g, '/')}';`;
    return importStatement;
  });
};

export const createPlugins = (globPattern: string, typedefsFile: string): Plugin[] => {
  const filter = escapeString(typedefsFile);

  const typedefLoader: Plugin = {
    name: 'typedefs-loader',
    setup: (build) => {
      build.onLoad({ filter }, async () => {
        const files = await findGraphQLFiles(globPattern);
        const imports = files.join('\n');

        return {
          contents: imports,
          loader: 'ts',
        };
      });
    },
  };

  return [
    graphqlLoaderPlugin(),
    typedefLoader,
  ];
}
