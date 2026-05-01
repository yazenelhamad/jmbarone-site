// Fallback content used when Supabase isn't configured yet, so the site renders
// out-of-the-box during development. Once admin content exists, DB data wins.

import type {
  DocumentItem,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/supabase/types";

export const FALLBACK_SETTINGS: SiteSettings = {
  id: "fallback",
  phone: "682-582-6734",
  email: "sales@jmbaroneinc.com",
  address: "Dallas / Fort Worth, Texas",
  emergency_phone: "682-582-6734",
  hero_eyebrow: "Serving DFW since 2003",
  hero_title: "Professional, full turn-key cleaning & restoration for DFW properties.",
  hero_subtitle:
    "Carpet care, tile, resurfacing, painting, make-ready, housekeeping and 24-hour water extraction — backed by a 100% satisfaction guarantee.",
  hero_image_url: null,
  about_heading: "Trusted commercial & multifamily service partner",
  about_body:
    "JM Barone Enterprises, Inc. has served Dallas/Fort Worth since 2003 with full turn-key cleaning, restoration, and maintenance services. We work with multifamily communities, property managers, and commercial clients who need reliable, on-time, quality work — every job, every time. Fully insured. Estimates available. 24-hour emergency response.",
  founded_year: 2003,
  service_area: "Dallas / Fort Worth Metroplex",
  facebook_url: null,
  instagram_url: null,
  updated_at: new Date().toISOString(),
};

export const FALLBACK_SERVICES: Service[] = [
  {
    id: "carpet",
    slug: "carpet-services",
    title: "Carpet Services",
    short_description:
      "Truck-mounted hot-water extraction and 24-hour water extraction for deep, healthy, like-new carpet.",
    long_description:
      "Our carpet services use truck-mounted hot-water extraction equipment to lift soil, allergens, and stains that surface cleaning leaves behind. We treat high-traffic lanes, pet odors, and stubborn spots. Our 24-hour water extraction crew also responds to floods, burst pipes, and storm damage. Ideal for multifamily turns, offices, and post-construction cleanup.",
    icon: "Sparkles",
    hero_image_url:
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1600",
    features: [
      "Truck-mounted hot-water extraction",
      "24-hour water extraction (floods, burst pipes, storm damage)",
      "Spot & stain treatment",
      "Pet odor neutralization",
      "Multifamily turns / make-ready",
      "Commercial maintenance programs",
    ],
    display_order: 10,
    is_active: true,
    meta_title: "Carpet Cleaning & Water Extraction in DFW | JM Barone",
    meta_description:
      "Truck-mounted carpet cleaning and 24-hour water extraction for multifamily, commercial, and residential properties in Dallas / Fort Worth.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cleaning",
    slug: "cleaning-services",
    title: "Cleaning Services",
    short_description:
      "Deep cleans, common area maintenance, and post-construction cleanup.",
    long_description:
      "From routine cleaning programs to deep one-time cleans, we handle it all. Our technicians are trained and equipped for the speed and consistency multifamily and commercial properties demand.",
    icon: "SprayCan",
    hero_image_url:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Multifamily common areas",
      "Office & retail cleaning",
      "Post-construction cleanup",
      "Move-in / move-out cleans",
      "Recurring maintenance plans",
    ],
    display_order: 20,
    is_active: true,
    meta_title: "Commercial & Multifamily Cleaning in DFW | JM Barone",
    meta_description:
      "Professional cleaning technicians for multifamily, commercial, and post-construction projects across DFW.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "resurfacing",
    slug: "resurfacing",
    title: "Resurfacing",
    short_description:
      "Bathtubs, countertops, and tile resurfaced to look brand new.",
    long_description:
      "Replacing tubs and counters is expensive and disruptive. Our resurfacing brings worn, chipped, or stained surfaces back to a clean, glossy finish at a fraction of the cost — perfect for unit turns and quick-cycle make-ready work.",
    icon: "Paintbrush",
    hero_image_url:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Bathtub & shower resurfacing",
      "Countertop refinishing",
      "Tile surround restoration",
      "Chip & stain repair",
      "Fast turnaround for unit turns",
    ],
    display_order: 30,
    is_active: true,
    meta_title: "Bathtub & Countertop Resurfacing in DFW | JM Barone",
    meta_description:
      "Affordable resurfacing for bathtubs, countertops, and tile in DFW — fast turnaround for multifamily turns.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tile",
    slug: "tile-cleaning",
    title: "Tile Cleaning",
    short_description:
      "Restore tile and grout with deep extraction and color restoration.",
    long_description:
      "Years of mopping push soil into grout lines and dull tile surfaces. We use high-pressure extraction tools and tile-safe solutions to lift embedded grime, brighten grout, and restore original color.",
    icon: "LayoutGrid",
    hero_image_url:
      "https://images.pexels.com/photos/3935352/pexels-photo-3935352.jpeg?auto=compress&cs=tinysrgb&w=1600",
    features: [
      "Deep tile & grout extraction",
      "Color restoration",
      "Bathrooms, kitchens, common areas",
      "Make-ready & unit turn support",
    ],
    display_order: 40,
    is_active: true,
    meta_title: "Tile & Grout Cleaning in DFW | JM Barone",
    meta_description:
      "Professional tile and grout cleaning for DFW properties — deep extraction and color restoration.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "additional",
    slug: "additional-services",
    title: "Additional Services",
    short_description:
      "Painting, window cleaning, make ready and trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment.",
    long_description:
      "We're a true turn-key partner. Beyond cleaning and restoration, we offer painting, window cleaning, make ready and trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment — so a single trusted vendor can handle the punch list.",
    icon: "Wrench",
    hero_image_url:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=80",
    features: [
      "Painting",
      "Window cleaning",
      "Make ready and trash outs",
      "Welding",
      "Pressure washing",
      "Tub replacements",
      "Machine rentals",
      "Vinyl pet treatment",
    ],
    display_order: 50,
    is_active: true,
    meta_title: "Painting, Make-Ready, Welding & More in DFW | JM Barone",
    meta_description:
      "Painting, window cleaning, make-ready, trash outs, welding, pressure washing, tub replacements, machine rentals, and vinyl pet treatment for DFW multifamily and commercial properties.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-renee",
    quote:
      "I've been using JM Barone since late 2019 & have not been let down once! Karina, their office manager, is remarkable with scheduling & phenomenal customer service! Their employees from resurface, carpet cleaning & housekeeping have been professional, on-time, & quality work! Their work has over-achieved 5 stars, as now my sister properties are using their services as well. Keep up the great work & penmanship!",
    author_name: "Renee Brown",
    author_title: "Community Manager",
    author_company: "Dominium Management",
    rating: 5,
    is_active: true,
    display_order: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: "t-ray",
    quote:
      "They are the housekeepers I use on my property — they're the best I have found.",
    author_name: "Ray Young",
    author_title: "Lead Maintenance Supervisor",
    author_company: "Cortland Management",
    rating: 5,
    is_active: true,
    display_order: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: "t-erin",
    quote:
      "We use J.M. Barone for our housekeeping services in the multi-family residential business. J.M. Barone is always on time, sometimes same-day service, apartments are always cleaned to a higher standard. Their staff always comes in smiling and apartments are always clean and ready for move-in!",
    author_name: "Erin Pennington",
    author_title: "Community Manager",
    author_company: "Devonshire Real Estate & Asset Management",
    rating: 5,
    is_active: true,
    display_order: 30,
    created_at: new Date().toISOString(),
  },
];

// COI ("2025-2026 Insurance") removed at the owner's request.
export const FALLBACK_DOCUMENTS: DocumentItem[] = [
  {
    id: "d-disclaimer",
    title: "Occupied Disclaimer Forms",
    description: "Required disclaimer for occupied-unit service.",
    file_url:
      "https://drive.google.com/file/d/1dVkHS4Ute016LldiL4fpRqhdtE-JnlnP/view?usp=sharing",
    file_path: null,
    file_type: "external",
    display_order: 10,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "d-cancellation",
    title: "Cancellation Policy & Fees",
    description: "Our cancellation policy and applicable fees.",
    file_url:
      "https://www.canva.com/design/DAF3womtwQI/qCOUHXmsuQBDciZw3DGNhg/view?utm_content=DAF3womtwQI&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    file_path: null,
    file_type: "external",
    display_order: 20,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];
