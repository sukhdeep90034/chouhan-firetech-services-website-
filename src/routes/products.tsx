import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Flame,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  MessageSquare,
  RotateCcw,
  Building2,
  Check,
  Phone,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  productsList,
  PHONE,
  WHATSAPP_BASE,
  type ProductItem,
} from "@/data/firetechData";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Fire Safety Products | Chouhan Firetech Services Banur" },
      {
        name: "description",
        content:
          "Buy ISI & NFPA certified fire safety equipment: ABC Dry Chemical Extinguishers, CO2 cylinders, mechanical foam, automatic sprinklers, hose reels, and smoke detectors.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "Extinguishers", label: "Fire Extinguishers" },
    { id: "Suppression", label: "Sprinklers & Suppression" },
    { id: "Hydrants", label: "Hydrants & Hose Reels" },
    { id: "Alarms & Detection", label: "Alarms & Smoke Detectors" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsList
      : productsList.filter((p) => p.category === selectedCategory);

  const handleEnquireProduct = (name: string) => {
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
            <span className="text-red-500">Products</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ISI &amp; NFPA CERTIFIED HARDWARE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              FIRE SAFETY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">PRODUCTS</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Heavy-duty, factory-tested, and code-compliant fire extinguishing hardware, automatic sprinkler heads, and detection instruments ready for immediate dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter & Products Grid */}
      <section className="py-16 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    active
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-[#12141d] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-zinc-800/90 bg-[#10121a] p-6 shadow-md hover:shadow-2xl hover:border-red-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-950/60 text-red-400 border border-red-800/60">
                      {prod.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {prod.standards}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base sm:text-lg font-black text-white leading-snug">
                    {prod.name}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-zinc-300 bg-[#090b10] p-3.5 rounded-xl border border-zinc-800/90">
                    <p>
                      <strong className="text-zinc-200">Capacities &amp; Sizes:</strong>{" "}
                      <span className="text-zinc-400">{prod.capacities}</span>
                    </p>
                    <p>
                      <strong className="text-zinc-200">Class &amp; Rating:</strong>{" "}
                      <span className="text-amber-400 font-medium">{prod.rating}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>Enquire Price</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                      `Hello Chouhan Firetech Services, I would like to purchase or enquire about: ${prod.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bulk Supply & Defect Replacement Guarantee Banner */}
      <section className="py-16 bg-[#0a0c13] border-t border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          {/* Bulk Rates Card */}
          <div className="rounded-3xl border border-zinc-800 bg-[#10121a] p-8 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black uppercase text-white">
              Institutional &amp; Factory Bulk Rates
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              We supply wholesale quantities of fire extinguishers, hose cabinets, and sprinkler heads to schools, colleges, multi-unit residential societies, and manufacturing plants with tiered discounts and GST tax credit invoices.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Request Commercial Rate Card →</span>
              </Link>
            </div>
          </div>

          {/* 30-Day Guarantee Card */}
          <div className="rounded-3xl border border-emerald-500/30 bg-[#0e1614] p-8 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black uppercase text-white">
              30-Day Free Defect Replacement Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every extinguisher body, nozzle, pressure valve, or landing assembly purchased from us is backed by our unconditional 30-day replacement policy. If any pressure loss or casting flaw is discovered, we dispatch a replacement free of transit fee.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <Check className="h-4 w-4" /> 100% On-Site Swapping Guaranteed
              </span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
