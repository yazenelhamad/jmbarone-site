import { revalidatePath } from "next/cache";
import { Building2, Plus, Power, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAllTrustedPartnersForAdmin } from "@/lib/content";

async function createPartner(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase.from("trusted_partners").insert({
    name: String(formData.get("name") ?? "").trim(),
    logo_url: String(formData.get("logo_url") ?? "").trim() || null,
    display_order: Number(formData.get("display_order") ?? 100),
    is_active: formData.get("is_active") === "on",
  });
  revalidatePath("/admin/trusted-by");
  revalidatePath("/", "layout");
}

async function updatePartner(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("trusted_partners")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      logo_url: String(formData.get("logo_url") ?? "").trim() || null,
      display_order: Number(formData.get("display_order") ?? 100),
    })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/trusted-by");
  revalidatePath("/", "layout");
}

export default async function TrustedByAdminPage() {
  const partners = await getAllTrustedPartnersForAdmin();

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Trusted by</h1>
      <p className="mt-1 text-charcoal-600">
        Property-management companies shown in the homepage marquee &ldquo;Trusted by DFW property managers&rdquo;.
      </p>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add a property manager
          </h2>
          <form action={createPartner} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="name">Name *</label>
              <input id="name" name="name" required className="input" placeholder="e.g. Sunset Ridge Properties" />
            </div>
            <div>
              <label className="label" htmlFor="logo_url">Logo URL (optional)</label>
              <input id="logo_url" name="logo_url" className="input" placeholder="https://…/logo.png" />
              <p className="mt-1 text-xs text-charcoal-500">
                Upload a logo in <a href="/admin/media" className="underline hover:text-navy-700">Media Library</a> first, then paste its URL here. Leave blank to use a generic building icon.
              </p>
            </div>
            <div>
              <label className="label" htmlFor="display_order">Display order</label>
              <input
                id="display_order"
                name="display_order"
                type="number"
                defaultValue={100}
                className="input"
              />
              <p className="mt-1 text-xs text-charcoal-500">Lower numbers appear first.</p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
                className="h-4 w-4 rounded border-charcoal-300 text-navy-700"
              />
              <span className="text-sm">Active (visible in marquee)</span>
            </label>
            <button className="btn-primary" type="submit">Add partner</button>
          </form>
        </div>

        <div className="space-y-3">
          {partners.length === 0 ? (
            <div className="card p-6 text-charcoal-500 text-sm text-center">
              No partners yet — add the first one on the left.
            </div>
          ) : (
            partners.map((p) => (
              <div
                key={p.id}
                className={`card p-5 ${!p.is_active ? "opacity-60" : ""}`}
              >
                <form action={updatePartner} className="space-y-3">
                  <input type="hidden" name="id" value={p.id} />
                  <div className="flex items-center gap-3">
                    {p.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.logo_url}
                        alt={p.name}
                        className="h-8 w-auto rounded bg-charcoal-50 px-1"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-navy-50 text-navy-700">
                        <Building2 className="h-4 w-4" />
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <input
                        name="name"
                        defaultValue={p.name}
                        className="input text-sm"
                      />
                    </div>
                    {!p.is_active && (
                      <span className="inline-flex items-center rounded-full bg-charcoal-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-700">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-charcoal-500">Logo URL (optional)</label>
                      <input
                        name="logo_url"
                        defaultValue={p.logo_url ?? ""}
                        placeholder="https://…/logo.png"
                        className="input text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-charcoal-500">Order</label>
                      <input
                        name="display_order"
                        type="number"
                        defaultValue={p.display_order}
                        className="input text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button type="submit" className="btn-outline text-xs py-2 px-3">
                      Save
                    </button>
                    <div className="flex gap-2">
                      <Toggle id={p.id} active={p.is_active} />
                      <Delete id={p.id} />
                    </div>
                  </div>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({ id, active }: { id: string; active: boolean }) {
  async function action(formData: FormData) {
    "use server";
    const supabase = createClient();
    await supabase
      .from("trusted_partners")
      .update({ is_active: formData.get("active") === "true" })
      .eq("id", String(formData.get("id")));
    revalidatePath("/admin/trusted-by");
    revalidatePath("/", "layout");
  }
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="active" value={String(!active)} />
      <button
        className={`btn-ghost text-xs py-2 px-3 ${
          active ? "text-emerald-700" : "text-charcoal-500"
        }`}
      >
        <Power className="h-3.5 w-3.5" />
        {active ? "Active" : "Inactive"}
      </button>
    </form>
  );
}

function Delete({ id }: { id: string }) {
  async function action(formData: FormData) {
    "use server";
    const supabase = createClient();
    await supabase
      .from("trusted_partners")
      .delete()
      .eq("id", String(formData.get("id")));
    revalidatePath("/admin/trusted-by");
    revalidatePath("/", "layout");
  }
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="btn-ghost text-xs py-2 px-3 text-red-700 hover:bg-red-50">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
