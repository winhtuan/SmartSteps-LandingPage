function Flag({ language }) {
  return (
    <span className={`flag flag-${language}`} aria-hidden="true">
      <span />
    </span>
  );
}

export function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-yellow-100 bg-white p-1">
      {["vi", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`rounded-full p-1.5 transition ${language === code ? "bg-yellow-100 ring-2 ring-yellow-300" : "opacity-60 hover:opacity-100"}`}
          aria-label={code === "vi" ? "Tiáº¿ng Viá»‡t" : "English"}
          aria-pressed={language === code}
        >
          <Flag language={code} />
        </button>
      ))}
    </div>
  );
}
