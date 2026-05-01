import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";

export function CTASection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container-x my-20">
      <div className="rounded-3xl gradient-hero text-white p-10 sm:p-14 grid lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready for an estimate?
          </h2>
          <p className="mt-3 text-navy-100 max-w-2xl">
            Tell us about your property and we'll get back to you with a clear,
            honest quote. No obligation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link href="/contact" className="btn-accent w-full text-base py-3.5">
            Request Estimate
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${settings.phone.replace(/[^\d]/g, "")}`}
            className="btn bg-white text-navy-900 hover:bg-navy-50 w-full text-base py-3.5"
          >
            <Phone className="h-4 w-4" />
            {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
