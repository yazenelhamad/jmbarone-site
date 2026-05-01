export type SiteSettings = {
  id: string;
  phone: string;
  email: string;
  address: string | null;
  emergency_phone: string;
  hero_title: string;
  hero_subtitle: string;
  hero_eyebrow: string;
  hero_image_url: string | null;
  about_heading: string;
  about_body: string;
  founded_year: number;
  service_area: string;
  business_hours: string;
  facebook_url: string | null;
  instagram_url: string | null;
  updated_at: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  icon: string;
  hero_image_url: string | null;
  features: string[];
  display_order: number;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_title: string | null;
  author_company: string | null;
  rating: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_path: string | null;
  file_type: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type MediaItem = {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  community_name: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
};
