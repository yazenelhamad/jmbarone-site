import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Inbox,
  MessageSquareQuote,
  Settings,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/components/SetupRequired";

type CountResult = { count: number | null };

export default async function DashboardHomePage() {
  let services: CountResult = { count: 0 };
  let testimonials: CountResult = { count: 0 };
  let documents: CountResult = { count: 0 };
  let submissions: CountResult = { count: 0 };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      [services, testimonials, documents, submissions] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase
          .from("contact_submissions")
          .select("id", { count: "exact", head: true })
          .eq("is_read", false),
      ]);
    } catch (err) {
      console.error("[admin] dashboard counts failed:", err);
    }
  }

  const cards = [
    {
      title: "Services",
      count: services.count ?? 0,
      href: "/admin/services",
      icon: Wrench,
    },
    {
      title: "Testimonials",
      count: testimonials.count ?? 0,
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
    },
    {
      title: "Documents",
      count: documents.count ?? 0,
      href: "/admin/documents",
      icon: FileText,
    },
    {
      title: "Unread submissions",
      count: submissions.count ?? 0,
      href: "/admin/submissions",
      icon: Inbox,
      highlight: (submissions.count ?? 0) > 0,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900">Dashboard</h1>
      <p className="mt-1 text-charcoal-600">
        Manage site content, documents, and contact submissions.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className={`card p-6 hover:shadow-cardHover transition ${
                c.highlight ? "ring-2 ring-sky-300" : ""
              }`}
            >
              <Icon className="h-5 w-5 text-sky-600" />
              <div className="mt-4 text-3xl font-extrabold text-navy-900">
                {c.count}
              </div>
              <div className="text-sm text-charcoal-600">{c.title}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy-700">
                Manage <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickLink
          href="/admin/settings"
          icon={Settings}
          title="Edit site info"
          desc="Phone, email, hero, about copy"
        />
        <QuickLink
          href="/admin/media"
          icon={ImageIcon}
          title="Upload images"
          desc="Use across pages and services"
        />
        <QuickLink
          href="/admin/documents"
          icon={FileText}
          title="Upload a document"
          desc="PDFs, forms, policies"
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold text-navy-900">{title}</div>
        <div className="text-xs text-charcoal-500">{desc}</div>
      </div>
    </Link>
  );
}
