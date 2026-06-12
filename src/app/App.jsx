import { useEffect, useState } from "react";
import { isAuthenticated } from "../features/auth/services/authApi";
import { LandingPage } from "../features/landing/pages/LandingPage";
import { LearningMapPage } from "../features/learning/pages/LearningMapPage";
import { LessonPage } from "../features/lesson/pages/LessonPage";
import "./App.css";

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  const onProtectedRoute =
    pathname.startsWith("/lesson") || pathname.startsWith("/learning");

  if (onProtectedRoute && !isAuthenticated()) {
    window.history.replaceState({}, "", "/");
    return <LandingPage />;
  }

  if (pathname.startsWith("/lesson")) {
    return <LessonPage />;
  }

  if (pathname.startsWith("/learning")) {
    return <LearningMapPage />;
  }

  return <LandingPage />;
}
