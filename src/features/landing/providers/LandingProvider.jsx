import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { navHrefs } from "../data/landingContent";
import { translations } from "../data/translations";
import { useLandingSeo } from "../hooks/useLandingSeo";

const LandingContext = createContext(null);

export function LandingProvider({ children }) {
  const [language, setLanguage] = useState("vi");
  const [authMode, setAuthMode] = useState("signin");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const copy = translations[language] || translations.en;

  useLandingSeo(language);

  const openSignIn = useCallback(() => {
    setAuthMode("signin");
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      auth: {
        isOpen: isAuthOpen,
        mode: authMode,
        close: closeAuth,
        openSignIn,
        setMode: setAuthMode,
      },
      copy,
      language,
      navHrefs,
      setLanguage,
    }),
    [authMode, closeAuth, copy, isAuthOpen, language, openSignIn],
  );

  return (
    <LandingContext.Provider value={value}>{children}</LandingContext.Provider>
  );
}

export function useLanding() {
  const context = useContext(LandingContext);

  if (!context) {
    throw new Error("useLanding must be used inside LandingProvider");
  }

  return context;
}
