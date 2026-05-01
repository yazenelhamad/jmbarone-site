import { ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";
import { getDocuments, getSiteSettings } from "@/lib/content";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Documents & Forms",
  description:
    "Download disclaimer forms and policy documents from JM Barone Enterprises — quick-access references for property managers.",
  alternates: { canonical: "/documents" },
  openGraph: {
    title: "Documents & Forms | JM Barone Enterprises",
    description:
      "Disclaimer forms and policies for our property management partners.",
    url: "/documents",
    type: "website",
  },
};

export default async function DocumentsPage() {
  const [documents, settings] = await Promise.all([
    getDocuments(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="bg-charcoal-50/50 border-b border-charcoal-100">
        <div className="container-x py-16">
          <span className="badge">Documents & Forms</span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy-900">
            Property management documents
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-600">
            Quick-access policies, insurance certificates, and disclaimer forms
            for our property management partners.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        {documents.length === 0 ? (
          <div className="card p-10 text-center text-charcoal-500">
            No documents available yet.
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {documents.map((d) => (
              <li key={d.id}>
                <a
                  href={d.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 flex items-start gap-4 hover:shadow-cardHover hover:-translate-y-0.5 transition group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 shrink-0 group-hover:bg-navy-800 group-hover:text-white transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-navy-900 group-hover:text-navy-700 inline-flex items-center gap-2">
                      {d.title}
                      <ExternalLink className="h-4 w-4 text-charcoal-400" />
                    </h2>
                    {d.description && (
                      <p className="mt-1 text-sm text-charcoal-600">
                        {d.description}
                      </p>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CTASection settings={settings} />
    </>
  );
}
