import { ArrowRight, Lightning, Medal, Play, Sparkle } from "@phosphor-icons/react";
import heroImage from "../../../assets/images/hero-img.png";
import { ButtonLink } from "../../../components/ui/ButtonLink";
export function HeroSection({ t, authenticated = false, onStart }) {
  const startHref = "/learning";
  const handleStartClick = authenticated
    ? undefined
    : (event) => {
        event.preventDefault();
        onStart?.();
      };

  const floatingCards = [
    {
      title: t.skill,
      copy: t.road,
      Icon: Medal,
      tone: "bg-yellow-100 text-yellow-700",
      position: "-left-10 top-8",
      delay: "",
    },
    {
      title: t.streak,
      copy: t.momentum,
      Icon: Lightning,
      tone: "bg-green-100 text-green-700",
      position: "-right-8 top-20",
      delay: "animation-delay-1",
    },
    {
      title: t.reward,
      copy: t.rewardCopy,
      Icon: Sparkle,
      tone: "bg-orange-100 text-orange-700",
      position: "right-6 -bottom-7",
      delay: "animation-delay-2",
    },
  ];

  return (
    <section
      id="top"
      className="hero-grid relative flex flex-1 items-center overflow-hidden bg-[#fffdf7] px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="text-center lg:col-span-5 lg:text-left">
          <h1 className="hero-title fade-up text-[2.75rem] font-black leading-[1] tracking-[-0.045em] text-slate-900 sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem]">
            {t.lead}{" "}
            <span className="hero-title-accent text-green-600">
              {t.accent}
            </span>
          </h1>
          <p className="fade-up animation-delay-1 mx-auto mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 sm:mt-8 sm:text-lg lg:mx-0">
            {t.copy}
          </p>
          <div className="fade-up animation-delay-2 mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <ButtonLink
              href={startHref}
              onClick={handleStartClick}
              className="w-full px-6 py-4 text-base sm:w-auto sm:px-8"
            >
              {t.primary} <ArrowRight size={18} weight="bold" />
            </ButtonLink>
            <ButtonLink
              href="#how-it-works"
              tone="outline"
              className="w-full px-6 py-4 text-base sm:w-auto sm:px-8"
            >
              <Play size={18} weight="fill" /> {t.secondary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-up animation-delay-3 relative mx-auto w-full max-w-[24rem] sm:max-w-xl md:max-w-[32rem] lg:col-span-7 lg:max-w-2xl lg:pr-5">
          <div className="absolute -left-4 top-12 h-44 w-44 rounded-full bg-yellow-200/65 blur-3xl" />
          <div className="absolute -right-2 bottom-12 h-52 w-52 rounded-full bg-green-200/65 blur-3xl" />
          <div className="hero-media-frame relative mx-auto aspect-square max-w-[34rem] overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br from-sky-50 via-lime-50 to-yellow-50 p-3 shadow-[0_28px_70px_rgba(72,118,48,0.2)] sm:rounded-[3rem] sm:border-8 sm:p-5">
            <img
              className="h-full w-full rounded-[1.5rem] object-contain sm:rounded-[2.25rem]"
              src={heroImage}
              alt={t.alt}
            />
          </div>
          {floatingCards.map(({ title, copy, Icon, tone, position, delay }) => (
            <div
              key={title}
              className={`hero-floating-card floating-card ${delay} absolute ${position} hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-soft backdrop-blur-sm lg:flex`}
            >
              <span
                className={`rounded-xl p-2 transition-transform duration-300 ${tone}`}
              >
                <Icon size={21} weight="fill" />
              </span>
              <span className="text-left">
                <strong className="block text-sm text-slate-900">
                  {title}
                </strong>
                <small className="block max-w-40 text-xs leading-5 text-slate-500">
                  {copy}
                </small>
              </span>
            </div>
          ))}
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:hidden">
            {floatingCards.map(({ title, copy, Icon, tone }) => (
              <div
                key={title}
                className="flex items-center gap-2 rounded-2xl border border-white bg-white/90 p-2.5 shadow-sm"
              >
                <span className={`shrink-0 rounded-xl p-2 ${tone}`}>
                  <Icon size={18} weight="fill" />
                </span>
                <span className="min-w-0 text-left">
                  <strong className="block text-xs text-slate-900">
                    {title}
                  </strong>
                  <small className="block text-[11px] leading-4 text-slate-500">
                    {copy}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

