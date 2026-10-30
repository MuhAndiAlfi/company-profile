import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import settings from "./src/data/settings.json" with { type: "json" };

// SITE_URL & BASE_PATH hanya diisi saat build GitHub Pages (showcase).
// Di hosting final keduanya kosong → pakai URL dari CMS dan path "/".
export default defineConfig({
  site: process.env.SITE_URL || settings.siteUrl,
  base: process.env.BASE_PATH || "/",
  vite: { plugins: [tailwindcss()] },
});
