import { revalidatePath } from "next/cache";
import { ExternalLink, FileText, Plus, Power, Trash2, Upload } from "lucide-react";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { getAllDocumentsForAdmin } from "@/lib/content";

async function createLink(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase.from("documents").insert({
    title: String(formData.get("title")),
    description: String(formData.get("description") ?? "") || null,
    file_url: String(formData.get("file_url")),
    file_type: "external",
    display_order: Number(formData.get("display_order") ?? 100),
    is_active: formData.get("is_active") === "on",
  });
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

async function uploadDocument(formData: FormData) {
  "use server";
  const file = formData.get("file") as File | null;
  if (!file || !file.size) return;

  const admin = createServiceRoleClient();
  const supabase = createClient();

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_");
  const path = `documents/${Date.now()}_${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadErr } = await admin.storage
    .from("documents")
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (uploadErr) {
    console.error("[documents] upload error", uploadErr);
    return;
  }
  const { data: pub } = admin.storage.from("documents").getPublicUrl(path);

  await supabase.from("documents").insert({
    title: String(formData.get("title") || file.name),
    description: String(formData.get("description") ?? "") || null,
    file_url: pub.publicUrl,
    file_path: path,
    file_type: file.type || "application/octet-stream",
    display_order: Number(formData.get("display_order") ?? 100),
    is_active: true,
  });
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

async function toggleDoc(formData: FormData) {
  "use server";
  const supabase = createClient();
  await supabase
    .from("documents")
    .update({ is_active: formData.get("active") === "true" })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

async function deleteDoc(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const path = String(formData.get("file_path") ?? "");
  const supabase = createClient();
  if (path) {
    const admin = createServiceRoleClient();
    await admin.storage.from("documents").remove([path]);
  }
  await supabase.from("documents").delete().eq("id", id);
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

export default async function DocumentsManagerPage() {
  const documents = await getAllDocumentsForAdmin();
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Documents</h1>
      <p className="mt-1 text-charcoal-600">
        Upload PDFs and forms, or add external links shown on the public Documents page.
      </p>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload a file
          </h2>
          <form action={uploadDocument} className="mt-5 space-y-4" encType="multipart/form-data">
            <div>
              <label className="label" htmlFor="title">Title</label>
              <input id="title" name="title" className="input" placeholder="(defaults to filename)" />
            </div>
            <div>
              <label className="label" htmlFor="description">Description</label>
              <input id="description" name="description" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="file">File (PDF, image, doc) *</label>
              <input
                id="file"
                name="file"
                type="file"
                required
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.txt,.xlsx,.csv"
                className="block w-full text-sm text-charcoal-700 file:mr-3 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-700 hover:file:bg-navy-100"
              />
            </div>
            <div>
              <label className="label" htmlFor="display_order">Order</label>
              <input id="display_order" name="display_order" type="number" defaultValue={100} className="input" />
            </div>
            <button className="btn-primary" type="submit">
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </form>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add an external link
          </h2>
          <form action={createLink} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="title">Title *</label>
              <input id="title" name="title" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="description">Description</label>
              <input id="description" name="description" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="file_url">URL *</label>
              <input id="file_url" name="file_url" type="url" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="display_order_link">Order</label>
              <input
                id="display_order_link"
                name="display_order"
                type="number"
                defaultValue={100}
                className="input"
              />
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
            <button className="btn-primary" type="submit">Add link</button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-navy-900">All documents</h2>
        <div className="mt-4 card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-charcoal-50 text-charcoal-700">
              <tr>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider">Source</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider">Order</th>
                <th className="px-5 py-3 text-left text-xs uppercase tracking-wider">Active</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {documents.map((d) => (
                <tr key={d.id} className={!d.is_active ? "opacity-60" : ""}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-sky-600" />
                      <div>
                        <div className="font-semibold text-navy-900">
                          {d.title}
                          {!d.is_active && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-charcoal-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-700">
                              Hidden
                            </span>
                          )}
                        </div>
                        {d.description && (
                          <div className="text-xs text-charcoal-500">{d.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={d.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-navy-700 hover:text-sky-600"
                    >
                      {d.file_path ? "Uploaded file" : "External link"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-5 py-4">{d.display_order}</td>
                  <td className="px-5 py-4">
                    <form action={toggleDoc}>
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="active" value={String(!d.is_active)} />
                      <button
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          d.is_active
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                            : "bg-charcoal-100 text-charcoal-600"
                        }`}
                      >
                        <Power className="h-3 w-3" />
                        {d.is_active ? "Active" : "Inactive"}
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <form action={deleteDoc}>
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="file_path" value={d.file_path ?? ""} />
                      <button className="btn-ghost text-xs text-red-700 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
