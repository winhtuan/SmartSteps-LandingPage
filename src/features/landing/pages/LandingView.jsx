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
        ctaLabel={copy.getStarted}
        openMenuLabel={copy.openMenu}
        closeMenuLabel={copy.closeMenu}
        onLogin={auth.openSignIn}
      />
      <AuthSidebar
        language={language}
        mode={auth.mode}
        open={auth.isOpen}
        onClose={auth.close}
        onModeChange={auth.setMode}
      />
      <LandingSections t={copy} language={language} />
      <Footer t={copy} />
    </div>
  );
}
