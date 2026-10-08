import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  ShieldCheck,
  Wrench,
  Award,
  Flame,
  MapPin,
  Check,
  ArrowRight,
  MessageSquare,
  Phone,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { FaqItem } from "@/components/common/FaqItem";
import {
  faqs,
  propertySolutions,
  GSTIN,
  PHONE,
  WHATSAPP_BASE,
  WHATSAPP,
} from "@/data/firetechData";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us & FAQ | Chouhan Firetech Services" },
      {
        name: "description",
        content:
          "Discover why commercial and industrial clients choose Chouhan Firetech Services in Banur & Mohali. 24/7 service, GST registered, ISI compliant, turnkey execution, plus 10 comprehensive FAQs.",
      },
    ],
  }),
  component: WhyUsPage,
});

function WhyUsPage() {
  const [selectedPropertyIdx, setSelectedPropertyIdx] = useState(0);

  const activeProp = propertySolutions[selectedPropertyIdx] ?? propertySolutions[0]!;
  const ActivePropIcon = activeProp.icon;

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
            <span className="text-red-500">Why Choose Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>THE TRUSTED LIFE-SAFETY PARTNER</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">CHOUHAN FIRETECH</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Proven emergency response, verified government tax compliance, precision engineering craftsmanship, and complete solutions under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 6 Core Advantages Grid */}
      <section className="py-16 sm:py-20 bg-[#07080b] border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              UNCOMPROMISED ADVANTAGE
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase text-white">
              6 Pillars of Engineering Excellence
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Open 24 Hours / 7 Days</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Fire emergencies and cylinder maintenance cannot wait for business hours. We maintain an active 24/7 hotline and rapid technician dispatch Punjab-wide.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Govt. GST Registered</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Fully compliant commercial enterprise with GSTIN: <strong className="text-emerald-400 font-mono">{GSTIN}</strong>. Complete B2B tax invoices for 100% Input Tax Credit (ITC).
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">End-to-End Turnkey Execution</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                From initial blueprint analysis and pipe fabrication to sprinkler installation, hydrostatic testing, and Fire NOC assistance, everything is executed in-house.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">ISI &amp; NFPA Standards</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                We strictly install certified components adhering to Indian Standards (IS:15683, IS:5290, IS:884) to guarantee zero failure in real emergency conditions.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">On-Site Extinguisher Refilling</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Fast collection, hydraulic pressure test, genuine chemical refilling, and inspection punch tags for ABC powder, CO2 gas, and Mechanical Foam cylinders.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 p-6 bg-[#12141d] hover:bg-[#161924] hover:border-red-500/50 transition-all shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Prime Banur &amp; Mohali Hub</h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Conveniently located at Shop No. 1, Urna, Banur, Mohali. Centrally positioned for immediate arrival across Rajpura, Zirakpur, Patiala, and Derabassi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions by Property Type */}
      <section className="py-16 bg-[#090b10] border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              TAILORED PROTECTION
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase text-white">
              Solutions by Property Type
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Every building has unique hazards. Select your facility to explore tailored fire protection schemes.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Selectors */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {propertySolutions.map((prop, idx) => {
                const Icon = prop.icon;
                const isSelected = selectedPropertyIdx === idx;
                return (
                  <button
                    key={prop.name}
                    type="button"
                    onClick={() => setSelectedPropertyIdx(idx)}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-red-500 bg-red-950/40 text-red-400 shadow-sm"
                        : "border-zinc-800/80 bg-[#12141d] hover:bg-[#181b26] text-zinc-300"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? "text-red-400" : "text-zinc-500"}`} />
                    <span className={`mt-2 text-xs font-bold uppercase leading-tight ${isSelected ? "text-red-400" : "text-zinc-300"}`}>
                      {prop.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Details Card */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-[#12141d] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                  <ActivePropIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                    Recommended Scheme
                  </span>
                  <h3 className="text-xl font-bold uppercase text-white">
                    {activeProp.name}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeProp.description}
              </p>

              <div className="mt-5 pt-4 border-t border-zinc-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Recommended Equipment &amp; Systems:
                </h4>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {activeProp.recommendations.map((rec) => (
                    <div key={rec} className="flex items-center gap-2 rounded-lg bg-[#090b10] border border-zinc-800/90 p-2.5 text-xs font-medium text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                >
                  <span>Request Scheme Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                    `Hello Chouhan Firetech Services, I would like to consult on fire safety for: ${activeProp.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/80 bg-emerald-950/40 px-5 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900/40 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete FAQ Section */}
      <section className="py-20 bg-[#07080b]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-3.5">
              <span>KNOWLEDGE BASE &amp; FAQ</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-bold lowercase text-[10px]">10 Essential Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
              ANSWERS TO YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">FIRE SAFETY QUESTIONS</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Everything you need to know about our extinguisher refilling, turnkey fire fighting pipelines, NBC 2016 safety norms, AMC coverage, and GST invoicing.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.index} item={faq} defaultOpen={i === 0} />
            ))}
          </div>

          {/* Bottom Help Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#101320] to-zinc-900/60 border border-zinc-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-red-500 shrink-0" />
                Have a specific question about your site or equipment?
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-md">
                Our fire protection engineers are on call 24/7 to provide instant technical guidance, premises evaluations, and site estimates.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-md"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call {PHONE}</span>
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
