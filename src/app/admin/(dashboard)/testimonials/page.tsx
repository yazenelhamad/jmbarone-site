import { revalidatePath } from "next/cache";
import { Plus, Star, Trash2, Power } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getTestimonials } from "@/lib/content";

async function createTestimonial(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase.from("testimonials").insert({
    quote: String(formData.get("quote")),
    author_name: String(formData.get("author_name")),
    author_title: String(formData.get("author_title") ?? "") || null,
    author_company: String(formData.get("author_company") ?? "") || null,
    rating: Number(formData.get("rating") ?? 5),
    display_order: Number(formData.get("display_order") ?? 100),
    is_active: formData.get("is_active") === "on",
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

async function toggleTestimonial(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("testimonials")
    .update({ is_active: formData.get("active") === "true" })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

async function deleteTestimonial(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase.from("testimonials").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Testimonials</h1>
      <p className="mt-1 text-charcoal-600">Manage testimonials shown on the homepage.</p>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add testimonial
          </h2>
          <form action={createTestimonial} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="quote">Quote *</label>
              <textarea id="quote" name="quote" required rows={4} className="input" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="author_name">Author *</label>
                <input id="author_name" name="author_name" required className="input" />
              </div>
              <div>
                <label className="label" htmlFor="author_title">Title</label>
                <input id="author_title" name="author_title" className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="author_company">Company</label>
                <input id="author_company" name="author_company" className="input" />
              </div>
              <div>
                <label className="label" htmlFor="rating">Rating</label>
                <select id="rating" name="rating" defaultValue="5" className="input">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="display_order">Order</label>
                <input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={100}
                  className="input"
                />
              </div>
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
                className="h-4 w-4 rounded border-charcoal-300 text-navy-700"
              />
              <span className="text-sm">Active</span>
            </label>
            <button className="btn-primary" type="submit">
              Add testimonial
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <div className="card p-6 text-charcoal-500 text-sm text-center">
              No testimonials yet.
            </div>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm text-charcoal-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center justify-between gap-3">
                  <div className="text-sm">
                    <div className="font-semibold text-navy-900">{t.author_name}</div>
                    <div className="text-charcoal-500 text-xs">
                      {[t.author_title, t.author_company].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={toggleTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="active" value={String(!t.is_active)} />
                      <button
                        className={`btn-ghost text-xs ${
                          t.is_active ? "text-emerald-700" : "text-charcoal-500"
                        }`}
                      >
                        <Power className="h-3.5 w-3.5" />
                        {t.is_active ? "Active" : "Inactive"}
                      </button>
                    </form>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button className="btn-ghost text-xs text-red-700 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
