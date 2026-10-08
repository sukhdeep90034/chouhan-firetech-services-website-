import { useState } from "react";
import { ShieldCheck, Check, Copy, ExternalLink } from "lucide-react";
import { GSTIN } from "@/data/firetechData";

export function GstComplianceCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(GSTIN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1612] via-[#0b0e15] to-[#121520] text-white p-5 sm:p-5.5 border border-emerald-500/35 shadow-[0_15px_35px_-10px_rgba(16,185,129,0.22),0_0_0_1px_rgba(16,185,129,0.12)_inset] overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
      {/* Top radiant emerald accent bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-90" />

      {/* Atmospheric ambient glows */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/15 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl" />

      {/* Decorative Government Shield Watermark */}
      <div className="pointer-events-none absolute -right-3 -bottom-3 text-emerald-500/[0.04]">
        <ShieldCheck className="h-36 w-36" />
      </div>

      {/* Header: Icon, Verified Commercial Tag & Active Badge */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">
              Government Tax Compliance
            </span>
            <h4 className="text-sm sm:text-base font-black text-white tracking-tight mt-0.5">
              Verified Commercial Enterprise
            </h4>
          </div>
        </div>

        {/* Live Active & Verified Status Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold shadow-xs shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Active &amp; Verified</span>
        </span>
      </div>

      {/* Recessed Monospace GSTIN Plate with 1-Click Copy */}
      <div className="relative z-10 mt-4 rounded-xl bg-black/70 border border-emerald-500/25 p-3.5 flex flex-wrap items-center justify-between gap-3 backdrop-blur-xs group/plate hover:border-emerald-500/45 transition-colors">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">
            GSTIN (Goods &amp; Services Tax Identification Number)
          </span>
          <code className="font-mono text-base sm:text-lg font-black tracking-wider text-emerald-400 group-hover/plate:text-emerald-300 transition-colors block mt-0.5 selection:bg-emerald-500 selection:text-black">
            {GSTIN}
          </code>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
            copied
              ? "bg-emerald-500 text-black border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              : "bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/35 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]"
          }`}
          title="Click to copy official GSTIN"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy GSTIN</span>
            </>
          )}
        </button>
      </div>

      {/* Trust & Invoicing Matrix */}
      <div className="relative z-10 mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span>State: <strong className="text-white">03 (Punjab)</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span>GST Invoices &amp; ITC</span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center sm:justify-end gap-1.5">
          <a
            href="https://services.gst.gov.in/services/searchtp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Verify on GST Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
