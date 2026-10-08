import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Flame,
  Phone,
  MessageSquare,
  Instagram,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Quote,
  AlertTriangle,
  Lock,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import logoImage from "@/assets/chouhan-firetech-logo.png";
import {
  PHONE,
  FORMATTED_PHONE,
  PHONE_SECONDARY,
  FORMATTED_PHONE_SECONDARY,
  EMAIL,
  GSTIN,
  ADDRESS,
  MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP,
  services,
  serviceSubmenuItems,
  productSubmenuItems,
  type ServiceItem,
  type ProjectItem,
} from "@/data/firetechData";
import { trackPageView, trackWhatsAppClick, trackCallClick } from "@/lib/analytics";
import {
  type SiteStatusConfig,
  getSiteStatus,
  subscribeSiteStatus,
  toggleSiteOnlineStatus,
} from "@/lib/siteStatus";
import { isAdminAuthenticated } from "@/lib/auth";
import { TrackOrderModal } from "@/components/TrackOrderModal";
import { PolicyModal } from "@/components/modals/PolicyModal";
import { EnquiryReceiptModal } from "@/components/modals/EnquiryReceiptModal";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import type { LeadItem } from "@/lib/leadVault";

function MagneticNavLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.12;
    const dy = (e.clientY - centerY) * 0.14;
    const clampedX = Math.max(-2.5, Math.min(2.5, dx));
    const clampedY = Math.max(-2, Math.min(2, dy));
    setOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)" : "transform 100ms ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

function MaintenanceModeView({
  status,
  onAdminLogin,
}: {
  status: SiteStatusConfig;
  onAdminLogin: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex flex-col justify-between relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[140px]" />

      <header className="border-b border-zinc-800/80 bg-[#0e1017]/90 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Chouhan Firetech Services"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-zinc-800 pl-3">
              <span className="text-xs font-black uppercase tracking-wider text-white block">
                Chouhan Firetech Services
              </span>
              <span className="text-[11px] text-zinc-400 block">
                Urna, Banur • District Mohali, Punjab
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              onClick={() => trackCallClick("Maintenance Header Call 1")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/50 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{FORMATTED_PHONE}</span>
            </a>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              onClick={() => trackCallClick("Maintenance Header Call 2")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/50 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{FORMATTED_PHONE_SECONDARY}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 shadow-lg shadow-amber-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>SYSTEM UNDER SCHEDULED MAINTENANCE</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {status.title || "Website Under Scheduled Maintenance"}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
              {status.message ||
                "We are currently upgrading our fire safety systems and digital portal to serve you better. Our 24/7 on-site emergency engineering and rapid refilling response teams remain fully active. For immediate assistance, please call or WhatsApp our emergency dispatch hotline directly."}
            </p>
          </div>

          <div className="rounded-2xl border border-red-600/40 bg-gradient-to-b from-[#180e12] to-[#0e1017] p-6 text-left shadow-2xl relative overflow-hidden ring-1 ring-red-600/20">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-600/20 p-2.5 text-red-500 border border-red-600/30">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
                  24/7 Emergency Fire Safety Response is Active!
                </h2>
                <p className="text-xs text-zinc-400">
                  Our certified on-site fire engineering and cylinder refilling team is on standby for immediate industrial and commercial dispatch.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${PHONE}`}
                onClick={() => trackCallClick("Maintenance Direct Call 1")}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-3 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-rose-500 transition-all cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call: 94178-28887</span>
              </a>

              <a
                href={`tel:${PHONE_SECONDARY}`}
                onClick={() => trackCallClick("Maintenance Direct Call 2")}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 px-3 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/30 hover:from-rose-500 hover:to-red-600 transition-all cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call: 98770-44142</span>
              </a>

              <a
                href={`https://wa.me/919417828887?text=${encodeURIComponent(
                  "Hello Chouhan Firetech Services, I need immediate fire safety assistance / quotation."
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick("Maintenance WhatsApp Direct")}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>📍 Facility: Shop No. 1, Urna, Sub Division Banur, District Mohali, Punjab</span>
              <span className="text-emerald-400 font-bold">24x7 Engineering Active</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-2 text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800/80 bg-[#0a0c12] px-4 py-4 text-center text-xs text-zinc-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Chouhan Firetech Services. All Rights Reserved.</span>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500">Administrator:</span>
            <button
              type="button"
              onClick={onAdminLogin}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Click or press Ctrl + Shift + A"
            >
              <Lock className="h-3 w-3" />
              <span>Administrator Login</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SiteLayout({
  children,
  onEnquireService,
}: {
  children: ReactNode;
  onEnquireService?: (serviceTitle: string) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSubmenu, setMobileExpandedSubmenu] = useState<string | null>(null);

  // Modals state
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);
  const [receiptLead, setReceiptLead] = useState<LeadItem | null>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackQueryPrefill, setTrackQueryPrefill] = useState("");

  const handleOpenTrackModal = (refId?: string) => {
    if (refId) setTrackQueryPrefill(refId);
    setShowTrackModal(true);
  };

  // Website status & Admin state
  const [siteStatus, setSiteStatus] = useState<SiteStatusConfig>(() => getSiteStatus());
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());
    return subscribeSiteStatus((newStatus) => {
      setSiteStatus(newStatus);
    });
  }, []);

  useEffect(() => {
    trackPageView();
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        navigate({ to: "/admin" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for hash policy changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#warranty-policy" || hash === "#warranty") {
        setActivePolicyId("warranty");
      } else if (hash === "#privacy-policy" || hash === "#privacy") {
        setActivePolicyId("privacy");
      } else if (hash === "#terms-of-service" || hash === "#terms") {
        setActivePolicyId("terms");
      } else if (hash === "#refund-policy" || hash === "#refund") {
        setActivePolicyId("refund");
      } else if (hash === "#compliance-policy" || hash === "#compliance" || hash === "#standards") {
        setActivePolicyId("compliance");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (!siteStatus.isOnline && !isAdmin) {
    return (
      <MaintenanceModeView
        status={siteStatus}
        onAdminLogin={() => {
          navigate({ to: "/admin" });
        }}
      />
    );
  }

  const isHome = currentPath === "/";
  const isAbout = currentPath === "/about";
  const isServices = currentPath === "/services";
  const isProducts = currentPath === "/products";
  const isProjects = currentPath === "/projects";
  const isGallery = currentPath === "/gallery";
  const isWhyUs = currentPath === "/why-us";
  const isContact = currentPath === "/contact";

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 selection:bg-red-600 selection:text-white pb-16 md:pb-0 flex flex-col justify-between">
      {/* Admin Preview Banner when website is offline */}
      {!siteStatus.isOnline && isAdmin && (
        <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-4 py-2.5 text-white shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-200 animate-pulse" />
            <span>
              ADMIN PREVIEW: Public website is currently OFFLINE (Maintenance Shield Active). You are viewing this live preview as an authenticated Administrator.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Deploy website to LIVE mode immediately?")) {
                  const updated = toggleSiteOnlineStatus(true);
                  setSiteStatus(updated);
                }
              }}
              className="rounded bg-black/90 hover:bg-black px-3 py-1 text-xs font-black uppercase text-emerald-400 transition-colors shadow cursor-pointer"
            >
              Turn Site ON
            </button>
            <Link
              to="/admin"
              className="rounded border border-white/40 bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-bold uppercase text-white transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          HEADER / NAVBAR WITH ROUTE LINKS
          ========================================================================= */}
      <div className="sticky top-0 z-40">
        <header
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#090b10]/95 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2.5"
              : "bg-[#090b10]/90 backdrop-blur-md border-b border-zinc-800/40 py-3 sm:py-4"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Logo / Brand identity */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <img
                  src={logoImage}
                  alt="Chouhan Firetech Services"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -inset-1 rounded-full bg-red-600/10 blur-sm -z-10 group-hover:bg-red-600/20 transition-colors" />
              </div>

              <div className="hidden sm:block border-l border-zinc-800 pl-3 leading-tight">
                <span className="block text-xs font-black uppercase tracking-wider text-white group-hover:text-red-400 transition-colors">
                  CHOUHAN FIRETECH
                </span>
                <span className="block text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">
                  SERVICES • BANUR
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {/* 1. Home */}
              <MagneticNavLink>
                <Link
                  to="/"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isHome ? "active" : "text-zinc-300"
                  }`}
                >
                  Home
                </Link>
              </MagneticNavLink>

              {/* 2. About Us */}
              <MagneticNavLink>
                <Link
                  to="/about"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isAbout ? "active" : "text-zinc-300"
                  }`}
                >
                  About Us
                </Link>
              </MagneticNavLink>

              {/* 3. Our Services (With Dropdown) */}
              <div className="relative group">
                <MagneticNavLink>
                  <Link
                    to="/services"
                    className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer ${
                      isServices ? "active" : "text-zinc-300"
                    }`}
                  >
                    <span>Our Services</span>
                    <ChevronDown className="h-3 w-3 text-zinc-400 group-hover:rotate-180 group-hover:text-red-500 transition-transform duration-300 ease-out" />
                  </Link>
                </MagneticNavLink>

                {/* Services Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-[360px] rounded-2xl border border-zinc-800/90 bg-[#0c0e15]/95 backdrop-blur-2xl p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
                    <div className="px-3 py-2 border-b border-zinc-800/70 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
                        <Flame className="h-3 w-3" /> Fire Safety &amp; Protection Systems
                      </span>
                    </div>

                    <div className="space-y-1">
                      {serviceSubmenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            to="/services"
                            className="group/item flex items-center justify-between rounded-xl p-2.5 hover:bg-white/[0.07] transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600/15 border border-red-500/20 text-red-500 group-hover/item:bg-red-600 group-hover/item:text-white transition-all duration-200 shadow-sm">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="text-left">
                                <span className="block text-xs font-bold text-zinc-200 group-hover/item:text-red-400 group-hover/item:translate-x-1 transition-all duration-200">
                                  {item.title}
                                </span>
                                <span className="block text-[11px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-red-500 transition-all duration-200" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-800/70 px-2 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Open 24/7 for Inspections</span>
                      <Link to="/services" className="font-bold text-red-500 hover:text-red-400 inline-flex items-center gap-1">
                        View All Specs <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Products (With Dropdown) */}
              <div className="relative group">
                <MagneticNavLink>
                  <Link
                    to="/products"
                    className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer ${
                      isProducts ? "active" : "text-zinc-300"
                    }`}
                  >
                    <span>Products</span>
                    <ChevronDown className="h-3 w-3 text-zinc-400 group-hover:rotate-180 group-hover:text-red-500 transition-transform duration-300 ease-out" />
                  </Link>
                </MagneticNavLink>

                {/* Products Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-[340px] rounded-2xl border border-zinc-800/90 bg-[#0c0e15]/95 backdrop-blur-2xl p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
                    <div className="px-3 py-2 border-b border-zinc-800/70 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
                        <ShieldCheck className="h-3 w-3" /> ISI &amp; NFPA Certified Hardware
                      </span>
                    </div>

                    <div className="space-y-1">
                      {productSubmenuItems.map((prod) => {
                        const Icon = prod.icon;
                        return (
                          <Link
                            key={prod.title}
                            to="/products"
                            className="group/item flex items-center justify-between rounded-xl p-2.5 hover:bg-white/[0.07] transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600/15 border border-red-500/20 text-red-500 group-hover/item:bg-red-600 group-hover/item:text-white transition-all duration-200 shadow-sm">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="text-left">
                                <span className="block text-xs font-bold text-zinc-200 group-hover/item:text-red-400 group-hover/item:translate-x-1 transition-all duration-200">
                                  {prod.title}
                                </span>
                                <span className="block text-[11px] text-zinc-400 group-hover/item:text-zinc-300 transition-colors">
                                  {prod.desc}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-red-500 transition-all duration-200" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-800/70 px-2 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Bulk &amp; Institutional Rates</span>
                      <Link to="/products" className="font-bold text-red-500 hover:text-red-400 inline-flex items-center gap-1">
                        Explore Catalog <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Projects */}
              <MagneticNavLink>
                <Link
                  to="/projects"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isProjects ? "active" : "text-zinc-300"
                  }`}
                >
                  Projects
                </Link>
              </MagneticNavLink>

              {/* 6. Gallery */}
              <MagneticNavLink>
                <Link
                  to="/gallery"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isGallery ? "active" : "text-zinc-300"
                  }`}
                >
                  Gallery
                </Link>
              </MagneticNavLink>

              {/* 7. Why Us */}
              <MagneticNavLink>
                <Link
                  to="/why-us"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isWhyUs ? "active" : "text-zinc-300"
                  }`}
                >
                  Why Us
                </Link>
              </MagneticNavLink>

              {/* 8. Contact Us */}
              <MagneticNavLink>
                <Link
                  to="/contact"
                  className={`nav-link-premium px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                    isContact ? "active" : "text-zinc-300"
                  }`}
                >
                  Contact Us
                </Link>
              </MagneticNavLink>
            </nav>

            {/* Desktop Right Action Area: Hotline & CTA */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Instagram Quick Link */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/[0.05] transition-colors group"
                title="Instagram @chouhan53786"
                aria-label="Instagram @chouhan53786"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-500 group-hover:text-white transition-all shadow-sm">
                  <Instagram className="h-3.5 w-3.5" />
                </div>
                <div className="text-left leading-tight hidden 2xl:block">
                  <span className="block text-[10px] text-zinc-400 font-medium">Follow Reels</span>
                  <span className="block text-xs font-bold text-pink-400 group-hover:text-pink-300 transition-colors">
                    @{INSTAGRAM_HANDLE}
                  </span>
                </div>
              </a>

              {/* Direct Call touchpoints (Dual Helplines) */}
              <div className="flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-950/20 px-3 py-1.5 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-500">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[9px] uppercase tracking-wider text-red-400 font-bold">24/7 Hotlines</span>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
                    <a
                      href={`tel:${PHONE}`}
                      onClick={() => trackCallClick("Header Call 1")}
                      className="hover:text-red-400 transition-colors"
                      title="Call Helpline: 9417828887"
                    >
                      {PHONE}
                    </a>
                    <span className="text-zinc-600">•</span>
                    <a
                      href={`tel:${PHONE_SECONDARY}`}
                      onClick={() => trackCallClick("Header Call 2")}
                      className="hover:text-red-400 transition-colors"
                      title="Call Helpline: 9877044142"
                    >
                      {PHONE_SECONDARY}
                    </a>
                  </div>
                </div>
              </div>

              {/* Track Order CTA */}
              <button
                type="button"
                onClick={() => handleOpenTrackModal()}
                className="shine-sweep group relative inline-flex items-center gap-1.5 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-950/40 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-white hover:border-amber-400 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] active:scale-95 transition-all duration-200 cursor-pointer"
                title="Track Order Status or Cancel Booking (Within 24 Hours)"
              >
                <Search className="h-3.5 w-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Track Order</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </button>

              {/* Get a Quote Button */}
              <Link
                to="/contact"
                className="shine-sweep group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 via-red-600 to-red-700 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_30px_rgba(220,38,38,0.75)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 xl:hidden">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow hover:scale-105 active:scale-95 transition-all"
                aria-label="Instagram Profile @chouhan53786"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={`tel:${PHONE}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-colors"
                aria-label="Call Emergency Hotline"
              >
                <Phone className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => handleOpenTrackModal()}
                className="inline-flex h-9 items-center gap-1 px-2.5 rounded-lg border border-amber-500/40 bg-amber-500/15 text-amber-400 text-xs font-bold uppercase shadow hover:bg-amber-500/25 transition-all cursor-pointer"
                aria-label="Track Order Status"
                title="Track Order Status"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="text-[11px] font-bold">Track</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-white hover:border-red-500/40 focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-2 rotate-45 bg-red-500" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-white transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-2 -rotate-45 bg-red-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Full-Screen Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-x-0 top-[64px] sm:top-[74px] bottom-0 bg-[#090b10]/98 backdrop-blur-2xl z-50 overflow-y-auto border-t border-zinc-800/80 p-5 animate-in slide-in-from-top-4 duration-300 xl:hidden flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
          >
            <div className="space-y-1">
              {/* Mobile Track Order Card */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenTrackModal();
                }}
                className="mb-3 flex w-full items-center justify-between rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-orange-950/20 to-[#121520] p-3.5 text-left transition-all cursor-pointer hover:border-amber-400"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Search className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 block">
                      Track Order / Cancel Booking
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Live Status • 24-Hour Free Cancellation
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-amber-400" />
              </button>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isHome ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>Home</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isAbout ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>About Us</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedSubmenu(mobileExpandedSubmenu === "services" ? null : "services")
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isServices ? "bg-red-600/30 text-white border border-red-500/40" : "text-zinc-200 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>Our Services</span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                      6 Services
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                      mobileExpandedSubmenu === "services" ? "rotate-180 text-red-500" : ""
                    }`}
                  />
                </button>

                {mobileExpandedSubmenu === "services" && (
                  <div className="ml-4 pl-3 border-l-2 border-red-600/40 my-1 space-y-1 animate-in fade-in duration-200">
                    <Link
                      to="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-red-400 hover:bg-white/[0.04]"
                    >
                      <span>→ View All Services Main Page</span>
                      <ArrowRight className="h-3 w-3 text-red-500" />
                    </Link>
                    {serviceSubmenuItems.map((item) => (
                      <Link
                        key={item.title}
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-red-400 hover:bg-white/[0.04]"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="h-3 w-3 text-red-500" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Products Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedSubmenu(mobileExpandedSubmenu === "products" ? null : "products")
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isProducts ? "bg-red-600/30 text-white border border-red-500/40" : "text-zinc-200 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>Products</span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                      Catalog
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                      mobileExpandedSubmenu === "products" ? "rotate-180 text-red-500" : ""
                    }`}
                  />
                </button>

                {mobileExpandedSubmenu === "products" && (
                  <div className="ml-4 pl-3 border-l-2 border-red-600/40 my-1 space-y-1 animate-in fade-in duration-200">
                    <Link
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-red-400 hover:bg-white/[0.04]"
                    >
                      <span>→ View All Products Catalog</span>
                      <ArrowRight className="h-3 w-3 text-red-500" />
                    </Link>
                    {productSubmenuItems.map((prod) => (
                      <Link
                        key={prod.title}
                        to="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-red-400 hover:bg-white/[0.04]"
                      >
                        <span>{prod.title}</span>
                        <ArrowRight className="h-3 w-3 text-red-500" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isProjects ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>Projects</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isGallery ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>Equipment Gallery</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                to="/why-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isWhyUs ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>Why Choose Us</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  isContact ? "bg-red-600 text-white shadow-lg" : "text-zinc-200 hover:bg-white/[0.05]"
                }`}
              >
                <span>Contact &amp; Quotes</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Bottom Quick Actions */}
            <div className="pt-6 border-t border-zinc-800/80 space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  onClick={() => trackCallClick("Mobile Menu Drawer 1")}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 text-xs font-bold text-white shadow-lg"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call {PHONE}</span>
                </a>

                <a
                  href={`tel:${PHONE_SECONDARY}`}
                  onClick={() => trackCallClick("Mobile Menu Drawer 2")}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 text-xs font-bold text-white shadow-lg"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call {PHONE_SECONDARY}</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("Mobile Menu Drawer")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-950/20 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-900/30"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Us</span>
                </a>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
                >
                  <Quote className="h-4 w-4" />
                  <span>Get a Quote</span>
                </Link>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-pink-500/40 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-pink-950/40 py-2.5 text-xs font-bold text-pink-300 hover:text-white hover:border-pink-500/70 transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>Follow @{INSTAGRAM_HANDLE} on Instagram</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePolicyId("warranty");
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/80 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 transition-all shadow-sm cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Company Policies &amp; Warranties</span>
              </button>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[10px] sm:text-xs text-zinc-400 hover:text-red-400 pt-1 flex items-center justify-center gap-1 transition-colors"
              >
                <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                <span>Shop No. 1, Urna, Banur, Mohali • Open in Maps ↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          PAGE MAIN CONTENT
          ========================================================================= */}
      <div className="flex-1">
        {children}
      </div>

      {/* =========================================================================
          UNIVERSAL FOOTER WITH PAGE LINKS & POLICIES
          ========================================================================= */}
      <footer className="bg-[#0b0c10] border-t border-zinc-800 text-white pt-14 pb-8 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* 1. Brand details */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src={logoImage}
                alt="Chouhan Firetech Services"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
              Professional end-to-end fire safety, fighting, refilling, pipeline installation, and structural fabrication services. Open 24 Hours.
            </p>
            <div className="mt-4 text-xs text-zinc-500">
              <span>GSTIN: </span>
              <strong className="text-zinc-300">{GSTIN}</strong>
            </div>

            {/* Social Profiles */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">Connect on Social</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-pink-500/30 bg-gradient-to-r from-pink-950/40 to-purple-950/30 px-3 py-1.5 text-xs font-semibold text-pink-300 hover:text-white hover:border-pink-500/60 transition-all"
                  aria-label="Instagram Profile @chouhan53786"
                >
                  <Instagram className="h-4 w-4 text-pink-400" />
                  <span>@{INSTAGRAM_HANDLE}</span>
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/30 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Page Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pages &amp; Sections</h4>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-red-500 transition-colors">Our Services</Link></li>
              <li><Link to="/products" className="hover:text-red-500 transition-colors">Fire Safety Products</Link></li>
              <li><Link to="/projects" className="hover:text-red-500 transition-colors">Completed Projects</Link></li>
              <li><Link to="/gallery" className="hover:text-red-500 transition-colors">Equipment Gallery</Link></li>
              <li><Link to="/why-us" className="hover:text-red-500 transition-colors">Why Choose Us &amp; FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact &amp; Quotes</Link></li>
            </ul>
          </div>

          {/* 3. Core Services List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Services</h4>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="hover:text-red-500 transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-red-500 shrink-0" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Company Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
              <span>Company Policies</span>
            </h4>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Statutory Policies &amp; Guarantees</span>
            <ul className="mt-4 space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyId("warranty")}
                  className="hover:text-emerald-400 transition-colors text-left flex items-start gap-2 cursor-pointer group w-full"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                  <span>
                    <strong className="block text-zinc-300 group-hover:text-emerald-400 font-semibold transition-colors">Warranty &amp; Refill Policy</strong>
                    <span className="text-[10px] text-zinc-500 block">12-Mo Refill &amp; Hydro-Test Guarantee</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyId("privacy")}
                  className="hover:text-blue-400 transition-colors text-left flex items-start gap-2 cursor-pointer group w-full"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                  <span>
                    <strong className="block text-zinc-300 group-hover:text-blue-400 font-semibold transition-colors">Privacy &amp; Site Confidentiality</strong>
                    <span className="text-[10px] text-zinc-500 block">Blueprint Confidentiality &amp; NDAs</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyId("terms")}
                  className="hover:text-amber-400 transition-colors text-left flex items-start gap-2 cursor-pointer group w-full"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                  <span>
                    <strong className="block text-zinc-300 group-hover:text-amber-400 font-semibold transition-colors">Terms of Service</strong>
                    <span className="text-[10px] text-zinc-500 block">Site Safety &amp; Invoicing Protocols</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyId("refund")}
                  className="hover:text-purple-400 transition-colors text-left flex items-start gap-2 cursor-pointer group w-full"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                  <span>
                    <strong className="block text-zinc-300 group-hover:text-purple-400 font-semibold transition-colors">Refund &amp; Replacement</strong>
                    <span className="text-[10px] text-zinc-500 block">30-Day Defect Free Replacement</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyId("compliance")}
                  className="hover:text-red-400 transition-colors text-left flex items-start gap-2 cursor-pointer group w-full"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />
                  <span>
                    <strong className="block text-zinc-300 group-hover:text-red-400 font-semibold transition-colors">Safety Standards (NBC 2016)</strong>
                    <span className="text-[10px] text-zinc-500 block">IS:15683, IS:5290 &amp; IS:884</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* 5. Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact &amp; Location</h4>
            <div className="mt-4 space-y-3 text-xs text-zinc-400">
              <div>
                <strong className="text-white block mb-0.5">Location:</strong>
                <p className="text-zinc-400">{ADDRESS}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  <span>View on Google Maps</span>
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
              <div>
                <strong className="text-white block mb-0.5">24/7 Hotlines:</strong>
                <div className="space-y-0.5">
                  <a href={`tel:${PHONE}`} className="text-red-500 font-bold hover:underline block">
                    {FORMATTED_PHONE}
                  </a>
                  <a href={`tel:${PHONE_SECONDARY}`} className="text-red-400 font-bold hover:underline block">
                    {FORMATTED_PHONE_SECONDARY}
                  </a>
                </div>
              </div>
              <p>
                <strong className="text-white block">Email:</strong>
                <a href={`mailto:${EMAIL}`} className="hover:text-red-500 transition-colors">
                  {EMAIL}
                </a>
              </p>
              <p>
                <strong className="text-white block">Operating Hours:</strong>
                <span className="text-emerald-400 font-semibold">Open 24 Hours / 7 Days</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Chouhan Firetech Services. All Rights Reserved.</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span className="text-zinc-400 font-mono text-[11px]">GSTIN: {GSTIN}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <button
              type="button"
              onClick={() => setActivePolicyId("warranty")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Warranty Policy
            </button>
            <span className="text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => setActivePolicyId("privacy")}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => setActivePolicyId("terms")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => setActivePolicyId("refund")}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span className="text-zinc-700">•</span>
            <button
              type="button"
              onClick={() => setActivePolicyId("compliance")}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Safety Standards
            </button>
            <span className="text-zinc-700">•</span>
            <Link
              to="/admin"
              className="text-zinc-500 hover:text-red-400 transition-colors inline-flex items-center gap-1 font-semibold"
              title="Owner & Admin Control Panel"
            >
              <Lock className="h-3 w-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-4 border-t border-zinc-800 bg-[#0e1015] md:hidden shadow-xl">
        <a
          href={`tel:${PHONE}`}
          onClick={() => trackCallClick("Mobile Bar 1")}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-zinc-800 text-[10px] font-bold uppercase text-white hover:bg-zinc-800"
        >
          <Phone className="h-4 w-4 text-red-500" />
          <span>Call 1</span>
        </a>

        <a
          href={`tel:${PHONE_SECONDARY}`}
          onClick={() => trackCallClick("Mobile Bar 2")}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-zinc-800 text-[10px] font-bold uppercase text-white hover:bg-zinc-800"
        >
          <Phone className="h-4 w-4 text-red-400" />
          <span>Call 2</span>
        </a>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("Mobile Bar")}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-zinc-800 text-[10px] font-bold uppercase text-white hover:bg-zinc-800"
        >
          <MessageSquare className="h-4 w-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-0.5 bg-red-600 text-[10px] font-bold uppercase text-white hover:bg-red-700"
        >
          <Quote className="h-4 w-4" />
          <span>Get Quote</span>
        </Link>
      </div>

      {/* Company Policies Modal */}
      {activePolicyId && (
        <PolicyModal
          initialPolicyId={activePolicyId}
          onClose={() => {
            setActivePolicyId(null);
            if (window.location.hash && window.location.hash.includes("policy")) {
              history.pushState(null, "", window.location.pathname + window.location.search);
            }
          }}
        />
      )}

      {/* Enquiry Receipt Modal */}
      {receiptLead && (
        <EnquiryReceiptModal
          lead={receiptLead}
          onClose={() => setReceiptLead(null)}
          onTrackClick={(refId) => handleOpenTrackModal(refId)}
        />
      )}

      {/* Service Specification Modal */}
      {selectedServiceModal && (
        <ServiceModal
          service={selectedServiceModal}
          onClose={() => setSelectedServiceModal(null)}
          onEnquire={(title) => {
            setSelectedServiceModal(null);
            if (onEnquireService) {
              onEnquireService(title);
            } else {
              navigate({ to: "/contact" });
            }
          }}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProjectModal && (
        <ProjectDetailModal
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
          onEnquire={(title) => {
            setSelectedProjectModal(null);
            if (onEnquireService) {
              onEnquireService(title);
            } else {
              navigate({ to: "/contact" });
            }
          }}
        />
      )}

      {/* Track & Cancel Order Modal */}
      <TrackOrderModal
        isOpen={showTrackModal}
        onClose={() => {
          setShowTrackModal(false);
          setTrackQueryPrefill("");
        }}
        initialQuery={trackQueryPrefill}
        onNewBookingClick={() => navigate({ to: "/contact" })}
      />
    </div>
  );
}
