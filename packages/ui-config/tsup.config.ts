import { defineConfig } from 'tsup';

export default defineConfig((config) => ({
  entry: ['src/**/*.ts'],
  splitting: true,
  sourcemap: true,
  clean: config.watch !== true,
  minify: false,
  keepNames: true,
  bundle: true,
  external: [],
  tsconfig: 'tsconfig.json',
  target: 'node20',
  format: ['esm', 'cjs'],
  outDir: 'dist',
}));
