import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Brand } from "../ui/Brand";
import { ButtonLink } from "../ui/ButtonLink";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

export function Header({
  navItems,
  navHrefs,
  language,
  setLanguage,
  loginLabel,
  logoutLabel = "Logout",
  authenticated = false,
  ctaLabel,
  openMenuLabel,
  closeMenuLabel,
  onLogin,
  onLogout,
  onStart,
}) {
  const [open, setOpen] = useState(false);
  const startHref = "/learning";
  const handleStartClick = authenticated
    ? undefined
    : (event) => {
        event.preventDefault();
        onStart?.();
      };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-100 bg-[#fffdf7]/95 backdrop-blur-lg">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 lg:px-8 xl:pr-24">
        <Brand compact />
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((label, index) => (
            <a
              key={label}
              href={navHrefs[index]}
              className="text-sm font-bold text-slate-600 transition hover:text-green-700"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={authenticated ? onLogout : onLogin}
            className="text-sm font-bold text-slate-600 transition hover:text-green-700"
          >
            {authenticated ? logoutLabel : loginLabel}
          </button>
          <ButtonLink href={startHref} onClick={handleStartClick} className="min-h-10 px-5 py-2">
            {ctaLabel}
          </ButtonLink>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? closeMenuLabel : openMenuLabel}
          >
            {open ? (
              <X size={22} weight="bold" />
            ) : (
              <List size={22} weight="bold" />
            )}
          </button>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </nav>
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </div>
      {open && (
        <div className="border-t border-yellow-100 bg-[#fffdf7] px-4 pb-5 pt-3 shadow-lg sm:px-6 lg:hidden">
          {navItems.map((label, index) => (
            <a
              key={label}
              href={navHrefs[index]}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-yellow-50"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              if (authenticated) {
                onLogout?.();
              } else {
                onLogin();
              }
            }}
            className="block w-full rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-yellow-50"
          >
            {authenticated ? logoutLabel : loginLabel}
          </button>
          <ButtonLink href={startHref} onClick={handleStartClick} className="mt-3 w-full md:w-auto md:px-8">
            {ctaLabel}
          </ButtonLink>
        </div>
      )}
    </header>
  );
}

