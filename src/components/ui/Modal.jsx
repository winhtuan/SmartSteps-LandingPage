export function Modal({ children, open, onClose, className = "" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <button
        className="absolute inset-0 bg-slate-950/30"
        type="button"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className={`relative mx-auto mt-24 max-w-lg rounded-2xl bg-white p-6 shadow-soft ${className}`}>
        {children}
      </div>
    </div>
  );
}
