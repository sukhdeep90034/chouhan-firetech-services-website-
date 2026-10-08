import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Flame,
  MapPin,
  Check,
  Eye,
  ArrowRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import {
  projects,
  WHATSAPP_BASE,
  type ProjectItem,
} from "@/data/firetechData";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Completed Projects & Case Studies | Chouhan Firetech Services" },
      {
        name: "description",
        content:
          "View commissioned turnkey fire fighting projects across Punjab: Industrial manufacturing plants, commercial towers, warehouses, educational campuses, and central pump rooms.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("all");
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  const filteredProjects =
    projectCategoryFilter === "all"
      ? projects
      : projects.filter((p) => p.category === projectCategoryFilter);

  const handleEnquireProject = (title: string) => {
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
            <span className="text-red-500">Projects</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>FIELD INSTALLATIONS &amp; SITE COMMISSIONING</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              COMPLETED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">PROJECTS</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              A verified portfolio of turnkey industrial hydrant networks, high-rack deluge systems, high-pressure pump rooms, and cleanroom fire installations certified across Banur, Mohali, and Northern India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Metrics Strip */}
      <section className="py-12 bg-[#090b10] border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-zinc-800/80 bg-[#10121a] p-5 text-center">
              <span className="block font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                150+
              </span>
              <span className="block text-xs font-bold text-white mt-1">Turnkey Sites Commissioned</span>
              <span className="block text-[10px] text-zinc-500 font-medium">Factories, Malls &amp; Logistics</span>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-[#10121a] p-5 text-center">
              <span className="block font-display text-3xl font-black text-emerald-400">100%</span>
              <span className="block text-xs font-bold text-white mt-1">Hydrostatic Test Pass Rate</span>
              <span className="block text-[10px] text-zinc-500 font-medium">Tested up to 25 Bar Pressure</span>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-[#10121a] p-5 text-center">
              <span className="block font-display text-3xl font-black text-amber-400">NBC 2016</span>
              <span className="block text-xs font-bold text-white mt-1">Statutory Fire Compliance</span>
              <span className="block text-[10px] text-zinc-500 font-medium">IS:3844 &amp; IS:15105 Standards</span>
            </div>
            <div className="rounded-2xl border border-zinc-800/80 bg-[#10121a] p-5 text-center">
              <span className="block font-display text-3xl font-black text-blue-400">24/7</span>
              <span className="block text-xs font-bold text-white mt-1">Emergency AMC Coverage</span>
              <span className="block text-[10px] text-zinc-500 font-medium">Banur, Mohali &amp; Punjab Fleet</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter & Projects Grid */}
      <section className="py-16 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
            {[
              { id: "all", label: "All Projects", count: projects.length },
              { id: "Industrial", label: "Industrial Plants", count: projects.filter((p) => p.category === "Industrial").length },
              { id: "Commercial", label: "Commercial Complexes", count: projects.filter((p) => p.category === "Commercial").length },
              { id: "Warehouse", label: "Logistics & Warehouses", count: projects.filter((p) => p.category === "Warehouse").length },
              { id: "Institutional", label: "Educational & Hostels", count: projects.filter((p) => p.category === "Institutional").length },
              { id: "Pharma", label: "Pharma Cleanrooms", count: projects.filter((p) => p.category === "Pharma").length },
              { id: "Pump Station", label: "Central Pump Stations", count: projects.filter((p) => p.category === "Pump Station").length },
            ].map((tab) => {
              const active = projectCategoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProjectCategoryFilter(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    active
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-[#12141d] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] rounded-full px-1.5 py-0.2 font-bold ${
                      active ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Project Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectModal(proj)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#10121a] shadow-lg hover:shadow-2xl hover:border-red-500/50 hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
              >
                {/* Image Header with Aspect Ratio & Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="rounded-lg bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-400 shadow-md">
                      {proj.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 shadow-md">
                      <Check className="h-3 w-3" />
                      {proj.badge}
                    </span>
                  </div>

                  {/* Dark gradient & location info at bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-zinc-300 pointer-events-none z-10">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span className="truncate max-w-[190px] font-medium">{proj.location}</span>
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      {proj.commissionYear}
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[2px] z-20">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/40">
                      <Eye className="h-4 w-4" />
                      <span>Inspect Case Study &amp; Specs</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400 mb-1.5">
                      <span className="font-semibold text-zinc-300">{proj.area}</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Test: {proj.testPressure}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-red-400 transition-colors leading-snug line-clamp-1">
                      {proj.title}
                    </h3>

                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {proj.scope}
                    </p>

                    {/* Key Technical Specs Pill Grid */}
                    <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                      {proj.keySpecs.map((spec, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-[#161824] border border-zinc-800/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer of Card */}
                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 group-hover:text-red-300 transition-colors">
                      <span>Case Study Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnquireProject(proj.title);
                      }}
                      className="rounded-lg bg-zinc-800/90 hover:bg-red-600 px-3 py-1.5 text-[11px] font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Enquire Similar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Turnkey Callout Banner */}
          <div className="mt-16 rounded-3xl border border-zinc-800/80 bg-gradient-to-r from-red-950/40 via-[#12141e] to-red-950/40 p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 border border-red-500/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-400 mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Turnkey Engineering Consultation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                Planning a Fire Safety Setup for Your Facility?
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
                Send your site drawings or layout plans for accurate hydraulic calculations, pipeline sizing, and itemized tax invoice estimation.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Request Free Site BOQ Estimate
              </Link>
              <a
                href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                  "Hello Chouhan Firetech Services, I have a new building project and would like to share drawings for a fire safety quote."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-900/40 hover:text-white transition-all shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Site Drawings</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProjectModal && (
        <ProjectDetailModal
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
          onEnquire={(title) => {
            setSelectedProjectModal(null);
            handleEnquireProject(title);
          }}
        />
      )}
    </SiteLayout>
  );
}
