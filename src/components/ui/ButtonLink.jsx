const BUTTON_LINK_STYLES = {
  yellow:
    "bg-yellow-400 text-slate-900 shadow-[0_6px_0_#c99d00] hover:bg-yellow-300",
  white: "bg-white text-green-700 shadow-[0_6px_0_#dceacb] hover:bg-lime-50",
  outline:
    "border-2 border-slate-200 bg-white text-slate-800 shadow-[0_6px_0_#dce2e7] hover:border-yellow-300",
};

export function ButtonLink({
  children,
  href = "#pricing",
  onClick,
  tone = "yellow",
  className = "",
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`tactile-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold tracking-tight transition ${BUTTON_LINK_STYLES[tone]} ${className}`}
    >
      {children}
    </a>
  );
}
