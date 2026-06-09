import { ChartLineUp } from "@phosphor-icons/react";
import mascotConfident from "../../../assets/images/mascot/mascot-cat-confident.png";
import { parentIcons } from "../data/landingContent";
import { SectionHeading } from "../../../components/ui/SectionHeading";
export function ParentsSection({ t }) {
  return (
    <section
      id="parents"
      className="section-space bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_0.95fr] md:gap-12">
        <div>
          <SectionHeading align="left" {...t.parents} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {t.parents.items.map((label, index) => {
              const Icon = parentIcons[index];
              return (
                <div
                  key={label}
                className="flex items-start gap-3 rounded-2xl bg-lime-50 p-4 text-sm font-extrabold leading-6 text-slate-700 lg:items-center"
                >
                  <Icon className="text-green-700" size={22} weight="duotone" />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[1.5rem] border border-green-100 bg-lime-50 p-5 shadow-soft sm:rounded-[2rem] sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-green-700">
                  {t.parents.weekly}
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  {t.parents.path}
                </h3>
              </div>
              <span className="rounded-full bg-white p-3 text-green-700">
                <ChartLineUp size={24} weight="duotone" />
              </span>
            </div>
            <div className="mt-7 space-y-3">
              {t.parents.skills.map(([label, progress], index) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <div className="flex justify-between gap-4 text-sm font-extrabold text-slate-700">
                    <span>{label}</span>
                    <span className="text-slate-500">{progress}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`h-2 rounded-full ${item < 4 - index ? ["bg-green-500", "bg-yellow-400", "bg-sky-400"][index] : "bg-slate-100"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-green-600 p-4 text-white">
              <p className="text-xs font-bold text-green-100">
                {t.parents.note}
              </p>
              <p className="mt-1 text-sm font-bold leading-6">
                {t.parents.noteCopy}
              </p>
            </div>
          </div>
          <img
            className="absolute -bottom-12 -right-5 hidden w-32 sm:block"
            src={mascotConfident}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

