import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "../../ServiceForm";
import type { Service } from "@/lib/supabase/types";

async function updateService(formData: FormData) {
  "use server";
  const supabase = createClient();
  const id = String(formData.get("id"));
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
    before_image_url: String(formData.get("before_image_url") ?? "") || null,
    after_image_url: String(formData.get("after_image_url") ?? "") || null,
    before_after_caption:
      String(formData.get("before_after_caption") ?? "") || null,
    is_active: formData.get("is_active") === "on",
    updated_at: new Date().toISOString(),
  };
  await supabase.from("services").update(data).eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

async function deleteService(formData: FormData) {
  "use server";
  const supabase = createClient();
  const id = String(formData.get("id"));
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Edit service</h1>
      <p className="mt-1 text-charcoal-600">Update the content for this service page.</p>
      <div className="mt-8">
        <ServiceForm
          service={data as Service}
          saveAction={updateService}
          deleteAction={deleteService}
        />
      </div>
    </div>
  );
}
