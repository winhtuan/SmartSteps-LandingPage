export function SectionHeading({ kicker, title, copy, align = "center" }) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}
    >
      {kicker && (
        <p className="mb-3 text-sm font-extrabold text-green-700">{kicker}</p>
      )}
      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}
