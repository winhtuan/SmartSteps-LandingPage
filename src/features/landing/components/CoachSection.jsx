import { CheckCircle } from "@phosphor-icons/react";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";
import { SectionHeading } from "../../../components/ui/SectionHeading";
export function CoachSection({ t }) {
  return (
    <section className="section-space bg-sky-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
          <div className="absolute inset-8 rounded-full bg-sky-200/70 blur-3xl" />
          <img
            className="relative z-10 w-full"
            src={mascotSpeaking}
            alt={t.coach.alt}
          />
        </div>
        <div className="min-w-0">
          <SectionHeading align="left" {...t.coach} />
          <div className="mt-8 space-y-3">
            {t.coach.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm sm:items-center"
              >
                <CheckCircle
                  className="shrink-0 text-green-600"
                  size={22}
                  weight="fill"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

