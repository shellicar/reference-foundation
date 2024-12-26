import { join } from 'node:path';
import type { Config } from 'tailwindcss';

const appPath = join(process.cwd(), './src/**/*.{html,js,svelte,ts}');
const uiPath = join(__dirname, '../../ui-svelte/src/**/*.{html,js,svelte,ts}');

const content = [appPath, uiPath];

console.log('content', content);

export default {
  content,

  theme: {
    extend: {},
  },

  plugins: [],
} satisfies Config;
