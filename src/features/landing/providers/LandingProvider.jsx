import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { navHrefs } from "../data/landingContent";
import { translations } from "../data/translations";
import { useLandingSeo } from "../hooks/useLandingSeo";
import { getPreferredLanguage, savePreferredLanguage } from "../services/languagePreference";
import { isAuthenticated, logout } from "../../auth/services/authApi";

const LandingContext = createContext(null);

export function LandingProvider({ children }) {
  const [language, setLanguageState] = useState(() => getPreferredLanguage());
  const [authMode, setAuthMode] = useState("signin");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());
  const copy = translations[language] || translations.en;

  useLandingSeo(language);

  const openSignIn = useCallback(() => {
    setAuthMode("signin");
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const handleAuthenticated = useCallback(() => {
    setAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setAuthenticated(false);
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(savePreferredLanguage(nextLanguage));
  }, []);

  const value = useMemo(
    () => ({
      auth: {
        isOpen: isAuthOpen,
        mode: authMode,
        close: closeAuth,
        authenticated,
        handleAuthenticated,
        logout: handleLogout,
        openSignIn,
        setMode: setAuthMode,
      },
      copy,
      language,
      navHrefs,
      setLanguage,
    }),
    [
      authMode,
      authenticated,
      closeAuth,
      copy,
      handleAuthenticated,
      handleLogout,
      isAuthOpen,
      language,
      openSignIn,
      setLanguage,
    ],
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
