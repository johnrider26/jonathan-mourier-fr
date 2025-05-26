// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://jonathanmourier.fr/",

  vite: {
      plugins: [tailwindcss()]
  },
  env: {
    schema: {
      PUBLIC_CONTACT_ENDPOINT: envField.string({ context: "client", access: "public", optional: false }),
      PUBLIC_CAPTCHA_ENDPOINT: envField.string({ context: "client", access: "public", optional: false }),
    }
  },
  i18n: {
      locales: ["fr", "en"],
      defaultLocale: "fr",
      fallback: {
          en: "fr"
      },
      routing: {
          fallbackType: "rewrite"
      }
  },

  experimental: {
      //svg: true,
  },

  integrations: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.indexOf('-') >= 0
      }
    }
  })]
});