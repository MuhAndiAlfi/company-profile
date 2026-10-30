import type { APIRoute } from "astro";
import { site } from "../lib/site";

// Crawler AI disebut eksplisit supaya jelas diizinkan membaca website (GEO/LLMO).
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
];

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "",
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, "Allow: /", "Disallow: /admin/", ""]),
    `Sitemap: ${new URL("/sitemap.xml", site.siteUrl).href}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
