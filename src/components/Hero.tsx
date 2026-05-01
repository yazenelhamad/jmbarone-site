import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";
import { CountUp } from "./CountUp";

export function Hero({ settings }: { settings: SiteSettings }) {
  const tel = settings.phone.replace(/[^\d]/g, "");
  const yearsServing = new Date().getFullYear() - settings.founded_year;
  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="mesh-blobs">
        <span />
      </div>
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container-x relative pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 animate-fade-in-up">
          <span className="badge-sky bg-sky-500/15 text-sky-100 ring-sky-300/30 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="shimmer-text">{settings.hero_eyebrow}</span>
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white tracking-tight">
            {settings.hero_title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-navy-100 max-w-2xl">
            {settings.hero_subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-accent text-base px-6 py-3.5 group relative overflow-hidden"
            >
              <span className="relative z-10">Request Estimate</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <a
              href={`tel:${tel}`}
              className="btn bg-white text-navy-900 hover:bg-navy-50 text-base px-6 py-3.5 shadow-sm group"
            >
              <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Call 24/7: {settings.emergency_phone}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-navy-100/90">
            <div className="flex items-center gap-2 group">
              <ShieldCheck className="h-4 w-4 text-sky-300 group-hover:scale-110 transition-transform" />
              Fully insured
            </div>
            <div className="flex items-center gap-2 group">
              <Star className="h-4 w-4 text-sky-300 fill-sky-300 group-hover:rotate-12 transition-transform" />
              100% satisfaction guarantee
            </div>
            <div className="flex items-center gap-2 group">
              <Sparkles className="h-4 w-4 text-sky-300 group-hover:scale-110 transition-transform" />
              Truck-mounted equipment
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-in">
          <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-6 lg:p-8 shadow-2xl relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -inset-px rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(90,163,207,0.4), rgba(255,255,255,0.05) 40%, transparent)",
                maskImage:
                  "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />
            <div className="grid grid-cols-2 gap-4 relative">
              <Stat number={yearsServing} suffix="+" label="Years serving DFW" />
              <StaticStat number="24/7" label="Emergency response" />
              <Stat number={100} suffix="%" label="Satisfaction guarantee" />
              <Stat number={7} suffix="+" label="Service categories" />
            </div>
            <div className="mt-6 rounded-xl bg-sky-500/15 ring-1 ring-sky-300/30 p-4 relative">
              <div className="text-xs uppercase tracking-widest text-sky-200">
                Service Area
              </div>
              <div className="mt-1 font-semibold text-white">
                {settings.service_area}
              </div>
              <div className="mt-1 text-sm text-navy-100">
                Multifamily · Commercial · Property Management
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  number,
  label,
  suffix = "",
}: {
  number: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-5 hover:bg-white/10 hover:ring-white/20 transition-colors">
      <div className="text-3xl font-extrabold text-white">
        <CountUp to={number} suffix={suffix} />
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-navy-100/80">
        {label}
      </div>
    </div>
  );
}

function StaticStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-5 hover:bg-white/10 hover:ring-white/20 transition-colors">
      <div className="text-3xl font-extrabold text-white">{number}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-navy-100/80">
        {label}
      </div>
    </div>
  );
}
