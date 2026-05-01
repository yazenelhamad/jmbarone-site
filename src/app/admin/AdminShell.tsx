"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Wrench,
  MessageSquareQuote,
  FileText,
  Image as ImageIcon,
  Inbox,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-charcoal-50/40">
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b border-charcoal-100 px-4 py-3">
        <Logo />
        <button
          className="p-2 text-navy-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`${
            open ? "block" : "hidden"
          } lg:block lg:sticky lg:top-0 lg:h-screen w-full lg:w-64 shrink-0 border-r border-charcoal-100 bg-white`}
        >
          <div className="hidden lg:flex h-16 items-center px-5 border-b border-charcoal-100">
            <Logo />
          </div>
          <nav className="p-3 space-y-1">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-navy-900 text-white"
                      : "text-charcoal-700 hover:bg-charcoal-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute lg:static inset-x-0 bottom-0 p-3 border-t border-charcoal-100 bg-white">
            <div className="px-3 py-2 text-xs text-charcoal-500 truncate">
              {userEmail}
            </div>
            <button
              onClick={signOut}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-charcoal-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
            <Link
              href="/"
              className="mt-1 block rounded-lg px-3 py-2 text-xs text-charcoal-500 hover:bg-charcoal-50 hover:text-navy-700"
            >
              ← Back to public site
            </Link>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="p-6 lg:p-10 max-w-6xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
