import Link from "next/link";
import { Edit, Plus, Power } from "lucide-react";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getServices } from "@/lib/content";
import type { Service } from "@/lib/supabase/types";

async function toggleActive(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const next = formData.get("active") === "true";
  const supabase = createClient();
  await supabase.from("services").update({ is_active: next }).eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Services</h1>
          <p className="mt-1 text-charcoal-600">
            Add, edit, and reorder service pages.
          </p>
        </div>
        <Link href="/admin/services/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New service
        </Link>
      </div>

      <div className="mt-8 card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-700">
            <tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Order</Th>
              <Th>Active</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {services.map((s: Service) => (
              <tr key={s.id} className="hover:bg-charcoal-50/40">
                <Td>
                  <div className="font-semibold text-navy-900">{s.title}</div>
                  <div className="text-xs text-charcoal-500 mt-0.5 max-w-md truncate">
                    {s.short_description}
                  </div>
                </Td>
                <Td className="font-mono text-xs">{s.slug}</Td>
                <Td>{s.display_order}</Td>
                <Td>
                  <form action={toggleActive}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="active" value={String(!s.is_active)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        s.is_active
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "bg-charcoal-100 text-charcoal-600"
                      }`}
                    >
                      <Power className="h-3 w-3" />
                      {s.is_active ? "Active" : "Inactive"}
                    </button>
                  </form>
                </Td>
                <Td className="text-right">
                  <Link
                    href={`/admin/services/${s.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-navy-700 hover:text-sky-600 text-sm font-semibold"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-4 align-middle ${className}`}>{children}</td>;
}
