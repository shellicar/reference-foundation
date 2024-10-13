import fs from 'node:fs/promises';
import path, { resolve } from 'node:path';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';
import type { Plugin } from 'esbuild';
import { glob } from 'glob';
import { v3 } from 'uuid';

const generateNamespace = () => {
  const currentDir = process.cwd();
  return v3(currentDir, 'de9f5966-0f82-42bb-aa3a-d7847170a778');
};
const namespace = generateNamespace();

const cleanFilename = (filename: string) => {
  return `file_${v3(filename, namespace).replace(/-/g, '')}`;
};

const findGraphQLFiles = async (globPattern: string, typedefsFile: string) => {
  const files = await glob(globPattern);

  return files.map((file) => {
    const relativePath = path.relative(path.dirname(typedefsFile), file);
    const importStatement = `export { default as ${cleanFilename(file)} } from './${relativePath.replace(/\\/g, '/')}';`;
    return importStatement;
  });
};

export const createPlugins = (globPattern: string, typedefsFile: string, ignoreErrors = false): Plugin[] => {
  const path = resolve(process.cwd(), typedefsFile);
  const filter = new RegExp(path);

  const typedefLoader: Plugin = {
    name: 'typedefs-loader',
    setup(build) {
      let graphqlFiles: string[] = [];
      let typedefExists = false;
      let importedTypedefs = false;

      build.onStart(async () => {
        graphqlFiles = await glob(globPattern);
        try {
          await fs.access(typedefsFile);
          typedefExists = true;
        } catch {
          typedefExists = false;
        }
      });

      build.onLoad({ filter }, async () => {
        importedTypedefs = true;
        const files = await findGraphQLFiles(globPattern, typedefsFile);
        const imports = files.join('\n');

        return {
          contents: imports,
          loader: 'ts',
        };
      });

      if (!ignoreErrors) {
        build.onEnd(() => {
          console.log({
            graphqlFiles: graphqlFiles.length,
            typedefExists,
            importedTypedefs,
          });
          if (graphqlFiles.length === 0) {
            throw new Error(`No GraphQL files found for the pattern: ${globPattern}`);
          }

          if (!typedefExists) {
            throw new Error(`Typedefs file not found: ${typedefsFile}`);
          }
          if (!importedTypedefs) {
            throw new Error(`Typedefs file not imported: ${filter}`);
          }
        });
      }
    },
  };

  return [graphqlLoaderPlugin(), typedefLoader];
};
