// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://jonathanmourier.fr/",

  vite: {
      plugins: [tailwindcss()]
  },

  i18n: {
      locales: ["fr", "en"],
      defaultLocale: "fr",
      fallback: {
          en: "fr"
      },
      prefixDefaultLocale: true,
      routing: {
          fallbackType: "rewrite"
      }
  },

  experimental: {
      //svg: true,
  },

  integrations: [vue()]
});