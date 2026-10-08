import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  Eye,
  X,
  Instagram,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  services,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/data/firetechData";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Equipment & Work Gallery | Chouhan Firetech Services" },
      {
        name: "description",
        content:
          "Browse actual equipment photos, site installations, hydrant lines, sprinkler drops, and fire drills executed by Chouhan Firetech Services.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<{
    title: string;
    image: string;
    description: string;
    category?: string;
  } | null>(null);

  const filteredGallery =
    galleryFilter === "all"
      ? services
      : services.filter((s) => s.id === galleryFilter);

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
            <span className="text-red-500">Gallery</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>VISUAL EQUIPMENT &amp; SITE WORK REPOSITORY</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              EQUIPMENT &amp; WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">GALLERY</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Authentic hardware, fabricated structural supports, ceiling drops, high-pressure pump rooms, and actual field execution photos by Chouhan Firetech Services.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Gallery Content Section */}
      <section className="py-16 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => setGalleryFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer ${
                galleryFilter === "all"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                  : "bg-[#12141d] border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              All Systems ({services.length})
            </button>
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setGalleryFilter(s.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer ${
                  galleryFilter === s.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                    : "bg-[#12141d] border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setLightboxItem({
                    title: item.title,
                    image: item.image,
                    description: item.description,
                    category: item.category,
                  })
                }
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 bg-[#12141d] shadow-lg hover:shadow-2xl hover:border-red-500/60 cursor-pointer transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded-full inline-block w-fit mb-1.5">
                    {item.category}
                  </span>
                  <h4 className="text-base font-black uppercase text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Click to inspect full view</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Instagram Reels Integration Banner */}
          <div className="mt-16 rounded-3xl border border-pink-500/30 bg-gradient-to-r from-pink-950/40 via-purple-950/20 to-[#12141d] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 text-white shadow-xl shadow-pink-600/30">
                <Instagram className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block mb-1">
                  OFFICIAL SOCIAL PORTFOLIO
                </span>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white">
                  Watch Live Fire Drills &amp; Hydro-Testing Reels
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                  Follow <strong className="text-pink-400 font-bold">@{INSTAGRAM_HANDLE}</strong> for daily site stories, on-site welder fabrication clips, and industrial emergency response videos.
                </p>
              </div>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Instagram className="h-4 w-4" />
              <span>Follow @{INSTAGRAM_HANDLE}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* 4. Bottom CTA to Contact */}
          <div className="mt-12 text-center">
            <p className="text-xs text-zinc-400 mb-3">
              Need certified fire safety equipment or custom structural fabrication for your site?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <span>Get Free Quotation for Any System</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 rounded-full bg-black/80 border border-white/20 p-2 text-white hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0f17] border-t border-zinc-800">
              <div>
                {lightboxItem.category && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30 inline-block mb-1">
                    {lightboxItem.category}
                  </span>
                )}
                <h3 className="text-base font-black text-white uppercase">{lightboxItem.title}</h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-xl">{lightboxItem.description}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <Link
                  to="/contact"
                  className="rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-xs font-bold uppercase text-white transition-colors"
                >
                  Enquire This
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
