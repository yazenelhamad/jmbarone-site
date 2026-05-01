import { Droplets, Phone } from "lucide-react";

export function EmergencyBar({ phone }: { phone: string }) {
  return (
    <div className="bg-red-700 text-red-50 text-xs sm:text-sm">
      <div className="container-x py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Droplets className="h-3.5 w-3.5 text-red-100" />
          <span className="font-medium">
            <span className="text-white font-semibold">24-Hour</span> Emergency
            Water Extraction
          </span>
        </div>
        <a
          href={`tel:${phone.replace(/[^\d]/g, "")}`}
          className="flex items-center gap-1.5 font-semibold text-white hover:text-red-100 transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          {phone}
        </a>
      </div>
    </div>
  );
}
