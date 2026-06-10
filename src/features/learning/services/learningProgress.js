import { getAuthSession } from "../../auth/services/authApi";

const LEARNING_PROGRESS_STORAGE_KEY = "smartsteps-learning-progress";

export function getCompletedSituationIds() {
  const progressMap = readProgressMap();
  const learnerKey = getLearnerKey();
  const completedIds = progressMap[learnerKey]?.completedSituationIds;

  if (!Array.isArray(completedIds)) {
    return [];
  }

  return completedIds
    .map((value) => Number(value))
    .filter(
      (value, index, values) =>
        Number.isInteger(value) && value > 0 && values.indexOf(value) === index,
    );
}

export function markSituationCompleted(situationId) {
  const normalizedSituationId = Number(situationId);

  if (!Number.isInteger(normalizedSituationId) || normalizedSituationId <= 0) {
    return [];
  }

  const progressMap = readProgressMap();
  const learnerKey = getLearnerKey();
  const currentIds = Array.isArray(progressMap[learnerKey]?.completedSituationIds)
    ? progressMap[learnerKey].completedSituationIds
    : [];

  const nextIds = Array.from(
    new Set(
      [...currentIds, normalizedSituationId]
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0),
    ),
  ).sort((left, right) => left - right);

  progressMap[learnerKey] = {
    completedSituationIds: nextIds,
    updatedAt: new Date().toISOString(),
  };

  writeProgressMap(progressMap);
  return nextIds;
}

function getLearnerKey() {
  const session = getAuthSession();
  const email = String(session?.email || "").trim().toLowerCase();

  return email ? `email:${email}` : "guest";
}

function readProgressMap() {
  try {
    const rawValue = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : {};
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
}

function writeProgressMap(progressMap) {
  localStorage.setItem(LEARNING_PROGRESS_STORAGE_KEY, JSON.stringify(progressMap));
}
