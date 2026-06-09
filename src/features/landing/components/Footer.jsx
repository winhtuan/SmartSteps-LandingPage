import { ShieldCheck } from "@phosphor-icons/react";
import { Brand } from "../../../components/ui/Brand";
export function Footer({ t }) {
  return (
    <footer className="border-t border-yellow-100 bg-[#fffdf7] px-4 pb-6 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand compact />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
            {t.footer.copy}
          </p>
        </div>
        {t.footer.groups.map(([title, ...links]) => (
          <div key={title}>
            <h3 className="text-sm font-black text-slate-900">{title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link}
                  className="text-sm font-medium text-slate-600 transition hover:text-green-700"
                  href="#top"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-yellow-100 pt-5 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.copyright}</p>
        <p className="inline-flex items-center gap-2">
          <ShieldCheck size={16} weight="fill" /> {t.footer.safety}
        </p>
      </div>
    </footer>
  );
}
