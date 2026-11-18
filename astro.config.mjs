// @ts-check
// Only for the demo pages in demo/ (npm run dev / build); the package itself is the source in src/.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  srcDir: './demo',
  site: 'https://conex.fsv.cvut.cz',
  vite: {
    plugins: [tailwindcss()],
  },
});
