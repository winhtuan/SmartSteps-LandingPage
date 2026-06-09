import { LandingPage } from "../features/landing/pages/LandingPage";
import { LearningMapPage } from "../features/learning/pages/LearningMapPage";
import "./App.css";

export default function App() {
  if (window.location.pathname.startsWith("/learning")) {
    return <LearningMapPage />;
  }

  return <LandingPage />;
}
