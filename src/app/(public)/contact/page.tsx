import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Estimate Request",
  description:
    "Request an estimate, contact JM Barone Enterprises by phone or email, or message us about your DFW property service needs.",
};

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <>
      <section className="bg-charcoal-50/50 border-b border-charcoal-100">
        <div className="container-x py-16">
          <span className="badge">Contact</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">
            Request an estimate
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-600">
            Tell us about your property and the work you need. We typically
            respond same day with an honest, no-obligation quote.
          </p>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <ContactForm
            services={services.map((s) => ({ slug: s.slug, title: s.title }))}
          />
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="card p-7">
            <h2 className="text-lg font-bold text-navy-900">Contact details</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-charcoal-500 text-xs uppercase tracking-wider">
                    Phone
                  </div>
                  <a
                    href={`tel:${settings.phone.replace(/[^\d]/g, "")}`}
                    className="font-semibold text-navy-900 hover:text-sky-600"
                  >
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-charcoal-500 text-xs uppercase tracking-wider">
                    Email
                  </div>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-semibold text-navy-900 hover:text-sky-600 break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </li>
              {settings.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div>
                    <div className="text-charcoal-500 text-xs uppercase tracking-wider">
                      Service Area
                    </div>
                    <div className="font-semibold text-navy-900">
                      {settings.address}
                    </div>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-charcoal-500 text-xs uppercase tracking-wider">
                    Hours
                  </div>
                  <div className="font-semibold text-navy-900">
                    Mon–Fri 8a–6p · 24/7 Emergency
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-navy-900 text-white p-7">
            <div className="text-xs uppercase tracking-widest text-sky-200">
              Emergency Water Extraction
            </div>
            <div className="mt-2 text-2xl font-extrabold">
              Available 24/7
            </div>
            <p className="mt-2 text-sm text-sky-50">
              Burst pipe or flood? Call right now — we'll dispatch fast.
            </p>
            <a
              href={`tel:${settings.emergency_phone.replace(/[^\d]/g, "")}`}
              className="mt-4 btn bg-white text-navy-900 hover:bg-navy-50 w-full"
            >
              <Phone className="h-4 w-4" />
              {settings.emergency_phone}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
