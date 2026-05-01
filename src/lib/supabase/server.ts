import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Placeholders used when env vars aren't configured yet, so creating a client
// never throws. The admin layout shows a "Setup Required" screen in that
// case; queries that slip through fail gracefully via try/catch in callers.
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignored — cookies set in Server Components are not persistable.
          }
        },
      },
    },
  );
}

export function createServiceRoleClient() {
  // For privileged server-side ops only (admin routes & server actions).
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || PLACEHOLDER_KEY,
    { auth: { persistSession: false } },
  );
}
