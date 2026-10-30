# Company Profile (Astro + Tailwind + Decap CMS)

Web statis, tanpa database. Semua konten ada di `src/data/*.json` dan diedit lewat `/admin`.

## Jalankan lokal

Buka 2 terminal:

```bash
npm run dev   # website  -> http://localhost:4321
npm run cms   # server CMS lokal (Decap)
```

Buka http://localhost:4321/admin/ lalu klik **Login** (tanpa password saat lokal).
Di sana bisa tambah, edit, dan hapus layanan, klien, showcase, testimoni, kontak, dll.
Gambar yang di-upload tersimpan di `public/uploads/`.

## Deploy

`npm run build` menghasilkan folder `dist/` (HTML statis).

Supaya `/admin` bisa dipakai di versi online, deploy ke **Netlify** dari repo Git:
1. Push project ke GitHub, lalu import ke Netlify.
2. Di Netlify: Site settings → Identity → Enable, lalu Services → Git Gateway → Enable.
3. Undang email admin lewat Identity → Invite users.

Setiap simpan dari CMS akan membuat commit ke repo, lalu Netlify build ulang otomatis.
