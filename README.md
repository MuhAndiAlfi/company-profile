# Company Profile (Astro + Tailwind + Sveltia CMS)

Web statis, tanpa database. Semua konten ada di `src/data/` (file JSON) dan diedit lewat `/admin/`.

## Jalankan lokal

```bash
npm install
npm run dev        # http://localhost:4321
```

Edit konten: buka http://localhost:4321/admin/ di **Chrome/Edge** → **Work with Local Repository** →
pilih folder project ini. Perubahan langsung tersimpan ke file JSON (tidak perlu server CMS terpisah).

## Edit konten online

Buka `https://domain-kamu/admin/` → **Sign In Using Access Token** → tempel GitHub Personal Access Token
(fine-grained, hanya repo ini, permission **Contents: Read and write**).
Setiap simpan = commit ke GitHub → website build ulang otomatis.

## Deploy

| Target | Cara |
|---|---|
| **Showcase** — GitHub Pages | Otomatis via `.github/workflows/deploy.yml` setiap push ke `main`. Versi ini `noindex`. Aktifkan di repo: Settings → Pages → Source: **GitHub Actions**. |
| **Final** — hosting berbayar | `npm run build` lalu upload isi folder `dist/` (atau otomatis via GitHub Actions + FTP). |

Variabel build (hanya untuk GitHub Pages): `SITE_URL`, `BASE_PATH`, `PUBLIC_NOINDEX=true`.
Untuk hosting final biarkan kosong — URL diambil dari **Pengaturan → URL website final** di CMS.

## SEO / GEO / AEO

- Meta tags, Open Graph, canonical → `src/layouts/Layout.astro`
- Schema.org JSON-LD (LocalBusiness, FAQPage) → `src/lib/site.ts`
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` → `src/pages/*.ts` (otomatis dari data CMS)
