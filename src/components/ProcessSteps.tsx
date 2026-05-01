import { ClipboardCheck, Truck, Sparkles, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: Truck,
    title: "Schedule & arrive",
    desc: "Pick your service from the menu and we book it. Our technicians arrive on time during business hours with truck-mounted equipment and the right materials for the job.",
  },
  {
    icon: Sparkles,
    title: "Professional service",
    desc: "Our technicians work cleanly and quickly so your turn timelines and resident schedules stay on track.",
  },
  {
    icon: ShieldCheck,
    title: "Walkthrough & guarantee",
    desc: "Our quality control team is dedicated to maintaining our standards. Backed by our 100% satisfaction guarantee — we make it right.",
  },
];

export function ProcessSteps() {
  return (
    <section className="container-x py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge">Our process</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-900">
          How we work
        </h2>
        <p className="mt-3 text-charcoal-600">
          A predictable, on-time process that property managers can rely on.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-6 relative max-w-5xl mx-auto">
        <div
          aria-hidden
          className="hidden sm:block absolute left-12 right-12 top-12 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent"
        />
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="relative rounded-2xl bg-white border border-charcoal-100 p-6 text-center hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-sky-600 text-white shadow-md ring-4 ring-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-widest font-semibold text-sky-600">
                Step {i + 1}
              </div>
              <h3 className="mt-1 text-base font-bold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
