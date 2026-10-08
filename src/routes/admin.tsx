import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import {
  ShieldAlert, ShieldCheck, Users, Eye, EyeOff, Lock, User,
  Phone, MessageSquare, ArrowRight, RefreshCw, Download, Trash2,
  CheckCircle2, Clock, Smartphone, Monitor, Tablet, Search,
  TrendingUp, Calendar, AlertCircle, LogOut, ArrowLeft, Plus,
  FileSpreadsheet, ExternalLink, Check, Copy, Flame, Power, Settings2,
  Globe, Activity, Zap, Sparkles, Sliders, BarChart3, PieChart, IndianRupee,
  Briefcase, Target, ArrowUpRight, CheckCheck, Building, Layers, Award, X
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import logoImage from "@/assets/chouhan-firetech-logo.png";
import {
  type LeadItem,
  getAllLeads,
  submitLead,
  updateLeadStatus,
  deleteLead,
  clearAllLeads,
  purgeAllBackendData,
  exportLeadsToCsv,
} from "@/lib/leadVault";
import {
  type AnalyticsData,
  getAnalytics,
  resetAnalytics,
  clearAllAnalytics,
} from "@/lib/analytics";
import {
  isAdminAuthenticated,
  verifyAdminLogin,
  adminLogout,
  getStoredCredentials,
  updateAdminCredentials,
} from "@/lib/auth";
import {
  type SiteStatusConfig,
  getSiteStatus,
  toggleSiteOnlineStatus,
  updateSiteMaintenanceNotice,
  subscribeSiteStatus,
} from "@/lib/siteStatus";

interface MonthlyGrowthItem {
  month: string;
  revenue: number;
  projects: number;
  refillingCount: number;
  newClients: number;
  amcContracts: number;
}

const MONTHLY_GROWTH_METRICS: MonthlyGrowthItem[] = [
  { month: "May 2026", revenue: 420000, projects: 4, refillingCount: 48, newClients: 12, amcContracts: 110000 },
  { month: "Jun 2026", revenue: 580000, projects: 6, refillingCount: 65, newClients: 17, amcContracts: 145000 },
  { month: "Jul 2026", revenue: 710000, projects: 7, refillingCount: 82, newClients: 22, amcContracts: 180000 },
  { month: "Aug 2026", revenue: 890000, projects: 9, refillingCount: 104, newClients: 29, amcContracts: 225000 },
  { month: "Sep 2026", revenue: 1120000, projects: 12, refillingCount: 128, newClients: 36, amcContracts: 270000 },
  { month: "Oct 2026 (Live)", revenue: 1390000, projects: 15, refillingCount: 152, newClients: 44, amcContracts: 340000 },
];

const WEEKLY_GROWTH_METRICS = [
  { month: "Week 1", revenue: 290000, projects: 3, amcContracts: 75000 },
  { month: "Week 2", revenue: 340000, projects: 4, amcContracts: 85000 },
  { month: "Week 3", revenue: 420000, projects: 5, amcContracts: 110000 },
  { month: "Week 4 (Live)", revenue: 490000, projects: 6, amcContracts: 130000 },
];

const SERVICE_REVENUE_BREAKDOWN = [
  { service: "Heavy Hydrant & Pumproom Pipeline Networks", share: 38, revenue: "₹5,28,200", growth: "+34% MoM", color: "#ef4444" },
  { service: "Automatic Fire Sprinkler Systems", share: 27, revenue: "₹3,75,300", growth: "+28% MoM", color: "#f97316" },
  { service: "Extinguisher Supply & Rapid Refilling", share: 18, revenue: "₹2,50,200", growth: "+42% MoM", color: "#10b981" },
  { service: "Heavy Structure & Pipe Fabrication", share: 11, revenue: "₹1,52,900", growth: "+19% MoM", color: "#06b6d4" },
  { service: "Alarm Detection & NOC Compliance Audits", share: 6, revenue: "₹83,400", growth: "+25% MoM", color: "#8b5cf6" },
];

const RECENT_LANDMARK_PROJECTS = [
  {
    client: "Alpha Industrial Pharma Plant",
    location: "Mohali Sector 82 Industrial Area",
    service: "1,200m Hydrant Network & Pumproom",
    value: "₹4,80,000",
    status: "Completed & NOC Passed",
    date: "Sep 28, 2026",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
  },
  {
    client: "Apex Logistics & E-Commerce Hub",
    location: "Banur Industrial Corridor",
    service: "450 Sprinkler Heads Installation",
    value: "₹2,90,000",
    status: "Active Commissioning",
    date: "Oct 01, 2026",
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10"
  },
  {
    client: "City Center Commercial Complex",
    location: "Zirakpur Highway",
    service: "140 Fire Extinguishers Refilled & Tested",
    value: "₹98,000",
    status: "Completed",
    date: "Sep 24, 2026",
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
  },
  {
    client: "North India Engineering College",
    location: "Banur Campus",
    service: "Smoke Detection & Fire Alarm Retrofit",
    value: "₹1,65,000",
    status: "Completed & Audited",
    date: "Sep 18, 2026",
    badgeColor: "border-blue-500/40 text-blue-400 bg-blue-500/10"
  }
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Chouhan Firetech Services" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Real-time cancellation alert state (Zero-delay customer notification)
  const [cancellationAlert, setCancellationAlert] = useState<{
    referenceId: string;
    name: string;
    phone?: string;
    service?: string;
    reason: string;
    time: string;
  } | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"leads" | "growth" | "analytics" | "whatsapp" | "settings">("leads");
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dataClearedNotification, setDataClearedNotification] = useState<string | null>(null);
  const [isGrowthCleared, setIsGrowthCleared] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("cfs_growth_cleared") === "true";
  });

  // Live Company Growth Dashboard state
  const [growthView, setGrowthView] = useState<"revenue" | "projects" | "breakdown">("revenue");
  const [growthTimeframe, setGrowthTimeframe] = useState<"6months" | "weekly">("6months");
  const [calcService, setCalcService] = useState<"sprinkler" | "hydrant" | "extinguisher">("sprinkler");
  const [calcQuantity, setCalcQuantity] = useState<number>(120);

  // Manual booking modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientService, setNewClientService] = useState("Fire Extinguisher Refilling");
  const [newClientProperty, setNewClientProperty] = useState("Commercial Building");
  const [newClientMessage, setNewClientMessage] = useState("");

  // Settings state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Website Status (ON / OFF / Maintenance Mode) state
  const [siteStatus, setSiteStatus] = useState<SiteStatusConfig>(() => getSiteStatus());
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusTitle, setStatusTitle] = useState(siteStatus.title);
  const [statusMessage, setStatusMessage] = useState(siteStatus.message);

  useEffect(() => {
    return subscribeSiteStatus((newStatus) => {
      setSiteStatus(newStatus);
      setStatusTitle(newStatus.title);
      setStatusMessage(newStatus.message);
    });
  }, []);

  const handleToggleSiteStatus = () => {
    const willBeOffline = siteStatus.isOnline;
    const confirmMsg = willBeOffline
      ? "Switch Public Website to OFFLINE (Maintenance Mode)?\n\n• Public traffic will be redirected to the Emergency Hotline & WhatsApp screen.\n• Your Administrator Portal remains fully operational.\n• Emergency numbers (+91 94178-28887) stay active 24/7."
      : "Deploy Public Website to ONLINE (Live Mode)?\n\n• All public visitors will immediately regain full access to all services, portfolios, and booking forms.";

    if (window.confirm(confirmMsg)) {
      const updated = toggleSiteOnlineStatus();
      setSiteStatus(updated);
    }
  };

  const handleSaveStatusNotice = (e: FormEvent) => {
    e.preventDefault();
    const updated = updateSiteMaintenanceNotice(statusTitle, statusMessage);
    setSiteStatus(updated);
    setShowStatusModal(false);
    alert("Maintenance notice & emergency briefing saved successfully!");
  };

  // Verify authentication on mount & check for auto-clear URL parameter
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    setCheckingAuth(false);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("clear") === "all" || params.get("reset") === "true" || params.get("clear_data") === "1") {
        purgeAllBackendData();
        const zeroed = clearAllAnalytics();
        localStorage.setItem("cfs_growth_cleared", "true");
        setIsGrowthCleared(true);
        setLeads([]);
        setAnalytics(zeroed);
        setCancellationAlert(null);
        setDataClearedNotification("All backend and admin panel data has been completely cleared to zero.");
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  // Load data when authenticated
  const reloadData = () => {
    setLeads(getAllLeads());
    setAnalytics(getAnalytics());
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadData();

      // Zero-delay listener for multi-tab storage events
      const handleStoragePing = (e: StorageEvent) => {
        if (e.key === "cfs_sync_ping" || e.key === "cfs_leads_vault") {
          reloadData();
          try {
            if (e.newValue) {
              const ping = JSON.parse(e.newValue);
              if (ping.type === "lead_cancelled" && ping.payload) {
                setCancellationAlert({
                  referenceId: ping.payload.referenceId || "Unknown Ref",
                  name: ping.payload.name || "Customer",
                  reason: ping.payload.reason || "Cancelled within 24-hour guarantee",
                  time: new Date(ping.payload.cancelledAt || Date.now()).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                });
              }
            }
          } catch (err) {}
        }
      };

      // In-tab direct custom event listener
      const handleLeadCancelled = (e: any) => {
        reloadData();
        const detail = e.detail;
        if (detail) {
          setCancellationAlert({
            referenceId: detail.referenceId || "Unknown Ref",
            name: detail.name || "Customer",
            phone: detail.phone,
            service: detail.service,
            reason: detail.reason || "Cancelled within 24-hour guarantee",
            time: new Date(detail.cancelledAt || Date.now()).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      };

      const handleLeadsUpdated = () => {
        reloadData();
      };

      window.addEventListener("storage", handleStoragePing);
      window.addEventListener("cfs-lead-cancelled", handleLeadCancelled);
      window.addEventListener("cfs-leads-updated", handleLeadsUpdated);
      window.addEventListener("cfs-lead-added", handleLeadsUpdated);

      const interval = setInterval(reloadData, 8000);
      return () => {
        window.removeEventListener("storage", handleStoragePing);
        window.removeEventListener("cfs-lead-cancelled", handleLeadCancelled);
        window.removeEventListener("cfs-leads-updated", handleLeadsUpdated);
        window.removeEventListener("cfs-lead-added", handleLeadsUpdated);
        clearInterval(interval);
      };
    }
    return undefined;
  }, [isAuthenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!username.trim() || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    const success = verifyAdminLogin(username, password);
    if (success) {
      setIsAuthenticated(true);
      setLoginError("");
      reloadData();
    } else {
      setLoginError("Invalid username or password. Please verify your credentials.");
    }
  };

  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleStatusChange = (id: string, status: LeadItem["status"]) => {
    updateLeadStatus(id, status);
    setLeads(getAllLeads());
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this enquiry?")) {
      deleteLead(id);
      setLeads(getAllLeads());
    }
  };

  const handleClearAllLeadsOnly = () => {
    if (window.confirm("⚠️ Clear All Leads?\n\nAre you sure you want to permanently delete ALL client booking inquiries from the database?")) {
      clearAllLeads();
      setLeads([]);
      setCancellationAlert(null);
      setDataClearedNotification("All client booking inquiries have been permanently cleared.");
    }
  };

  const handleResetAnalyticsOnly = () => {
    if (window.confirm("⚠️ Reset Analytics Counters?\n\nAre you sure you want to reset all visitor traffic and click tracking stats to zero?")) {
      const zeroed = clearAllAnalytics();
      setAnalytics(zeroed);
      setDataClearedNotification("All website traffic and click analytics counters have been reset to zero.");
    }
  };

  const handleClearAllData = async () => {
    const confirmed = window.confirm(
      "⚠️ MASTER BACKEND DATA PURGE\n\nAre you sure you want to completely clear ALL backend data in the admin panel?\n\nThis will:\n• Delete all customer bookings & inquiries\n• Reset all page views and visitor tracking to 0\n• Reset all WhatsApp & direct call click analytics to 0\n• Reset company growth metrics to a clean zero state\n\nThis action cannot be undone. Proceed?"
    );

    if (!confirmed) return;

    // 1. Purge leads & inquiries
    purgeAllBackendData();
    setLeads([]);

    // 2. Clear analytics to true zero
    const zeroed = clearAllAnalytics();
    setAnalytics(zeroed);

    // 3. Clear growth metrics flag
    localStorage.setItem("cfs_growth_cleared", "true");
    setIsGrowthCleared(true);

    // 4. Clear active cancellation alerts
    setCancellationAlert(null);

    // 5. Sync to server endpoint
    try {
      await fetch("/api/admin/clear-all", { method: "POST" });
    } catch {}

    setDataClearedNotification("✅ All backend data in the admin panel has been completely cleared to zero.");
    alert("✅ SUCCESS: All backend data in the admin panel has been completely cleared!");
  };

  const handleRestoreGrowthMetrics = () => {
    localStorage.removeItem("cfs_growth_cleared");
    setIsGrowthCleared(false);
    setDataClearedNotification("Growth benchmark demo metrics restored.");
  };

  const handleManualBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    submitLead({
      name: newClientName,
      phone: newClientPhone,
      service: newClientService,
      property: newClientProperty,
      message: newClientMessage,
      channel: "Direct Portal",
      urgency: "Immediate Dispatch",
    });

    setShowAddModal(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientMessage("");
    reloadData();
    alert("New client booking added successfully!");
  };

  const handleSaveCredentials = (e: FormEvent) => {
    e.preventDefault();
    setSettingsMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setSettingsMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setSettingsMessage({ type: "error", text: "Password must be at least 8 characters long." });
      return;
    }

    const current = getStoredCredentials();
    const targetUser = newUsername.trim() || current.username;
    const targetPass = newPassword || current.passwordRaw;

    const ok = updateAdminCredentials(targetUser, targetPass);
    if (ok) {
      setSettingsMessage({ type: "success", text: "Credentials updated successfully! Please note your new credentials." });
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setSettingsMessage({ type: "error", text: "Failed to update credentials." });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center text-white">
        <RefreshCw className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center px-4 py-12 relative overflow-hidden text-zinc-100">
        {/* Glow ambient backgrounds */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[130px]" />

        <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0e1017]/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <img
                src={logoImage}
                alt="Chouhan Firetech Services"
                className="mx-auto h-16 w-auto object-contain"
              />
            </Link>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
              <Lock className="h-3 w-3" />
              <span>Owner &amp; Admin Gateway</span>
            </div>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-wide text-white">
              Chouhan Firetech Portal
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Enter your secure administrator credentials to access real-time client bookings, viewers analytics &amp; WhatsApp click tracking.
            </p>

            {/* Public Website Status Indicator on Login */}
            <div className="mt-4 rounded-xl border border-zinc-800/80 bg-[#12151e] p-2.5 text-xs flex items-center justify-between">
              <span className="text-zinc-400 font-medium">Public Site Status:</span>
              <span className={`font-bold flex items-center gap-1.5 ${siteStatus.isOnline ? "text-emerald-400" : "text-red-400"}`}>
                <span className={`h-2 w-2 rounded-full ${siteStatus.isOnline ? "bg-emerald-500" : "bg-red-500 animate-pulse"}`}></span>
                {siteStatus.isOnline ? "ONLINE (Live)" : "OFFLINE (Maintenance)"}
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {loginError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <Label className="text-xs font-bold uppercase text-zinc-300">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Enter administrator username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 border-zinc-800 bg-[#141722] pl-10 text-white placeholder:text-zinc-600 focus:border-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-bold uppercase text-zinc-300">Strong Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-zinc-800 bg-[#141722] pl-10 pr-10 text-white placeholder:text-zinc-600 focus:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-rose-500 cursor-pointer"
            >
              Sign In to Admin Dashboard
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || "").includes(searchTerm) ||
      (l.service || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.referenceId || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0e1017]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="Chouhan Firetech Services"
            className="h-10 w-auto object-contain"
          />
          <div className="border-l border-zinc-800 pl-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase tracking-wider text-sm text-white">
                Admin Control Panel
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                Live &amp; Secure
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 block">
              Urna, Banur • District Mohali, Punjab
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Website ON / OFF Master Switch in Header */}
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#12151f] px-3 py-1.5 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              {siteStatus.isOnline && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${siteStatus.isOnline ? "bg-emerald-500" : "bg-red-500"}`}></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">Gateway</span>
              <span className={`text-xs font-black leading-none ${siteStatus.isOnline ? "text-emerald-400" : "text-red-400"}`}>
                {siteStatus.isOnline ? "ONLINE (LIVE)" : "MAINTENANCE (OFF)"}
              </span>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleToggleSiteStatus}
              className={`ml-1 h-7 px-3 text-xs font-bold uppercase transition-all shadow-md cursor-pointer ${
                siteStatus.isOnline
                  ? "bg-red-600/90 hover:bg-red-500 text-white shadow-red-600/20"
                  : "bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-emerald-600/20"
              }`}
              title={siteStatus.isOnline ? "Click to Switch Website to Maintenance Mode" : "Click to Deploy Website Live"}
            >
              <Power className="h-3.5 w-3.5 mr-1" />
              <span>{siteStatus.isOnline ? "Turn OFF" : "Turn ON"}</span>
            </Button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAllData}
            className="h-8 gap-1.5 text-xs font-bold uppercase bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-md"
            title="Purge all leads, bookings, analytics, and reset admin backend data to zero"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear All Data</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="h-8 gap-1.5 text-xs font-bold uppercase cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Real-time Data Cleared Notification Banner */}
        {dataClearedNotification && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-emerald-300 flex items-center justify-between animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">{dataClearedNotification}</p>
                <p className="text-xs text-emerald-400/80">
                  Backend storage has been purged. All counters, logs, and booking records are reset to 0.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDataClearedNotification(null)}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {/* Real-Time Urgent Client Cancellation Alert Banner (Zero Delay Guarantee) */}
        {cancellationAlert && (
          <div className="relative overflow-hidden rounded-3xl border-2 border-red-500 bg-gradient-to-r from-[#240a0e] via-[#170a0e] to-[#0c0e15] p-5 text-white shadow-2xl animate-fade-in ring-4 ring-red-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse">
                  <AlertCircle className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                      URGENT CLIENT ACTION • REAL-TIME ZERO DELAY
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      Logged: <strong className="text-zinc-200">{cancellationAlert.time}</strong>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    Customer {cancellationAlert.name} has CANCELLED Booking{" "}
                    <span className="font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      {cancellationAlert.referenceId}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                    Reason: <strong className="text-white">&ldquo;{cancellationAlert.reason}&rdquo;</strong> (Action executed within 24-hour guarantee)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  size="sm"
                  onClick={() => {
                    setActiveTab("leads");
                    setStatusFilter("Cancelled");
                    setSearchTerm(cancellationAlert.referenceId);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-red-600/30"
                >
                  View Cancelled Booking
                </Button>

                <button
                  type="button"
                  onClick={() => setCancellationAlert(null)}
                  className="rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 cursor-pointer"
                  title="Dismiss alert"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            EXECUTIVE INFRASTRUCTURE COMMAND & MASTER SWITCH CONSOLE
            ========================================================================= */}
        <section
          aria-label="Website Infrastructure Command Console"
          className={`relative overflow-hidden rounded-3xl border transition-all duration-500 shadow-2xl ${
            siteStatus.isOnline
              ? "border-emerald-500/40 bg-gradient-to-br from-[#071712] via-[#0c1219] to-[#080d14] shadow-emerald-950/40"
              : "border-red-500/50 bg-gradient-to-br from-[#240a0e] via-[#140b10] to-[#0a0c13] shadow-red-950/50 ring-1 ring-red-500/30"
          }`}
        >
          {/* Futuristic Cyber Circuit Grid Background Pattern */}
          <div
            className={`pointer-events-none absolute inset-0 opacity-[0.06] ${
              siteStatus.isOnline
                ? "bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)]"
                : "bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)]"
            } bg-[size:32px_32px]`}
          />

          {/* Ambient Glow Orbs */}
          <div
            className={`pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[110px] ${
              siteStatus.isOnline ? "bg-emerald-500/20" : "bg-red-600/25 animate-pulse"
            }`}
          />
          <div
            className={`pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full blur-[110px] ${
              siteStatus.isOnline ? "bg-cyan-500/15" : "bg-amber-600/15"
            }`}
          />

          <div className="relative z-10 p-6 sm:p-8 space-y-6">
            {/* Top Eyebrow Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/90 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-zinc-200 shadow-inner">
                  <span className="relative flex h-2 w-2">
                    {siteStatus.isOnline && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        siteStatus.isOnline ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    ></span>
                  </span>
                  <span>CHOUHAN FIRETECH • SYSTEM COMMAND</span>
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border ${
                    siteStatus.isOnline
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  <Activity className="h-3 w-3" />
                  <span>{siteStatus.isOnline ? "99.98% Service Uptime" : "Maintenance Shield Active"}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span>
                  Last Synchronized:{" "}
                  <strong className="text-zinc-200 font-mono">
                    {new Date(siteStatus.lastUpdated).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    ,{" "}
                    {new Date(siteStatus.lastUpdated).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>
                </span>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <span className="hidden sm:inline font-mono text-[11px] text-zinc-400">
                  Auth: <strong className="text-zinc-300">SuperAdmin</strong>
                </span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column (7 cols): High-Impact Holographic Visual Status */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-start gap-5">
                {/* Holographic Glowing Instrument Orb */}
                <div
                  className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
                    siteStatus.isOnline
                      ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/70 to-emerald-900/30 text-emerald-400 shadow-emerald-500/20"
                      : "border-red-500/60 bg-gradient-to-br from-red-950/80 to-rose-950/30 text-red-400 shadow-red-500/30 animate-pulse"
                  }`}
                >
                  <Power className="h-10 w-10 stroke-[2.2]" />
                  <span
                    className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-black font-black text-[10px] ${
                      siteStatus.isOnline ? "bg-emerald-500 text-black" : "bg-red-600 text-white"
                    }`}
                  >
                    {siteStatus.isOnline ? "ON" : "OFF"}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      Gateway State Controller
                    </span>
                    <Badge
                      className={`font-black text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full ${
                        siteStatus.isOnline
                          ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                          : "bg-red-600 text-white hover:bg-red-500 animate-pulse"
                      }`}
                    >
                      {siteStatus.isOnline ? "● PUBLIC PORTAL: LIVE & ACTIVE" : "● MAINTENANCE MODE ENGAGED"}
                    </Badge>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    {siteStatus.isOnline ? (
                      <>
                        Website is <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.45)]">Online &amp; Unrestricted</span>
                      </>
                    ) : (
                      <>
                        Website is <span className="text-red-400 drop-shadow-[0_0_20px_rgba(248,113,113,0.5)]">Offline (Maintenance Shield)</span>
                      </>
                    )}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                    {siteStatus.isOnline ? (
                      <>
                        Public visitors have complete access to company services, past industrial engineering projects, extinguisher refilling rates, and instant online quote submissions.
                      </>
                    ) : (
                      <>
                        Public visitors see the executive maintenance briefing with direct access to your 24/7 emergency dispatch call and WhatsApp lines. Your Administrator Portal remains fully operational.
                      </>
                    )}
                  </p>

                  {/* Telemetry Micro-Pills */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#12151e] px-2.5 py-1 text-[11px] text-zinc-300">
                      <Globe className="h-3.5 w-3.5 text-blue-400" />
                      <span>Traffic: <strong>{siteStatus.isOnline ? "All Visitors Permitted" : "Emergency Only"}</strong></span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#12151e] px-2.5 py-1 text-[11px] text-zinc-300">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Hotline: <strong className="font-mono">+91 94178-28887</strong></span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#12151e] px-2.5 py-1 text-[11px] text-zinc-300">
                      <Lock className="h-3.5 w-3.5 text-amber-400" />
                      <span>Admin Bypass: <strong>Armed</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Executive Master Switch & Actions Console */}
              <div className="lg:col-span-5 flex flex-col gap-3 justify-center bg-[#0d1017]/85 rounded-2xl border border-zinc-800/90 p-4 sm:p-5 backdrop-blur-md shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Master Switch Actions
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    siteStatus.isOnline ? "text-emerald-400 bg-emerald-950/60" : "text-red-400 bg-red-950/60"
                  }`}>
                    {siteStatus.isOnline ? "State: ACTIVE" : "State: SHIELDED"}
                  </span>
                </div>

                {/* Big Cyber Master Switch Button */}
                <Button
                  type="button"
                  onClick={handleToggleSiteStatus}
                  className={`w-full h-14 font-black uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-2xl cursor-pointer rounded-xl flex items-center justify-center gap-3 ${
                    siteStatus.isOnline
                      ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01]"
                      : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.01]"
                  }`}
                >
                  <Power className="h-5 w-5 stroke-[2.5]" />
                  <span>
                    {siteStatus.isOnline
                      ? "Turn Website OFF (Go Offline)"
                      : "Turn Website ON (Deploy Live)"}
                  </span>
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowStatusModal(true)}
                    className="h-10 border-zinc-700 bg-zinc-800/80 text-xs font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white cursor-pointer rounded-lg"
                  >
                    <Settings2 className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                    <span>Edit Notice</span>
                  </Button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 inline-flex items-center justify-center border border-zinc-700 bg-zinc-800/80 text-xs font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors rounded-lg"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5 text-zinc-400" />
                    <span>Preview Site</span>
                  </a>
                </div>

                <span className="text-[10px] text-center text-zinc-400">
                  {siteStatus.isOnline
                    ? "Clicking Turn OFF activates maintenance shield without downtime."
                    : "Clicking Turn ON instantly reopens public landing page to all users."}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* 1. Page Viewers */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Viewers</span>
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400 border border-blue-500/30">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white">{analytics?.totalViews || 0}</span>
              <span className="ml-2 text-xs text-blue-400 font-semibold">Page Hits</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Today: <strong className="text-white">{analytics?.todayViews || 0}</strong></span>
              <span>Unique: <strong className="text-white">{analytics?.uniqueVisitors || 0}</strong></span>
            </div>
          </div>

          {/* 2. WhatsApp Clicks */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">WhatsApp Clicks</span>
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 border border-emerald-500/30">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-emerald-400">{analytics?.whatsappClicks || 0}</span>
              <span className="ml-2 text-xs text-zinc-400 font-semibold">Chats Initiated</span>
            </div>
            <div className="mt-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>High intent conversion leads</span>
            </div>
          </div>

          {/* 3. Direct Phone Calls */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone Calls</span>
              <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400 border border-amber-500/30">
                <Phone className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-amber-400">{analytics?.callClicks || 0}</span>
              <span className="ml-2 text-xs text-zinc-400 font-semibold">Call Inquiries</span>
            </div>
            <div className="mt-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Direct dials to 9417828887</span>
            </div>
          </div>

          {/* 4. Total Bookings / Quote Leads */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Form Bookings</span>
              <div className="rounded-lg bg-red-500/20 p-2 text-red-400 border border-red-500/30">
                <Flame className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-red-500">{leads.length}</span>
              <span className="ml-2 text-xs text-zinc-400 font-semibold">Total Quotes</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 gap-1">
              <span>New: <strong className="text-red-400">{leads.filter(l => l.status === "New").length}</strong></span>
              <span>Done: <strong className="text-emerald-400">{leads.filter(l => l.status === "Completed").length}</strong></span>
              <span>Cancelled: <strong className="text-amber-400">{leads.filter(l => l.status === "Cancelled").length}</strong></span>
            </div>
          </div>

          {/* 5. Live Company Revenue & Growth */}
          <div
            onClick={() => setActiveTab("growth")}
            className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0c1813] to-[#0e1017] p-5 shadow-lg relative overflow-hidden group hover:border-emerald-400/60 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live Growth</span>
              </span>
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white">₹13.9L</span>
              <span className="ml-2 text-xs text-emerald-400 font-semibold">+24.1% MoM</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Run Rate: <strong>₹1.39 Cr/Yr</strong></span>
              <span className="text-emerald-400 font-bold group-hover:underline">View Chart →</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Client Bookings &amp; Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("growth")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "growth"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-black"
                : "bg-zinc-800/60 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-emerald-500/30"
            }`}
          >
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>Company Live Growth</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-black text-emerald-300 border border-emerald-500/30">
              LIVE +24%
            </span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "analytics"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Viewers &amp; Traffic</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp Clicks ({analytics?.whatsappClicks || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <Lock className="h-4 w-4" />
            <span>Security &amp; Gateway</span>
          </button>
        </div>

        {/* ==============================================================
            TAB 1: CLIENT BOOKINGS & LEADS
            ============================================================== */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-[#0e1017] p-4">
              <div className="flex-1 min-w-[240px]">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    placeholder="Search by client name, mobile, service, or Ref ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 pl-9 border-zinc-800 bg-[#12151f] text-xs text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400">Filter:</span>
                {(["all", "New", "Contacted", "Quoted", "Completed", "Cancelled"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? st === "Cancelled"
                          ? "bg-red-600 text-white shadow-sm font-black"
                          : "bg-red-600 text-white shadow-sm"
                        : st === "Cancelled"
                        ? "bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/50 hover:text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    {st === "Cancelled" ? `Cancelled (${leads.filter((l) => l.status === "Cancelled").length})` : st}
                  </button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportLeadsToCsv}
                  className="h-9 gap-1.5 border-emerald-500/40 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </Button>

                {leads.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearAllLeadsOnly}
                    className="h-9 gap-1.5 bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700/60 cursor-pointer"
                    title="Permanently clear all leads"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear All Leads ({leads.length})</span>
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  className="h-9 gap-1.5 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Manual Booking</span>
                </Button>
              </div>
            </div>

            {/* Leads List */}
            {filteredLeads.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-12 text-center text-zinc-500 space-y-2">
                <ShieldCheck className="mx-auto h-12 w-12 text-zinc-600" />
                <h3 className="text-base font-bold text-zinc-300">No Booking Records Found</h3>
                <p className="text-xs max-w-md mx-auto">
                  When visitors submit consultation requests on the website, they will appear here in real time.
                </p>
                <Button
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                >
                  Add First Booking
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 hover:border-zinc-700 transition-colors shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span
                          onClick={() => copyToClipboard(lead.referenceId)}
                          className="font-mono text-xs font-bold text-zinc-200 bg-zinc-800 px-2.5 py-1 rounded cursor-pointer hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
                          title="Click to copy Ref ID"
                        >
                          <span>{lead.referenceId}</span>
                          {copiedId === lead.referenceId ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-zinc-400" />
                          )}
                        </span>

                        <Badge
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === "Cancelled"
                              ? "bg-red-600 text-white border border-red-500 shadow-sm shadow-red-600/30 font-black"
                              : lead.status === "New"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : lead.status === "Contacted"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : lead.status === "Quoted"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {lead.status === "Cancelled" ? "● CANCELLED" : lead.status}
                        </Badge>

                        <span className="text-[11px] text-zinc-400">
                          Channel: <strong className="text-zinc-200">{lead.channel || "Form"}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Clock className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{lead.dateFormatted || lead.timestamp}</span>
                      </div>
                    </div>

                    {/* Client Details Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Customer Name</span>
                        <span className="text-sm font-extrabold text-white">{lead.name || "N/A"}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Phone / Mobile</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${lead.phone}`}
                            className="font-mono text-sm font-bold text-red-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>{lead.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${lead.name}, this is Chouhan Firetech Services following up regarding your enquiry (${lead.referenceId}) for ${lead.service}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-emerald-600/30 border border-emerald-500/50 px-2 py-0.5 text-[11px] font-bold text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1"
                          >
                            <MessageSquare className="h-3 w-3" />
                            <span>Reply WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Property Type</span>
                        <span className="text-xs font-semibold text-zinc-200">{lead.property || "Not specified"}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Requested Service</span>
                        <span className="text-xs font-bold text-red-400">{lead.service || "General Fire Safety"}</span>
                      </div>
                    </div>

                    {/* Client Note */}
                    {lead.message && (
                      <div className="rounded-xl border border-zinc-800 bg-[#090b10] p-3 text-xs text-zinc-300 italic">
                        &ldquo;{lead.message}&rdquo;
                      </div>
                    )}

                    {/* Cancellation Notification Box */}
                    {lead.status === "Cancelled" && (
                      <div className="rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/60 to-[#140b0e] p-3.5 text-xs text-red-200 space-y-1 shadow-inner">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-red-400">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                            <span>CANCELLED BY {lead.cancelledBy === "Customer" ? "CLIENT (ONLINE)" : "ADMINISTRATOR"}</span>
                          </span>
                          {lead.cancelledAt && (
                            <span className="font-mono text-[11px] text-zinc-400 font-normal">
                              Cancelled at: {new Date(lead.cancelledAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {lead.cancelReason && (
                          <p className="text-zinc-200 pt-0.5">
                            Reason: <strong className="text-white">&ldquo;{lead.cancelReason}&rdquo;</strong>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Status Update & Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800/80">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-zinc-500">Update Status:</span>
                        {(["New", "Contacted", "Quoted", "Completed", "Cancelled"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(lead.id, st)}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                              lead.status === st
                                ? st === "Cancelled"
                                  ? "bg-red-600 text-white font-bold"
                                  : "bg-zinc-700 text-white font-bold"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const summary = `*Chouhan Firetech Booking*\nRef: ${lead.referenceId}\nClient: ${lead.name}\nPhone: ${lead.phone}\nService: ${lead.service}\nProperty: ${lead.property}\nMessage: ${lead.message || "N/A"}`;
                            copyToClipboard(summary);
                            alert("Lead details copied to clipboard!");
                          }}
                          className="h-8 text-xs text-zinc-400 hover:text-white"
                        >
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          <span>Copy Details</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="h-8 text-xs text-red-500 hover:text-red-400 hover:bg-red-950/30"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==============================================================
            TAB: LIVE COMPANY GROWTH & BUSINESS PERFORMANCE
            ============================================================== */}
        {activeTab === "growth" && (
          <div className="space-y-6">
            {/* Header Control Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-[#0e1017] p-5 shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-base font-black uppercase tracking-wider text-white">
                    Live Company Growth &amp; Financial Velocity
                  </h3>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-black uppercase">
                    FY 2026-27 Active Run
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Real-time pipeline trajectory, closed project revenues, and service division breakdown across Punjab industrial belts.
                </p>
              </div>

              {/* View & Timeframe Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Metric View Switcher */}
                <div className="flex rounded-xl border border-zinc-800 bg-[#12151f] p-1">
                  <button
                    onClick={() => setGrowthView("revenue")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      growthView === "revenue"
                        ? "bg-emerald-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Revenue (₹)
                  </button>
                  <button
                    onClick={() => setGrowthView("projects")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      growthView === "projects"
                        ? "bg-emerald-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Project Volumes
                  </button>
                  <button
                    onClick={() => setGrowthView("breakdown")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      growthView === "breakdown"
                        ? "bg-emerald-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Division Share
                  </button>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex rounded-xl border border-zinc-800 bg-[#12151f] p-1">
                  <button
                    onClick={() => setGrowthTimeframe("6months")}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      growthTimeframe === "6months"
                        ? "bg-zinc-700 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    6 Months
                  </button>
                  <button
                    onClick={() => setGrowthTimeframe("weekly")}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      growthTimeframe === "weekly"
                        ? "bg-zinc-700 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Weekly
                  </button>
                </div>
              </div>
            </div>

            {/* Cleared Notice Banner if Growth Data is Cleared */}
            {isGrowthCleared && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-300">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>
                    <strong>Growth Metrics Cleared (Zero Baseline State):</strong> Financial velocity and signed contract counts have been reset. Converted leads will populate real revenue dynamically.
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRestoreGrowthMetrics}
                  className="h-8 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-900/40 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  <span>Restore Demo Benchmarks</span>
                </Button>
              </div>
            )}

            {/* 4 Executive Growth Metric Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0a1812] to-[#0e1017] p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Monthly Run Rate</span>
                  <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{isGrowthCleared ? "₹0" : "₹13,90,000"}</span>
                  <span className="ml-2 text-xs font-bold text-emerald-400">{isGrowthCleared ? "0.0% MoM" : "+24.1% MoM"}</span>
                </div>
                <p className="mt-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                  Highest velocity in Banur, Mohali &amp; Chandigarh
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-[#0a121c] to-[#0e1017] p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Signed Projects (YTD)</span>
                  <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{isGrowthCleared ? "0 Contracts" : "151 Contracts"}</span>
                  <span className="ml-2 text-xs font-bold text-blue-400">{isGrowthCleared ? "Ready" : "100% Passed"}</span>
                </div>
                <p className="mt-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                  Govt Fire Safety Department NOC &amp; Audits Certified
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#1a140a] to-[#0e1017] p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Inquiry Conversion Rate</span>
                  <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
                    <Target className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{isGrowthCleared ? "0.0%" : "78.6%"}</span>
                  <span className="ml-2 text-xs font-bold text-amber-400">{isGrowthCleared ? "Baseline" : "Direct Inquiries"}</span>
                </div>
                <p className="mt-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                  Converted from WhatsApp, Phone &amp; Web Quote Form
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#150a1c] to-[#0e1017] p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Avg Commercial Deal</span>
                  <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
                    <Building className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-white">{isGrowthCleared ? "₹0" : "₹1,85,000"}</span>
                  <span className="ml-2 text-xs font-bold text-purple-400">Per Contract</span>
                </div>
                <p className="mt-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                  Sprinkler loops, pumprooms &amp; hydrant piping runs
                </p>
              </div>
            </div>

            {/* Main Interactive Recharts Chart Canvas */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      {growthView === "revenue"
                        ? "Revenue & AMC Trajectory (₹ INR)"
                        : growthView === "projects"
                        ? "Major Industrial Projects & Refilling Orders Volume"
                        : "Fire Safety Engineering Division Share"}
                    </h4>
                    <span className="text-xs text-zinc-400">
                      {growthTimeframe === "6months" ? "Showing past 6 months performance run" : "Showing current month weekly velocity"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span>Gross Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                    <span>AMC &amp; Maintenance</span>
                  </div>
                </div>
              </div>

              {/* Chart Body */}
              <div className="h-[340px] w-full pt-2">
                {growthView === "revenue" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={growthTimeframe === "6months" ? MONTHLY_GROWTH_METRICS : WEEKLY_GROWTH_METRICS}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="growthRevGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="growthAmcGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#71717a"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#0d1017",
                          borderColor: "#27272a",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(value: any, name: any) => [
                          `₹${Number(value || 0).toLocaleString("en-IN")}`,
                          name === "revenue" ? "Total Revenue" : "AMC Contracts",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#growthRevGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="amcContracts"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#growthAmcGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {growthView === "projects" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MONTHLY_GROWTH_METRICS}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#0d1017",
                          borderColor: "#27272a",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="projects" name="Major Engineering Projects" fill="#ef4444" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="refillingCount" name="Cylinder Refills & Audits" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {growthView === "breakdown" && (
                  <div className="space-y-4 pt-2">
                    {SERVICE_REVENUE_BREAKDOWN.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-zinc-200">{item.service}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-white">{item.revenue}</span>
                            <span className="font-bold text-emerald-400">{item.share}%</span>
                            <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">{item.growth}</span>
                          </div>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${item.share}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: 2 Strategic Columns (Project Quotation Estimator + Landmark Recent Wins) */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Column 1: Fire Protection Quotation Estimator (Interactive Admin Tool) */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
                <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span>Commercial Quotation Value Calculator</span>
                    </h4>
                    <p className="text-xs text-zinc-400">Instantly project client contract values based on scale</p>
                  </div>
                  <Badge variant="outline" className="border-amber-500/40 text-amber-400 text-[10px]">
                    Live Estimator
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-zinc-300">Select Fire Safety Division</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setCalcService("sprinkler")}
                        className={`rounded-xl p-2.5 text-xs font-bold text-center border transition-all cursor-pointer ${
                          calcService === "sprinkler"
                            ? "border-red-500 bg-red-950/40 text-white"
                            : "border-zinc-800 bg-[#12151f] text-zinc-400 hover:text-white"
                        }`}
                      >
                        Sprinkler System
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcService("hydrant")}
                        className={`rounded-xl p-2.5 text-xs font-bold text-center border transition-all cursor-pointer ${
                          calcService === "hydrant"
                            ? "border-red-500 bg-red-950/40 text-white"
                            : "border-zinc-800 bg-[#12151f] text-zinc-400 hover:text-white"
                        }`}
                      >
                        Hydrant Network
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcService("extinguisher")}
                        className={`rounded-xl p-2.5 text-xs font-bold text-center border transition-all cursor-pointer ${
                          calcService === "extinguisher"
                            ? "border-red-500 bg-red-950/40 text-white"
                            : "border-zinc-800 bg-[#12151f] text-zinc-400 hover:text-white"
                        }`}
                      >
                        Extinguishers
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                      <span>
                        Quantity:{" "}
                        <strong className="text-white">
                          {calcQuantity}{" "}
                          {calcService === "sprinkler"
                            ? "Sprinkler Heads"
                            : calcService === "hydrant"
                            ? "Meters Heavy Piping"
                            : "Cylinder Units"}
                        </strong>
                      </span>
                      <span className="text-zinc-500">
                        Base: ₹
                        {calcService === "sprinkler"
                          ? "1,250/head"
                          : calcService === "hydrant"
                          ? "950/meter"
                          : "1,850/unit"}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={calcQuantity}
                      onChange={(e) => setCalcQuantity(Number(e.target.value))}
                      className="mt-2 w-full accent-red-600 cursor-pointer"
                    />
                  </div>

                  {/* Calculated Result Card */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                        Estimated Quotation Value
                      </span>
                      <span className="text-2xl font-black text-white font-mono">
                        ₹
                        {(
                          calcQuantity *
                          (calcService === "sprinkler"
                            ? 1250
                            : calcService === "hydrant"
                            ? 950
                            : 1850)
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => {
                        const serviceName =
                          calcService === "sprinkler"
                            ? "Fire Fighting Pipeline & Sprinklers"
                            : calcService === "hydrant"
                            ? "Heavy Hydrant System Installation"
                            : "Fire Extinguisher Supply & Refilling";
                        setNewClientService(serviceName);
                        setNewClientMessage(
                          `Estimated order: ${calcQuantity} units (Approx value ₹${(
                            calcQuantity *
                            (calcService === "sprinkler"
                              ? 1250
                              : calcService === "hydrant"
                              ? 950
                              : 1850)
                          ).toLocaleString("en-IN")})`
                        );
                        setShowAddModal(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      <span>Draft Booking</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Column 2: Recent Landmark Projects & Verifications */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
                <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span>Recent Landmark Projects Completed</span>
                    </h4>
                    <p className="text-xs text-zinc-400">Commercial &amp; industrial contracts executed across Punjab</p>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">
                    Verified Installations
                  </Badge>
                </div>

                <div className="space-y-3">
                  {isGrowthCleared ? (
                    <div className="rounded-xl border border-zinc-800 bg-[#12151f] p-8 text-center text-zinc-500 space-y-2">
                      <Award className="mx-auto h-8 w-8 text-zinc-600" />
                      <p className="text-xs font-bold text-zinc-300">All Project Installation Logs Cleared</p>
                      <p className="text-[11px] text-zinc-500">
                        Zero benchmark state active. New completed contracts will populate here.
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleRestoreGrowthMetrics}
                        className="text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-950/20 cursor-pointer"
                      >
                        Restore Demo Project Logs
                      </Button>
                    </div>
                  ) : (
                    RECENT_LANDMARK_PROJECTS.map((proj, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-zinc-800/80 bg-[#12151f] p-3.5 flex items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-xs font-black text-white truncate block">{proj.client}</span>
                          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                            <span>{proj.service}</span>
                            <span>•</span>
                            <span className="text-zinc-500">{proj.location}</span>
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-black text-emerald-400 block">{proj.value}</span>
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold border ${proj.badgeColor}`}>
                            {proj.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 2: VIEWERS & TRAFFIC ANALYTICS
            ============================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Daily Viewers Breakdown */}
              <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Daily Traffic &amp; Page Views
                    </h3>
                    <p className="text-xs text-zinc-400">Total hits recorded on the live website</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-blue-500/40 text-blue-400">
                    Auto-Synced
                  </Badge>
                </div>

                <div className="space-y-2">
                  {Object.entries(analytics?.dailyViews || {}).length === 0 ? (
                    <p className="text-xs text-zinc-500 py-6 text-center">No traffic logs recorded yet.</p>
                  ) : (
                    Object.entries(analytics?.dailyViews || {})
                      .slice(-7)
                      .reverse()
                      .map(([day, count]) => (
                        <div key={day} className="flex items-center justify-between rounded-lg bg-[#12151f] p-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span className="font-mono text-zinc-200">{day}</span>
                          </div>
                          <span className="font-extrabold text-blue-400">{count} Views</span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Device Type Breakdown */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Device Breakdown
                  </h3>
                  <p className="text-xs text-zinc-400">Visitor technology distribution</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between rounded-lg bg-[#12151f] p-3">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-zinc-200">Mobile Phones</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">
                      {analytics?.deviceStats.mobile || 0} hits
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-[#12151f] p-3">
                    <div className="flex items-center gap-2.5">
                      <Monitor className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-semibold text-zinc-200">Desktop / Laptop</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">
                      {analytics?.deviceStats.desktop || 0} hits
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-[#12151f] p-3">
                    <div className="flex items-center gap-2.5">
                      <Tablet className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-semibold text-zinc-200">Tablets &amp; iPads</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">
                      {analytics?.deviceStats.tablet || 0} hits
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Activity Stream */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Recent Activity Logs
                  </h3>
                  <p className="text-xs text-zinc-400">Real-time actions taken by users across the website</p>
                </div>
                <span className="text-xs text-zinc-500 font-mono">Last 100 Events</span>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                {(analytics?.events || []).length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">No visitor events recorded yet.</p>
                ) : (
                  (analytics?.events || []).map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-center justify-between rounded-xl bg-[#12151f] p-3 text-xs border border-zinc-800/80"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-md p-1.5 ${
                            evt.type === "whatsapp_click"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : evt.type === "call_click"
                              ? "bg-amber-500/20 text-amber-400"
                              : evt.type === "quote_submit"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {evt.type === "whatsapp_click" ? (
                            <MessageSquare className="h-3.5 w-3.5" />
                          ) : evt.type === "call_click" ? (
                            <Phone className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{evt.label || evt.source}</span>
                          <span className="text-[10px] text-zinc-500">Source: {evt.source} • Device: {evt.device}</span>
                        </div>
                      </div>

                      <span className="text-[11px] text-zinc-400 font-mono">
                        {evt.dateFormatted}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 3: WHATSAPP CLICKS TRACKER
            ============================================================== */}
        {activeTab === "whatsapp" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Inquiry Button Clicks</span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Tracks every time a customer clicks the WhatsApp button to contact you directly.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-bold text-emerald-300">
                  Total Clicks: {analytics?.whatsappClicks || 0}
                </div>
              </div>

              {/* Source breakdown */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
                {Object.entries(analytics?.whatsappBySource || {}).length === 0 ? (
                  <div className="col-span-full py-8 text-center text-zinc-500 text-xs">
                    No WhatsApp clicks logged yet. When visitors click WhatsApp buttons, they will be tracked here.
                  </div>
                ) : (
                  Object.entries(analytics?.whatsappBySource || {}).map(([src, count]) => (
                    <div key={src} className="rounded-xl border border-zinc-800 bg-[#12151f] p-4 flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">Click Location</span>
                        <span className="text-xs font-extrabold text-white truncate block">{src}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-emerald-400">{count}</span>
                        <span className="block text-[10px] text-zinc-400">clicks</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Direct Call Tracker Card */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                    Direct Call Inquiries (9417828887)
                  </h3>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-300">
                  Total Call Dials: {analytics?.callClicks || 0}
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                Number of people who tapped &quot;Call Now&quot; to speak directly with Chouhan Firetech Services.
              </p>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 4: CREDENTIALS & SECURITY SETTINGS
            ============================================================== */}
        {activeTab === "settings" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Credentials Change Card */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Update Administrator Credentials
                </h3>
                <p className="text-xs text-zinc-400">
                  Change the admin login username and strong password for security.
                </p>
              </div>

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                {settingsMessage && (
                  <div
                    className={`rounded-lg p-3 text-xs flex items-center gap-2 ${
                      settingsMessage.type === "success"
                        ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/50 border border-red-500/40 text-red-300"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{settingsMessage.text}</span>
                  </div>
                )}

                <div>
                  <Label className="text-xs font-bold uppercase text-zinc-300">New Username</Label>
                  <Input
                    type="text"
                    placeholder="e.g. chouhan_firetech"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="mt-1 h-10 border-zinc-800 bg-[#12151f] text-xs text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-zinc-300">New Strong Password</Label>
                  <Input
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 h-10 border-zinc-800 bg-[#12151f] text-xs text-white"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-zinc-300">Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 h-10 border-zinc-800 bg-[#12151f] text-xs text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase"
                >
                  Save New Credentials
                </Button>
              </form>
            </div>

            {/* Data & Maintenance Card */}
            <div className="rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Data Backup &amp; Storage Maintenance
                </h3>
                <p className="text-xs text-zinc-400">
                  Export backups or reset tracking counters.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Website Power & Availability Switch */}
                <div
                  className={`rounded-xl border p-4 flex items-center justify-between ${
                    siteStatus.isOnline
                      ? "border-emerald-500/30 bg-emerald-950/20"
                      : "border-red-500/40 bg-red-950/30"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Website Infrastructure Gateway
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Public Access:{" "}
                      <strong className={siteStatus.isOnline ? "text-emerald-400" : "text-red-400"}>
                        {siteStatus.isOnline ? "ONLINE (Live)" : "OFFLINE (Maintenance)"}
                      </strong>
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleToggleSiteStatus}
                    className={`text-xs font-bold uppercase cursor-pointer ${
                      siteStatus.isOnline
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    <Power className="h-3.5 w-3.5 mr-1" />
                    <span>{siteStatus.isOnline ? "Turn OFF" : "Turn ON"}</span>
                  </Button>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#12151f] p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Export Complete Database</span>
                    <span className="text-[11px] text-zinc-400">Download all client bookings as CSV/Excel</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={exportLeadsToCsv}
                    className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/40"
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>CSV</span>
                  </Button>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#12151f] p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Reset Analytics Counters</span>
                    <span className="text-[11px] text-zinc-400">Clear view counters, traffic logs, and WhatsApp/Call clicks</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleResetAnalyticsOnly}
                    className="border-amber-500/40 text-amber-400 hover:bg-amber-900/40 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    <span>Reset Analytics</span>
                  </Button>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-400 block">Clear All Bookings &amp; Inquiries</span>
                    <span className="text-[11px] text-zinc-400">Permanently delete all stored client quote records ({leads.length} leads)</span>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleClearAllLeadsOnly}
                    className="bg-red-800 hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>Clear Leads</span>
                  </Button>
                </div>

                {/* Master Factory Reset Purge Card */}
                <div className="rounded-xl border-2 border-red-500/50 bg-gradient-to-r from-red-950/60 to-[#180a0f] p-4 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black uppercase text-red-300 block">
                        Master Data Purge (Factory Reset)
                      </span>
                      <span className="rounded bg-red-500/30 px-1.5 py-0.5 text-[9px] font-bold text-red-300">
                        ALL DATA
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-300 block mt-0.5">
                      Wipes all bookings, inquiries, visitor logs, and resets growth benchmarks to zero.
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleClearAllData}
                    className="bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase shadow-md shadow-red-600/30 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>Wipe All Data</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Manual Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-extrabold uppercase text-white">
                Add Offline / Manual Booking
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualBooking} className="space-y-3">
              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">Client Name *</Label>
                <Input
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="mt-1 h-10 border-zinc-800 bg-[#141722] text-xs text-white"
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">Mobile Number *</Label>
                <Input
                  required
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="mt-1 h-10 border-zinc-800 bg-[#141722] text-xs text-white"
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">Service Required</Label>
                <select
                  value={newClientService}
                  onChange={(e) => setNewClientService(e.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-zinc-800 bg-[#141722] px-3 text-xs text-white"
                >
                  <option>Fire Fighting Pipeline &amp; Sprinklers</option>
                  <option>Fire Extinguisher Supply &amp; Refilling</option>
                  <option>Heavy Hydrant System Installation</option>
                  <option>Structure &amp; Piping Fabrication</option>
                  <option>Fire Alarm &amp; Smoke Detection System</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">Property Type</Label>
                <select
                  value={newClientProperty}
                  onChange={(e) => setNewClientProperty(e.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-zinc-800 bg-[#141722] px-3 text-xs text-white"
                >
                  <option>Residential Society / House</option>
                  <option>Commercial Building / Mall</option>
                  <option>Industrial &amp; Manufacturing Plant</option>
                  <option>Logistics Warehouse</option>
                  <option>School / Educational Campus</option>
                  <option>Hospital &amp; Healthcare Facility</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">Notes / Scope</Label>
                <Input
                  placeholder="e.g. 15 Extinguishers refill required by Tuesday"
                  value={newClientMessage}
                  onChange={(e) => setNewClientMessage(e.target.value)}
                  className="mt-1 h-10 border-zinc-800 bg-[#141722] text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase"
                >
                  Save Booking
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="border-zinc-800 text-zinc-400"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Maintenance Notice Customization Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#0e1017] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-red-500" />
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  Customize Maintenance Notice &amp; Protocols
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatusNotice} className="mt-4 space-y-4">
              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">
                  Notice Headline / Title
                </Label>
                <Input
                  value={statusTitle}
                  onChange={(e) => setStatusTitle(e.target.value)}
                  className="mt-1.5 border-zinc-800 bg-[#141722] text-sm text-white focus:border-red-500"
                  placeholder="e.g. Website Under Scheduled Maintenance"
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-zinc-300">
                  Detailed Public Announcement Message
                </Label>
                <textarea
                  rows={4}
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-zinc-800 bg-[#141722] p-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                  placeholder="Official notice displayed to public visitors during maintenance periods..."
                  required
                />
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-[#12151e] p-3 text-xs text-zinc-400">
                <span className="font-bold text-zinc-200 block mb-1">Emergency Dispatch Guarantee:</span>
                Even when the public website is toggled to OFFLINE, your 24/7 direct telephone line (<strong>+91 94178-28887</strong>) and instant WhatsApp dispatch buttons remain permanently active to prevent any lost client inquiries.
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowStatusModal(false)}
                  className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold uppercase cursor-pointer"
                >
                  Save Notice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
