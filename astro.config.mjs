// @ts-check
import { defineConfig } from 'astro/config';
import { execSync } from 'child_process';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Custom integration to fetch Google Docs content before build
function fetchVelkommen() {
  return {
    name: 'fetch-velkommen',
    hooks: {
      'astro:config:setup': () => {
        console.log('🔄 Fetching content from Google Docs...');
        try {
          execSync('node scripts/fetch-velkommen.js', { stdio: 'inherit' });
        } catch (error) {
          console.error('❌ Failed to fetch from Google Docs:', error);
          throw error;
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://heis.fm',
  integrations: [fetchVelkommen(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});