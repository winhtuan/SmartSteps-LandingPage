import { render, screen } from "@testing-library/react";
import App from "./app/App";

const AUTH_SESSION_STORAGE_KEY = "smartsteps-auth-session";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  localStorage.clear();
});

test("unlocks lesson two on the learning map after lesson one is completed", () => {
  localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify({
      email: "parent@example.com",
      fullName: "Parent Example",
      loggedInAt: "2026-06-10T00:00:00.000Z",
    }),
  );
  localStorage.setItem(
    "smartsteps-learning-progress",
    JSON.stringify({
      "email:parent@example.com": {
        completedSituationIds: [1],
        updatedAt: "2026-06-10T00:00:00.000Z",
      },
    }),
  );

  window.history.pushState({}, "", "/learning");
  render(<App />);

  expect(
    screen.getByRole("button", {
      name: /bài 2 bàn tay kỳ diệu và các cái lỗ bắt đầu/i,
    }),
  ).toBeInTheDocument();
});
