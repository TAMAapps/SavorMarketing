import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://savortheapp.com',
  adapter: vercel(),
  integrations: [tailwind()],
  // Only process files in src/pages/blog/ - leave root index.html alone
  build: {
    format: 'directory'
  }
});