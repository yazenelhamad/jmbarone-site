import Link from "next/link";
import { Database, ExternalLink, KeyRound } from "lucide-react";
import { Logo } from "./Logo";

export function SetupRequired() {
  return (
    <div className="min-h-screen bg-charcoal-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="card p-8 sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 ring-1 ring-amber-100 text-amber-700">
            <Database className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-navy-900">
            Admin setup required
          </h1>
          <p className="mt-2 text-charcoal-600">
            The admin dashboard needs Supabase to be connected before you can
            sign in. The public website is already running on bundled fallback
            content — this just enables editing.
          </p>

          <ol className="mt-6 space-y-4 text-sm text-charcoal-700">
            <Step n={1} title="Create a free Supabase project">
              Go to{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy-700 hover:text-sky-600 inline-flex items-center gap-0.5"
              >
                supabase.com <ExternalLink className="h-3 w-3" />
              </a>{" "}
              and create a new project.
            </Step>
            <Step n={2} title="Run the SQL schema">
              In <strong>SQL Editor</strong>, paste the contents of{" "}
              <code className="rounded bg-charcoal-100 px-1.5 py-0.5 text-xs">
                supabase/schema.sql
              </code>{" "}
              and click <strong>Run</strong>. This creates all tables, security
              policies, storage buckets, and seeds your testimonials and
              document links.
            </Step>
            <Step n={3} title="Create the admin account">
              <strong>Authentication → Providers → Email</strong> → enable
              email/password. Then{" "}
              <strong>Authentication → Users → Add user</strong> with the owner's
              email + a strong password. That's your admin login.
            </Step>
            <Step n={4} title="Add environment variables">
              Copy{" "}
              <code className="rounded bg-charcoal-100 px-1.5 py-0.5 text-xs">
                .env.local.example
              </code>{" "}
              to{" "}
              <code className="rounded bg-charcoal-100 px-1.5 py-0.5 text-xs">
                .env.local
              </code>{" "}
              and fill in three values from{" "}
              <strong>Project Settings → API</strong>:
              <ul className="mt-2 space-y-1 list-disc list-inside text-charcoal-600">
                <li>
                  <code>NEXT_PUBLIC_SUPABASE_URL</code> — Project URL
                </li>
                <li>
                  <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> — anon public key
                </li>
                <li>
                  <code>SUPABASE_SERVICE_ROLE_KEY</code> — service_role key
                </li>
              </ul>
            </Step>
            <Step n={5} title="Restart the dev server">
              <code className="rounded bg-charcoal-100 px-1.5 py-0.5 text-xs">
                Ctrl-C
              </code>{" "}
              then{" "}
              <code className="rounded bg-charcoal-100 px-1.5 py-0.5 text-xs">
                npm run dev
              </code>{" "}
              — Next picks up new env vars only on restart.
            </Step>
          </ol>

          <div className="mt-8 rounded-xl bg-navy-50 ring-1 ring-navy-100 p-5 flex items-start gap-3">
            <KeyRound className="h-5 w-5 text-navy-700 mt-0.5 shrink-0" />
            <div className="text-sm text-navy-900">
              <strong>Once configured</strong>, the{" "}
              <Link href="/admin/login" className="underline hover:text-sky-600">
                /admin/login
              </Link>{" "}
              page will accept the email/password you created in step 3, and
              everything in this dashboard will be live.
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-outline">
              ← Back to public site
            </Link>
            <a
              href="https://supabase.com/dashboard/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open Supabase
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white text-xs font-bold">
        {n}
      </span>
      <div>
        <div className="font-semibold text-navy-900">{title}</div>
        <div className="mt-0.5 text-charcoal-600 leading-relaxed">{children}</div>
      </div>
    </li>
  );
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
