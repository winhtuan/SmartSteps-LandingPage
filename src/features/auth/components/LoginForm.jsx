export function LoginForm({ onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input name="email" type="email" autoComplete="email" required />
      <input name="password" type="password" autoComplete="current-password" required />
      <button type="submit">Login</button>
    </form>
  );
}
