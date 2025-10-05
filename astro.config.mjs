// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// solidJs({ include: ['**/solidjs/*'], }), 
export default defineConfig({
  build: {
    inlineStylesheets: 'never'
  },
  integrations: [
    solidJs(), 
    svelte({ extensions: [".svelte"] })
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});