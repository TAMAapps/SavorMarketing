import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://savortheapp.com',
  adapter: vercel(),
  // Only process files in src/pages/blog/ - leave root index.html alone
  build: {
    format: 'directory'
  }
});