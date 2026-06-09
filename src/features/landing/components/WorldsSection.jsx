import { worldMeta } from "../data/landingContent";
import { SectionHeading } from "../../../components/ui/SectionHeading";
export function WorldsSection({ t }) {
  return (
    <section
      id="curriculum"
      className="section-space overflow-hidden bg-lime-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionHeading align="left" {...t.worldsHeading} />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.worlds.map(([title, copy, lessons, progress], index) => {
            const [Icon, tone] = worldMeta[index];
            return (
              <article
                key={title}
                className="group relative min-h-72 overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
              >
                <span className={`inline-flex rounded-2xl p-3 ${tone}`}>
                  <Icon size={28} weight="duotone" />
                </span>
                <h3 className="mt-8 text-xl font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-extrabold">
                  <span className="text-slate-500">{lessons}</span>
                  <span className="text-green-700">{progress}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

