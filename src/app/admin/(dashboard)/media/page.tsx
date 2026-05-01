import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Copy, Trash2, Upload } from "lucide-react";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { MediaItem } from "@/lib/supabase/types";

async function uploadMedia(formData: FormData) {
  "use server";
  const file = formData.get("file") as File | null;
  if (!file || !file.size) return;
  const admin = createServiceRoleClient();
  const supabase = createClient();

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_");
  const path = `media/${Date.now()}_${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadErr } = await admin.storage
    .from("media")
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (uploadErr) {
    console.error("[media] upload error", uploadErr);
    return;
  }
  const { data: pub } = admin.storage.from("media").getPublicUrl(path);

  await supabase.from("media").insert({
    filename: file.name,
    storage_path: path,
    public_url: pub.publicUrl,
    mime_type: file.type || "application/octet-stream",
    size_bytes: file.size,
    alt_text: String(formData.get("alt_text") ?? "") || null,
  });
  revalidatePath("/admin/media");
}

async function deleteMedia(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const path = String(formData.get("storage_path"));
  const admin = createServiceRoleClient();
  await admin.storage.from("media").remove([path]);
  await admin.from("media").delete().eq("id", id);
  revalidatePath("/admin/media");
}

export default async function MediaPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });
  const items = (data as MediaItem[] | null) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Media library</h1>
      <p className="mt-1 text-charcoal-600">
        Upload images. Copy the public URL to use in services or hero settings.
      </p>

      <div className="mt-8 card p-6">
        <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload image
        </h2>
        <form action={uploadMedia} className="mt-5 grid sm:grid-cols-3 gap-4 items-end" encType="multipart/form-data">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="file">Image file *</label>
            <input
              id="file"
              name="file"
              type="file"
              required
              accept="image/*"
              className="block w-full text-sm text-charcoal-700 file:mr-3 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-700 hover:file:bg-navy-100"
            />
          </div>
          <div>
            <label className="label" htmlFor="alt_text">Alt text</label>
            <input id="alt_text" name="alt_text" className="input" placeholder="Optional" />
          </div>
          <div className="sm:col-span-3">
            <button className="btn-primary" type="submit">
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-navy-900">All media</h2>
        {items.length === 0 ? (
          <div className="mt-4 card p-10 text-center text-charcoal-500 text-sm">
            No media uploaded yet.
          </div>
        ) : (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((m) => (
              <div key={m.id} className="card overflow-hidden">
                <div className="relative aspect-video bg-charcoal-100">
                  {m.mime_type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.public_url}
                      alt={m.alt_text ?? m.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal-400 text-xs">
                      {m.mime_type}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-navy-900 truncate">
                    {m.filename}
                  </div>
                  <div className="text-[11px] text-charcoal-500 truncate">
                    {m.public_url}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <a
                      href={m.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-navy-700 hover:text-sky-600 inline-flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Open URL
                    </a>
                    <form action={deleteMedia}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="storage_path" value={m.storage_path} />
                      <button className="text-xs text-red-700 inline-flex items-center gap-1 hover:underline">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
