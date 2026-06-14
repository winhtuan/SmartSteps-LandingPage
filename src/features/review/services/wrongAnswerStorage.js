import { getAuthSession } from "../../auth/services/authApi";

const WRONG_ANSWERS_STORAGE_KEY = "smartsteps-wrong-answers";

/**
 * @typedef {Object} WrongAnswer
 * @property {number} situationId
 * @property {string} lessonTitle
 * @property {string} islandName
 * @property {string} questionPrompt
 * @property {string} selectedOptionLabel
 * @property {string} correctOptionLabel
 * @property {string} savedAt - ISO date string
 */

/**
 * Save a wrong answer attempt. Overwrites existing entry for same situationId
 * so we always keep the latest occurrence.
 *
 * @param {{ situationId: number, lessonTitle: string, islandName: string, questionPrompt: string, selectedOptionLabel: string, correctOptionLabel: string }} params
 */
export function saveWrongAnswer({
  situationId,
  lessonTitle,
  islandName,
  questionPrompt,
  selectedOptionLabel,
  correctOptionLabel,
}) {
  const normalizedId = Number(situationId);

  if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
    return;
  }

  const map = readWrongAnswerMap();
  const learnerKey = getLearnerKey();

  const currentEntries = Array.isArray(map[learnerKey]) ? map[learnerKey] : [];

  // Remove existing entry for same situationId then prepend new one
  const filtered = currentEntries.filter((entry) => Number(entry.situationId) !== normalizedId);

  map[learnerKey] = [
    {
      situationId: normalizedId,
      lessonTitle: String(lessonTitle || ""),
      islandName: String(islandName || ""),
      questionPrompt: String(questionPrompt || ""),
      selectedOptionLabel: String(selectedOptionLabel || ""),
      correctOptionLabel: String(correctOptionLabel || ""),
      savedAt: new Date().toISOString(),
    },
    ...filtered,
  ];

  writeWrongAnswerMap(map);
}

/**
 * Get all wrong answers for the current learner, sorted newest-first.
 *
 * @returns {WrongAnswer[]}
 */
export function getWrongAnswers() {
  const map = readWrongAnswerMap();
  const learnerKey = getLearnerKey();
  const entries = map[learnerKey];

  if (!Array.isArray(entries)) {
    return [];
  }

  return entries
    .filter(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        Number.isInteger(Number(entry.situationId)) &&
        Number(entry.situationId) > 0,
    )
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
}

/**
 * Remove a specific wrong answer (e.g. after the child successfully re-answers).
 *
 * @param {number} situationId
 */
export function clearWrongAnswer(situationId) {
  const normalizedId = Number(situationId);
  const map = readWrongAnswerMap();
  const learnerKey = getLearnerKey();

  if (!Array.isArray(map[learnerKey])) {
    return;
  }

  map[learnerKey] = map[learnerKey].filter(
    (entry) => Number(entry.situationId) !== normalizedId,
  );

  writeWrongAnswerMap(map);
}

function getLearnerKey() {
  const session = getAuthSession();
  const email = String(session?.email || "").trim().toLowerCase();

  return email ? `email:${email}` : "guest";
}

function readWrongAnswerMap() {
  try {
    const raw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeWrongAnswerMap(map) {
  localStorage.setItem(WRONG_ANSWERS_STORAGE_KEY, JSON.stringify(map));
}
