import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/supabase/types";

const GRADIENTS: Record<string, string> = {
  Sparkles: "from-sky-500/15 to-navy-900/0",
  LayoutGrid: "from-emerald-500/15 to-navy-900/0",
  Paintbrush: "from-amber-500/15 to-navy-900/0",
  SprayCan: "from-violet-500/15 to-navy-900/0",
  Wrench: "from-rose-500/15 to-navy-900/0",
};

export function ServiceCard({ service }: { service: Service }) {
  const grad = GRADIENTS[service.icon] ?? "from-sky-500/15 to-navy-900/0";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block h-full card p-7 tilt-hover overflow-hidden hover:shadow-cardHover hover:-translate-y-1.5 hover:border-navy-200"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sky-300/30 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
      />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 group-hover:bg-navy-800 group-hover:text-white group-hover:ring-navy-800 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
          {service.short_description}
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-sky-600 transition-colors">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );
}
