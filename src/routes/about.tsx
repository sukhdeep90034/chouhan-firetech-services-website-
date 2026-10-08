import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Users,
  Award,
  PhoneCall,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  Building2,
  Factory,
  MessageSquare,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { GstComplianceCard } from "@/components/common/GstComplianceCard";
import fireTruckImage from "@/assets/fire-truck-about.jpg";
import heroImage from "@/assets/hero-fire-safety.jpg";
import {
  PHONE,
  FORMATTED_PHONE,
  ADDRESS,
  MAPS_URL,
  WHATSAPP,
  GSTIN,
} from "@/data/firetechData";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Chouhan Firetech Services Banur & Mohali" },
      {
        name: "description",
        content:
          "Learn about Chouhan Firetech Services — 15+ years of trusted fire safety engineering, cylinder refilling, pipelines, and structural fabrication in Banur, Mohali, Punjab.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      {/* 1. Page Header Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#121420] via-[#090b10] to-[#07080b] py-16 sm:py-20 border-b border-zinc-800/80">
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-4">
            <Link to="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-red-500">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>ESTABLISHED FIRE PROTECTION AUTHORITY</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">CHOUHAN FIRETECH</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Delivering dependable, government-compliant, and end-to-end fire fighting solutions across residential, commercial, industrial, and institutional sectors in Punjab for over 15 years.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Stats Grid */}
      <section className="py-12 bg-[#090b10] border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-zinc-800/90 bg-[#10121a] p-6 text-center hover:border-red-500/40 transition-colors">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">15+</span>
              <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mt-1">
                Years of Experience
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Protecting life &amp; property
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800/90 bg-[#10121a] p-6 text-center hover:border-red-500/40 transition-colors">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 mb-3">
                <Users className="h-6 w-6" />
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">500+</span>
              <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mt-1">
                Satisfied Clients
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Factories, towers &amp; institutions
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800/90 bg-[#10121a] p-6 text-center hover:border-red-500/40 transition-colors">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 mb-3">
                <Award className="h-6 w-6" />
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">100%</span>
              <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mt-1">
                Hydro-Test Pass Rate
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Zero leakages in handover
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800/90 bg-[#10121a] p-6 text-center hover:border-red-500/40 transition-colors">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">24/7</span>
              <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mt-1">
                Emergency Dispatch
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Sub-45 min response Punjab-wide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive Narrative & Company Story */}
      <section className="py-16 sm:py-20 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                <span className="h-0.5 w-6 bg-red-500" />
                <span>WHO WE ARE</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                Engineering Zero Compromise <span className="text-red-500">Fire Safety</span>
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Headquartered at Shop No. 1, Urna, Sub Division Banur in District Mohali, Punjab, <strong>Chouhan Firetech Services</strong> has established itself as an authoritative leader in comprehensive fire suppression, prevention, maintenance, and technical life-safety compliance.
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed">
                We understand that fire safety equipment is not merely a statutory obligation, but an urgent line of defense. From initial hydraulic calculations and structural pipe fabrication to automated ceiling sprinkler layouts, precision fire alarm sensors, and certified annual extinguisher refills, every system we design is built to perform decisively when seconds count.
              </p>

              {/* Pillars */}
              <div className="grid sm:grid-cols-2 gap-4 pt-3">
                <div className="rounded-xl border border-zinc-800 bg-[#10121a] p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>NBC 2016 Compliant</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    All layouts strictly follow National Building Code (NBC 2016 Part IV) and Bureau of Indian Standards (BIS).
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#10121a] p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Turnkey BOQ to NOC</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    We guide clients through the entire journey from design blueprints to official Fire NOC technical readiness.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#10121a] p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>On-Site Refilling Depot</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    High-pressure hydrostatic testing and genuine ABC powder, CO2, and foam replenishment at our central workshop.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#10121a] p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>100% Tax ITC Compliance</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Government tax registered under GSTIN: {GSTIN} with official HSN/SAC invoices for full corporate tax credit.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl group">
                <img
                  src={fireTruckImage}
                  alt="Chouhan Firetech Services fire rescue vehicle and operations"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 bg-black/80 px-2 py-0.5 rounded border border-red-500/30">
                    Banur Engineering Depot
                  </span>
                  <h3 className="text-lg font-black text-white uppercase mt-1">
                    Rapid Dispatch &amp; Heavy Fabrication Unit
                  </h3>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Shop No. 1, Urna, Sub Division Banur, Mohali
                  </p>
                </div>
              </div>

              {/* GST Compliance Card */}
              <GstComplianceCard />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact & Free Survey Banner */}
      <section className="py-16 bg-[#0c0e17] border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[#12141f] to-zinc-950 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                READY TO SECURE YOUR PREMISES?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white mt-1">
                Consult with Chouhan Firetech Engineers Today
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                Whether you need a single extinguisher refilled or an entire industrial sprinkler network commissioned, our team is at your service 24/7.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>Request Free Site Survey</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
              >
                <Phone className="h-4 w-4 text-red-500" />
                <span>Call: {PHONE}</span>
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/50 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300 transition-all"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
