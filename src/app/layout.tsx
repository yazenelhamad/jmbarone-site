import type { Metadata } from "next";
import "./globals.css";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { getServices, getSiteSettings } from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jmbaroneinc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "JM Barone Enterprises, Inc. — DFW Cleaning, Restoration & Make-Ready",
    template: "%s | JM Barone Enterprises",
  },
  description:
    "Professional, full turn-key cleaning, restoration, resurfacing, painting, housekeeping, make-ready and maintenance services in Dallas / Fort Worth since 2003. 24-hour water extraction. Fully insured.",
  applicationName: "JM Barone Enterprises",
  authors: [{ name: "JM Barone Enterprises, Inc." }],
  generator: "Next.js",
  keywords: [
    "DFW cleaning company",
    "Dallas Fort Worth carpet cleaning",
    "tile cleaning DFW",
    "bathtub resurfacing Dallas",
    "make ready service apartments",
    "multifamily housekeeping DFW",
    "24 hour water extraction Dallas",
    "commercial cleaning DFW",
    "interior painting Dallas Fort Worth",
    "welding services DFW",
    "pressure washing DFW",
    "JM Barone Enterprises",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "JM Barone Enterprises, Inc.",
    title: "JM Barone Enterprises — DFW Cleaning, Restoration & Make-Ready",
    description:
      "Cleaning, restoration, resurfacing, painting & make-ready in Dallas / Fort Worth since 2003. 24-hour water extraction.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JM Barone Enterprises — DFW Cleaning, Restoration & Make-Ready",
    description:
      "Full turn-key cleaning, restoration & make-ready for DFW multifamily and commercial properties since 2003.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  manifest: "/manifest.webmanifest",
  verification: {
    // Add Google Search Console verification token here when claimed:
    // google: "your-token",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
        />
        <LocalBusinessJsonLd settings={settings} services={services} />
        <WebSiteJsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
