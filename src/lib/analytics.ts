/**
 * Chouhan Firetech Services - Analytics & Visitor Tracking Engine
 * Tracks: Page Views, Unique Visitors, WhatsApp Clicks, Phone Call Clicks, Form Bookings.
 * Zero external tracking dependencies, privacy-friendly, persists in localStorage and syncs with server.
 */

export interface AnalyticsEvent {
  id: string;
  type: "page_view" | "whatsapp_click" | "call_click" | "quote_submit" | "service_view";
  source: string;
  label?: string;
  timestamp: string;
  dateFormatted: string;
  device: "Mobile" | "Tablet" | "Desktop";
}

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  lastVisitDate: string;
  whatsappClicks: number;
  callClicks: number;
  quoteSubmissions: number;
  events: AnalyticsEvent[];
  dailyViews: Record<string, number>; // "YYYY-MM-DD" -> count
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  whatsappBySource: Record<string, number>;
}

const STORAGE_KEY = "cfs_website_analytics";

function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua) || (width >= 640 && width <= 1024)) {
    return "Tablet";
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || width < 640) {
    return "Mobile";
  }
  return "Desktop";
}

function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function getAnalytics(): AnalyticsData {
  if (typeof window === "undefined") {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      lastVisitDate: "",
      whatsappClicks: 0,
      callClicks: 0,
      quoteSubmissions: 0,
      events: [],
      dailyViews: {},
      deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
      whatsappBySource: {},
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initializeAnalytics();
    }
    const data = JSON.parse(raw) as AnalyticsData;
    return data;
  } catch (err) {
    console.warn("Error parsing analytics:", err);
    return initializeAnalytics();
  }
}

function initializeAnalytics(): AnalyticsData {
  const initial: AnalyticsData = {
    totalViews: 1,
    uniqueVisitors: 1,
    todayViews: 1,
    lastVisitDate: getTodayKey(),
    whatsappClicks: 0,
    callClicks: 0,
    quoteSubmissions: 0,
    events: [],
    dailyViews: { [getTodayKey()]: 1 },
    deviceStats: {
      mobile: getDeviceType() === "Mobile" ? 1 : 0,
      desktop: getDeviceType() === "Desktop" ? 1 : 0,
      tablet: getDeviceType() === "Tablet" ? 1 : 0,
    },
    whatsappBySource: {},
  };
  saveAnalytics(initial);
  return initial;
}

function saveAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("cfs-analytics-updated", { detail: data }));
  } catch (err) {
    console.error("Failed to save analytics:", err);
  }
}

/**
 * Record a page view with session detection
 */
export function trackPageView() {
  if (typeof window === "undefined") return;

  const data = getAnalytics();
  const today = getTodayKey();
  const device = getDeviceType();

  data.totalViews += 1;
  data.dailyViews[today] = (data.dailyViews[today] || 0) + 1;

  if (device === "Mobile") data.deviceStats.mobile += 1;
  else if (device === "Tablet") data.deviceStats.tablet += 1;
  else data.deviceStats.desktop += 1;

  // Check unique session
  const sessionKey = "cfs_session_recorded";
  if (!sessionStorage.getItem(sessionKey)) {
    data.uniqueVisitors += 1;
    sessionStorage.setItem(sessionKey, "1");
  }

  // Calculate today views
  data.todayViews = data.dailyViews[today] || 1;
  data.lastVisitDate = today;

  // Add event log (capped at last 100 events)
  const event: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: "page_view",
    source: window.location.pathname || "/",
    label: document.title || "Homepage",
    timestamp: new Date().toISOString(),
    dateFormatted: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    device,
  };

  data.events = [event, ...data.events.slice(0, 99)];
  saveAnalytics(data);

  // Sync to server silently
  try {
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_view", device, path: window.location.pathname }),
    }).catch(() => {});
  } catch {}
}

/**
 * Track user clicking a WhatsApp action button
 */
export function trackWhatsAppClick(source: string, label?: string) {
  if (typeof window === "undefined") return;

  const data = getAnalytics();
  data.whatsappClicks += 1;
  data.whatsappBySource[source] = (data.whatsappBySource[source] || 0) + 1;

  const event: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: "whatsapp_click",
    source,
    label: label || `WhatsApp Click from ${source}`,
    timestamp: new Date().toISOString(),
    dateFormatted: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    device: getDeviceType(),
  };

  data.events = [event, ...data.events.slice(0, 99)];
  saveAnalytics(data);

  // Sync to server
  try {
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).catch(() => {});
  } catch {}
}

/**
 * Track user clicking a Direct Call button
 */
export function trackCallClick(source: string) {
  if (typeof window === "undefined") return;

  const data = getAnalytics();
  data.callClicks += 1;

  const event: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: "call_click",
    source,
    label: `Direct Helpline Call from ${source}`,
    timestamp: new Date().toISOString(),
    dateFormatted: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    device: getDeviceType(),
  };

  data.events = [event, ...data.events.slice(0, 99)];
  saveAnalytics(data);

  try {
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).catch(() => {});
  } catch {}
}

/**
 * Track user submitting a booking / quote
 */
export function trackBookingSubmission(serviceName: string) {
  if (typeof window === "undefined") return;

  const data = getAnalytics();
  data.quoteSubmissions += 1;

  const event: AnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: "quote_submit",
    source: "Consultation Form",
    label: `Booking Submitted: ${serviceName}`,
    timestamp: new Date().toISOString(),
    dateFormatted: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    device: getDeviceType(),
  };

  data.events = [event, ...data.events.slice(0, 99)];
  saveAnalytics(data);
}

/**
 * Reset analytics data (Admin action)
 */
export function resetAnalytics() {
  if (typeof window === "undefined") return;
  const initial = initializeAnalytics();
  window.dispatchEvent(new CustomEvent("cfs-analytics-updated", { detail: initial }));
}

/**
 * Fully clear all analytics data to zero (Admin action)
 */
export function clearAllAnalytics(): AnalyticsData {
  const zeroed: AnalyticsData = {
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    lastVisitDate: "",
    whatsappClicks: 0,
    callClicks: 0,
    quoteSubmissions: 0,
    events: [],
    dailyViews: {},
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
    whatsappBySource: {},
  };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(zeroed));
      localStorage.removeItem("cfs_session_recorded");
      window.dispatchEvent(new CustomEvent("cfs-analytics-updated", { detail: zeroed }));
    } catch (err) {
      console.error("Failed to clear analytics:", err);
    }
  }
  return zeroed;
}
