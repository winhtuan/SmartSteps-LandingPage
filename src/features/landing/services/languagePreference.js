const LANGUAGE_STORAGE_KEY = "smartsteps-language";
const SUPPORTED_LANGUAGES = ["vi", "en"];

export function getPreferredLanguage() {
  try {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(language) ? language : "vi";
  } catch {
    return "vi";
  }
}

export function savePreferredLanguage(language) {
  const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : "vi";

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  } catch {
    // Ignore storage failures; the active React state still updates.
  }

  return nextLanguage;
}
