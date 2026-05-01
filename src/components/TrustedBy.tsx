import { Building2 } from "lucide-react";

const COMPANIES = [
  "Dominium Management",
  "Cortland Management",
  "Devonshire Real Estate",
  "Multifamily Communities",
  "Property Management Groups",
  "Commercial Clients",
];

export function TrustedBy() {
  // Render the strip twice — the marquee animates -50% to create a seamless loop.
  const items = [...COMPANIES, ...COMPANIES];

  return (
    <section className="border-y border-charcoal-100 bg-white">
      <div className="container-x py-10">
        <div className="text-center text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500">
          Trusted by DFW property managers
        </div>
        <div className="mt-6 marquee-mask overflow-hidden">
          <div className="marquee-track gap-12 sm:gap-16">
            {items.map((c, i) => (
              <div
                key={`${c}-${i}`}
                className="flex items-center gap-2.5 text-charcoal-400 hover:text-navy-800 transition-colors whitespace-nowrap"
              >
                <Building2 className="h-5 w-5" />
                <span className="font-display font-semibold tracking-tight text-base sm:text-lg">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
