import { useEffect, useState } from "react";

const DESKTOP_QUERY = "(min-width: 1201px) and (min-height: 641px)";

export function useDesktopLessonLayout() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window.matchMedia === "function" ? window.matchMedia(DESKTOP_QUERY).matches : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}
