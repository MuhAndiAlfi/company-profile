import type { APIRoute } from "astro";
import { absUrl, asset, noindex } from "../lib/site";

// Crawler AI disebut eksplisit supaya jelas diizinkan membaca website (GEO/LLMO).
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
];

const headers = { "Content-Type": "text/plain; charset=utf-8" };

export const GET: APIRoute = () => {
  // Versi showcase (GitHub Pages) tidak boleh diindeks supaya tidak bentrok dengan domain asli
  if (noindex) return new Response("User-agent: *\nDisallow: /\n", { headers });
  const admin = asset("/admin/");
  const body = [
    "User-agent: *",
    "Allow: /",
    `Disallow: ${admin}`,
    "",
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, "Allow: /", `Disallow: ${admin}`, ""]),
    `Sitemap: ${absUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
  return new Response(body, { headers });
};
