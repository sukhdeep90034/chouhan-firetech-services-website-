/**
 * Chouhan Firetech Services - Website Status (ON / OFF / Maintenance Mode) Manager
 * Allows admin to toggle the public website ONLINE (live) or OFFLINE (maintenance mode).
 * Syncs seamlessly across browser tabs and sessions via localStorage and BroadcastChannel.
 */

export interface SiteStatusConfig {
  isOnline: boolean; // true = Live / Active (ON), false = Maintenance Mode (OFF)
  title: string;
  message: string;
  emergencyPhone: string;
  emergencyPhoneSecondary?: string;
  emergencyWhatsApp: string;
  lastUpdated: string;
  updatedBy: string;
}

const STORAGE_KEY = "chouhan_site_status_v1";
const STATUS_EVENT_NAME = "chouhan_site_status_changed";

const DEFAULT_STATUS: SiteStatusConfig = {
  isOnline: true,
  title: "Website Under Scheduled Maintenance",
  message:
    "We are currently upgrading our fire safety infrastructure and digital portal to serve you better. Our 24/7 on-site emergency engineering and rapid refilling response teams remain fully active. For immediate assistance, please call or WhatsApp our emergency dispatch hotline directly.",
  emergencyPhone: "+919417828887",
  emergencyPhoneSecondary: "+919877044142",
  emergencyWhatsApp: "+919417828887",
  lastUpdated: new Date().toISOString(),
  updatedBy: "Admin",
};

export function getSiteStatus(): SiteStatusConfig {
  if (typeof window === "undefined") {
    return DEFAULT_STATUS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATUS;
    const parsed = JSON.parse(raw);

    // Sanitize any legacy Punjabi strings
    if (parsed.title && /[\u0A00-\u0A7F]/.test(parsed.title)) {
      parsed.title = DEFAULT_STATUS.title;
    }
    if (parsed.message && /[\u0A00-\u0A7F]/.test(parsed.message)) {
      parsed.message = DEFAULT_STATUS.message;
    }

    return {
      ...DEFAULT_STATUS,
      ...parsed,
    };
  } catch (e) {
    console.error("Error reading site status:", e);
    return DEFAULT_STATUS;
  }
}

export function saveSiteStatus(status: SiteStatusConfig): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
    window.dispatchEvent(
      new CustomEvent(STATUS_EVENT_NAME, { detail: status })
    );

    // Also notify across tabs via BroadcastChannel if available
    if ("BroadcastChannel" in window) {
      try {
        const channel = new BroadcastChannel("chouhan_site_status_channel");
        channel.postMessage(status);
        channel.close();
      } catch {
        // BroadcastChannel optional fallback
      }
    }
  } catch (e) {
    console.error("Error saving site status:", e);
  }
}

export function toggleSiteOnlineStatus(newStatus?: boolean): SiteStatusConfig {
  const current = getSiteStatus();
  const nextOnline = typeof newStatus === "boolean" ? newStatus : !current.isOnline;

  const updated: SiteStatusConfig = {
    ...current,
    isOnline: nextOnline,
    lastUpdated: new Date().toISOString(),
    updatedBy: "Admin",
  };

  saveSiteStatus(updated);
  return updated;
}

export function updateSiteMaintenanceNotice(
  title: string,
  message: string
): SiteStatusConfig {
  const current = getSiteStatus();
  const updated: SiteStatusConfig = {
    ...current,
    title,
    message,
    lastUpdated: new Date().toISOString(),
  };

  saveSiteStatus(updated);
  return updated;
}

export function subscribeSiteStatus(
  callback: (status: SiteStatusConfig) => void
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleCustomEvent = (e: Event) => {
    const custom = e as CustomEvent<SiteStatusConfig>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getSiteStatus());
    }
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getSiteStatus());
    }
  };

  let broadcastChannel: BroadcastChannel | null = null;
  if ("BroadcastChannel" in window) {
    try {
      broadcastChannel = new BroadcastChannel("chouhan_site_status_channel");
      broadcastChannel.onmessage = (event) => {
        if (event.data) {
          callback(event.data);
        }
      };
    } catch {
      broadcastChannel = null;
    }
  }

  window.addEventListener(STATUS_EVENT_NAME, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(STATUS_EVENT_NAME, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
    if (broadcastChannel) {
      broadcastChannel.close();
    }
  };
}
