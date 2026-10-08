import { useState, useEffect } from "react";
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  MessageSquare,
  Phone,
  Search,
} from "lucide-react";
import type { LeadItem } from "@/lib/leadVault";
import {
  GSTIN,
  FORMATTED_PHONE,
  PHONE,
  EMAIL,
  WHATSAPP_BASE,
} from "@/data/firetechData";

export function EnquiryReceiptModal({
  lead,
  onClose,
  onTrackClick,
}: {
  lead: LeadItem;
  onClose: () => void;
  onTrackClick?: (refId: string) => void;
}) {
  const [copied, setCopied] = useState(false);

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

  const receiptSummary = `CHOUHAN FIRETECH SERVICES - OFFICIAL ENQUIRY RECEIPT
====================================================
Booking Reference ID: ${lead.referenceId}
Status: Registered & Queued for 15-Min Dispatch
Date & Time: ${lead.dateFormatted}
GSTIN: ${GSTIN}

CLIENT DETAILS:
- Name: ${lead.name}
- Phone: +91 ${lead.phone}
- Email: ${lead.email}
- Urgency: ${lead.urgency}
- Property: ${lead.property}
- Service: ${lead.service}
- Scope Notes: ${lead.message || "Site Survey Requested"}

Dispatch Office: Shop No. 1, Urna, Banur, Mohali
Hotline: ${FORMATTED_PHONE}
Email: ${EMAIL}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappFollowup = `${WHATSAPP_BASE}?text=${encodeURIComponent(
    `Hello Chouhan Firetech Services, I have registered Enquiry Ref: *${lead.referenceId}* for ${lead.service}. Please confirm receipt and site engineer dispatch.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-xl max-h-[92vh] overflow-hidden rounded-2xl border border-emerald-500/50 bg-[#0c1017] text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Radiant Emerald Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-zinc-800 bg-[#080b11]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-950/60">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-block mb-1">
                  Enquiry Registered &amp; Dispatched
                </span>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                  Lead Confirmed • Reference ID
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 bg-zinc-800/80 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Reference ID Monospace Plate */}
          <div className="mt-4 rounded-xl bg-black/60 border border-emerald-500/30 p-3 flex items-center justify-between gap-2">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">
                Official Booking Reference Number
              </span>
              <code className="font-mono text-lg sm:text-xl font-black tracking-wider text-emerald-400 block">
                {lead.referenceId}
              </code>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-black border border-emerald-400"
                  : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/40"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Ref</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Summary Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          <div className="rounded-xl border border-zinc-800 bg-[#121520] p-4 space-y-2.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-2">
              Submission Breakdown
            </h4>

            <div className="grid grid-cols-2 gap-2 text-zinc-300">
              <div>
                <span className="text-zinc-500 block text-[10px]">Client Name</span>
                <span className="font-bold text-white">{lead.name}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Phone Number</span>
                <span className="font-bold text-emerald-400 font-mono">+91 {lead.phone}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Email Address</span>
                <span className="font-medium text-zinc-200 truncate block">{lead.email}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Priority / Urgency</span>
                <span className="font-bold text-amber-400">{lead.urgency}</span>
              </div>
              <div className="col-span-2">
                <span className="text-zinc-500 block text-[10px]">Requested Service</span>
                <span className="font-bold text-white">{lead.service}</span>
              </div>
              <div className="col-span-2">
                <span className="text-zinc-500 block text-[10px]">Property Classification</span>
                <span className="font-medium text-zinc-300">{lead.property}</span>
              </div>
              {lead.message && (
                <div className="col-span-2 pt-1 border-t border-zinc-800/80">
                  <span className="text-zinc-500 block text-[10px]">Site Scope &amp; Notes</span>
                  <p className="text-zinc-300 italic mt-0.5">{lead.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-[#090b10] p-3.5 text-zinc-400 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
              Guaranteed Next Steps
            </span>
            <p className="leading-relaxed text-[11px]">
              1. Our technical dispatch team at Banur has received this entry.
            </p>
            <p className="leading-relaxed text-[11px]">
              2. An engineer will review your site specifications and contact you within 15 minutes.
            </p>
            <p className="leading-relaxed text-[11px]">
              3. You can modify or cancel this booking anytime within 24 hours at zero charge using your Booking Ref ID.
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="border-t border-zinc-800 bg-[#080b11] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2.5">
          <a
            href={whatsappFollowup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-extrabold uppercase text-white shadow-lg hover:shadow-emerald-600/30 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Open in WhatsApp</span>
          </a>

          <a
            href={`tel:${PHONE}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/50 bg-red-950/40 hover:bg-red-900/50 px-4 py-2.5 text-xs font-bold text-red-300 hover:text-white transition-all"
          >
            <Phone className="h-4 w-4 text-red-400" />
            <span>Call Helpline</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onTrackClick) onTrackClick(lead.referenceId);
            }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/50 bg-amber-500/20 hover:bg-amber-500/30 px-4 py-2.5 text-xs font-bold uppercase text-amber-300 hover:text-white transition-all cursor-pointer shadow-md shadow-amber-500/10"
          >
            <Search className="h-4 w-4" />
            <span>Track / Cancel Booking</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-bold text-zinc-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
