export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 ${className}`}
      {...props}
    />
  );
}
