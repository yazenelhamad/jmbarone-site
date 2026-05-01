"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fade-up" | "fade" | "slide-left" | "slide-right" | "zoom";

const VARIANTS: Record<Variant, { hidden: string; shown: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-6",
    shown: "opacity-100 translate-y-0",
  },
  fade: { hidden: "opacity-0", shown: "opacity-100" },
  "slide-left": {
    hidden: "opacity-0 -translate-x-8",
    shown: "opacity-100 translate-x-0",
  },
  "slide-right": {
    hidden: "opacity-0 translate-x-8",
    shown: "opacity-100 translate-x-0",
  },
  zoom: { hidden: "opacity-0 scale-95", shown: "opacity-100 scale-100" },
};

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const v = VARIANTS[variant];
  return (
    // @ts-expect-error generic ref
    <As
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? v.shown : v.hidden
      } ${className}`}
    >
      {children}
    </As>
  );
}
