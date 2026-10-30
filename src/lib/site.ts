import settings from "../data/settings.json";
import home from "../data/home.json";

export const site = settings;

export const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.waMessage)}`;

export const fullAddress = [settings.streetAddress, settings.city, settings.province, settings.postalCode]
  .filter(Boolean)
  .join(", ");

export const hoursText = (h: (typeof settings.hours)[number]) =>
  h.closed ? "Tutup" : `${h.opens.replace(":", ".")} – ${h.closes.replace(":", ".")} WIB`;

export const absUrl = (path: string) => (path ? new URL(path, settings.siteUrl).href : undefined);

// Data terstruktur Schema.org: dibaca Google (rich result) dan mesin AI untuk memahami bisnis ini.
export function structuredData() {
  const url = new URL("/", settings.siteUrl).href;
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
