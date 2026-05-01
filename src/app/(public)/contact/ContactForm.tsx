"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, Send, AlertTriangle } from "lucide-react";
import { submitContactForm, type SubmitState } from "./actions";

const initial: SubmitState = { ok: false };

export function ContactForm({
  services,
}: {
  services: { slug: string; title: string }[];
}) {
  const [state, action] = useFormState(submitContactForm, initial);

  if (state.ok && state.message) {
    return (
      <div className="card p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-navy-900">
          Message received
        </h2>
        <p className="mt-2 text-charcoal-600 max-w-md mx-auto">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card p-7 sm:p-9 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="label">
            Name *
          </label>
          <input id="name" name="name" required className="input" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="community_name" className="label">
            Community Name <span className="text-charcoal-400 font-normal">(if applicable)</span>
          </label>
          <input
            id="community_name"
            name="community_name"
            type="text"
            className="input"
            placeholder="e.g. Sunset Ridge Apartments"
            autoComplete="organization"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="service" className="label">
            Service of interest
          </label>
          <select id="service" name="service" className="input" defaultValue="">
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Emergency Water Extraction">
              Emergency Water Extraction
            </option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input"
          placeholder="Tell us about your property, the work needed, and any timing requirements."
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 ring-1 ring-red-100 p-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 mt-0.5" />
          {state.error}
        </div>
      )}

      <SubmitButton />

      <p className="text-xs text-charcoal-500">
        We respect your privacy. Your info is only used to follow up on your
        request.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full text-base py-3.5" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
      {!pending && <Send className="h-4 w-4" />}
    </button>
  );
}
