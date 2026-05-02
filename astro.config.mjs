// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

function rehypeLazyImages() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = node.properties ?? {};
        if (!node.properties.loading) node.properties.loading = 'lazy';
      }
      if (node.children) node.children.forEach(walk);
    }
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://edgarmejia.com',
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
  integrations: [sitemap(), mdx({ rehypePlugins: [rehypeLazyImages] }), preact({ compat: true })],
});
