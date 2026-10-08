import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Check,
  CheckCircle2,
  Copy,
  Printer,
  X,
  FileText,
  Award,
  MessageSquare,
  Phone,
} from "lucide-react";
import {
  GSTIN,
  ADDRESS,
  FORMATTED_PHONE,
  PHONE,
  EMAIL,
  WHATSAPP_BASE,
  COMPANY_POLICIES,
} from "@/data/firetechData";

export function PolicyModal({
  initialPolicyId = "warranty",
  onClose,
}: {
  initialPolicyId?: string;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState(initialPolicyId);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPolicyId) setActiveId(initialPolicyId);
  }, [initialPolicyId]);

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

  const activePolicy =
    COMPANY_POLICIES.find((p) => p.id === activeId) || COMPANY_POLICIES[0]!;
  const Icon = activePolicy.icon;

  const handleCopy = () => {
    const textToCopy = `CHOUHAN FIRETECH SERVICES - ${activePolicy.fullTitle.toUpperCase()}
GSTIN: ${GSTIN}
Location: ${ADDRESS}
Hotline: ${FORMATTED_PHONE} | Email: ${EMAIL}
Effective: ${activePolicy.effectiveDate}

SUMMARY:
${activePolicy.summary}

KEY HIGHLIGHTS:
${activePolicy.highlights.map((h) => `• ${h}`).join("\n")}

DETAILED PROVISIONS:
${activePolicy.sections
  .map(
    (s) => `${s.heading}:\n${s.points.map((p) => `  - ${p}`).join("\n")}`
  )
  .join("\n\n")}

For formal clarifications or statutory audits, contact Chouhan Firetech Services at ${FORMATTED_PHONE}.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 md:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-zinc-700/80 bg-[#0e1017] text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0a0c12] px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-md shadow-red-600/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded-full">
                  Official Policy Document
                </span>
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                  GST: {GSTIN}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold uppercase text-white tracking-wide mt-0.5">
                Chouhan Firetech Services • Company Policies
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-[#161924] px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
              title="Copy Policy Details"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-[#161924] px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5 text-zinc-400" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700/80 bg-[#161924] p-1.5 text-zinc-400 hover:text-white hover:bg-red-600 transition-colors cursor-pointer"
              aria-label="Close Policy Dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-zinc-800 bg-[#090b10] px-4 py-2.5 shrink-0 scrollbar-none">
          {COMPANY_POLICIES.map((p) => {
            const TabIcon = p.icon;
            const active = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left shrink-0 transition-all cursor-pointer ${
                  active
                    ? "bg-red-950/50 border border-red-500/50 text-white shadow-sm ring-1 ring-red-500/20"
                    : "border border-transparent bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <TabIcon
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    active ? "text-red-400 scale-110" : "text-zinc-500"
                  }`}
                />
                <div className="leading-tight">
                  <span className="block text-xs font-bold whitespace-nowrap">
                    {p.shortTitle}
                  </span>
                  <span className="block text-[9px] text-zinc-500 font-medium">
                    {p.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Policy Title & Subheading */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                {activePolicy.badge}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium">
                {activePolicy.effectiveDate}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-snug">
              {activePolicy.fullTitle}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-zinc-400 mt-1">
              {activePolicy.subtitle}
            </p>
          </div>

          {/* Executive Summary Card */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141e] p-4.5 shadow-inner">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400 border border-red-500/25 mt-0.5">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block mb-1">
                  Policy Summary &amp; Scope
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {activePolicy.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Key Guarantee Highlights Grid */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>Core Guarantees &amp; Commitments</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {activePolicy.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-zinc-800/80 bg-[#0a0c12] p-3 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-red-500" />
              <span>Detailed Policy Terms &amp; Conditions</span>
            </h3>

            {activePolicy.sections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="rounded-xl border border-zinc-800/80 bg-[#0d0f17] p-4 transition-colors hover:border-zinc-700/80"
              >
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5">
                  {sec.heading}
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Official Sign-off & Verification Card */}
          <div className="rounded-xl border border-zinc-800 bg-[#0a0c12] p-4 text-xs text-zinc-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-3">
              <div>
                <strong className="text-white block text-sm font-extrabold uppercase">
                  Chouhan Firetech Services
                </strong>
                <span className="text-[11px] text-zinc-400 block">
                  Shop No. 1, Urna, Sub Division Banur, District Mohali, Punjab
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                  Government Tax ID
                </span>
                <span className="font-mono text-zinc-200 font-bold text-xs">
                  GSTIN: {GSTIN}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span>
                Operating Hours: <strong className="text-emerald-400">Open 24 Hours / 7 Days</strong>
              </span>
              <span>
                Hotline: <strong className="text-white">{FORMATTED_PHONE}</strong> • {EMAIL}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800 bg-[#0a0c12] px-5 py-3.5 shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>Have questions regarding our {activePolicy.shortTitle}?</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                `Hello Chouhan Firetech Services, I have a query regarding your ${activePolicy.shortTitle}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span>Inquire on WhatsApp</span>
            </a>

            <a
              href={`tel:${PHONE}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/50 bg-red-950/40 px-3.5 py-2 text-xs font-bold text-red-300 hover:bg-red-900/40 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-red-400" />
              <span>Call Helpline</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
