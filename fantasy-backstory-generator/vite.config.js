import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/

const repoName = 'fantasy-backstory-generator';
export default defineConfig({
  plugins: [svelte()],
  base: `/${repoName}/`
})
