import { CoachSection } from "./CoachSection";
import { FinalCta } from "./FinalCta";
import { HeroSection } from "./HeroSection";
import { ParentsSection } from "./ParentsSection";
import { PricingSection } from "./PricingSection";
import { StatsSection } from "./StatsSection";
import { StepsSection } from "./StepsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { WhySection } from "./WhySection";
import { WorldsSection } from "./WorldsSection";

export function LandingSections({ t, language, authenticated, onStart }) {
  return (
    <main>
      <div className="flex min-h-[100dvh] flex-col">
        <HeroSection t={t.hero} authenticated={authenticated} onStart={onStart} />
        <StatsSection items={t.stats} />
      </div>
      <WhySection t={t} language={language} />
      <WorldsSection t={t} />
      <StepsSection t={t} />
      <CoachSection t={t} />
      <ParentsSection t={t} />
      <TestimonialsSection t={t} language={language} />
      <PricingSection t={t} authenticated={authenticated} onStart={onStart} />
      <FinalCta t={t} authenticated={authenticated} onStart={onStart} />
    </main>
  );
}
