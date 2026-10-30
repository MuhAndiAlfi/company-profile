import type { APIRoute } from "astro";
import home from "../data/home.json";
import { site, fullAddress, hoursText, waLink } from "../lib/site";

// Baris hanya ditulis kalau datanya diisi di CMS
const opt = (value: unknown, line: string) => (value ? [line] : []);

// llms.txt: ringkasan bisnis dalam Markdown polos agar mudah dibaca dan dikutip oleh AI (ChatGPT, Claude, Gemini, Perplexity).
export const GET: APIRoute = () => {
  const clients = home.clients.items.map((c) => c.name);
  const lines = [
    `# ${site.brandName}`,
    "",
    `> ${site.description}`,
    "",
    "## Informasi Bisnis",
    `- Nama: ${site.brandName}`,
    `- Bidang: ${site.brandTagline}`,
    `- Lokasi: ${fullAddress}, Indonesia`,
    ...opt(site.foundingYear, `- Berdiri sejak: ${site.foundingYear}`),
    `- Area layanan: ${site.areaServed.map((a) => a.name).join(", ")}`,
    `- Website: ${new URL("/", site.siteUrl).href}`,
    "",
    "## Layanan",
    ...home.services.items.map((s) => `- **${s.title}**: ${s.description}`),
    "",
    "## Contoh Hasil Karya",
    ...home.showcase.items.map((p) => `- ${p.title} (${p.category}) — ${p.subtitle}`),
    "",
    ...opt(clients.length, `## Klien\n${clients.join(", ")}\n`),
    "## Jam Operasional",
    ...site.hours.map((h) => `- ${h.label}: ${hoursText(h)}`),
    "",
    "## Kontak & Pemesanan",
    `- WhatsApp: +${site.whatsapp} (${waLink})`,
    ...opt(site.email, `- Email: ${site.email}`),
    ...opt(site.instagramUrl, `- Instagram: ${site.instagramHandle} (${site.instagramUrl})`),
    ...opt(site.marketplaceUrl, `- ${site.marketplaceLabel}: ${site.marketplaceUrl}`),
    ...opt(site.googleMapsUrl, `- Google Maps: ${site.googleMapsUrl}`),
    "",
    "## Pertanyaan Umum (FAQ)",
    ...home.faq.items.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
