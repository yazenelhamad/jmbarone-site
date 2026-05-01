import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import type { SiteSettings } from "@/lib/supabase/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-navy-950 text-navy-100">
      <div className="container-x py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-navy-200/90">
            Full turn-key cleaning, restoration, resurfacing, painting, and
            make-ready services across the {settings.service_area} since{" "}
            {settings.founded_year}.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-navy-200/80">
            <ShieldCheck className="h-4 w-4 text-sky-300" />
            Fully insured · Estimates available · 100% satisfaction
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/services/carpet-services" className="hover:text-white">
                Carpet Services
              </Link>
            </li>
            <li>
              <Link href="/services/cleaning-services" className="hover:text-white">
                Cleaning Services
              </Link>
            </li>
            <li>
              <Link href="/services/resurfacing" className="hover:text-white">
                Resurfacing
              </Link>
            </li>
            <li>
              <Link href="/services/tile-cleaning" className="hover:text-white">
                Tile Cleaning
              </Link>
            </li>
            <li>
              <Link href="/services/additional-services" className="hover:text-white">
                Additional Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/documents" className="hover:text-white">Documents</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-sky-300" />
              <a
                href={`tel:${settings.phone.replace(/[^\d]/g, "")}`}
                className="hover:text-white"
              >
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-sky-300" />
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
            {settings.address && (
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-sky-300" />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>
          <div className="mt-5 rounded-lg bg-sky-500/10 ring-1 ring-sky-400/30 px-3 py-3 text-xs text-sky-100">
            <strong className="block text-sky-200">
              24-Hour Water Extraction
            </strong>
            Emergency? Call{" "}
            <a
              href={`tel:${settings.emergency_phone.replace(/[^\d]/g, "")}`}
              className="font-semibold text-white underline"
            >
              {settings.emergency_phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800/60">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy-300">
          <p>
            © {year} JM Barone Enterprises, Inc. All rights reserved.
          </p>
          <p>Serving the Dallas / Fort Worth Metroplex.</p>
        </div>
      </div>
    </footer>
  );
}
