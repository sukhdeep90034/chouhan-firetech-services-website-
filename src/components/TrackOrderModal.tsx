import { useState, useEffect } from "react";
import {
  Search,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Wrench,
  Phone,
  MessageSquare,
  Flame,
  ShieldCheck,
  Copy,
  Check,
  PhoneCall,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  type LeadItem,
  findLeadsByQuery,
  checkCancellationEligibility,
  cancelLeadByCustomer,
  getLastSubmittedRef,
} from "@/lib/leadVault";

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNewBookingClick?: () => void;
}

const CANCELLATION_REASONS = [
  "Project schedule or site work postponed",
  "Requirement fulfilled through alternate vendor",
  "Enquiry submitted by mistake / duplicate entry",
  "Need to select a different fire safety service",
  "Budget or internal procurement change",
  "Other reason",
];

export function TrackOrderModal({
  isOpen,
  onClose,
  initialQuery = "",
  onNewBookingClick,
}: TrackOrderModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<LeadItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Cancellation sub-flow state
  const [showCancelBox, setShowCancelBox] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>(
    CANCELLATION_REASONS[0] || "Project schedule or site work postponed"
  );
  const [customReasonNote, setCustomReasonNote] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Clipboard copy state
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Tick state to update live countdown timer
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  // When modal opens, pre-fill search query if available
  useEffect(() => {
    if (isOpen) {
      setCancelFeedback(null);
      setShowCancelBox(false);
      const queryToUse = initialQuery || getLastSubmittedRef() || "";
      if (queryToUse) {
        setSearchQuery(queryToUse);
        const results = findLeadsByQuery(queryToUse);
        setSearchResults(results);
        setHasSearched(true);
        if (results.length > 0 && results[0]) {
          setSelectedLeadId(results[0].id);
        }
      }
    }
  }, [isOpen, initialQuery]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCancelFeedback(null);
    setShowCancelBox(false);

    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    const results = findLeadsByQuery(query);
    setSearchResults(results);
    setHasSearched(true);
    if (results.length > 0 && results[0]) {
      setSelectedLeadId(results[0].id);
    } else {
      setSelectedLeadId(null);
    }
  };

  const activeLead =
    searchResults.find((l) => l.id === selectedLeadId) ||
    searchResults[0] ||
    null;

  const cancellationStatus = activeLead
    ? checkCancellationEligibility(activeLead)
    : null;

  const handleCopyRef = (refId: string) => {
    navigator.clipboard?.writeText(refId);
    setCopiedRef(refId);
    setTimeout(() => setCopiedRef(null), 2500);
  };

  const handleConfirmCancel = () => {
    if (!activeLead) return;

    setIsCancelling(true);
    setCancelFeedback(null);

    const finalReason =
      selectedReason === "Other reason" && customReasonNote.trim()
        ? `Other: ${customReasonNote.trim()}`
        : customReasonNote.trim()
        ? `${selectedReason} - ${customReasonNote.trim()}`
        : selectedReason || "Customer cancelled order within 24h";

    const res = cancelLeadByCustomer(activeLead.id, finalReason);

    setIsCancelling(false);

    if (res.success && res.lead) {
      setCancelFeedback({
        type: "success",
        message:
          "Order successfully cancelled. Our central dispatch and administrative desks have been updated immediately.",
      });
      setShowCancelBox(false);

      // Refresh in-memory list
      setSearchResults((prev) =>
        prev.map((l) => (l.id === res.lead!.id ? res.lead! : l))
      );
    } else {
      setCancelFeedback({
        type: "error",
        message: res.message || "Failed to cancel order.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-zinc-800 bg-[#0c0e15] shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-zinc-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Glow accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-red-600/15 blur-[90px]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/15 blur-[90px]" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 px-6 py-5 bg-[#0e111a]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400 shadow-inner">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  CHOUHAN FIRETECH • CLIENT SERVICES
                </span>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase">
                  Live Dispatch Gateway
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white mt-0.5">
                Track Order &amp; Booking Status
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close track order modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-zinc-800/90 bg-[#121520] p-4 sm:p-5 shadow-inner space-y-3"
          >
            <label
              htmlFor="track-order-query"
              className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-between"
            >
              <span>Enter Booking Reference ID or Registered Mobile Number</span>
              <span className="text-[11px] font-normal text-zinc-500">
                e.g. CFS-2026-XXXX or 9417828887
              </span>
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="track-order-query"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter CFS Reference ID (e.g. CFS-2026-4819) or 10-digit Phone..."
                  className="h-11 pl-10 border-zinc-700/80 bg-[#090b10] text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <Button
                type="submit"
                className="h-11 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-zinc-950 font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Track Now
              </Button>
            </div>

            {getLastSubmittedRef() && (
              <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
                <span>Recent booking placed on this device:</span>
                <button
                  type="button"
                  onClick={() => {
                    const ref = getLastSubmittedRef()!;
                    setSearchQuery(ref);
                    const res = findLeadsByQuery(ref);
                    setSearchResults(res);
                    setHasSearched(true);
                    if (res[0]) setSelectedLeadId(res[0].id);
                  }}
                  className="font-mono font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  {getLastSubmittedRef()}
                </button>
              </div>
            )}
          </form>

          {/* Cancellation Feedback Banner */}
          {cancelFeedback && (
            <div
              className={`rounded-2xl p-4 border text-xs sm:text-sm font-semibold flex items-start gap-3 ${
                cancelFeedback.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                  : "bg-red-950/40 border-red-500/50 text-red-300"
              }`}
            >
              {cancelFeedback.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold block">
                  {cancelFeedback.type === "success"
                    ? "Action Completed Successfully"
                    : "Cancellation Notice"}
                </span>
                <p className="mt-0.5">{cancelFeedback.message}</p>
              </div>
            </div>
          )}

          {/* Search Result View */}
          {hasSearched && searchResults.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                <Search className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  No Booking Record Found for &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Please verify your 9-character Reference ID (e.g. CFS-2026-XXXX) or the 10-digit mobile number used during submission.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <a
                  href="tel:9417828887"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-950/30 px-3.5 py-2 text-xs font-bold text-red-400 hover:bg-red-900/50 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call: 94178-28887</span>
                </a>
                <a
                  href="tel:9877044142"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-950/30 px-3.5 py-2 text-xs font-bold text-red-400 hover:bg-red-900/50 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call: 98770-44142</span>
                </a>
                {onNewBookingClick && (
                  <Button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNewBookingClick();
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase"
                  >
                    Request Free Quote
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Multiple Results Tab Switcher if phone number has multiple bookings */}
          {searchResults.length > 1 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Found {searchResults.length} Bookings for this search:
              </span>
              <div className="flex flex-wrap gap-2">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedLeadId(item.id);
                      setShowCancelBox(false);
                    }}
                    className={`rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      activeLead?.id === item.id
                        ? "border-amber-500 bg-amber-500/20 text-white shadow-md shadow-amber-500/10"
                        : "border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="font-mono">{item.referenceId}</span>
                    <Badge
                      className={`text-[9px] px-1.5 py-0 ${
                        item.status === "Cancelled"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : item.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Lead Details */}
          {activeLead && (
            <div className="space-y-6">
              {/* Status Header Card */}
              <div
                className={`rounded-2xl border p-5 relative overflow-hidden transition-all shadow-xl ${
                  activeLead.status === "Cancelled"
                    ? "border-red-500/40 bg-gradient-to-br from-[#1a080c] to-[#0e1017]"
                    : activeLead.status === "Completed"
                    ? "border-emerald-500/40 bg-gradient-to-br from-[#071711] to-[#0e1017]"
                    : "border-amber-500/40 bg-gradient-to-br from-[#1c1407] to-[#0e1017]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Reference ID:</span>
                    <span className="font-mono text-base font-black text-white bg-black/60 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                      <span>{activeLead.referenceId}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyRef(activeLead.referenceId)}
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy Reference ID"
                      >
                        {copiedRef === activeLead.referenceId ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        activeLead.status === "Cancelled"
                          ? "bg-red-600 text-white"
                          : activeLead.status === "Completed"
                          ? "bg-emerald-500 text-black font-extrabold"
                          : activeLead.status === "Quoted"
                          ? "bg-blue-600 text-white"
                          : "bg-amber-500 text-black font-extrabold"
                      }`}
                    >
                      {activeLead.status === "Cancelled"
                        ? "● ORDER CANCELLED"
                        : activeLead.status === "Completed"
                        ? "● PROJECT COMPLETED & PASSED"
                        : activeLead.status === "Quoted"
                        ? "● QUOTATION DISPATCHED"
                        : activeLead.status === "Contacted"
                        ? "● ENGINEER ALLOCATED"
                        : "● SUBMITTED & UNDER REVIEW"}
                    </Badge>
                  </div>
                </div>

                {/* Visual Progress Stepper */}
                <div className="pt-5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-3">
                    Progress Pipeline Timeline
                  </span>

                  {activeLead.status === "Cancelled" ? (
                    <div className="rounded-xl border border-red-500/40 bg-red-950/50 p-4 text-xs space-y-1 text-red-200">
                      <div className="flex items-center gap-2 font-bold text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>This order was cancelled by {activeLead.cancelledBy || "Customer"}</span>
                        {activeLead.cancelledAt && (
                          <span className="font-mono text-[11px] text-zinc-400">
                            • {new Date(activeLead.cancelledAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                      {activeLead.cancelReason && (
                        <p className="text-zinc-200 pt-1">
                          Cancellation Reason:{" "}
                          <strong className="text-white">&ldquo;{activeLead.cancelReason}&rdquo;</strong>
                        </p>
                      )}
                      <p className="text-[11px] text-zinc-400 pt-1">
                        Central dispatch records have been archived. You may submit a fresh booking at any time.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      {/* Step 1: Received */}
                      <div className="space-y-1.5">
                        <div className="h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                        <span className="text-emerald-400 block">1. Received</span>
                        <span className="text-[9px] text-zinc-500 font-normal hidden sm:block">
                          {activeLead.dateFormatted?.split(",")[0] || "Logged"}
                        </span>
                      </div>

                      {/* Step 2: Verification */}
                      <div className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full ${
                            activeLead.status !== "New"
                              ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                              : "bg-amber-500/80 animate-pulse"
                          }`}
                        />
                        <span
                          className={`block ${
                            activeLead.status !== "New" ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          2. Assessment
                        </span>
                        <span className="text-[9px] text-zinc-500 font-normal hidden sm:block">
                          {activeLead.status !== "New" ? "Completed" : "In Progress"}
                        </span>
                      </div>

                      {/* Step 3: Quoted / Site Scheduled */}
                      <div className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full ${
                            activeLead.status === "Quoted" || activeLead.status === "Completed"
                              ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                              : "bg-zinc-800"
                          }`}
                        />
                        <span
                          className={`block ${
                            activeLead.status === "Quoted" || activeLead.status === "Completed"
                              ? "text-emerald-400"
                              : "text-zinc-500"
                          }`}
                        >
                          3. Site Quote
                        </span>
                        <span className="text-[9px] text-zinc-500 font-normal hidden sm:block">
                          {activeLead.status === "Quoted" || activeLead.status === "Completed"
                            ? "Issued"
                            : "Pending"}
                        </span>
                      </div>

                      {/* Step 4: Execution */}
                      <div className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full ${
                            activeLead.status === "Completed"
                              ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                              : "bg-zinc-800"
                          }`}
                        />
                        <span
                          className={`block ${
                            activeLead.status === "Completed" ? "text-emerald-400" : "text-zinc-500"
                          }`}
                        >
                          4. Complete &amp; NOC
                        </span>
                        <span className="text-[9px] text-zinc-500 font-normal hidden sm:block">
                          {activeLead.status === "Completed" ? "Certified" : "Scheduled"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Specific Details Card */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 space-y-4">
                <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-red-500" />
                    <span>Booking Specifications</span>
                  </span>
                  <span className="text-xs text-zinc-400">
                    Booked On: <strong className="text-zinc-200">{activeLead.dateFormatted}</strong>
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Client Name
                    </span>
                    <span className="text-sm font-black text-white mt-0.5 block">
                      {activeLead.name}
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Registered Mobile
                    </span>
                    <span className="text-sm font-mono font-bold text-red-400 mt-0.5 block">
                      {activeLead.phone}
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Requested Service
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block">
                      {activeLead.service}
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Premises Type
                    </span>
                    <span className="text-xs font-semibold text-zinc-300 mt-0.5 block">
                      {activeLead.property || "Commercial / Industrial"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Urgency Level
                    </span>
                    <span className="text-xs font-bold text-amber-400 mt-0.5 block">
                      {activeLead.urgency || "Immediate"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-[#121520] p-3">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block">
                      Channel
                    </span>
                    <span className="text-xs font-semibold text-zinc-300 mt-0.5 block">
                      {activeLead.channel}
                    </span>
                  </div>
                </div>

                {activeLead.message && (
                  <div className="rounded-xl border border-zinc-800 bg-[#090b10] p-3 text-xs text-zinc-300">
                    <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">
                      Client Scope Notes:
                    </span>
                    &ldquo;{activeLead.message}&rdquo;
                  </div>
                )}
              </div>

              {/* ==============================================================
                  ORDER CANCELLATION PANEL (POLICY: WITHIN 1 DAY / 24 HOURS)
                  ============================================================== */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                      Order Modification &amp; Cancellation Policy
                    </h4>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-300 text-[10px]">
                    1-Day (24H) Guarantee
                  </Badge>
                </div>

                {/* Case 1: Within 24 Hours & Eligible to Cancel */}
                {cancellationStatus?.eligible && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Online Cancellation is Available</span>
                        </span>
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                          ⏱️ {cancellationStatus.remainingHours}h {cancellationStatus.remainingMinutes}m remaining
                        </span>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        Under our client protection policy, bookings may be cancelled online within <strong>24 hours</strong> of submission at zero cost.
                      </p>
                    </div>

                    {!showCancelBox ? (
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <p className="text-xs text-zinc-400">
                          Need to postpone or cancel this requirement?
                        </p>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => setShowCancelBox(true)}
                          className="h-9 px-4 text-xs font-bold uppercase tracking-wider cursor-pointer bg-red-600/90 hover:bg-red-500"
                        >
                          <X className="h-3.5 w-3.5 mr-1.5" />
                          <span>Cancel This Booking</span>
                        </Button>
                      </div>
                    ) : (
                      /* Active In-Modal Cancellation Form */
                      <div className="rounded-2xl border border-red-500/50 bg-[#160a0e] p-5 space-y-4 animate-fade-in shadow-xl ring-1 ring-red-500/30">
                        <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
                          <div className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs font-black uppercase tracking-wider">
                              Confirm Cancellation for {activeLead.referenceId}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowCancelBox(false)}
                            className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                          >
                            ✕ Cancel
                          </button>
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase text-zinc-300 block">
                            Please select a reason for cancellation:
                          </label>

                          <div className="grid gap-2 sm:grid-cols-2">
                            {CANCELLATION_REASONS.map((r) => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setSelectedReason(r)}
                                className={`rounded-xl p-2.5 text-xs text-left transition-all border cursor-pointer ${
                                  selectedReason === r
                                    ? "border-red-500 bg-red-950/70 text-white font-bold"
                                    : "border-zinc-800 bg-[#12141c] text-zinc-400 hover:text-white"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                              Additional Feedback or Remarks (Optional):
                            </label>
                            <Input
                              value={customReasonNote}
                              onChange={(e) => setCustomReasonNote(e.target.value)}
                              placeholder="Any specific note for our dispatch and engineering department..."
                              className="h-10 border-zinc-700 bg-[#090b10] text-xs text-white"
                            />
                          </div>

                          <div className="rounded-xl border border-zinc-800 bg-[#0c0d12] p-3 text-[11px] text-zinc-400">
                            <strong className="text-zinc-200">Zero-Delay Policy:</strong> Your cancellation will be reflected on the Chouhan Firetech Administrator dashboard <strong>immediately</strong> without delay, and our technical dispatch teams will be relieved.
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              type="button"
                              onClick={handleConfirmCancel}
                              disabled={isCancelling}
                              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase cursor-pointer"
                            >
                              {isCancelling ? "Processing..." : "Confirm & Cancel Booking"}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowCancelBox(false)}
                              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                            >
                              Keep My Booking
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Case 2: Expired 24 Hours */}
                {!cancellationStatus?.eligible && activeLead.status !== "Cancelled" && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Online Cancellation Window Expired (24-Hour Policy)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      Because this booking was placed <strong>{cancellationStatus?.elapsedHours || 24}+ hours ago</strong>, technical inspections and hardware allocations are actively dispatched. Online cancellation is closed to prevent equipment disruption.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-2.5">
                      <a
                        href="tel:9417828887"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-3 py-2 text-xs font-bold text-white hover:from-red-500 hover:to-rose-500 transition-all"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>Call: 94178-28887</span>
                      </a>
                      <a
                        href="tel:9877044142"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 px-3 py-2 text-xs font-bold text-white hover:from-rose-500 hover:to-red-600 transition-all"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>Call: 98770-44142</span>
                      </a>
                      <a
                        href={`https://wa.me/919417828887?text=${encodeURIComponent(
                          `Hello Chouhan Firetech, regarding my booking ${activeLead.referenceId}, I need assistance with schedule modification.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-900/50 transition-all"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Case 3: Already Cancelled */}
                {activeLead.status === "Cancelled" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-red-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Cancellation Record Synced</span>
                    </div>
                    <p className="text-zinc-300">
                      This order is officially cancelled. If your requirements have changed or you wish to request a different fire safety inspection, please submit a new inquiry below.
                    </p>
                    {onNewBookingClick && (
                      <Button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNewBookingClick();
                        }}
                        className="mt-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase"
                      >
                        Request New Quote
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 px-6 py-4 bg-[#0e111a] text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-red-500" />
            <span>Chouhan Firetech Services • 24/7 Urna, Banur, Mohali Hotline: +91 94178-28887</span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-800"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
