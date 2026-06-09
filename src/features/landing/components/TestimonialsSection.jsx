import { Star } from "@phosphor-icons/react";
import { testimonials, tones } from "../data/landingContent";
import { SectionHeading } from "../../../components/ui/SectionHeading";
function TestimonialCard({ review, language, stars }) {
  const [name, roleEn, roleVi, location, quoteEn, quoteVi] = review;
  return (
    <article className="flex w-[min(84vw,23rem)] shrink-0 flex-col rounded-3xl border border-yellow-100 bg-white p-6 shadow-soft sm:w-[25rem]">
      <div className="flex gap-1 text-yellow-500" aria-label={stars}>
        {[0, 1, 2, 3, 4].map((item) => (
          <Star key={item} size={17} weight="fill" />
        ))}
      </div>
      <p className="mt-5 flex-1 leading-7 text-slate-700">
        "{language === "vi" ? quoteVi : quoteEn}"
      </p>
      <div className="mt-7 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${tones[name.charCodeAt(0) % tones.length]}`}
        >
          {name[0]}
        </span>
        <span>
          <strong className="block text-sm text-slate-900">{name}</strong>
          <small className="block text-slate-500">
            {language === "vi" ? roleVi : roleEn}
          </small>
          <small className="block font-bold text-green-700">{location}</small>
        </span>
      </div>
    </article>
  );
}

export function TestimonialsSection({ t, language }) {
  const cards = [...testimonials, ...testimonials];
  return (
    <section className="section-space overflow-hidden bg-yellow-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeading {...t.testimonials} />
      </div>
      <div className="testimonial-marquee mt-12">
        <div className="testimonial-track">
          {cards.map((review, index) => (
            <TestimonialCard
              key={`${review[0]}-${index}`}
              review={review}
              language={language}
              stars={t.testimonials.stars}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

