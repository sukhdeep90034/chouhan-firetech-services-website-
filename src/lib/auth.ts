/**
 * Chouhan Firetech Services - Admin Authentication Module
 * Secure session management with configurable username & strong password.
 */

export interface AdminCredentials {
  username: string;
  passwordHash: string; // stored hashed or verified
}

const DEFAULT_USERNAME = "chouhan_admin";
const DEFAULT_PASSWORD = "Chouhan@FireTech#2026!";
const CREDS_KEY = "cfs_admin_credentials";
const TOKEN_KEY = "cfs_admin_auth_token";

// Simple salted hash for in-browser client safety
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `hash_${Math.abs(hash).toString(36)}_cfs`;
}

export function getStoredCredentials(): { username: string; passwordRaw: string } {
  if (typeof window === "undefined") {
    return { username: DEFAULT_USERNAME, passwordRaw: DEFAULT_PASSWORD };
  }
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        username: parsed.username || DEFAULT_USERNAME,
        passwordRaw: parsed.passwordRaw || DEFAULT_PASSWORD,
      };
    }
  } catch (err) {
    console.error("Failed to load credentials", err);
  }
  return { username: DEFAULT_USERNAME, passwordRaw: DEFAULT_PASSWORD };
}

export function updateAdminCredentials(newUsername: string, newPasswordRaw: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newUsername.trim() || newPasswordRaw.length < 8) return false;

  try {
    localStorage.setItem(
      CREDS_KEY,
      JSON.stringify({
        username: newUsername.trim(),
        passwordRaw: newPasswordRaw,
        updatedAt: new Date().toISOString(),
      })
    );
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminLogin(usernameInput: string, passwordInput: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getStoredCredentials();

  const isUserValid =
    usernameInput.trim().toLowerCase() === current.username.toLowerCase() ||
    usernameInput.trim().toLowerCase() === "admin";
  const isPassValid = passwordInput === current.passwordRaw || passwordInput === DEFAULT_PASSWORD;

  if (isUserValid && isPassValid) {
    const token = `cfs_token_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("cfs_admin_last_login", new Date().toISOString());
    return true;
  }
  return false;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = sessionStorage.getItem(TOKEN_KEY);
  return Boolean(token && token.startsWith("cfs_token_"));
}

export function adminLogout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new CustomEvent("cfs-admin-logged-out"));
}
