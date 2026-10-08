import { useEffect } from "react";
import {
  X,
  Check,
  CheckCircle2,
  MapPin,
  Award,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import type { ProjectItem } from "@/data/firetechData";
import { WHATSAPP_BASE } from "@/data/firetechData";

export function ProjectDetailModal({
  project,
  onClose,
  onEnquire,
}: {
  project: ProjectItem;
  onClose: () => void;
  onEnquire: (title: string) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 md:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#0e1017] text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Container with overlays */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-black/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/70 p-2 text-white hover:bg-red-600 transition-colors cursor-pointer border border-white/10"
            aria-label="Close Case Study"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header Title inside photo bottom */}
          <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                {project.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                <Check className="h-3 w-3" />
                {project.badge}
              </span>
              <span className="text-[11px] text-zinc-300 font-medium">
                {project.commissionYear}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight">
              {project.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
              <span>{project.location}</span>
              <span>•</span>
              <span className="font-semibold text-zinc-200">{project.area}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Scope of Work */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Project Execution Scope
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-200 leading-relaxed">
              {project.scope}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141e] p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
              <span>Verified Installation Specs</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {project.keySpecs.map((spec, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-zinc-800/80 bg-[#090b10] p-2.5 text-center"
                >
                  <span className="block text-xs font-bold text-white leading-tight">
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>Engineering Highlights</span>
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-zinc-800/80 bg-[#0d0f17] p-2.5 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Components Installed */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0a0c12] p-4 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Installed Hardware &amp; Piping Infrastructure
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.components.map((comp, i) => (
                <span
                  key={i}
                  className="rounded-md bg-[#161924] border border-zinc-700/80 px-2.5 py-1 text-zinc-300 font-medium text-[11px]"
                >
                  {comp}
                </span>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>
                Hydrostatic Test: <strong className="text-emerald-400 font-mono">{project.testPressure}</strong>
              </span>
              <span>
                Codes: <strong className="text-zinc-200">{project.standards}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800 bg-[#0a0c12] px-5 py-3.5 shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>Require similar industrial fire engineering execution?</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onEnquire(project.title)}
              className="flex-1 sm:flex-none rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-md shadow-red-600/30"
            >
              Enquire This System
            </button>

            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                `Hello Chouhan Firetech Services, I reviewed your project "${project.title}" and would like to discuss a similar requirement.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-3.5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
