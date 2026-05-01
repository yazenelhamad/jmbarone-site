import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/content";
import { SettingsForm } from "./SettingsForm";

async function saveSettings(formData: FormData) {
  "use server";
  const supabase = createClient();
  const data = {
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? "") || null,
    emergency_phone: String(formData.get("emergency_phone") ?? ""),
    hero_eyebrow: String(formData.get("hero_eyebrow") ?? ""),
    hero_title: String(formData.get("hero_title") ?? ""),
    hero_subtitle: String(formData.get("hero_subtitle") ?? ""),
    hero_image_url: String(formData.get("hero_image_url") ?? "") || null,
    about_heading: String(formData.get("about_heading") ?? ""),
    about_body: String(formData.get("about_body") ?? ""),
    founded_year: Number(formData.get("founded_year") ?? 2003),
    service_area: String(formData.get("service_area") ?? ""),
    facebook_url: String(formData.get("facebook_url") ?? "") || null,
    instagram_url: String(formData.get("instagram_url") ?? "") || null,
    updated_at: new Date().toISOString(),
  };

  const id = String(formData.get("id") ?? "");
  if (id && id !== "fallback") {
    await supabase.from("site_settings").update(data).eq("id", id);
  } else {
    await supabase.from("site_settings").insert(data);
  }
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Site settings</h1>
      <p className="mt-1 text-charcoal-600">
        Update phone, email, hero, and about content shown on the public site.
      </p>
      <div className="mt-8">
        <SettingsForm settings={settings} action={saveSettings} />
      </div>
    </div>
  );
}
