// Content loader. Reads from Supabase when configured; falls back to seed data
// otherwise so the site renders even before the DB is wired up.

import { createClient } from "@/lib/supabase/server";
import {
  FALLBACK_DOCUMENTS,
  FALLBACK_SERVICES,
  FALLBACK_SETTINGS,
  FALLBACK_TESTIMONIALS,
} from "@/lib/fallback-data";
import type {
  DocumentItem,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/supabase/types";

function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return FALLBACK_SETTINGS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return (data as SiteSettings) ?? FALLBACK_SETTINGS;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return FALLBACK_SERVICES;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_SERVICES;
    return data as Service[];
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return FALLBACK_TESTIMONIALS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getDocuments(): Promise<DocumentItem[]> {
  if (!isSupabaseConfigured()) return FALLBACK_DOCUMENTS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_DOCUMENTS;
    return data as DocumentItem[];
  } catch {
    return FALLBACK_DOCUMENTS;
  }
}

// =========================================================================
// Admin-only fetchers — include inactive rows so the owner can re-toggle
// them. Public-site fetchers above stay filtered to is_active = true.
// =========================================================================

export async function getAllServicesForAdmin(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return FALLBACK_SERVICES;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_SERVICES;
    return data as Service[];
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return FALLBACK_TESTIMONIALS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getAllDocumentsForAdmin(): Promise<DocumentItem[]> {
  if (!isSupabaseConfigured()) return FALLBACK_DOCUMENTS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("display_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_DOCUMENTS;
    return data as DocumentItem[];
  } catch {
    return FALLBACK_DOCUMENTS;
  }
}
