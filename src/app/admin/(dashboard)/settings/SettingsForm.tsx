"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";

export function SettingsForm({
  settings,
  action,
}: {
  settings: SiteSettings;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" defaultValue={settings.id} />

      <Section title="Contact info">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone" name="phone" defaultValue={settings.phone} />
          <Field label="Email" name="email" type="email" defaultValue={settings.email} />
          <Field label="Emergency phone" name="emergency_phone" defaultValue={settings.emergency_phone} />
          <Field label="Service area" name="service_area" defaultValue={settings.service_area} />
          <div className="sm:col-span-2">
            <Field label="Address" name="address" defaultValue={settings.address ?? ""} />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Hours"
              name="business_hours"
              defaultValue={settings.business_hours}
              hint="Shown on the Contact page. Use a separator like · or | for multiple parts. Example: Mon–Fri 8a–6p · 24/7 Emergency"
            />
          </div>
        </div>
      </Section>

      <Section title="Hero">
        <Field label="Eyebrow text" name="hero_eyebrow" defaultValue={settings.hero_eyebrow} />
        <Field label="Title" name="hero_title" defaultValue={settings.hero_title} />
        <FieldArea label="Subtitle" name="hero_subtitle" defaultValue={settings.hero_subtitle} rows={3} />
        <Field label="Hero image URL (optional)" name="hero_image_url" defaultValue={settings.hero_image_url ?? ""} />
      </Section>

      <Section title="About">
        <Field label="Heading" name="about_heading" defaultValue={settings.about_heading} />
        <FieldArea label="Body" name="about_body" defaultValue={settings.about_body} rows={5} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Founded year" name="founded_year" type="number" defaultValue={String(settings.founded_year)} />
        </div>
      </Section>

      <Section title="Social (optional)">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Facebook URL" name="facebook_url" defaultValue={settings.facebook_url ?? ""} />
          <Field label="Instagram URL" name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
        </div>
      </Section>

      <SaveButton />
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-lg font-bold text-navy-900">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue} className="input" />
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
      {pending ? "Saving…" : "Save changes"}
      {!pending && <Save className="h-4 w-4" />}
    </button>
  );
}
