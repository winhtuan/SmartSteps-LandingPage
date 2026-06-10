import { render, screen } from "@testing-library/react";
import App from "./app/App";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  localStorage.clear();
});

test("redirects unauthenticated learning route visitors to the landing page", () => {
  window.history.pushState({}, "", "/learning");
  render(<App />);

  expect(window.location.pathname).toBe("/");
  expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeInTheDocument();
});

test("redirects unauthenticated lesson route visitors to the landing page", () => {
  window.history.pushState({}, "", "/lesson/1");
  render(<App />);

  expect(window.location.pathname).toBe("/");
  expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeInTheDocument();
});
