import type { MetadataRoute } from "next";
import { getServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://jmbaroneinc.com";
  const services = await getServices();
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/documents`, lastModified: now, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, priority: 0.8 },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
