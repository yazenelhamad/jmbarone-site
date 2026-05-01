import Image from "next/image";

/**
 * Side-by-side Before/After image showcase shown at the bottom of a
 * service page. Render only when both URLs are set.
 *
 * Editable per service from /admin/services/[id]/edit.
 */
export function BeforeAfter({
  beforeUrl,
  afterUrl,
  caption,
  serviceTitle,
}: {
  beforeUrl: string;
  afterUrl: string;
  caption?: string | null;
  serviceTitle: string;
}) {
  return (
    <section className="container-x py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge">Before & After</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
          See the difference
        </h2>
        {caption ? (
          <p className="mt-3 text-charcoal-600">{caption}</p>
        ) : (
          <p className="mt-3 text-charcoal-600">
            A real {serviceTitle.toLowerCase()} job our team completed for a
            DFW property.
          </p>
        )}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5 sm:gap-7 max-w-5xl mx-auto">
        <BeforeAfterCard
          label="Before"
          url={beforeUrl}
          alt={`${serviceTitle} — before`}
          accent="bg-red-700"
        />
        <BeforeAfterCard
          label="After"
          url={afterUrl}
          alt={`${serviceTitle} — after`}
          accent="bg-emerald-600"
        />
      </div>
    </section>
  );
}

function BeforeAfterCard({
  label,
  url,
  alt,
  accent,
}: {
  label: string;
  url: string;
  alt: string;
  accent: string;
}) {
  return (
    <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-charcoal-100 bg-charcoal-50 shadow-card hover:shadow-cardHover transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute top-4 left-4 inline-flex items-center rounded-full ${accent} text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 shadow-md`}
        >
          {label}
        </span>
      </div>
    </figure>
  );
}
