// JSON-LD structured data components.
// These emit application/ld+json <script> tags that search engines parse
// to understand the business, services, and page hierarchy.

import type { Service, SiteSettings } from "@/lib/supabase/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jmbaroneinc.com";

function JsonLd({ data }: { data: Record<string, unknown> | unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * LocalBusiness — emitted on every page so Google's local-search /
 * knowledge-panel signals are present everywhere a crawler lands.
 */
export function LocalBusinessJsonLd({
  settings,
  services,
}: {
  settings: SiteSettings;
  services?: Service[];
}) {
  const tel = settings.phone;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "JM Barone Enterprises, Inc.",
    alternateName: ["J.M. Barone", "JM Barone"],
    description:
      "Full turn-key cleaning, restoration, resurfacing, painting, and make-ready services for multifamily and commercial properties across the Dallas / Fort Worth Metroplex. 24-hour water extraction.",
    url: SITE_URL,
    telephone: tel,
    email: settings.email,
    image: `${SITE_URL}/brand/logo.jpg`,
    logo: `${SITE_URL}/brand/logo.jpg`,
    foundingDate: String(settings.founded_year),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas / Fort Worth",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dallas",
        containedInPlace: { "@type": "State", name: "Texas" },
      },
      {
        "@type": "City",
        name: "Fort Worth",
        containedInPlace: { "@type": "State", name: "Texas" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Dallas / Fort Worth Metroplex",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: tel,
        contactType: "customer service",
        email: settings.email,
        areaServed: "US-TX",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: settings.emergency_phone,
        contactType: "emergency",
        availableLanguage: ["English", "Spanish"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
  };

  if (services && services.length > 0) {
    data.makesOffer = services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    }));
  }

  if (settings.facebook_url || settings.instagram_url) {
    data.sameAs = [settings.facebook_url, settings.instagram_url].filter(
      Boolean,
    );
  }

  return <JsonLd data={data} />;
}

/**
 * Service — emitted on each /services/[slug] page so Google can understand
 * the specific service being offered, its provider, and its area served.
 */
export function ServiceJsonLd({
  service,
  settings,
}: {
  service: Service;
  settings: SiteSettings;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    description: service.short_description,
    serviceType: service.title,
    url: `${SITE_URL}/services/${service.slug}`,
    image: service.hero_image_url || `${SITE_URL}/brand/logo.jpg`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "JM Barone Enterprises, Inc.",
      telephone: settings.phone,
      email: settings.email,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Dallas / Fort Worth Metroplex",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — what's included`,
      itemListElement: service.features.map((feature, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Breadcrumb — emitted on inner pages to help Google render breadcrumb
 * navigation in search snippets.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * WebSite + SearchAction — helps Google show a search box for the brand.
 */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "JM Barone Enterprises, Inc.",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
  return <JsonLd data={data} />;
}
