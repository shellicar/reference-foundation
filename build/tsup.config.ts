import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/**/*.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
  keepNames: true,
  dts: true,
  bundle: true,
  external: [],
  tsconfig: 'tsconfig.json',
  target: 'node20',
  format: ['esm', 'cjs'],
  outDir: 'dist',
}));
