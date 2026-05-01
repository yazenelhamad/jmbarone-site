import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Phone,
  ShieldCheck,
  Star,
  Sparkles,
  Clock,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustedBy } from "@/components/TrustedBy";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import {
  getDocuments,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";

export default async function HomePage() {
  const [settings, services, testimonials, documents] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTestimonials(),
    getDocuments(),
  ]);

  return (
    <>
      <Hero settings={settings} />

      {/* Trust strip */}
      <section className="border-b border-charcoal-100 bg-white">
        <div className="container-x py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <Trust icon={<ShieldCheck className="h-5 w-5" />} label="Fully Insured" />
          <Trust icon={<Star className="h-5 w-5" />} label="100% Satisfaction" />
          <Trust icon={<Clock className="h-5 w-5" />} label="24/7 Emergency" />
          <Trust icon={<CheckCircle2 className="h-5 w-5" />} label="Free Estimates Available" />
        </div>
      </section>

      <TrustedBy />

      {/* Services */}
      <section id="services" className="container-x py-20">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="What we do"
            title="Full turn-key services for DFW properties"
            subtitle="One trusted vendor for cleaning, restoration, resurfacing, painting, and make-ready — built for property managers, multifamily, and commercial clients."
          />
        </AnimateOnScroll>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimateOnScroll
              key={s.id}
              delay={i * 80}
              className="h-full"
            >
              <ServiceCard service={s} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Emergency Water Extraction */}
      <section className="container-x my-10">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-navy-900 text-white p-10 sm:p-14 grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs uppercase tracking-widest text-sky-100">
              <Droplets className="h-3.5 w-3.5" />
              Emergency Service
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              24-Hour Water Extraction
            </h2>
            <p className="mt-3 text-sky-50 max-w-2xl leading-relaxed">
              Burst pipe? Flood? Storm damage? We respond around the clock with
              truck-mounted extraction equipment to limit damage and start
              drying immediately. Don't wait — every hour matters.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-sky-50">
              {[
                "Rapid response across DFW",
                "Truck-mounted extraction",
                "Restoration rentals available",
                "Drying & restoration follow-through",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-200" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <a
              href={`tel:${settings.emergency_phone.replace(/[^\d]/g, "")}`}
              className="block rounded-2xl bg-white text-navy-900 p-6 shadow-2xl hover:scale-[1.01] transition"
            >
              <div className="text-xs uppercase tracking-widest text-charcoal-500">
                Call Now — 24/7
              </div>
              <div className="mt-1 flex items-center gap-3">
                <Phone className="h-7 w-7 text-sky-600" />
                <span className="text-3xl font-extrabold tracking-tight">
                  {settings.emergency_phone}
                </span>
              </div>
              <div className="mt-3 text-sm text-charcoal-600">
                Tap to call — emergency dispatch
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container-x py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="badge">About</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {settings.about_heading}
          </h2>
          <p className="mt-5 text-charcoal-600 leading-relaxed">
            {settings.about_body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/documents" className="btn-outline">
              View Documents
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { n: `${new Date().getFullYear() - settings.founded_year}+`, l: "Years in Business", c: "bg-navy-900 text-white" },
            { n: "4.7★", l: "Google Rating", c: "bg-sky-500 text-white" },
            { n: "DFW", l: "Service Area", c: "bg-white text-navy-900 ring-1 ring-charcoal-100" },
            { n: "100%", l: "Insured", c: "bg-charcoal-900 text-white" },
          ].map((b) => (
            <div key={b.l} className={`rounded-2xl p-7 shadow-card ${b.c}`}>
              <div className="text-4xl font-extrabold tracking-tight">
                {b.n}
              </div>
              <div className="mt-1 text-sm uppercase tracking-wider opacity-80">
                {b.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal-50/50 border-y border-charcoal-100">
        <div className="container-x py-20">
          <SectionHeading
            eyebrow="What clients say"
            title="Trusted by DFW property managers"
            subtitle="Real feedback from the multifamily and property-management teams we serve every day."
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimateOnScroll
                key={t.id}
                delay={i * 100}
                className="h-full"
              >
                <TestimonialCard t={t} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Documents preview */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="badge">Documents</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 tracking-tight">
              Forms & policies
            </h2>
            <p className="mt-2 text-charcoal-600">
              Property management documents available for download.
            </p>
          </div>
          <Link href="/documents" className="btn-outline">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {documents.slice(0, 3).map((d) => (
            <a
              key={d.id}
              href={d.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 hover:shadow-cardHover hover:-translate-y-0.5 transition group"
            >
              <div className="flex items-center justify-between">
                <Sparkles className="h-5 w-5 text-sky-500" />
                <span className="text-xs font-medium text-charcoal-400 group-hover:text-navy-700">
                  Open ↗
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-navy-900">
                {d.title}
              </h3>
              {d.description && (
                <p className="mt-1 text-sm text-charcoal-600">{d.description}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      <CTASection settings={settings} />
    </>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-charcoal-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
