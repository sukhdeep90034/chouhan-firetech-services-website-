import { useState, useEffect, type FormEvent } from "react";
import {
  Clock,
  Zap,
  Building2,
  ShieldCheck,
  ShieldAlert,
  User,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Mail,
  ChevronDown,
  Check,
  AlertTriangle,
  Lock,
  Flame,
} from "lucide-react";
import { type LeadItem, submitLead } from "@/lib/leadVault";
import { trackBookingSubmission, trackWhatsAppClick } from "@/lib/analytics";
import {
  PHONE,
  FORMATTED_PHONE,
  EMAIL,
  GSTIN,
  WHATSAPP_BASE,
  services,
  propertySolutions,
} from "@/data/firetechData";

export function QuoteForm({
  prefilledService = "",
  prefilledProperty = "",
  onLeadSubmitted,
}: {
  prefilledService?: string;
  prefilledProperty?: string;
  onLeadSubmitted?: (lead: LeadItem) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [property, setProperty] = useState(prefilledProperty);
  const [service, setService] = useState(prefilledService);
  const [urgency, setUrgency] = useState("Immediate");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field touched state for precise inline error appearance
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    if (prefilledService) setService(prefilledService);
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledProperty) setProperty(prefilledProperty);
  }, [prefilledProperty]);

  // Phone normalization: extract digits and normalize +91 / 0
  const cleanPhoneDigits = phone.replace(/\D/g, "");
  const normalizedPhone =
    cleanPhoneDigits.length === 12 && cleanPhoneDigits.startsWith("91")
      ? cleanPhoneDigits.slice(2)
      : cleanPhoneDigits.length === 11 && cleanPhoneDigits.startsWith("0")
      ? cleanPhoneDigits.slice(1)
      : cleanPhoneDigits;

  // Strict validation rules
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = normalizedPhone.length === 10 && /^[6-9]\d{9}$/.test(normalizedPhone);
  const isEmailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email.trim());

  // Error message helpers
  const getNameError = () => {
    if (!name.trim()) return "Full Name is required.";
    if (name.trim().length < 2) return "Name must be at least 2 characters long.";
    return null;
  };

  const getPhoneError = () => {
    if (!phone.trim()) return "Phone number is required.";
    if (normalizedPhone.length !== 10) return `Please enter a 10-digit mobile number (${normalizedPhone.length} digits entered).`;
    if (!/^[6-9]/.test(normalizedPhone)) return "Mobile number must start with 6, 7, 8, or 9.";
    return null;
  };

  const getEmailError = () => {
    if (!email.trim()) return "Email address is required.";
    if (!isEmailValid) return "Please enter a valid email address (e.g. name@company.com).";
    return null;
  };

  const validateAll = () => {
    setTouched({ name: true, phone: true, email: true });
    setSubmitAttempted(true);

    const errors: string[] = [];
    const nErr = getNameError();
    const pErr = getPhoneError();
    const eErr = getEmailError();

    if (nErr) errors.push(nErr);
    if (pErr) errors.push(pErr);
    if (eErr) errors.push(eErr);

    return { isValid: errors.length === 0, errors };
  };

  const handleWhatsAppSend = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { isValid } = validateAll();
    if (!isValid) {
      setIsSuccess(false);
      setStatusMessage("Please complete all required fields correctly (Full Name, Phone & Email).");
      if (getNameError()) {
        document.getElementById("quote-name")?.focus();
      } else if (getPhoneError()) {
        document.getElementById("quote-phone")?.focus();
      } else if (getEmailError()) {
        document.getElementById("quote-email")?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    const urgencyLabel =
      urgency === "Immediate" ? "Urgent / 24-Hour Express" :
      urgency === "Scheduled" ? "Routine Refill & Maintenance" : "Turnkey New Setup";

    const lead = await submitLead({
      name,
      phone: normalizedPhone,
      email,
      urgency: urgencyLabel,
      property: property || "Industrial / Commercial Facility",
      service: service || "Turnkey Fire Safety Consultation",
      message: message.trim() || "Please arrange technical site survey, quote, and BOQ estimation.",
      channel: "WhatsApp",
    });
    trackBookingSubmission(service || "Fire Safety");
    trackWhatsAppClick("Quote Form WhatsApp", service || "Fire Safety");
    setIsSubmitting(false);

    const text =
      `🔥 *NEW FIRE SAFETY ENQUIRY - CHOUHAN FIRETECH SERVICES*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🔖 *Booking Reference:* ${lead.referenceId}\n` +
      `👤 *Client Name:* ${name.trim()}\n` +
      `📞 *Mobile (WhatsApp):* +91 ${normalizedPhone}\n` +
      `📧 *Email Address:* ${email.trim()}\n` +
      `⏱️ *Priority / Urgency:* ${urgencyLabel}\n` +
      `🏢 *Property Type:* ${property || "Industrial / Commercial Facility"}\n` +
      `🛠️ *Service Required:* ${service || "Turnkey Fire Safety Consultation"}\n` +
      `📝 *Scope / Site Details:* ${message.trim() || "Please arrange technical site survey, quote, and BOQ estimation."}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Lead Origin:* Chouhan Firetech Web Portal (Banur, Mohali)\n` +
      `🕒 *Timestamp:* ${lead.dateFormatted}`;

    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, "_blank");
    setIsSuccess(true);
    setStatusMessage(`Enquiry registered with Ref: ${lead.referenceId}! Opening WhatsApp with details...`);
    onLeadSubmitted?.(lead);
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid } = validateAll();
    if (!isValid) {
      setIsSuccess(false);
      setStatusMessage("Please complete all required fields correctly (Full Name, Phone & Email).");
      if (getNameError()) {
        document.getElementById("quote-name")?.focus();
      } else if (getPhoneError()) {
        document.getElementById("quote-phone")?.focus();
      } else if (getEmailError()) {
        document.getElementById("quote-email")?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    const urgencyLabel =
      urgency === "Immediate" ? "Urgent (24h Dispatch)" :
      urgency === "Scheduled" ? "Routine Refill & Inspection" : "Turnkey New Installation";

    const lead = await submitLead({
      name,
      phone: normalizedPhone,
      email,
      urgency: urgencyLabel,
      property: property || "Not specified",
      service: service || "Full Fire Safety Scope",
      message: message.trim() || "Please contact for site survey, BOQ estimation, and formal tax invoice quote.",
      channel: "Email",
    });
    trackBookingSubmission(service || "Fire Safety Scope");
    setIsSubmitting(false);

    const subject = `[FIRE SAFETY PROPOSAL ${lead.referenceId}] ${name.trim()} - ${service || "General Inquiry"}`;
    const body =
      `OFFICIAL FIRE SAFETY PROPOSAL & QUOTATION REQUEST\n` +
      `BOOKING REFERENCE: ${lead.referenceId}\n` +
      `TO: Chouhan Firetech Services (GSTIN: ${GSTIN})\n` +
      `======================================================\n\n` +
      `1. CLIENT CONTACT INFORMATION:\n` +
      `   - Full Name: ${name.trim()}\n` +
      `   - Mobile Number: +91 ${normalizedPhone}\n` +
      `   - Official Email: ${email.trim()}\n` +
      `   - Priority Level: ${urgencyLabel}\n\n` +
      `2. FACILITY & SYSTEM SPECIFICATIONS:\n` +
      `   - Property Type: ${property || "Not specified"}\n` +
      `   - Requested Service: ${service || "Full Fire Safety Scope"}\n\n` +
      `3. PROJECT SCOPE & SITE REQUIREMENTS:\n` +
      `   ${message.trim() || "Please contact for site survey, BOQ estimation, and formal tax invoice quote."}\n\n` +
      `======================================================\n` +
      `Dispatched via Chouhan Firetech Web Portal\n` +
      `Banur, Mohali, Punjab | Helpline: ${FORMATTED_PHONE}\n` +
      `Date: ${lead.dateFormatted}`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSuccess(true);
    setStatusMessage(`Enquiry registered with Ref: ${lead.referenceId}! Opening email client...`);
    onLeadSubmitted?.(lead);
  };

  const handleDirectSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { isValid } = validateAll();
    if (!isValid) {
      setIsSuccess(false);
      setStatusMessage("Please complete all required fields correctly (Full Name, Phone & Email).");
      if (getNameError()) {
        document.getElementById("quote-name")?.focus();
      } else if (getPhoneError()) {
        document.getElementById("quote-phone")?.focus();
      } else if (getEmailError()) {
        document.getElementById("quote-email")?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    const urgencyLabel =
      urgency === "Immediate" ? "Urgent / 24-Hour Express" :
      urgency === "Scheduled" ? "Routine Refill & Maintenance" : "Turnkey New Setup";

    const lead = await submitLead({
      name,
      phone: normalizedPhone,
      email,
      urgency: urgencyLabel,
      property: property || "Industrial / Commercial Facility",
      service: service || "Turnkey Fire Safety Consultation",
      message: message.trim() || "Please arrange technical site survey, quote, and BOQ estimation.",
      channel: "Direct Portal",
    });
    setIsSubmitting(false);

    setIsSuccess(true);
    setStatusMessage(`Enquiry registered with Ref: ${lead.referenceId}! Our team will call you within 15 minutes.`);
    onLeadSubmitted?.(lead);
  };

  const quickPicks = [
    { label: "Extinguisher Refill", value: "Fire Extinguisher Supply & Refilling" },
    { label: "Sprinkler System", value: "Automatic Fire Sprinkler System" },
    { label: "Hydrant Network", value: "Hydrant Systems & Water Lines" },
    { label: "Fire Alarm Systems", value: "Fire Alarm & Smoke Detection" },
    { label: "Structure Fabrication", value: "Fire Structure Fabrication" },
    { label: "Pipeline & Sealing", value: "Fire Fighting Pipeline & Sealing" },
    { label: "CO2 Gas Flooding", value: "CO2 Total Flooding System" },
    { label: "Fire Audit & NOC", value: "Fire Safety Audit & NOC Compliance" },
  ];

  const nameError = (touched.name || submitAttempted) ? getNameError() : null;
  const phoneError = (touched.phone || submitAttempted) ? getPhoneError() : null;
  const emailError = (touched.email || submitAttempted) ? getEmailError() : null;

  return (
    <div className="quote-card-wrapper group/card">
      <div className="relative rounded-[1.75rem] bg-[#0c0e17]/95 p-6 sm:p-9 lg:p-10 overflow-hidden shadow-2xl border border-zinc-800/80 backdrop-blur-md">
        {/* Shifting fire accent bar at the very top */}
        <div className="fire-accent-bar absolute top-0 inset-x-0 h-1.5" />

        {/* Ambient atmospheric glows inside card */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

        {/* Subtle decorative shield watermark in top-right */}
        <div className="pointer-events-none absolute -top-4 -right-4 text-white/[0.03]">
          <ShieldAlert className="h-48 w-48" />
        </div>

        {/* Header Badge, Title & Subtitle */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/70 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-300 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>FAST RESPONSE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-bold lowercase text-[10px]">avg. 15 min reply</span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-400 font-bold text-[10px]">Banur &amp; Mohali</span>
          </div>

          <h3 className="mt-3.5 font-display text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-white leading-tight">
            REQUEST A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">FREE QUOTE &amp; ESTIMATE</span>
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium max-w-xl">
            Fill in your details below for immediate technical pricing, on-site survey scheduling, and official proposal dispatch.
          </p>

          {/* Priority / Project Urgency Selector */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-red-400" />
                Select Urgency / Timeline
              </label>
              <span className="text-[10px] text-zinc-400 font-semibold">Priority matching</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {[
                { id: "Immediate", label: "Urgent (24h)", sub: "Priority Dispatch", desc: "Emergency Service", icon: Zap },
                { id: "Scheduled", label: "Routine Refill", sub: "Scheduled Maintenance", desc: "Inspection / Refill", icon: Clock },
                { id: "Project", label: "New Setup", sub: "Turnkey Project", desc: "Complete Installation", icon: Building2 },
              ].map((p) => {
                const Icon = p.icon;
                const active = urgency === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setUrgency(p.id)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      active
                        ? "border-red-500 bg-red-950/60 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.25)] ring-2 ring-red-500/30"
                        : "border-zinc-800 bg-[#090b12] hover:bg-[#121522] hover:border-zinc-700 text-zinc-300"
                    }`}
                  >
                    <Icon className={`h-4 w-4 mb-1 transition-transform ${active ? "scale-110 text-red-400" : "text-zinc-500"}`} />
                    <span className="text-xs font-bold leading-tight text-white">{p.label}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5 font-medium">{p.sub}</span>
                    <span className="text-[9px] text-zinc-500 font-normal hidden sm:inline">{p.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mandatory Information Notice Strip */}
        <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-zinc-900/60 border border-zinc-800/90 px-3.5 py-2 text-[11px]">
          <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
            <span className="text-red-500 font-bold">*</span>
            <span>Phone Number &amp; Email Address are mandatory for technical quote calculation</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> 100% Confidential
          </span>
        </div>

        <form onSubmit={handleEmailSubmit} className="relative z-10 mt-5 space-y-4 sm:space-y-4.5" noValidate>
          {/* 1. Name input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="quote-name" className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
                Your Full Name <span className="text-red-500 font-black">*</span>
              </label>
              {isNameValid ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              ) : (touched.name || submitAttempted) ? (
                <span className="text-[10px] font-bold text-red-400 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="h-3 w-3" /> Required
                </span>
              ) : null}
            </div>
            <div className="relative group">
              <div className={`absolute inset-y-1.5 left-1.5 w-9 flex items-center justify-center rounded-lg transition-colors pointer-events-none ${
                nameError
                  ? "bg-red-950/60 text-red-400"
                  : isNameValid
                  ? "bg-emerald-950/50 text-emerald-400"
                  : "bg-zinc-900 text-zinc-500 group-focus-within:bg-red-500/20 group-focus-within:text-red-400"
              }`}>
                <User className="h-4 w-4" />
              </div>
              <input
                id="quote-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="e.g. Ramesh Kumar or Rajesh Sharma"
                required
                className={`w-full h-12 pl-12 pr-10 rounded-xl text-sm font-medium text-white placeholder:text-zinc-500 transition-all shadow-2xs focus:outline-none ${
                  nameError
                    ? "border-2 border-red-500/90 bg-red-950/20 ring-2 ring-red-500/20 animate-input-shake"
                    : isNameValid
                    ? "border border-emerald-500/50 bg-[#070e0a]/60 hover:border-emerald-500/70 focus:bg-[#08120d] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    : "border border-zinc-800 bg-[#08090e] hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                }`}
              />
              {isNameValid && (
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}
            </div>
            {nameError && (
              <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1 animate-in fade-in">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* 2. Responsive 2-Column Grid for Phone & Email (BOTH MANDATORY) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="quote-phone" className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Phone (WhatsApp) <span className="text-red-500 font-black">*</span>
                </label>
                {isPhoneValid ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="h-3 w-3" /> Valid Mobile
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold text-emerald-400/90 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <MessageSquare className="h-2.5 w-2.5 text-emerald-400" /> WhatsApp Enabled
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className={`absolute inset-y-1.5 left-1.5 px-2 flex items-center justify-center rounded-lg transition-colors pointer-events-none text-xs font-mono font-bold ${
                  phoneError
                    ? "bg-red-950/60 text-red-400"
                    : isPhoneValid
                    ? "bg-emerald-950/50 text-emerald-400"
                    : "bg-zinc-900 text-zinc-400 group-focus-within:bg-red-500/20 group-focus-within:text-red-400"
                }`}>
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  <span>+91</span>
                </div>
                <input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder="94178XXXXX"
                  required
                  className={`w-full h-12 pl-20 pr-10 rounded-xl text-sm font-medium text-white placeholder:text-zinc-500 transition-all shadow-2xs focus:outline-none ${
                    phoneError
                      ? "border-2 border-red-500/90 bg-red-950/20 ring-2 ring-red-500/20 animate-input-shake"
                      : isPhoneValid
                      ? "border border-emerald-500/50 bg-[#070e0a]/60 hover:border-emerald-500/70 focus:bg-[#08120d] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      : "border border-zinc-800 bg-[#08090e] hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
                {isPhoneValid && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              {phoneError && (
                <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              )}
            </div>

            {/* Email Address (MANDATORY) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="quote-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Email Address <span className="text-red-500 font-black">*</span>
                </label>
                {isEmailValid ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="h-3 w-3" /> Valid Email
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-full">
                    Official Proposal
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className={`absolute inset-y-1.5 left-1.5 w-9 flex items-center justify-center rounded-lg transition-colors pointer-events-none ${
                  emailError
                    ? "bg-red-950/60 text-red-400"
                    : isEmailValid
                    ? "bg-emerald-950/50 text-emerald-400"
                    : "bg-zinc-900 text-zinc-500 group-focus-within:bg-red-500/20 group-focus-within:text-red-400"
                }`}>
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  placeholder="name@company.com"
                  required
                  className={`w-full h-12 pl-12 pr-10 rounded-xl text-sm font-medium text-white placeholder:text-zinc-500 transition-all shadow-2xs focus:outline-none ${
                    emailError
                      ? "border-2 border-red-500/90 bg-red-950/20 ring-2 ring-red-500/20 animate-input-shake"
                      : isEmailValid
                      ? "border border-emerald-500/50 bg-[#070e0a]/60 hover:border-emerald-500/70 focus:bg-[#08120d] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      : "border border-zinc-800 bg-[#08090e] hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
                {isEmailValid && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400 animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>
          </div>

          {/* 3. Property Type & Service Needed (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Property type */}
            <div>
              <label htmlFor="quote-property" className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5">
                Property Type
              </label>
              <div className="relative group">
                <div className="absolute inset-y-1.5 left-1.5 w-9 flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 group-focus-within:bg-red-500/20 group-focus-within:text-red-400 transition-colors pointer-events-none">
                  <Building2 className="h-4 w-4" />
                </div>
                <select
                  id="quote-property"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="w-full h-12 pl-12 pr-9 rounded-xl border border-zinc-800 bg-[#08090e] text-xs sm:text-sm font-medium text-white hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all appearance-none cursor-pointer shadow-2xs"
                >
                  <option value="" className="bg-[#12141d] text-zinc-400">Select Property Type</option>
                  {propertySolutions.map((p) => (
                    <option key={p.name} value={p.name} className="bg-[#12141d] text-white">{p.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Service Needed */}
            <div>
              <label htmlFor="quote-service" className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-1.5">
                Service Needed
              </label>
              <div className="relative group">
                <div className="absolute inset-y-1.5 left-1.5 w-9 flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 group-focus-within:bg-red-500/20 group-focus-within:text-red-400 transition-colors pointer-events-none">
                  <Flame className="h-4 w-4" />
                </div>
                <select
                  id="quote-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full h-12 pl-12 pr-9 rounded-xl border border-zinc-800 bg-[#08090e] text-xs sm:text-sm font-medium text-white hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all appearance-none cursor-pointer shadow-2xs"
                >
                  <option value="" className="bg-[#12141d] text-zinc-400">Select Service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title} className="bg-[#12141d] text-white">{s.title}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Quick requirement chips */}
          <div className="pt-0.5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Quick Select Common Requirements:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {quickPicks.map((pick) => {
                const isSelected = service === pick.value || service === pick.label;
                return (
                  <button
                    key={pick.label}
                    type="button"
                    onClick={() => setService(pick.value)}
                    className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white border-red-500 shadow-md shadow-red-500/20 scale-[1.02]"
                        : "bg-[#090b12] text-zinc-300 border-zinc-800 hover:border-red-500/50 hover:text-red-400 hover:bg-red-950/30"
                    }`}
                  >
                    {isSelected ? <Check className="h-3 w-3 shrink-0" /> : <span className="text-red-400 font-bold">+</span>}
                    <span>{pick.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Details Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="quote-message" className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
                Requirement Details / Scope of Work <span className="text-zinc-500 font-normal">(Optional)</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                {message.length} chars
              </span>
            </div>
            <div className="relative group">
              <textarea
                id="quote-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your location, premises area (sq ft), number of floors, or specific equipment requirement..."
                className="w-full rounded-xl border border-zinc-800 bg-[#08090e] p-3.5 text-xs sm:text-sm font-medium text-white placeholder:text-zinc-500 hover:border-zinc-700 focus:bg-[#0c0e15] focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all resize-none shadow-2xs"
              />
            </div>
          </div>

          {/* Validation Alert Box */}
          {submitAttempted && (!isNameValid || !isPhoneValid || !isEmailValid) && (
            <div className="rounded-xl p-3.5 bg-red-950/70 border border-red-500/50 text-red-200 animate-in fade-in slide-in-from-top-2 shadow-lg">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1 text-xs">
                  <p className="font-extrabold text-white">
                    Please correct the following fields before submitting:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-red-300">
                    {getNameError() && <li>{getNameError()}</li>}
                    {getPhoneError() && <li>{getPhoneError()}</li>}
                    {getEmailError() && <li>{getEmailError()}</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Status notification */}
          {statusMessage && (
            <div className={`rounded-xl p-3.5 text-xs font-semibold flex items-center gap-2.5 border animate-in fade-in duration-200 ${
              isSuccess
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-950/40"
                : "bg-red-950/70 text-red-300 border-red-500/40"
            }`}>
              {isSuccess ? <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> : <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />}
              <span>{statusMessage}</span>
            </div>
          )}

          {/* 6. Three Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleWhatsAppSend}
                className="shine-sweep group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-700 py-3.5 px-4 text-white shadow-[0_12px_28px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_18px_36px_-6px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden border border-emerald-400/30 disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.491 1.199.534 1.286.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.356.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">Send via WhatsApp</span>
                </div>
                <span className="text-[10px] text-emerald-100 font-semibold mt-0.5">Instant 1-Click WhatsApp Quote</span>
              </button>

              {/* Email Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="shine-sweep group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 py-3.5 px-4 text-white shadow-[0_12px_28px_-6px_rgba(220,38,38,0.5)] hover:shadow-[0_18px_36px_-6px_rgba(220,38,38,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden border border-red-400/30 disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">Send via Email</span>
                </div>
                <span className="text-[10px] text-red-100 font-semibold mt-0.5">Official Quote &amp; Engineering Proposal</span>
              </button>
            </div>

            {/* Direct Instant Web Submit */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleDirectSubmit}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 py-3 px-4 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm hover:border-red-500/50 disabled:opacity-50"
            >
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Instant Callback Request (Submit Directly to Engineering Desk)</span>
            </button>
          </div>

          {/* 7. Trust Guarantees Footnote */}
          <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[10px] sm:text-[11px] text-zinc-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>15-Min Response</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Govt. GST Registered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>100% Free Survey</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>NBC 2016 Compliant</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
