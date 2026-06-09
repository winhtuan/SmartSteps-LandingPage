export function Button({ className = "", type = "button", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-extrabold transition ${className}`}
      type={type}
      {...props}
    />
  );
}
