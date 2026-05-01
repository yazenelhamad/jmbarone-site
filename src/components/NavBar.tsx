"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";

const PUBLIC_NAV = [
  { href: "/", label: "Home" },
  { href: "/services/carpet-services", label: "Carpet" },
  { href: "/services/cleaning-services", label: "Cleaning" },
  { href: "/services/resurfacing", label: "Resurfacing" },
  { href: "/services/tile-cleaning", label: "Tile" },
  { href: "/services/additional-services", label: "Additional" },
  { href: "/documents", label: "Documents" },
  { href: "/contact", label: "Contact" },
];

export function NavBar({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {PUBLIC_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "text-navy-900 bg-navy-50"
                    : "text-charcoal-600 hover:text-navy-900 hover:bg-charcoal-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${phone.replace(/[^\d]/g, "")}`}
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-navy-700"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
          <Link href="/contact" className="btn-accent">
            Request Estimate
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-navy-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-charcoal-100 bg-white">
          <div className="container-x py-3 flex flex-col gap-1">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-charcoal-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-charcoal-100">
              <a
                href={`tel:${phone.replace(/[^\d]/g, "")}`}
                className="btn-outline w-full"
              >
                <Phone className="h-4 w-4" /> {phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-accent w-full"
              >
                Request Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
