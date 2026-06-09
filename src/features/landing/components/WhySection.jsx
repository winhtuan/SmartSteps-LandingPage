import { featureMeta } from "../data/landingContent";
export function WhySection({ t, language }) {
  return (
    <section
      id="why-smartsteps"
      className="relative scroll-mt-24 overflow-hidden bg-white px-4 pb-16 pt-14 sm:px-6 md:scroll-mt-28 md:pb-20 md:pt-16 lg:px-8 lg:pt-20"
    >
      <div className="pointer-events-none absolute -left-24 top-52 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl blob-float" />
      <div className="pointer-events-none absolute -right-24 bottom-28 h-80 w-80 rounded-full bg-green-200/40 blur-3xl blob-float animation-delay-2" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-extrabold text-yellow-800">
            {t.why.kicker}
          </span>
          <h2 className="mx-auto mt-5 max-w-[800px] text-3xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            {t.why.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-base leading-7 text-slate-600 sm:text-lg">
            {t.why.copy}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-12">
          {t.features.map(([title, copy], index) => {
            const [Icon, tone, span, labelEn, labelVi, gradient, decorated] =
              featureMeta[index];
            return (
              <article
                key={title}
                className={`${span} feature-card fade-up group relative min-h-52 overflow-hidden rounded-[1.5rem] border border-slate-100 bg-gradient-to-br ${gradient} p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl sm:rounded-[2rem] sm:p-7 md:min-h-60`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {decorated && (
                  <>
                    <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-200/40" />
                    <span className="pointer-events-none absolute -bottom-12 right-20 h-24 w-24 rounded-full bg-green-200/30" />
                  </>
                )}
                <span
                  className={`feature-icon relative inline-flex rounded-2xl p-3 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 ${tone}`}
                >
                  <Icon size={27} weight="duotone" />
                </span>
                <h3 className="relative mt-6 text-xl font-black tracking-tight text-slate-900">
                  {title}
                </h3>
                <p className="relative mt-2 max-w-2xl leading-7 text-slate-600">
                  {copy}
                </p>
                <span className="relative mt-7 inline-flex items-center gap-2 text-xs font-extrabold text-green-700">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  {language === "vi" ? labelVi : labelEn}
                </span>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-[2rem] border border-yellow-100 bg-white p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between sm:p-6">
          <p className="max-w-2xl text-base font-extrabold leading-7 text-slate-800">
            {t.why.highlight}
          </p>
          <div className="flex flex-wrap gap-2">
            {t.why.pills.map((pill, index) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 rounded-full bg-lime-50 px-3 py-2 text-xs font-extrabold text-green-800"
              >
                <span
                  className={`h-2 w-2 rounded-full ${index === 1 ? "bg-green-500" : "bg-yellow-400"}`}
                />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

