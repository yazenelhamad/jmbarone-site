# JM Barone Enterprises — Website + Admin

Modern Next.js + TypeScript + Tailwind rebuild of jmbaroneinc.com, with a
functional Supabase-backed admin dashboard.

- **Public site** — Home, 5 service pages, Documents, Contact
- **Admin** — Login (Supabase auth), Dashboard, Site Settings, Services, Testimonials, Documents (with file upload), Media library, Contact submissions
- **Contact form** — Formspree (email delivery) + Supabase persistence (admin inbox)

The site renders out-of-the-box using bundled fallback content (the testimonials
and document links from the existing site). Once Supabase is wired up, admin
edits become the source of truth automatically.

---

## 1. Local development

```bash
# Node 18.17+ is required by Next 14
npm install
cp .env.local.example .env.local   # fill in values (see below)
npm run dev                        # http://localhost:3000
```

Without any env vars set you'll still get a fully-rendered marketing site —
forms log to the server console instead of persisting.

---

## 2. Supabase setup

1. Create a free project at <https://supabase.com>.
2. In the **SQL editor**, paste the contents of `supabase/schema.sql` and run.
   This creates all tables, RLS policies, storage buckets, storage policies,
   and seeds the existing site's content (testimonials + document links).
3. **Authentication → Providers → Email**: enable email/password.
4. **Authentication → Users → Add user**: create the admin account
   (the owner's email + a strong password). This is the login for `/admin`.
5. **Project settings → API**: copy these into `.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only; required for file uploads)

The schema is idempotent — re-running it is safe. Seed inserts use
`on conflict … do nothing`.

### Storage buckets

The schema creates `documents` and `media` buckets (public-read, auth-write).
File uploads in the admin panel go through the service-role key, so make sure
`SUPABASE_SERVICE_ROLE_KEY` is set in your environment.

---

## 3. Formspree setup (contact form email delivery)

1. Sign up at <https://formspree.io> with the owner's email.
2. Create a new form. Copy the form ID — it's the slug after `/f/` in the
   endpoint URL (e.g. `https://formspree.io/f/xqkraowe` → `xqkraowe`).
3. Set `FORMSPREE_FORM_ID=xqkraowe` in `.env.local` and on Vercel.
4. Confirm the form in the Formspree confirmation email.

The contact form will submit to **both** Formspree (for email) and Supabase
(for the admin inbox). If either is unconfigured, the other still works.

---

## 4. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable                        | Where to get it                          | Required for         |
| ------------------------------- | ---------------------------------------- | -------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project settings → API        | Admin + persistence  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project settings → API        | Admin + persistence  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase → Project settings → API        | File uploads         |
| `NEXT_PUBLIC_SITE_URL`          | Your production URL                      | SEO / sitemap        |
| `FORMSPREE_FORM_ID`             | Formspree → your form                    | Contact form email   |

---

## 5. Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add the same environment variables in **Project → Settings → Environment Variables**
   (Production, Preview, and Development).
4. Deploy. Build command: `next build` (default).
5. Add the production domain (`jmbaroneinc.com`) under **Domains**.
6. Visit `/admin/login` and sign in with the user you created in Supabase.

---

## 6. Project structure

```
src/
  app/
    (public)/              # Public marketing site
      page.tsx             # Home
      services/[slug]/     # Carpet, Tile, Resurfacing, Cleaning, Additional
      documents/           # Public documents/downloads page
      contact/             # Contact + free-estimate form (Formspree + Supabase)
    admin/
      login/               # Supabase auth login
      (dashboard)/         # Auth-protected admin
        page.tsx           # Dashboard home
        services/          # Services manager (CRUD)
        testimonials/      # Testimonials manager
        documents/         # Document manager (uploads + external links)
        media/             # Media library (image uploads)
        submissions/       # Contact form inbox
        settings/          # Site Settings (phone, email, hero, about)
  components/              # Reusable UI (NavBar, Footer, Hero, cards, etc.)
  lib/
    supabase/              # browser / server / middleware clients + types
    content.ts             # Loader: Supabase → fallback
    fallback-data.ts       # Seed copy (testimonials, services, documents)
supabase/schema.sql        # Idempotent schema + seed
middleware.ts              # Auth middleware: protects /admin/*
```

---

## 7. What's been preserved from the existing site

- **Phone**: 682-582-6734
- **Email**: sales@jmbaroneinc.com
- **All three testimonials** — Renee Brown (Dominium), Ray Young (Cortland), Erin Pennington (Devonshire)
- **All three document links** — 2025-2026 Insurance, Occupied Disclaimer Forms, Cancellation Policy & Fees
- **All services** — Carpet, Tile, Resurfacing, Cleaning, Additional (Painting / Housekeeping / Make-Ready / Maintenance)
- **24-hour water extraction** prominently featured (sticky bar + dedicated section)

These ship as fallback data and are also seeded into Supabase by `schema.sql`.

---

## 8. Common admin tasks

- **Edit phone/email** → `/admin/settings`
- **Add a testimonial** → `/admin/testimonials`
- **Upload a new policy PDF** → `/admin/documents` (file upload card)
- **Add an external doc link** (Google Drive / Canva) → `/admin/documents` (link card)
- **Hide a document temporarily** → toggle the "Active" pill on the row
- **View new estimate requests** → `/admin/submissions`
- **Update hero copy** → `/admin/settings → Hero`
- **Add a new service page** → `/admin/services → New service`
- **Upload images for use anywhere** → `/admin/media`, copy the URL

---

## 9. Useful scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```
