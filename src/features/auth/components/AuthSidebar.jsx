import { useEffect } from "react";
import { EnvelopeSimple, LockKey, Users, X } from "@phosphor-icons/react";
import { Brand } from "../../../components/ui/Brand";
import {
  FacebookBrandIcon,
  GoogleBrandIcon,
} from "../../../components/ui/SocialBrandIcons";
import { authTranslations } from "../../landing/data/translations";

export function AuthSidebar({ language, mode, open, onClose, onModeChange }) {
  const t = authTranslations[language] || authTranslations.en;
  const isSignup = mode === "signup";

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <button
        className="login-overlay absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]"
        type="button"
        onClick={onClose}
        aria-label={t.close}
      />
      <aside className="login-sidebar absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-[#fffdf7] px-6 py-7 shadow-[-20px_0_55px_rgba(15,23,42,0.16)] sm:px-8">
        <div className="flex items-center justify-between">
          <Brand compact />
          <button
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-yellow-300 hover:text-slate-900"
            type="button"
            onClick={onClose}
            aria-label={t.close}
          >
            <X size={21} weight="bold" />
          </button>
        </div>
        <div className="mt-14">
          <h2
            id="login-title"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            {isSignup ? t.signupTitle : t.title}
          </h2>
          {isSignup && (
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {t.signupCopy}
            </p>
          )}
          <p className="mt-5 text-sm font-semibold text-slate-600">
            {isSignup ? t.haveAccount : t.noAccount}{" "}
            <button
              className="font-black text-green-700 transition hover:text-green-600"
              type="button"
              onClick={() => onModeChange(isSignup ? "signin" : "signup")}
            >
              {isSignup ? t.signin : t.signup}
            </button>
          </p>
        </div>
        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => event.preventDefault()}
        >
          {isSignup && (
            <label className="block">
              <span className="text-sm font-extrabold text-slate-700">
                {t.parentName}
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Users
                  className="shrink-0 text-green-700"
                  size={20}
                  weight="bold"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  type="text"
                  name="parentName"
                  placeholder={t.parentNamePlaceholder}
                  autoComplete="name"
                  required
                />
              </span>
            </label>
          )}
          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">
              {t.email}
            </span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <EnvelopeSimple
                className="shrink-0 text-green-700"
                size={20}
                weight="bold"
              />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                required
              />
            </span>
          </label>
          <label className="block">
            <span className="text-sm font-extrabold text-slate-700">
              {t.password}
            </span>
            <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
              <LockKey
                className="shrink-0 text-green-700"
                size={20}
                weight="bold"
              />
              <input
                className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                type="password"
                name="password"
                placeholder={t.passwordPlaceholder}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
              />
            </span>
          </label>
          {isSignup && (
            <label className="block">
              <span className="text-sm font-extrabold text-slate-700">
                {t.confirmPassword}
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <LockKey
                  className="shrink-0 text-green-700"
                  size={20}
                  weight="bold"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                  type="password"
                  name="confirmPassword"
                  placeholder={t.confirmPasswordPlaceholder}
                  autoComplete="new-password"
                  required
                />
              </span>
            </label>
          )}
          {!isSignup && (
            <div className="text-right">
              <a
                className="text-sm font-extrabold text-green-700 transition hover:text-green-600"
                href="#top"
              >
                {t.forgot}
              </a>
            </div>
          )}
          <button
            className="tactile-button w-full rounded-full bg-yellow-400 px-6 py-4 text-sm font-black text-slate-900 shadow-[0_6px_0_#c99d00] transition hover:bg-yellow-300"
            type="submit"
          >
            {isSignup ? t.signupSubmit : t.submit}
          </button>
        </form>
        <div className="my-7 flex items-center gap-3 text-xs font-extrabold text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>{isSignup ? t.signupOr : t.or}</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="space-y-3">
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:border-yellow-300 hover:bg-yellow-50"
            type="button"
          >
            <GoogleBrandIcon />
            {t.google}
          </button>
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
            type="button"
          >
            <FacebookBrandIcon />
            {t.facebook}
          </button>
        </div>
      </aside>
    </div>
  );
}

