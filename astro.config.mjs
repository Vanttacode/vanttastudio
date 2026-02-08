import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://vanttacode.cl",
  prefetch: { prefetchAll: true },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap(),
    partytown({
      config: {
        // agregá scripts 3rd-party después (analytics, etc)
        forward: [],
      },
    }),
  ],
});
