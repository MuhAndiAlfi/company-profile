import settings from "../data/settings.json";
import hero from "../data/home/hero.json";
import services from "../data/home/services.json";
import clients from "../data/home/clients.json";
import features from "../data/home/features.json";
import showcase from "../data/home/showcase.json";
import testimonials from "../data/home/testimonials.json";
import faq from "../data/home/faq.json";

export const site = settings;
export const home = { hero, services, clients, features: features.items, showcase, testimonials, faq };

// Base path: "/" di hosting sendiri, "/company-profile/" di GitHub Pages (diatur lewat env saat build)
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
// Path "/uploads/x.jpg" dari CMS → "/company-profile/uploads/x.jpg" kalau ada base path
export const asset = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);

// URL publik website; env SITE_URL (saat build) menimpa isian di CMS
const siteOrigin = import.meta.env.SITE ?? settings.siteUrl;
export const siteRoot = new URL(`${base}/`, siteOrigin).href;
export const absUrl = (path: string) => (path ? new URL(asset(path), siteOrigin).href : undefined);

export const noindex = import.meta.env.PUBLIC_NOINDEX === "true";

export const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.waMessage)}`;

export const fullAddress = [settings.streetAddress, settings.city, settings.province, settings.postalCode]
  .filter(Boolean)
  .join(", ");

export const hoursText = (h: (typeof settings.hours)[number]) =>
  h.closed ? "Tutup" : `${h.opens.replace(":", ".")} – ${h.closes.replace(":", ".")} WIB`;

// Data terstruktur Schema.org: dibaca Google (rich result) dan mesin AI untuk memahami bisnis ini.
export function structuredData() {
  const url = siteRoot;
  const id = `${url}#business`;
  const sameAs = [settings.instagramUrl, settings.marketplaceUrl, settings.googleMapsUrl].filter(Boolean);

  const business = {
    "@type": "LocalBusiness",
    "@id": id,
    name: settings.brandName,
    description: settings.description,
    url,
    logo: absUrl(settings.logo),
    image: absUrl(settings.ogImage || home.hero.image || settings.logo),
    telephone: `+${settings.whatsapp}`,
    email: settings.email || undefined,
    foundingDate: settings.foundingYear || undefined,
    priceRange: "Rp",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressRegion: settings.province,
      postalCode: settings.postalCode,
      addressCountry: "ID",
    },
    geo:
      settings.latitude && settings.longitude
        ? { "@type": "GeoCoordinates", latitude: Number(settings.latitude), longitude: Number(settings.longitude) }
        : undefined,
    hasMap: settings.googleMapsUrl || undefined,
    areaServed: settings.areaServed.map((a) => a.name),
    sameAs,
    openingHoursSpecification: settings.hours
      .filter((h) => !h.closed)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    knowsAbout: home.services.items.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: home.services.title,
      itemListElement: home.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description, areaServed: settings.city },
      })),
    },
  };

  const graph: object[] = [
    business,
    { "@type": "WebSite", "@id": `${url}#website`, url, name: settings.brandName, inLanguage: "id-ID", publisher: { "@id": id } },
  ];

  if (home.faq.items.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: home.faq.items.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  // JSON.stringify membuang field undefined; "<" di-escape supaya aman di dalam <script>
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\u003c");
}
