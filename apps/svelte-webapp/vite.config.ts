import plugin from '@shellicar/build-version/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), plugin({})],
  clearScreen: false,
  server: {
    port: 4000,
    strictPort: true,
  },
});
