import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "../ServiceForm";

async function createService(formData: FormData) {
  "use server";
  const supabase = createClient();
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const data = {
    title: String(formData.get("title")),
    slug: String(formData.get("slug")),
    icon: String(formData.get("icon") || "Sparkles"),
    short_description: String(formData.get("short_description") ?? ""),
    long_description: String(formData.get("long_description") ?? ""),
    features,
    display_order: Number(formData.get("display_order") ?? 100),
    hero_image_url: String(formData.get("hero_image_url") ?? "") || null,
    meta_title: String(formData.get("meta_title") ?? "") || null,
    meta_description: String(formData.get("meta_description") ?? "") || null,
    is_active: formData.get("is_active") === "on",
  };
  await supabase.from("services").insert(data);
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">New service</h1>
      <p className="mt-1 text-charcoal-600">Add a new service page.</p>
      <div className="mt-8">
        <ServiceForm saveAction={createService} />
      </div>
    </div>
  );
}
