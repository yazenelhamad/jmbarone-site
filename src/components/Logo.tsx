import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  if (light) {
    // Dark background (footer): the navy-on-white original would show as a
    // white card on dark. Render a clean light-on-dark text mark instead.
    return (
      <Link
        href="/"
        className="inline-flex items-center gap-3 group"
        aria-label="JM Barone Enterprises home"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex h-9 w-12">
            <span className="absolute left-0 top-0 h-2 w-2 rounded-sm bg-navy-200" />
            <span className="absolute left-0 top-3 h-2 w-2 rounded-sm bg-navy-200" />
            <span className="absolute left-0 top-6 h-2 w-2 rounded-sm bg-navy-200" />
            <span className="absolute right-0 top-1 h-1.5 w-8 rounded-full bg-red-500/90" />
            <span className="absolute right-0 top-4 h-1.5 w-8 rounded-full bg-red-500/90" />
            <span className="absolute right-0 top-7 h-1.5 w-8 rounded-full bg-red-500/90" />
          </span>
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display font-bold text-base tracking-wide text-white">
            J.M. BARONE
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-navy-200">
            Enterprises, Inc.
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center group"
      aria-label="JM Barone Enterprises home"
    >
      <Image
        src="/brand/logo.jpg"
        alt="J.M. Barone Enterprises, Inc."
        width={680}
        height={110}
        priority
        className="h-10 sm:h-11 w-auto mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  );
}
