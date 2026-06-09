import { smartStepsApiBaseUrl } from "../../learning/services/learningApi";

const PREMIUM_ACCOUNT_STORAGE_KEY = "smartsteps-premium-account";

export const fallbackPremiumPlans = [
  {
    planCode: "PRO_MONTHLY",
    name: "PRO tháng",
    description: "Mở khóa toàn bộ bài học premium trong 1 tháng.",
    amount: 199000,
    currency: "VND",
    durationMonths: 1,
    isLifetime: false,
  },
  {
    planCode: "PRO_YEARLY",
    name: "PRO năm",
    description: "Mở khóa toàn bộ bài học premium trong 1 năm.",
    amount: 1299000,
    currency: "VND",
    durationMonths: 12,
    isLifetime: false,
  },
  {
    planCode: "MAX_LIFETIME",
    name: "MAX trọn đời",
    description: "Truy cập trọn đời toàn bộ trải nghiệm SmartSteps.",
    amount: 2999999,
    currency: "VND",
    durationMonths: null,
    isLifetime: true,
  },
];

export class PremiumApiError extends Error {
  constructor({ message, status = null, body = null }) {
    super(message);
    this.name = "PremiumApiError";
    this.status = status;
    this.body = body;
  }
}

export function getStoredPremiumAccount() {
  try {
    const rawValue = localStorage.getItem(PREMIUM_ACCOUNT_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

export function savePremiumAccount(account) {
  if (!account?.userId || !account?.email) {
    return;
  }

  localStorage.setItem(PREMIUM_ACCOUNT_STORAGE_KEY, JSON.stringify(account));
}

export function clearPremiumAccount() {
  localStorage.removeItem(PREMIUM_ACCOUNT_STORAGE_KEY);
}

export function getPremiumPlans() {
  return requestJson("/api/premium/plans");
}

export async function ensurePremiumAccount({ email, fullName }) {
  const account = await requestJson("/api/premium/account", {
    method: "POST",
    body: { email, fullName },
  });

  savePremiumAccount(account);
  return account;
}

export function getPremiumStatus(userId) {
  return requestJson(`/api/premium/status/${encodeURIComponent(userId)}`);
}

export function redeemPremiumCode({ userId, email, fullName, code }) {
  return requestJson("/api/premium/redeem-code", {
    method: "POST",
    body: { userId, email, fullName, code },
  });
}

export function createPremiumPayment({ userId, email, fullName, planCode }) {
  const learningUrl = `${window.location.origin}/learning`;

  return requestJson("/api/premium/payments", {
    method: "POST",
    body: {
      userId,
      email,
      fullName,
      planCode,
      returnUrl: `${learningUrl}?premiumPayment=success`,
      cancelUrl: `${learningUrl}?premiumPayment=cancel`,
    },
  });
}

export function confirmPremiumPayment({ orderCode, userId }) {
  return requestJson(`/api/premium/payments/${encodeURIComponent(orderCode)}/confirm`, {
    method: "POST",
    body: { userId },
  });
}

async function requestJson(path, options = {}) {
  const { body, headers, method = "GET" } = options;
  const response = await fetch(`${smartStepsApiBaseUrl}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function createApiError(response) {
  const body = await readErrorBody(response);
  const message =
    getStringValue(body, "message") ||
    getStringValue(body, "detail") ||
    getStringValue(body, "title") ||
    `Premium API request failed with status ${response.status}.`;

  return new PremiumApiError({ message, status: response.status, body });
}

async function readErrorBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    return await response.text();
  } catch {
    return null;
  }
}

function getStringValue(body, key) {
  return body && typeof body === "object" && typeof body[key] === "string"
    ? body[key]
    : null;
}
