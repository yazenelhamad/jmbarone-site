import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="card p-7 flex flex-col h-full">
      <Quote className="h-8 w-8 text-sky-300" />
      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="mt-4 text-charcoal-700 leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <footer className="mt-6 pt-5 border-t border-charcoal-100">
        <div className="font-semibold text-navy-900">{t.author_name}</div>
        <div className="text-sm text-charcoal-500">
          {[t.author_title, t.author_company].filter(Boolean).join(" · ")}
        </div>
      </footer>
    </article>
  );
}
