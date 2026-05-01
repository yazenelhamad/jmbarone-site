"use client";

import { useFormStatus } from "react-dom";
import { Save, Trash2 } from "lucide-react";
import { AVAILABLE_ICONS } from "@/components/ServiceIcon";
import type { Service } from "@/lib/supabase/types";

export function ServiceForm({
  service,
  saveAction,
  deleteAction,
}: {
  service?: Service;
  saveAction: (formData: FormData) => Promise<void>;
  deleteAction?: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="space-y-6">
      <form action={saveAction} className="space-y-6">
        {service && <input type="hidden" name="id" defaultValue={service.id} />}
        <div className="card p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title *" name="title" defaultValue={service?.title} required />
            <Field
              label="Slug *"
              name="slug"
              defaultValue={service?.slug}
              required
              hint="lowercase-with-dashes (used in URL)"
            />
          </div>
          <div>
            <label className="label" htmlFor="icon">Icon</label>
            <select
              id="icon"
              name="icon"
              defaultValue={service?.icon || "Sparkles"}
              className="input"
            >
              {AVAILABLE_ICONS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <Field
            label="Short description"
            name="short_description"
            defaultValue={service?.short_description}
          />
          <FieldArea
            label="Long description"
            name="long_description"
            rows={6}
            defaultValue={service?.long_description}
          />
          <FieldArea
            label="Features (one per line)"
            name="features"
            rows={5}
            defaultValue={service?.features.join("\n")}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Field
              label="Display order"
              name="display_order"
              type="number"
              defaultValue={String(service?.display_order ?? 100)}
            />
            <Field
              label="Hero image URL (optional)"
              name="hero_image_url"
              defaultValue={service?.hero_image_url ?? ""}
              className="sm:col-span-2"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="SEO title"
              name="meta_title"
              defaultValue={service?.meta_title ?? ""}
            />
            <Field
              label="SEO description"
              name="meta_description"
              defaultValue={service?.meta_description ?? ""}
            />
          </div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={service?.is_active ?? true}
              className="h-4 w-4 rounded border-charcoal-300 text-navy-700 focus:ring-navy-500"
            />
            <span className="text-sm text-charcoal-700">Active (visible on public site)</span>
          </label>
        </div>
        <SaveButton />
      </form>

      {service && deleteAction && (
        <form
          action={deleteAction}
          className="card p-6 border-red-100 bg-red-50/40"
        >
          <input type="hidden" name="id" value={service.id} />
          <h3 className="font-semibold text-red-900">Danger zone</h3>
          <p className="mt-1 text-sm text-red-700">
            This will permanently delete the service. This cannot be undone.
          </p>
          <DeleteButton />
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  hint,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="input"
      />
      {hint && <p className="mt-1 text-xs text-charcoal-500">{hint}</p>}
    </div>
  );
}

function FieldArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={rows} defaultValue={defaultValue} className="input" />
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save service"}
      {!pending && <Save className="h-4 w-4" />}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn mt-4 bg-red-600 text-white hover:bg-red-700"
      disabled={pending}
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "Deleting…" : "Delete service"}
    </button>
  );
}
