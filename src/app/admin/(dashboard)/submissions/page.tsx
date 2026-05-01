import { revalidatePath } from "next/cache";
import { Archive, ArchiveRestore, CheckCircle, Mail, Phone, Trash2, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/lib/supabase/types";

async function markRead(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("contact_submissions")
    .update({ is_read: formData.get("read") === "true" })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

async function archive(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("contact_submissions")
    .update({ is_archived: formData.get("archived") === "true" })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/submissions");
}

async function destroy(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { archived?: string };
}) {
  const showArchived = searchParams.archived === "1";
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("is_archived", showArchived)
    .order("created_at", { ascending: false });

  const submissions = (data as ContactSubmission[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">
            {showArchived ? "Archived" : "Inbox"}
          </h1>
          <p className="mt-1 text-charcoal-600">
            Contact form messages from the public site.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/admin/submissions"
            className={`btn ${!showArchived ? "btn-primary" : "btn-outline"}`}
          >
            Inbox
          </a>
          <a
            href="/admin/submissions?archived=1"
            className={`btn ${showArchived ? "btn-primary" : "btn-outline"}`}
          >
            <Archive className="h-4 w-4" /> Archived
          </a>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 ring-1 ring-red-100 p-4 text-sm text-red-700">
          Couldn't load submissions: {error.message}
          <div className="mt-1 text-xs">Make sure the SQL schema has been run.</div>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {submissions.length === 0 ? (
          <div className="card p-10 text-center text-sm text-charcoal-500">
            No {showArchived ? "archived" : "new"} messages.
          </div>
        ) : (
          submissions.map((s) => (
            <div
              key={s.id}
              className={`card p-6 ${
                !s.is_read && !showArchived ? "ring-2 ring-sky-200" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-navy-900">{s.name}</span>
                    {!s.is_read && !showArchived && (
                      <span className="badge-sky">New</span>
                    )}
                    {s.community_name && (
                      <span className="badge">{s.community_name}</span>
                    )}
                    {s.service && (
                      <span className="badge">{s.service}</span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal-500">
                    <a
                      href={`mailto:${s.email}`}
                      className="inline-flex items-center gap-1 hover:text-navy-700"
                    >
                      <Mail className="h-3 w-3" />
                      {s.email}
                    </a>
                    {s.phone && (
                      <a
                        href={`tel:${s.phone}`}
                        className="inline-flex items-center gap-1 hover:text-navy-700"
                      >
                        <Phone className="h-3 w-3" />
                        {s.phone}
                      </a>
                    )}
                    <span>{new Date(s.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <form action={markRead}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="read" value={String(!s.is_read)} />
                    <button className="btn-outline text-xs py-2 px-3">
                      {s.is_read ? <Eye className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                      {s.is_read ? "Mark unread" : "Mark read"}
                    </button>
                  </form>
                  <form action={archive}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="archived" value={String(!s.is_archived)} />
                    <button className="btn-outline text-xs py-2 px-3">
                      {s.is_archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                      {s.is_archived ? "Restore" : "Archive"}
                    </button>
                  </form>
                  <form action={destroy}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="btn text-xs py-2 px-3 bg-red-50 text-red-700 hover:bg-red-100">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-4 whitespace-pre-line text-sm text-charcoal-700">
                {s.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
