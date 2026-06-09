export function StatsSection({ items }) {
  return (
    <section className="bg-yellow-50/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map(([value, label]) => (
          <div key={label} className="px-4 py-7 text-center sm:py-9">
            <strong className="block text-3xl font-black tracking-tight text-green-700 sm:text-4xl">
              {value}
            </strong>
            <span className="mt-1 block text-xs font-extrabold text-slate-600 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

