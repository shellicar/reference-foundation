import plugin from '@shellicar/build-version/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    plugin({
      versionCalculator: process.env.CI ? 'git' : undefined,
      debug: true,
    }),
  ],
  clearScreen: false,
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://127.0.0.1:7071',
        secure: false,
        changeOrigin: true,
      },
    },
    port: 4000,
    strictPort: true,
  },
});
