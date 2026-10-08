export interface LeadItem {
  id: string;
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  urgency: string;
  property: string;
  service: string;
  message: string;
  timestamp: string;
  dateFormatted: string;
  channel: "WhatsApp" | "Email" | "Direct Portal";
  status: "New" | "Contacted" | "Quoted" | "Completed" | "Cancelled";
  cancelledAt?: string;
  cancelReason?: string;
  cancelledBy?: "Customer" | "Admin";
}

const STORAGE_KEY = "cfs_leads_vault";
const SYNC_PING_KEY = "cfs_sync_ping";

export function getAllLeads(): LeadItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error("Failed to read leads from storage:", err);
    return [];
  }
}

export function notifyStorageSync(eventType: string, payload?: any): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      SYNC_PING_KEY,
      JSON.stringify({
        type: eventType,
        time: Date.now(),
        payload: payload || null,
      })
    );
  } catch (e) {
    // ignore
  }
}

export async function submitLead(data: {
  name: string;
  phone: string;
  email?: string;
  urgency?: string;
  property?: string;
  service?: string;
  message?: string;
  channel?: "WhatsApp" | "Email" | "Direct Portal";
}): Promise<LeadItem> {
  const referenceId = `CFS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();

  const newLead: LeadItem = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    referenceId,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || "Not Provided",
    urgency: data.urgency || "Immediate",
    property: data.property || "Commercial / Industrial",
    service: data.service || "Fire Safety Consultation",
    message: data.message?.trim() || "",
    timestamp: now.toISOString(),
    dateFormatted: now.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    channel: data.channel || "Direct Portal",
    status: "New",
  };

  // 1. Persist locally first (zero data loss guarantee)
  try {
    const current = getAllLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Save last user reference for instant auto-track lookup
    localStorage.setItem("cfs_last_order_ref", referenceId);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cfs-lead-added", { detail: newLead }));
      window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: updated }));
      notifyStorageSync("lead_added", { referenceId, name: newLead.name });
    }
  } catch (storageErr) {
    console.warn("Storage save error (quota?):", storageErr);
  }

  // 2. Dispatch to backend API asynchronously
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead),
    });
    if (res.ok) {
      const serverResult = await res.json();
      if (serverResult.referenceId) {
        newLead.referenceId = serverResult.referenceId;
      }
    }
  } catch (apiErr) {
    console.info("Local storage fallback utilized; server fetch deferred:", apiErr);
  }

  return newLead;
}

export function getLastSubmittedRef(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cfs_last_order_ref") || null;
}

export function findLeadsByQuery(query: string): LeadItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const digitsOnly = clean.replace(/\D/g, "");
  const all = getAllLeads();

  return all.filter((l) => {
    // 1. Exact or partial match on Reference ID (e.g. CFS-2026-1234 or 1234)
    if (l.referenceId.toLowerCase().includes(clean)) return true;

    // 2. Match phone number digits
    if (digitsOnly.length >= 4) {
      const phoneDigits = (l.phone || "").replace(/\D/g, "");
      if (phoneDigits.includes(digitsOnly)) return true;
    }

    // 3. Match customer name if longer query
    if (clean.length >= 3 && l.name.toLowerCase().includes(clean)) return true;

    return false;
  });
}

export interface CancellationCheckResult {
  eligible: boolean;
  reason?: string;
  elapsedHours: number;
  remainingMs: number;
  remainingHours: number;
  remainingMinutes: number;
}

const CANCELLATION_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day / 24 hours

export function checkCancellationEligibility(lead: LeadItem): CancellationCheckResult {
  if (lead.status === "Cancelled") {
    return {
      eligible: false,
      reason: "This booking has already been cancelled.",
      elapsedHours: 0,
      remainingMs: 0,
      remainingHours: 0,
      remainingMinutes: 0,
    };
  }

  if (lead.status === "Completed") {
    return {
      eligible: false,
      reason: "This project / service has already been completed.",
      elapsedHours: 0,
      remainingMs: 0,
      remainingHours: 0,
      remainingMinutes: 0,
    };
  }

  const createdTime = new Date(lead.timestamp).getTime();
  const now = Date.now();
  const diffMs = now - createdTime;
  const elapsedHours = Math.floor(diffMs / (1000 * 60 * 60));
  const remainingMs = CANCELLATION_WINDOW_MS - diffMs;

  if (remainingMs <= 0) {
    return {
      eligible: false,
      reason: "The 24-hour free cancellation window has expired. Engineering teams and equipment are already allocated.",
      elapsedHours,
      remainingMs: 0,
      remainingHours: 0,
      remainingMinutes: 0,
    };
  }

  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    eligible: true,
    elapsedHours,
    remainingMs,
    remainingHours,
    remainingMinutes,
  };
}

export function cancelLeadByCustomer(
  idOrRef: string,
  reason: string
): { success: boolean; message: string; lead?: LeadItem } {
  if (typeof window === "undefined") {
    return { success: false, message: "Storage unavailable." };
  }

  try {
    const list = getAllLeads();
    const idx = list.findIndex((l) => l.id === idOrRef || l.referenceId.toLowerCase() === idOrRef.trim().toLowerCase());

    if (idx === -1 || !list[idx]) {
      return { success: false, message: "Booking record not found in system." };
    }

    const targetLead = list[idx]!;

    // Enforce 1-day (24 hours) cancellation policy rule
    const check = checkCancellationEligibility(targetLead);
    if (!check.eligible) {
      return {
        success: false,
        message: check.reason || "Order cancellation is only permitted within 24 hours of placement.",
        lead: targetLead,
      };
    }

    // Update status to Cancelled
    const now = new Date();
    targetLead.status = "Cancelled";
    targetLead.cancelledAt = now.toISOString();
    targetLead.cancelReason = reason.trim() || "Customer requested cancellation within 24 hours window.";
    targetLead.cancelledBy = "Customer";

    list[idx] = targetLead;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    // Instant real-time multi-tab and in-tab event dispatch
    window.dispatchEvent(
      new CustomEvent("cfs-lead-cancelled", {
        detail: {
          leadId: targetLead.id,
          referenceId: targetLead.referenceId,
          name: targetLead.name,
          phone: targetLead.phone,
          service: targetLead.service,
          reason: targetLead.cancelReason,
          cancelledAt: targetLead.cancelledAt,
        },
      })
    );
    window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: list }));

    // Ping storage event for other windows/tabs (e.g. Admin portal open in another tab)
    notifyStorageSync("lead_cancelled", {
      referenceId: targetLead.referenceId,
      name: targetLead.name,
      reason: targetLead.cancelReason,
      cancelledAt: targetLead.cancelledAt,
    });

    return {
      success: true,
      message: `Booking ${targetLead.referenceId} has been successfully cancelled. Admin dispatch desk notified immediately.`,
      lead: targetLead,
    };
  } catch (err: any) {
    console.error("Failed to cancel lead:", err);
    return { success: false, message: err?.message || "Failed to update cancellation." };
  }
}

export function updateLeadStatus(id: string, status: LeadItem["status"], reason?: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const list = getAllLeads();
    const idx = list.findIndex((l) => l.id === id);
    if (idx !== -1 && list[idx]) {
      list[idx]!.status = status;
      if (status === "Cancelled") {
        list[idx]!.cancelledAt = new Date().toISOString();
        list[idx]!.cancelledBy = "Admin";
        list[idx]!.cancelReason = reason || "Cancelled by Admin Administrator";
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: list }));
      notifyStorageSync("status_updated", { id, status });
      return true;
    }
  } catch (err) {
    console.error("Failed to update lead status:", err);
  }
  return false;
}

export function deleteLead(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const list = getAllLeads();
    const filtered = list.filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: filtered }));
    notifyStorageSync("lead_deleted", { id });
    return true;
  } catch (err) {
    console.error("Failed to delete lead:", err);
  }
  return false;
}

export function clearAllLeads(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: [] }));
    notifyStorageSync("leads_cleared");
    return true;
  } catch (err) {
    console.error("Failed to clear leads:", err);
  }
  return false;
}

/**
 * Completely purge all backend leads, last order references, and sync state
 */
export function purgeAllBackendData(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.removeItem("cfs_last_order_ref");
    localStorage.removeItem(SYNC_PING_KEY);
    window.dispatchEvent(new CustomEvent("cfs-leads-updated", { detail: [] }));
    notifyStorageSync("leads_cleared");
    return true;
  } catch (err) {
    console.error("Failed to purge backend data:", err);
  }
  return false;
}

export function exportLeadsToCsv(): void {
  const leads = getAllLeads();
  if (leads.length === 0) {
    alert("No enquiries found to export yet.");
    return;
  }

  const headers = [
    "Reference ID",
    "Status",
    "Date & Time",
    "Client Name",
    "Phone Number",
    "Email Address",
    "Priority / Urgency",
    "Property Type",
    "Service Requested",
    "Lead Channel",
    "Message / Scope",
  ];

  const rows = leads.map((l) => [
    `"${l.referenceId}"`,
    `"${l.status}"`,
    `"${l.dateFormatted}"`,
    `"${(l.name || "").replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${(l.email || "").replace(/"/g, '""')}"`,
    `"${l.urgency}"`,
    `"${(l.property || "").replace(/"/g, '""')}"`,
    `"${(l.service || "").replace(/"/g, '""')}"`,
    `"${l.channel}"`,
    `"${(l.message || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `chouhan_firetech_leads_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function seedSampleLead(): LeadItem {
  const samples = [
    {
      name: "Harpreet Singh (Apex Logistics)",
      phone: "9814012345",
      email: "safety@apexlogistics.in",
      urgency: "Immediate",
      property: "Warehousing & Logistics Hub",
      service: "Automatic Fire Sprinkler System",
      message: "Need complete ESFR sprinkler grid installation for 45,000 sq.ft warehouse near Banur.",
      channel: "Direct Portal" as const,
    },
    {
      name: "Sandeep Verma (Verma Industries)",
      phone: "9417855667",
      email: "verma.fab@gmail.com",
      urgency: "Scheduled",
      property: "Industrial & Manufacturing Plants",
      service: "Fire Extinguisher Supply & Refilling",
      message: "Annual refill required for 28 units ABC powder and 12 units CO2 4.5kg extinguishers.",
      channel: "WhatsApp" as const,
    },
  ];

  const pick = samples[Math.floor(Math.random() * samples.length)] ?? samples[0];
  const lead: LeadItem = {
    id: `lead_${Date.now()}_sample`,
    referenceId: `CFS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    ...pick!,
    timestamp: new Date().toISOString(),
    dateFormatted: new Date().toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "New",
  };

  const list = getAllLeads();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...list]));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cfs-lead-added", { detail: lead }));
  }
  return lead;
}
