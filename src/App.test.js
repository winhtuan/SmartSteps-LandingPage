import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./app/App";

const originalFetch = global.fetch;
const AUTH_SESSION_STORAGE_KEY = "smartsteps-auth-session";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  localStorage.clear();
  global.fetch = originalFetch;
});

function setAuthenticatedSession() {
  localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify({
      email: "parent@example.com",
      fullName: "Parent Example",
      loggedInAt: "2026-06-10T00:00:00.000Z",
    }),
  );
}

test("uses Vietnamese by default", () => {
  render(<App />);
  expect(document.documentElement.lang).toBe("vi");
  expect(document.title).toBe("SmartSteps | Ứng dụng học kỹ năng sống cho trẻ");
});

test("keeps the selected English language preference", () => {
  localStorage.setItem("smartsteps-language", "en");
  render(<App />);
  expect(document.documentElement.lang).toBe("en");
  expect(document.title).toBe("SmartSteps | Life Skills App for Kids");
});

test("renders the SmartSteps landing page", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /rèn kỹ năng sống cho trẻ qua từng bước vui học/i }),
  ).toBeInTheDocument();
});

test("links the landing start CTA to the learning map", () => {
  render(<App />);
  expect(screen.getAllByRole("link", { name: /học miễn phí/i })[0]).toHaveAttribute(
    "href",
    "/learning",
  );
});

test("switches to English for the current page session", () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole("button", { name: "English" })[0]);
  expect(
    screen.getByRole("heading", { name: /build life skills for kids through playful steps/i }),
  ).toBeInTheDocument();
  expect(document.documentElement.lang).toBe("en");
  expect(document.title).toBe("SmartSteps | Life Skills App for Kids");
});

test("switches the premium billing cycle", () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole("button", { name: "English" })[0]);
  expect(screen.getByText("1,299,000 VND")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
  expect(screen.getByText("199,000 VND")).toBeInTheDocument();
});

test("opens the login sidebar from the navbar", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByLabelText("Địa chỉ email")).toBeInTheDocument();
  expect(screen.getByLabelText("Mật khẩu")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Tiếp tục với Google" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Tiếp tục với Facebook" })).toBeInTheDocument();
});

test("switches from sign in to the sign up form", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));
  fireEvent.click(screen.getByRole("button", { name: "Đăng ký" }));
  expect(screen.getByRole("heading", { name: "Tạo tài khoản" })).toBeInTheDocument();
  expect(screen.getByLabelText("Tên phụ huynh")).toBeInTheDocument();
  expect(screen.getByLabelText("Xác nhận mật khẩu")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Tạo tài khoản" })).toBeInTheDocument();
});

test("renders the learning map route", () => {
  setAuthenticatedSession();
  window.history.pushState({}, "", "/learning");
  render(<App />);
  expect(
    screen.getByRole("button", { name: /đảo 1 an toàn cá nhân đang học/i }),
  ).toBeInTheDocument();
  expect(screen.queryByText("Học hôm nay")).not.toBeInTheDocument();
  expect(screen.getByText("Minh Tuấn")).toBeInTheDocument();
  expect(screen.getByText("Level 1")).toBeInTheDocument();
  expect(screen.getByText("0 ngày")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /bài 1 vật tròn lấp lánh bắt đầu/i }),
  ).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Chọn chủ đề khác" })).not.toBeInTheDocument();
});

test("renders the lesson route as smaller lesson components", () => {
  setAuthenticatedSession();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 503,
      headers: new Headers({ "content-type": "application/json" }),
      json: () => Promise.resolve({ message: "Service unavailable" }),
      text: () => Promise.resolve("Service unavailable"),
    }),
  );

  window.history.pushState({}, "", "/lesson");
  render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/an toàn cá nhân/i);
  expect(screen.getByText(/vật nhỏ lấp lánh có phải là đồ ăn không/i)).toBeInTheDocument();
  expect(screen.getByRole("complementary")).toBeInTheDocument();
  expect(
    screen.getAllByRole("button").find((button) => button.className === "lesson-video-cta__button"),
  ).toBeDisabled();
});

test("loads the intro video for personal safety from the backend", async () => {
  setAuthenticatedSession();
  global.fetch = jest.fn((url) => {
    if (String(url).endsWith("/api/situations/1")) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            situationId: 1,
            title: "Bài 1: Vật tròn lấp lánh",
            steps: [
              {
                stepId: 1,
                stepType: "Intro",
                mediaUrl: "Lession1/Videos/lesson1-intro.mp4",
              },
            ],
          }),
      });
    }

    if (String(url).endsWith("/api/media/signed-url")) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            stepId: 1,
            signedUrl: "https://media.example/lesson1-intro.mp4",
          }),
      });
    }

    return Promise.reject(new Error(`Unexpected request: ${url}`));
  });

  window.history.pushState({}, "", "/lesson/1");
  const { container } = render(<App />);

  await waitFor(() => {
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      "https://media.example/lesson1-intro.mp4",
    );
  });

  expect(global.fetch).toHaveBeenNthCalledWith(
    1,
    "http://localhost:5078/api/situations/1",
    expect.objectContaining({ method: "GET" }),
  );
  expect(global.fetch).toHaveBeenNthCalledWith(
    2,
    "http://localhost:5078/api/media/signed-url",
    expect.objectContaining({
      body: JSON.stringify({ stepId: 1 }),
      method: "POST",
    }),
  );
});

test("opens the learning tip from the mascot button", () => {
  setAuthenticatedSession();
  window.history.pushState({}, "", "/learning");
  render(<App />);

  const tipButton = screen.getByRole("button", { name: "Mở gợi ý cho bé" });
  expect(tipButton).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(tipButton);

  expect(screen.getByRole("button", { name: "Ẩn gợi ý cho bé" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
});
