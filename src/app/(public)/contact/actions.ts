"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitState = {
  ok: boolean;
  error?: string;
  message?: string;
};

export async function submitContactForm(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const community_name =
    String(formData.get("community_name") ?? "").trim() || null;
  const service = String(formData.get("service") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");

  if (honeypot) return { ok: true, message: "Thanks!" }; // silently drop bots
  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // 1) Send to Formspree (email delivery to the owner) if configured.
  const formspreeId = process.env.FORMSPREE_FORM_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          community_name,
          service,
          message,
          _subject: `New JM Barone estimate request from ${name}${community_name ? ` (${community_name})` : ""}`,
          _replyto: email,
        }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error("[contact] Formspree non-OK:", res.status, txt);
      }
    } catch (err) {
      console.error("[contact] Formspree error:", err);
      // don't fail the user — we still try to persist below
    }
  }

  // 2) Persist to Supabase so the admin Submissions page can show the message.
  const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseConfigured) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        phone,
        community_name,
        service,
        message,
      });
      if (error) {
        console.error("[contact] Supabase insert error:", error);
        // If Formspree also wasn't configured, surface the error.
        if (!formspreeId) {
          return { ok: false, error: "Sorry — something went wrong. Please call us." };
        }
      }
    } catch (err) {
      console.error("[contact] Supabase exception:", err);
      if (!formspreeId) {
        return { ok: false, error: "Sorry — something went wrong. Please call us." };
      }
    }
  }

  if (!formspreeId && !supabaseConfigured) {
    // Pure-demo mode: just log so the form still feels working pre-deploy.
    console.warn("[contact] No Formspree or Supabase configured; logging only:", {
      name, email, phone, service, message,
    });
  }

  return {
    ok: true,
    message:
      "Thanks — we got your message! We'll be in touch shortly with your estimate.",
  };
}
