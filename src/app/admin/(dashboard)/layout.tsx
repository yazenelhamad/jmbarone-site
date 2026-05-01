import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "../AdminShell";
import { SetupRequired, isSupabaseConfigured } from "@/components/SetupRequired";

// Admin pages read auth cookies at request time, so they cannot be prerendered.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Friendly setup screen if env vars aren't set yet (no crash).
  if (!isSupabaseConfigured()) {
    return <SetupRequired />;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}
