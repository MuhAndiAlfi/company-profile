import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import settings from "./src/data/settings.json" with { type: "json" };

export default defineConfig({
  site: settings.siteUrl,
  vite: { plugins: [tailwindcss()] },
});
