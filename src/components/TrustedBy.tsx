import { Building2 } from "lucide-react";
import { getTrustedPartners } from "@/lib/content";

export async function TrustedBy() {
  const partners = await getTrustedPartners();
  if (!partners || partners.length === 0) return null;

  // Render the strip twice — the marquee animates -50% to create a seamless loop.
  const items = [...partners, ...partners];

  return (
    <section className="border-y border-charcoal-100 bg-white">
      <div className="container-x py-10">
        <div className="text-center text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500">
          Trusted by DFW property managers
        </div>
        <div className="mt-6 marquee-mask overflow-hidden">
          <div className="marquee-track gap-12 sm:gap-16">
            {items.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex items-center gap-2.5 text-charcoal-400 hover:text-navy-800 transition-colors whitespace-nowrap"
              >
                {p.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.logo_url}
                    alt={p.name}
                    className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <Building2 className="h-5 w-5" />
                )}
                <span className="font-display font-semibold tracking-tight text-base sm:text-lg">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
