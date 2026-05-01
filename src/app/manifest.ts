import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JM Barone Enterprises, Inc.",
    short_name: "JM Barone",
    description:
      "Cleaning, restoration, resurfacing, painting & make-ready in Dallas / Fort Worth since 2003.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#13223e",
    icons: [
      { src: "/icon.png", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
