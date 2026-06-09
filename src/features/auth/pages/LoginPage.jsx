import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return <LoginForm onSubmit={(event) => event.preventDefault()} />;
}
