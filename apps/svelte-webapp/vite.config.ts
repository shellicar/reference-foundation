import VersionPlugin from '@shellicar/build-version/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), VersionPlugin({ 
    debug: true,
    versionPath: 'dist/core/version'
   })],
  server: {
    port: 4000,
    strictPort: true,
  },
});
