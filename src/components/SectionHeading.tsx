export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="badge">{eyebrow}</span>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-charcoal-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
