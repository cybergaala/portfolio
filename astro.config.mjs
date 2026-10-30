// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://edgarmejia.com',
  // responsive srcsets for every image, including the ones in Markdown posts
  image: {
    layout: 'constrained',
  },
  // the ClientRouter waits for the next page before it shows anything, so fetch each link's HTML as soon as
  // it scrolls into view and a click swaps right away; the pages are ~20KB gzipped and images aren't included.
  // post links opt out with data-astro-prefetch="tap": they are many and heavy, so they load on press behind the header spinner
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap(), mdx()],
});
