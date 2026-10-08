import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  ThumbsUp,
  Wrench,
  Droplets,
  Building2,
  ShieldAlert,
  Siren,
  PhoneCall,
  Eye,
  Check,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  House,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteForm } from "@/components/common/QuoteForm";
import { GstComplianceCard } from "@/components/common/GstComplianceCard";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { EnquiryReceiptModal } from "@/components/modals/EnquiryReceiptModal";
import type { LeadItem } from "@/lib/leadVault";

import heroImage from "@/assets/hero-fire-safety.jpg";
import fireTruckImage from "@/assets/fire-truck-about.jpg";
import {
  EMAIL,
  PHONE,
  PHONE_SECONDARY,
  FORMATTED_PHONE,
  FORMATTED_PHONE_SECONDARY,
  services,
  productsList,
  projects,
  propertySolutions,
  WHATSAPP_BASE,
  type ServiceItem,
  type ProjectItem,
} from "@/data/firetechData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chouhan Firetech Services | Complete Fire Safety Solutions" },
      {
        name: "description",
        content:
          "Chouhan Firetech Services provides end-to-end fire safety solutions: fire fighting pipelines, sprinkler systems, extinguisher refilling, structure fabrication, hydrant systems, and fire alarms in Urna, Banur, Mohali, Punjab.",
      },
      { property: "og:title", content: "Chouhan Firetech Services | Fire Safety Solutions" },
      {
        property: "og:description",
        content: "Complete fire safety solutions for residential, commercial, industrial and institutional projects. Call 9417828887 / 9877044142.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Chouhan Firetech Services",
          telephone: ["+91 9417828887", "+91 9877044142"],
          email: EMAIL,
          openingHours: "Mo-Su 00:00-23:59",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No. 1, Urna",
            addressLocality: "Banur",
            addressRegion: "Punjab",
            postalCode: "140601",
            addressCountry: "IN",
          },
          url: "/",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);
  const [receiptLead, setReceiptLead] = useState<LeadItem | null>(null);
  const [selectedPropertyIdx, setSelectedPropertyIdx] = useState(0);

  const activeProp = propertySolutions[selectedPropertyIdx] ?? propertySolutions[0]!;
  const ActivePropIcon = activeProp.icon;

  const icons = [Wrench, Droplets, Flame, Building2, ShieldAlert, Siren];

  return (
    <SiteLayout>
      <main>
        {/* =========================================================================
            1. HERO SECTION
            ========================================================================= */}
        <section id="home" className="relative min-h-[620px] lg:min-h-[700px] flex items-center overflow-hidden bg-black text-white">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Firefighter and heavy industrial fire pump room equipment"
              className="h-full w-full object-cover object-center lg:object-[center_right] scale-[1.02]"
            />
            {/* Atmospheric Fire Radial Blooms */}
            <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-red-600/25 blur-[120px]" />
            <div className="pointer-events-none absolute left-60 top-1/3 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]" />

            {/* Dark gradient overlay for razor-sharp typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/30 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
            <div className="max-w-3xl">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/70 via-black/80 to-red-950/50 px-4 py-1.5 backdrop-blur-md fire-badge-glow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                </span>
                <span className="h-3 w-px bg-red-500/40" />
                <Flame className="h-4 w-4 text-red-500 animate-flame shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.22em] text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  YOUR SAFETY &nbsp;•&nbsp; OUR PRIORITY
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] text-white hero-title-shadow">
                COMPLETE FIRE SAFETY<br />
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 fire-text-glow">
                  SOLUTIONS
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed border-l-2 border-red-600 pl-4 py-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                We provide end-to-end fire protection solutions for residential,
                commercial, industrial and institutional projects. Our expert team
                ensures safety, reliability and peace of mind.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="shine-sweep inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Our Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/30 bg-white/5 backdrop-blur-md px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-6 border-t border-white/15">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2.5 transition-all hover:border-red-500/40 hover:bg-red-950/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/20 border border-red-500/30 text-red-500">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wide leading-tight">
                    24/7 Support
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2.5 transition-all hover:border-red-500/40 hover:bg-red-950/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/20 border border-red-500/30 text-red-500">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wide leading-tight">
                    Expert Team
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2.5 transition-all hover:border-red-500/40 hover:bg-red-950/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/20 border border-red-500/30 text-red-500">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wide leading-tight">
                    Quality Assurance
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-3.5 py-2.5 transition-all hover:border-red-500/40 hover:bg-red-950/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/20 border border-red-500/30 text-red-500">
                    <ThumbsUp className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wide leading-tight">
                    Reliable Solutions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SERVICES SHOWCASE (WITH LINK TO DEDICATED /services)
            ========================================================================= */}
        <section id="services" className="bg-[#0a0c12] py-16 lg:py-20 border-b border-zinc-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                  <span className="h-0.5 w-5 bg-red-500" />
                  <span>OUR SERVICES</span>
                </div>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Fire Protection <span className="text-red-500">Services</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  From design to installation and maintenance, we provide complete fire safety solutions tailored to your needs.
                </p>
              </div>

              <div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/80 bg-red-950/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm hover:bg-red-600 hover:text-white transition-all"
                >
                  <span>Explore All Services Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 6 Services Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {services.map((item, idx) => {
                const IconComponent = icons[idx] || ShieldCheck;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedService(item)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/80 bg-[#12141d] shadow-sm hover:shadow-2xl hover:border-red-500/60 hover:bg-[#161924] transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                        {/* Floating red circle icon overlapping the bottom-left */}
                        <div className="absolute -bottom-3.5 left-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="px-3.5 pt-6 pb-2">
                        <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-tight text-white group-hover:text-red-400 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer with arrow */}
                    <div className="px-3.5 pb-3 pt-1 flex items-center justify-between border-t border-zinc-800/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. ABOUT US TEASER (WITH LINK TO DEDICATED /about)
            ========================================================================= */}
        <section id="about" className="relative overflow-hidden bg-[#0c0d12] text-white py-14 lg:py-16">
          <div
            className="pointer-events-none absolute -left-12 top-0 bottom-0 w-24 bg-red-600 -skew-x-12 opacity-90 hidden sm:block"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Heading and Description */}
              <div className="lg:col-span-4 sm:pl-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                  <span className="h-0.5 w-5 bg-red-500" />
                  <span>ABOUT US</span>
                </div>

                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  Chouhan Firetech Services
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  We are a trusted fire safety service provider committed to delivering high-quality and reliable fire protection solutions. Our goal is to create safer environments for people, property and businesses.
                </p>

                <div className="mt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>Read Full Company Profile →</span>
                  </Link>
                </div>
              </div>

              {/* Middle: 4 Stats Badges */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y lg:border-y-0 lg:border-x border-white/10 px-2 lg:px-6">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <ShieldCheck className="h-6 w-6 text-red-500 mb-1" />
                  <span className="text-2xl font-extrabold text-white tracking-tight">15+</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Years Experience</span>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <Users className="h-6 w-6 text-red-500 mb-1" />
                  <span className="text-2xl font-extrabold text-white tracking-tight">500+</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Happy Clients</span>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <Award className="h-6 w-6 text-red-500 mb-1" />
                  <span className="text-2xl font-extrabold text-white tracking-tight">100%</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Satisfaction</span>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <PhoneCall className="h-6 w-6 text-red-500 mb-1" />
                  <span className="text-2xl font-extrabold text-white tracking-tight">24/7</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Service Support</span>
                </div>
              </div>

              {/* Right: Fire truck graphic */}
              <div className="lg:col-span-3 relative flex items-center justify-center">
                <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-white/10 group">
                  <img
                    src={fireTruckImage}
                    alt="Fire rescue truck background"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12] via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-xl hover:bg-red-700 active:scale-95 transition-all"
                    >
                      <span>About Us Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PRODUCTS SHOWCASE PREVIEW (WITH LINK TO DEDICATED /products)
            ========================================================================= */}
        <section id="products" className="py-16 lg:py-20 bg-[#07080b] border-b border-zinc-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                  <span className="h-0.5 w-5 bg-red-500" />
                  <span>CERTIFIED HARDWARE</span>
                </div>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Fire Safety <span className="text-red-500">Products</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  High-performance ISI &amp; NFPA certified fire safety equipment ready for fast dispatch and installation.
                </p>
              </div>

              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/80 bg-red-950/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm hover:bg-red-600 hover:text-white transition-all"
                >
                  <span>Explore Full Catalog Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productsList.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-xl border border-zinc-800/80 bg-[#12141d] p-5 shadow-sm hover:shadow-xl hover:border-red-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-800/60">
                        {prod.category}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400">
                        {prod.standards}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-white">
                      {prod.name}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-zinc-300 bg-[#090b10] p-3 rounded-lg border border-zinc-800/80">
                      <p>
                        <strong className="text-zinc-200">Capacities:</strong> {prod.capacities}
                      </p>
                      <p>
                        <strong className="text-zinc-200">Rating:</strong> {prod.rating}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-red-400 hover:text-red-300 inline-flex items-center gap-1"
                    >
                      Enquire Price <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                        `Hello Chouhan Firetech Services, I would like to buy or enquire about: ${prod.name}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <MessageSquare className="h-3 w-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. PROJECTS SHOWCASE PREVIEW (WITH LINK TO DEDICATED /projects)
            ========================================================================= */}
        <section id="projects" className="py-16 lg:py-24 bg-[#08090f] border-b border-zinc-800/80 relative overflow-hidden">
          <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-950/60 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-400">
                  <Flame className="h-3.5 w-3.5" />
                  <span>FIELD INSTALLATIONS &amp; CASE STUDIES</span>
                </div>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                  COMPLETED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">PROJECTS</span>
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium max-w-2xl">
                  Commissioned industrial hydrant networks, high-rack deluge systems, high-pressure pump rooms, and cleanroom fire installations certified across Punjab.
                </p>
              </div>

              <div>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/80 bg-red-950/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm hover:bg-red-600 hover:text-white transition-all"
                >
                  <span>View All Case Studies Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Preview Projects Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectModal(proj)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#10121a] shadow-lg hover:shadow-2xl hover:border-red-500/50 hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="rounded-lg bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                        {proj.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                        <Check className="h-3 w-3" />
                        {proj.badge}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-zinc-300 pointer-events-none z-10">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span className="truncate max-w-[190px] font-medium">{proj.location}</span>
                      </span>
                      <span className="text-[10px] font-bold text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                        {proj.commissionYear}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-red-400 transition-colors leading-snug line-clamp-1">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {proj.scope}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 group-hover:text-red-300 transition-colors">
                        <span>Case Study Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. SOLUTIONS BY PROPERTY & WHY US PREVIEW
            ========================================================================= */}
        <section id="why-us" className="py-16 lg:py-20 bg-[#07080b] border-b border-zinc-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                  <span className="h-0.5 w-5 bg-red-500" />
                  <span>OUR ADVANTAGE</span>
                </div>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                  Why Choose <span className="text-red-500">Chouhan Firetech</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Trusted by factories, malls, hotels, and homeowners for unwavering reliability and round-the-clock fire protection.
                </p>
              </div>

              <div>
                <Link
                  to="/why-us"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/80 bg-red-950/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm hover:bg-red-600 hover:text-white transition-all"
                >
                  <span>Explore Why Us &amp; FAQs Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Property Selector */}
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertySolutions.map((prop, idx) => {
                  const Icon = prop.icon;
                  const isSelected = selectedPropertyIdx === idx;
                  return (
                    <button
                      key={prop.name}
                      onClick={() => setSelectedPropertyIdx(idx)}
                      className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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

              <div className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-[#12141d] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                    <ActivePropIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Tailored Fire Scheme</span>
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
                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors"
                  >
                    <span>Request Scheme Quote</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/why-us"
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    <span>Read 10 FAQs &amp; Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONTACT & INSTANT QUOTE FORM SECTION (WITH LINK TO DEDICATED /contact)
            ========================================================================= */}
        <section id="contact" className="py-16 lg:py-24 bg-[#07080b] border-b border-zinc-800/80 relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 items-start">
              {/* Left Column: Direct Contacts */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-3 shadow-xs">
                    <Flame className="h-3 w-3" />
                    <span>DIRECT ENGINEERING DESK</span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                    Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">Chouhan Firetech</span>
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-lg">
                    Direct 24/7 emergency dispatch, WhatsApp quotations, and expert on-site engineering consultations across Urna, Banur, Mohali, and all of Punjab.
                  </p>
                </div>

                {/* Direct Contact Links */}
                <div className="space-y-3">
                  <a
                    href={`tel:${PHONE}`}
                    className="group relative flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-4 shadow-sm hover:border-red-500/50 transition-all block"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                        Primary 24/7 Hotline
                      </span>
                      <span className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors block mt-0.5">
                        {FORMATTED_PHONE}
                      </span>
                      <span className="text-xs text-zinc-400">Immediate technical dispatch</span>
                    </div>
                  </a>

                  <a
                    href={`tel:${PHONE_SECONDARY}`}
                    className="group relative flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-4 shadow-sm hover:border-red-500/50 transition-all block"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                        Secondary 24/7 Helpline
                      </span>
                      <span className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors block mt-0.5">
                        {FORMATTED_PHONE_SECONDARY}
                      </span>
                      <span className="text-xs text-zinc-400">Direct engineering consultation</span>
                    </div>
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300"
                  >
                    <span>Open Dedicated Contact Us Page →</span>
                  </Link>
                </div>

                {/* GST Compliance Card */}
                <GstComplianceCard />
              </div>

              {/* Right Column: Quote Form */}
              <div className="lg:col-span-7">
                <QuoteForm onLeadSubmitted={(lead) => setReceiptLead(lead)} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onEnquire={(title) => {
            setSelectedService(null);
            navigate({ to: "/contact" });
          }}
        />
      )}

      {selectedProjectModal && (
        <ProjectDetailModal
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
          onEnquire={(title) => {
            setSelectedProjectModal(null);
            navigate({ to: "/contact" });
          }}
        />
      )}

      {receiptLead && (
        <EnquiryReceiptModal
          lead={receiptLead}
          onClose={() => setReceiptLead(null)}
        />
      )}
    </SiteLayout>
  );
}
