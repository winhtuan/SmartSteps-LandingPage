import { fireEvent, render, screen } from "@testing-library/react";
import App from "./app/App";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  localStorage.clear();
});

test("opens the auth sidebar when the landing free-study CTA is clicked", () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole("link", { name: /học miễn phí/i })[0]);

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByText("Tài khoản dùng thử")).toBeInTheDocument();
});
