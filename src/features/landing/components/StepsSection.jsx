import { stepIcons, stepTones } from "../data/landingContent";
import { SectionHeading } from "../../../components/ui/SectionHeading";
export function StepsSection({ t }) {
  return (
    <section
      id="how-it-works"
      className="section-space bg-yellow-50/45 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading {...t.how} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
          {t.steps.map(([title, copy], index) => {
            const Icon = stepIcons[index];
            const tone = stepTones[index];
            return (
              <article
                key={title}
                className={`group relative flex min-h-48 flex-col overflow-hidden rounded-3xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft md:min-h-56 ${tone.card}`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-3 ${tone.icon}`}
                >
                  <Icon size={27} weight="duotone" />
                </span>
                <h3 className="mt-8 text-lg font-black text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

