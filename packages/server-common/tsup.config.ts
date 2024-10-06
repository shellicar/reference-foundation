import { defineConfig } from 'tsup';

export default defineConfig((config) => ({
  entry: ['src/*.ts'],
  splitting: true,
  sourcemap: true,
  dts: true,
  clean: true,
  minify: false,
  keepNames: true,
  bundle: true,
  tsconfig: 'tsconfig.json',
  target: 'node20',
  format: ['esm', 'cjs'],
  outDir: 'dist',
}));
