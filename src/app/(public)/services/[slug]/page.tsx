import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  getServiceBySlug,
  getServices,
  getSiteSettings,
} from "@/lib/content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  return {
    title: service.meta_title || service.title,
    description: service.meta_description || service.short_description,
    alternates: { canonical: url },
    openGraph: {
      title: service.meta_title || `${service.title} | JM Barone Enterprises`,
      description: service.meta_description || service.short_description,
      url,
      type: "website",
      images: service.hero_image_url ? [{ url: service.hero_image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta_title || service.title,
      description: service.meta_description || service.short_description,
      images: service.hero_image_url ? [service.hero_image_url] : undefined,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const [service, services, settings] = await Promise.all([
    getServiceBySlug(params.slug),
    getServices(),
    getSiteSettings(),
  ]);
  if (!service) notFound();

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <ServiceJsonLd service={service} settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/#services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
      />
      {/* HERO */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="mesh-blobs">
          <span />
        </div>

        {/* decorative dotted grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-x relative pt-12 pb-20 lg:pt-16 lg:pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm text-navy-100/80 hover:text-white transition-colors group"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
              All services
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/30 to-white/10 backdrop-blur ring-1 ring-white/20 text-sky-100 animate-float">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </div>
              <span className="badge-sky bg-sky-500/15 text-sky-100 ring-sky-300/30">
                <Sparkles className="h-3.5 w-3.5" />
                JM Barone Service
              </span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-navy-100 max-w-2xl leading-relaxed">
              {service.short_description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-accent text-base px-6 py-3.5 group"
              >
                Request Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${settings.phone.replace(/[^\d]/g, "")}`}
                className="btn bg-white text-navy-900 hover:bg-navy-50 text-base px-6 py-3.5"
              >
                <Phone className="h-4 w-4" />
                {settings.phone}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-100/90">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sky-300" />
                Fully insured
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-sky-300" />
                Serving DFW since {settings.founded_year}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-300" />
                100% satisfaction
              </span>
            </div>
          </div>

          {/* Hero image card */}
          <div className="lg:col-span-5 relative">
            <div className="relative animate-fade-in-up">
              {service.hero_image_url ? (
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <Image
                    src={service.hero_image_url}
                    alt={service.title}
                    width={1200}
                    height={800}
                    className="w-full h-72 sm:h-80 lg:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/40 via-transparent to-sky-400/10" />
                </div>
              ) : (
                <div className="rounded-2xl h-[420px] bg-gradient-to-br from-sky-400/20 to-navy-700/40 ring-1 ring-white/10 flex items-center justify-center">
                  <ServiceIcon
                    name={service.icon}
                    className="h-32 w-32 text-white/40"
                  />
                </div>
              )}

              {/* Floating accent badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block animate-float">
                <div className="rounded-2xl bg-white text-navy-900 shadow-2xl ring-1 ring-charcoal-100 p-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-charcoal-500">
                      Backed by
                    </div>
                    <div className="font-bold text-sm">100% Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 hidden sm:block">
                <div
                  className="animate-float rounded-full bg-sky-500 text-white shadow-2xl ring-4 ring-white/20 px-4 py-3 text-xs font-bold uppercase tracking-widest"
                  style={{ animationDelay: "-1s" }}
                >
                  Request Estimate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container-x py-20 grid lg:grid-cols-3 gap-12">
        <AnimateOnScroll className="lg:col-span-2" variant="slide-right">
          <span className="badge">About this service</span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 tracking-tight">
            What you can expect
          </h2>
          <p className="mt-5 text-charcoal-700 leading-relaxed whitespace-pre-line text-[17px]">
            {service.long_description}
          </p>

          {/* Decorative animated SVG accent */}
          <div className="mt-10 relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 to-sky-700 text-white p-8 ring-1 ring-navy-800/40">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg
                viewBox="0 0 600 200"
                className="w-full h-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0,150 C150,80 300,200 450,120 L600,80 L600,200 L0,200 Z"
                  fill="white"
                />
                <path
                  d="M0,170 C150,100 300,220 450,140 L600,100 L600,200 L0,200 Z"
                  fill="white"
                  opacity="0.4"
                />
              </svg>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-sky-200">
                  Ready when you are
                </div>
                <div className="text-lg font-bold">
                  Trusted by DFW property managers since {settings.founded_year}
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="slide-left" delay={120}>
          <div className="card p-6 sticky top-24">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
              What's included
            </h3>
            <ul className="mt-4 space-y-3">
              {service.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-charcoal-700 group"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 ring-1 ring-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:ring-sky-500 transition-colors">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  <span className="group-hover:text-navy-900 transition-colors">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary w-full mt-6 group">
              Request Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${settings.emergency_phone.replace(/[^\d]/g, "")}`}
              className="block text-center mt-3 text-xs text-charcoal-500 hover:text-navy-700 transition-colors"
            >
              or call {settings.emergency_phone}
            </a>
          </div>
        </AnimateOnScroll>
      </section>

      {/* PROCESS STEPS */}
      <AnimateOnScroll>
        <ProcessSteps />
      </AnimateOnScroll>

      {/* BEFORE & AFTER (rendered only when both photos are set in admin) */}
      {service.before_image_url && service.after_image_url && (
        <AnimateOnScroll>
          <BeforeAfter
            beforeUrl={service.before_image_url}
            afterUrl={service.after_image_url}
            caption={service.before_after_caption}
            serviceTitle={service.title}
          />
        </AnimateOnScroll>
      )}

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <AnimateOnScroll>
          <section className="container-x pb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">
              Other services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </section>
        </AnimateOnScroll>
      )}

      <CTASection settings={settings} />
    </>
  );
}
