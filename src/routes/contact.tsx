import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  Phone,
  MessageSquare,
  MapPin,
  Instagram,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { GstComplianceCard } from "@/components/common/GstComplianceCard";
import { QuoteForm } from "@/components/common/QuoteForm";
import { EnquiryReceiptModal } from "@/components/modals/EnquiryReceiptModal";
import type { LeadItem } from "@/lib/leadVault";
import {
  PHONE,
  FORMATTED_PHONE,
  PHONE_SECONDARY,
  FORMATTED_PHONE_SECONDARY,
  EMAIL,
  ADDRESS,
  MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP,
} from "@/data/firetechData";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Free Quote | Chouhan Firetech Services" },
      {
        name: "description",
        content:
          "Contact Chouhan Firetech Services in Banur & Mohali. Call 24/7 hotlines +91 94178-28887 / +91 98770-44142, chat on WhatsApp, or request an instant free fire safety quotation.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [receiptLead, setReceiptLead] = useState<LeadItem | null>(null);

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
            <span className="text-red-500">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-red-400 mb-4">
              <Flame className="h-3.5 w-3.5" />
              <span>DIRECT TECHNICAL DESK &amp; EMERGENCY HOTLINE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">CHOUHAN FIRETECH</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Connect directly with our fire protection engineers for 24/7 emergency dispatch, WhatsApp proposals, and free on-site survey estimations in Banur, Mohali, and Punjab.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Cards & Quote Form */}
      <section className="py-16 sm:py-20 bg-[#07080b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  REACH US DIRECTLY
                </span>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  Communication Channels
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Average response time is under 15 minutes. Our workshop and engineers operate 24 hours a day, 7 days a week.
                </p>
              </div>

              {/* Phone Card 1 (Primary) */}
              <a
                href={`tel:${PHONE}`}
                onClick={() => trackCallClick("Contact Page Phone 1")}
                className="group relative flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-5 shadow-md hover:border-red-500/60 hover:-translate-y-0.5 transition-all block overflow-hidden"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                      Primary 24/7 Hotline
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Now
                    </span>
                  </div>
                  <span className="text-lg font-black text-white group-hover:text-red-400 transition-colors block mt-0.5">
                    {FORMATTED_PHONE}
                  </span>
                  <span className="text-xs text-zinc-400">Tap to call primary helpline directly</span>
                </div>
              </a>

              {/* Phone Card 2 (Secondary) */}
              <a
                href={`tel:${PHONE_SECONDARY}`}
                onClick={() => trackCallClick("Contact Page Phone 2")}
                className="group relative flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-5 shadow-md hover:border-red-500/60 hover:-translate-y-0.5 transition-all block overflow-hidden"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                      Secondary 24/7 Helpline
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Now
                    </span>
                  </div>
                  <span className="text-lg font-black text-white group-hover:text-red-400 transition-colors block mt-0.5">
                    {FORMATTED_PHONE_SECONDARY}
                  </span>
                  <span className="text-xs text-zinc-400">Tap to call alternate helpline directly</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("Contact Page WhatsApp")}
                className="group relative flex items-start gap-4 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-[#101915] to-[#12141d] p-5 shadow-md hover:border-emerald-500/70 hover:-translate-y-0.5 transition-all block overflow-hidden"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                      Instant WhatsApp Consultation
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-600/40 px-2 py-0.5 rounded-full">
                      Fast Reply
                    </span>
                  </div>
                  <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors block mt-0.5">
                    Chat with Engineers on WhatsApp →
                  </span>
                  <span className="text-xs text-emerald-300/80">Send drawings, site photos, or requirements</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-5 shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c12] border border-zinc-800 text-zinc-200">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                    Workshop &amp; Central Depot
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-semibold leading-relaxed mt-0.5">
                    {ADDRESS}
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Instagram Card */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-start gap-4 rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-950/30 via-purple-950/20 to-[#12141d] p-5 shadow-md hover:border-pink-500/60 hover:-translate-y-0.5 transition-all block overflow-hidden"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 text-white shadow-md shadow-pink-600/30 group-hover:scale-105 transition-transform">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-400 block">
                    Official Instagram
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-pink-400 transition-colors block mt-0.5">
                    @{INSTAGRAM_HANDLE}
                  </span>
                  <span className="text-xs text-zinc-400">View live testing reels &amp; field stories</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-start gap-4 rounded-2xl border border-zinc-800/90 bg-[#12141d] p-5 shadow-md hover:border-zinc-700 transition-all block"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c12] border border-zinc-800 text-zinc-300 group-hover:text-red-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                    Formal Tenders &amp; RFQs
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors block break-all mt-0.5">
                    {EMAIL}
                  </span>
                </div>
              </a>

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

      {/* Enquiry Receipt Modal */}
      {receiptLead && (
        <EnquiryReceiptModal
          lead={receiptLead}
          onClose={() => setReceiptLead(null)}
        />
      )}
    </SiteLayout>
  );
}
