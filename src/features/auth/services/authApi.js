import { clearPremiumAccount } from "../../premium/services/premiumApi";

const AUTH_SESSION_STORAGE_KEY = "smartsteps-auth-session";
export const AUTH_SESSION_CHANGED_EVENT = "smartsteps-auth-session-changed";

export async function login(credentials) {
  const email = String(credentials?.email || "").trim().toLowerCase();
  const fullName = String(credentials?.fullName || credentials?.parentName || "SmartSteps Parent").trim();

  if (!email) {
    throw new Error("Email is required.");
  }

  const session = {
    email,
    fullName: fullName || "SmartSteps Parent",
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_CHANGED_EVENT, { detail: { session } }));
  return session;
}

export function getAuthSession() {
  try {
    const rawValue = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthSession()?.email);
}

export function logout() {
  localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  clearPremiumAccount();
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_CHANGED_EVENT, { detail: { session: null } }));
}
