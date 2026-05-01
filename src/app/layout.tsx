import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jmbaroneinc.com",
  ),
  title: {
    default:
      "JM Barone Enterprises, Inc. — DFW Cleaning, Restoration & Make-Ready",
    template: "%s | JM Barone Enterprises",
  },
  description:
    "Professional, full turn-key cleaning, restoration, resurfacing, painting, housekeeping, make-ready and maintenance services in Dallas / Fort Worth since 2003. 24-hour water extraction. Fully insured.",
  keywords: [
    "DFW cleaning company",
    "Dallas Fort Worth carpet cleaning",
    "tile cleaning DFW",
    "bathtub resurfacing Dallas",
    "make ready service apartments",
    "multifamily housekeeping DFW",
    "24 hour water extraction Dallas",
    "JM Barone Enterprises",
  ],
  openGraph: {
    title: "JM Barone Enterprises, Inc.",
    description:
      "Cleaning, restoration, resurfacing, painting & make-ready in Dallas / Fort Worth since 2003.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </head>
      <body>{children}</body>
    </html>
  );
}
