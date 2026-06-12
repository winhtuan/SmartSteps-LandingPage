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

test("reveals the landscape lesson question only after the intro video ends", async () => {
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
  const { container } = render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /bài 1.*phòng tránh hóc và nuốt dị vật/i,
  );
  expect(screen.queryByText(/vật nhỏ lấp lánh có phải là đồ ăn không/i)).not.toBeInTheDocument();

  await waitFor(() => expect(container.querySelector("video")).toBeInTheDocument());
  fireEvent.ended(container.querySelector("video"));

  expect(screen.getByText(/vật nhỏ lấp lánh có phải là đồ ăn không/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /đưa cho người lớn/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /nhặt lên và ăn thử/i })).toBeInTheDocument();
});

test("shows retry actions only after the wrong feedback video ends", async () => {
  setAuthenticatedSession();
  window.history.pushState({}, "", "/lesson/1");
  const { container } = render(<App />);

  await waitFor(() => expect(container.querySelector("video")).toBeInTheDocument());
  fireEvent.ended(container.querySelector("video"));
  fireEvent.click(screen.getByRole("button", { name: /nhặt lên và ăn thử/i }));

  await waitFor(() =>
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      expect.stringContaining("Safety_smallitems_wrong"),
    ),
  );
  expect(screen.queryByRole("button", { name: /chọn lại/i })).not.toBeInTheDocument();

  fireEvent.ended(container.querySelector("video"));

  expect(screen.getByRole("button", { name: /chọn lại/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /xem lại tình huống/i })).toBeInTheDocument();
});

test("loads the intro video for personal safety from Cloudinary", async () => {
  setAuthenticatedSession();

  window.history.pushState({}, "", "/lesson/1");
  const { container } = render(<App />);

  await waitFor(() => {
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dtm5a4bwr/video/upload/v1781136864/Safety_smallitems_intro_cw1tlh.mp4",
    );
  });
});

test("keeps the original video and side panel layout on desktop", async () => {
  const originalMatchMedia = window.matchMedia;
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(min-width: 1201px) and (min-height: 641px)",
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  try {
    setAuthenticatedSession();
    window.history.pushState({}, "", "/lesson/1");

    const { container } = render(<App />);

    await waitFor(() =>
      expect(container.querySelector(".lesson-main--desktop")).toBeInTheDocument(),
    );
    expect(container.querySelector(".lesson-wooden-sign")).toBeInTheDocument();
    expect(container.querySelector(".lesson-video-frame")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(screen.queryByLabelText("Các câu trả lời")).not.toBeInTheDocument();
  } finally {
    window.matchMedia = originalMatchMedia;
    consoleError.mockRestore();
  }
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
