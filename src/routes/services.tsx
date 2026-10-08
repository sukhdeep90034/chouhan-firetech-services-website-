import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Flame,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Droplets,
  Building2,
  ShieldAlert,
  Siren,
  ShieldCheck,
  MessageSquare,
  Clock,
  Sparkles,
  Phone,
  Eye,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ServiceModal } from "@/components/modals/ServiceModal";
import {
  services,
  PHONE,
  PHONE_SECONDARY,
  WHATSAPP,
  WHATSAPP_BASE,
  type ServiceItem,
} from "@/data/firetechData";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | Chouhan Firetech Services Banur & Mohali" },
      {
        name: "description",
        content:
          "Explore all 6 fire safety engineering services: Fire fighting pipelines, automatic sprinklers, extinguisher refilling, structure fabrication, hydrants, and alarm systems.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const navigate = useNavigate();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const icons = [Wrench, Droplets, Flame, Building2, ShieldAlert, Siren];

  const handleEnquireService = (title: string) => {
    navigate({ to: "/contact" });
  };

  return (
    <SiteLayout>
      {/* 1. Page Header Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#121420] via-[#090b10] to-[#07080b] py-16 sm:py-20 border-b border-zinc-800/80">
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-4">
            <Link to="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-red-500">Our Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>TURNKEY PROTECTION &amp; MAINTENANCE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              OUR FIRE SAFETY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">SERVICES</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              From precision pipeline erection and hydraulic calculations to certified extinguisher refilling and complete Fire Safety NOC readiness across Punjab.
            </p>
          </div>
        </div>
      </section>

      {/* 2. All 6 Services Detailed Grid */}
      <section className="py-16 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, idx) => {
              const IconComponent = icons[idx] || ShieldCheck;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#10121a] shadow-lg hover:shadow-2xl hover:border-red-500/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Image Header with Aspect Ratio & Icon badge */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-black/30 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-black/80 border border-red-500/40 px-2.5 py-1 rounded-lg backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>

                      {/* Floating Circle Icon */}
                      <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-xl shadow-red-600/40 border border-red-400/40">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 pt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-black uppercase text-white group-hover:text-red-400 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Key Features List */}
                      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                          Key Features:
                        </span>
                        {item.features.slice(0, 3).map((f, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Typical Applications */}
                      <div className="pt-2 border-t border-zinc-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                          Applications:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.specs.applications.slice(0, 3).map((app, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-[10px] font-semibold text-zinc-300 bg-[#161824] px-2 py-0.5 rounded border border-zinc-800"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveModalService(item)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 py-2.5 px-3 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 text-red-400" />
                      <span>View Detailed Technical Specs</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-1 rounded-xl bg-red-600 hover:bg-red-700 py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition-all text-center"
                      >
                        <span>Quote</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <a
                        href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                          `Hello Chouhan Firetech Services, I would like to discuss: ${item.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/50 py-2.5 px-3 text-xs font-bold text-emerald-300 transition-all text-center"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive AMC (Annual Maintenance Contract) Strip */}
      <section className="py-16 bg-[#0a0c13] border-y border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-[#12141e] via-[#0e1017] to-red-950/40 p-8 sm:p-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/70 px-3 py-1 text-xs font-extrabold uppercase text-red-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>24/7 ANNUAL MAINTENANCE CONTRACTS (AMC)</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white">
                  Keep Your Fire Safety Infrastructure 100% Ready
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  Commercial complexes, industrial plants, and educational institutes cannot afford system failure. Our comprehensive AMCs provide quarterly physical audits, detector sensitivity tests, hydrant line flushings, pump runs, and priority 24-hour dispatch across Punjab.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
                    <span className="font-bold text-white block">Quarterly Audits</span>
                    <span className="text-[11px] text-zinc-400">Regular site visits &amp; pump skids check</span>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
                    <span className="font-bold text-white block">Refill Reminders</span>
                    <span className="text-[11px] text-zinc-400">Automated schedule &amp; testing date punch tags</span>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
                    <span className="font-bold text-white block">Statutory Fire NOC</span>
                    <span className="text-[11px] text-zinc-400">Safety readiness inspection certification</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/30 transition-all cursor-pointer"
                >
                  <span>Request Custom AMC Proposal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 py-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                  >
                    <Phone className="h-4 w-4 text-red-500" />
                    <span>Call: {PHONE}</span>
                  </a>

                  <a
                    href={`tel:${PHONE_SECONDARY}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 py-3 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                  >
                    <Phone className="h-4 w-4 text-red-400" />
                    <span>Call: {PHONE_SECONDARY}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {activeModalService && (
        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onEnquire={(title) => {
            setActiveModalService(null);
            handleEnquireService(title);
          }}
        />
      )}
    </SiteLayout>
  );
}
