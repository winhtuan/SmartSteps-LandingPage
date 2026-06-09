import brandLogo from "../../assets/images/logo/logo-smartstep.png";

export function Brand({ compact = false, hideWordOnSmall = false }) {
  return (
    <a
      className="inline-flex items-center gap-2"
      href="#top"
      aria-label="SmartSteps home"
    >
      <span
        className={`${compact ? "h-9 w-9" : "h-11 w-11"} brand-logo rounded-2xl bg-lime-100`}
      >
        <img src={brandLogo} alt="" />
      </span>
      <span
        className={`${compact ? "text-xl" : "text-2xl"} ${
          hideWordOnSmall ? "max-[374px]:hidden" : ""
        } font-black tracking-tight text-slate-900`}
      >
        Smart<span className="text-green-600">Steps</span>
      </span>
    </a>
  );
}
