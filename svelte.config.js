import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
  },
	preprocess: [vitePreprocess(), mdsvex({extensions: [".md", ".svx"]})],
	extensions: ['.svelte', '.svx']
};

export default config;
