export const smartStepsApiBaseUrl = normalizeBaseUrl(
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api"
);

export class LearningApiError extends Error {
  constructor({ message, status = null, title = null, detail = null, body = null }) {
    super(message);
    this.name = "LearningApiError";
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.body = body;
  }
}

/**
 * @returns {Promise<import("../types/learning.type").IslandSummary[]>}
 */
export function getIslands() {
  return requestJson("/islands");
}

/**
 * @param {number} islandId
 * @returns {Promise<import("../types/learning.type").SituationSummary[]>}
 */
export function getIslandSituations(islandId) {
  return requestJson(`/islands/${encodeURIComponent(islandId)}/situations`);
}

/**
 * @param {number} situationId
 * @returns {Promise<import("../types/learning.type").SituationDetail>}
 */
export function getSituationDetail(situationId) {
  return requestJson(`/situations/${encodeURIComponent(situationId)}`);
}

/**
 * @param {number} stepId
 * @param {string} [accessToken]
 * @returns {Promise<import("../types/learning.type").SignedMediaUrl>}
 */
export function createSignedMediaUrl(stepId, accessToken) {
  return requestJson("/media/signed-url", {
    method: "POST",
    accessToken,
    body: { stepId },
  });
}

/**
 * @param {string} mediaUrl
 * @param {string} [accessToken]
 * @returns {Promise<import("../types/learning.type").SignedMediaUrl>}
 */
export function createSignedVoiceUrl(mediaUrl, accessToken) {
  return requestJson("/media/signed-voice-url", {
    method: "POST",
    accessToken,
    body: { mediaUrl },
  });
}

/**
 * @param {{ userEmail: string }} params
 * @returns {Promise<import("../types/learning.type").LearningProgress>}
 */
export function getUserLearningProgress({ userEmail }) {
  const normalizedEmail = String(userEmail || "").trim().toLowerCase();
  return requestJson(`/progress?userEmail=${encodeURIComponent(normalizedEmail)}`);
}

/**
 * @param {{ fullName?: string, situationId: number, userEmail: string }} params
 * @returns {Promise<import("../types/learning.type").CompleteSituationProgressResponse>}
 */
export function completeSituationProgress({ fullName, situationId, userEmail }) {
  return requestJson("/progress/complete", {
    method: "POST",
    body: {
      fullName: fullName || undefined,
      situationId,
      userEmail,
    },
  });
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

async function requestJson(path, options = {}) {
  const { accessToken, body, headers, method = "GET" } = options;
  const response = await fetch(`${smartStepsApiBaseUrl}${path}`, {
    method,
    headers: buildHeaders({ accessToken, body, headers }),
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

function buildHeaders({ accessToken, body, headers }) {
  return {
    ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };
}

async function createApiError(response) {
  const body = await readErrorBody(response);
  const title = getStringValue(body, "title");
  const detail = getStringValue(body, "detail");
  const message =
    detail ||
    title ||
    getStringValue(body, "message") ||
    `SmartSteps API request failed with status ${response.status}.`;

  return new LearningApiError({
    message,
    status: response.status,
    title,
    detail,
    body,
  });
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
    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

function getStringValue(body, key) {
  return body && typeof body === "object" && typeof body[key] === "string"
    ? body[key]
    : null;
}
