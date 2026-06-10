import { Header } from "../../../components/common/Header";
import { AuthSidebar } from "../../auth/components/AuthSidebar";
import { Footer } from "../components/Footer";
import { LandingSections } from "../components/LandingSections";
import { useLanding } from "../providers/LandingProvider";

export function LandingView() {
  const { auth, copy, language, navHrefs, setLanguage } = useLanding();

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white text-slate-900">
      <Header
        navItems={copy.nav}
        navHrefs={navHrefs}
        language={language}
        setLanguage={setLanguage}
        loginLabel={copy.login}
        logoutLabel={copy.logout}
        authenticated={auth.authenticated}
        ctaLabel={copy.getStarted}
        openMenuLabel={copy.openMenu}
        closeMenuLabel={copy.closeMenu}
        onLogin={auth.openSignIn}
        onLogout={auth.logout}
        onStart={auth.openSignIn}
      />
      <AuthSidebar
        language={language}
        mode={auth.mode}
        open={auth.isOpen}
        onAuthenticated={auth.handleAuthenticated}
        onClose={auth.close}
        onModeChange={auth.setMode}
        redirectPath="/learning"
      />
      <LandingSections
        t={copy}
        language={language}
        authenticated={auth.authenticated}
        onStart={auth.openSignIn}
      />
      <Footer t={copy} />
    </div>
  );
}
