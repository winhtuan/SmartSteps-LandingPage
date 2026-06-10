const LANGUAGES = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({
  currentLanguage,
  language,
  onChange,
  setLanguage,
  className = "",
}) {
  const activeLanguage = currentLanguage ?? language ?? "vi";
  const handleChange = onChange ?? setLanguage ?? (() => {});

  return (
    <div className={`language-switcher ${className}`.trim()} role="group" aria-label="Language switcher">
      {LANGUAGES.map(({ code, label }) => {
        const active = activeLanguage === code;

        return (
          <button
            key={code}
            type="button"
            className={`language-switcher__button${active ? " is-active" : ""}`}
            aria-pressed={active}
            aria-label={code === "vi" ? "Tiếng Việt" : "English"}
            onClick={() => handleChange(code)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
