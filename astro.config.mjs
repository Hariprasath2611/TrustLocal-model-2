import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// customErrorOverlayPlugin removed

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [

    tailwind(),
    react(),
  ],
  vite: {
    plugins: [],
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    allowedHosts: true,
    host: true,
  },
  security: {
    checkOrigin: false
  }
});
