import { isAuthenticated } from "../features/auth/services/authApi";
import { LandingPage } from "../features/landing/pages/LandingPage";
import { LearningMapPage } from "../features/learning/pages/LearningMapPage";
import { LessonPage } from "../features/lesson/pages/LessonPage";
import "./App.css";

export default function App() {
  const onProtectedRoute =
    window.location.pathname.startsWith("/lesson") ||
    window.location.pathname.startsWith("/learning");

  if (onProtectedRoute && !isAuthenticated()) {
    window.history.replaceState({}, "", "/");
    return <LandingPage />;
  }

  if (window.location.pathname.startsWith("/lesson")) {
    return <LessonPage />;
  }

  if (window.location.pathname.startsWith("/learning")) {
    return <LearningMapPage />;
  }

  return <LandingPage />;
}
