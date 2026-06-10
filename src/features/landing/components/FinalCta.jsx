import { ArrowRight } from "@phosphor-icons/react";
import mascotHappyWave from "../../../assets/images/mascot/mascot-cat-happy-wave.png";
import mascotSinging from "../../../assets/images/mascot/mascot-cat-singing.png";
import { ButtonLink } from "../../../components/ui/ButtonLink";
export function FinalCta({ t, authenticated = false, onStart }) {
  const startHref = "/learning";
  const handleStartClick = authenticated
    ? undefined
    : (event) => {
        event.preventDefault();
        onStart?.();
      };

  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-green-600 px-5 py-12 text-center shadow-[0_22px_60px_rgba(35,113,30,0.2)] sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:py-20">
        <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-yellow-300/20 blur-2xl" />
        <div className="absolute -bottom-28 -right-10 h-64 w-64 rounded-full bg-lime-200/20 blur-2xl" />
        <img
          className="absolute bottom-0 left-4 hidden w-36 lg:block"
          src={mascotHappyWave}
          alt=""
        />
        <img
          className="absolute bottom-0 right-5 hidden w-36 lg:block"
          src={mascotSinging}
          alt=""
        />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-green-50 sm:text-lg">
            {t.cta.copy}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink
              href={startHref}
              onClick={handleStartClick}
              className="w-full px-6 py-4 text-base sm:w-auto sm:px-8"
            >
              {t.cta.primary} <ArrowRight size={18} weight="bold" />
            </ButtonLink>
            <ButtonLink
              href="#curriculum"
              tone="white"
              className="w-full px-6 py-4 text-base sm:w-auto sm:px-8"
            >
              {t.cta.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

