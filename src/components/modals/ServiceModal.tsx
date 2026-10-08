import { X, CheckCircle2, MessageSquare } from "lucide-react";
import type { ServiceItem } from "@/data/firetechData";
import { WHATSAPP_BASE } from "@/data/firetechData";

export function ServiceModal({
  service,
  onClose,
  onEnquire,
}: {
  service: ServiceItem;
  onClose: () => void;
  onEnquire: (title: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-2xl w-full overflow-y-auto rounded-2xl bg-[#12141d] border border-zinc-800 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-black/70 border border-red-500/30 px-2 py-0.5 rounded">
              {service.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white mt-1">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Service Overview</h4>
            <p className="mt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Key Features &amp; Standards</h4>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#090b10] p-4 border border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Typical Installations &amp; Applications</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {service.specs.applications.map((app, i) => (
                <span key={i} className="rounded-md bg-[#161924] px-2 py-1 text-[11px] font-medium text-zinc-300 border border-zinc-700/80">
                  {app}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              <strong className="text-zinc-300">Maintenance Schedule:</strong> {service.specs.maintenance}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onEnquire(service.title)}
              className="flex-1 rounded-md bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors cursor-pointer"
            >
              Get Quotation for this Service
            </button>
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(`Hello, I would like to discuss: ${service.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-md border border-emerald-500/80 bg-emerald-950/40 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900/40 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
