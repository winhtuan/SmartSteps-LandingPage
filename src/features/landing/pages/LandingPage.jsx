import { LandingProvider } from "../providers/LandingProvider";
import { LandingView } from "./LandingView";

export function LandingPage() {
  return (
    <LandingProvider>
      <LandingView />
    </LandingProvider>
  );
}
