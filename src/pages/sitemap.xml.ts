import type { APIRoute } from "astro";
import { site } from "../lib/site";

const pages = ["/", "/llms.txt"];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p, site.siteUrl).href}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
