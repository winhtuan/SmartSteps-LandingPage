import { fireEvent, render, screen } from '@testing-library/react';
import App from './app/App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
  localStorage.clear();
});

test('uses Vietnamese by default', () => {
  render(<App />);
  expect(document.documentElement.lang).toBe('vi');
  expect(document.title).toBe('SmartSteps | Ứng dụng học kỹ năng sống cho trẻ');
});

test('keeps the selected English language preference', () => {
  localStorage.setItem('smartsteps-language', 'en');
  render(<App />);
  expect(document.documentElement.lang).toBe('en');
  expect(document.title).toBe('SmartSteps | Life Skills App for Kids');
});

test('renders the SmartSteps landing page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /rèn kỹ năng sống cho trẻ qua từng bước vui học/i })
  ).toBeInTheDocument();
});

test('links the landing start CTA to the learning map', () => {
  render(<App />);
  expect(screen.getAllByRole('link', { name: /học miễn phí/i })[0]).toHaveAttribute(
    'href',
    '/learning'
  );
});

test('switches to English for the current page session', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: 'English' })[0]);
  expect(
    screen.getByRole('heading', { name: /build life skills for kids through playful steps/i })
  ).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
  expect(document.title).toBe('SmartSteps | Life Skills App for Kids');
});

test('switches the premium billing cycle', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: 'English' })[0]);
  expect(screen.getByText('1,299,000 VND')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
  expect(screen.getByText('199,000 VND')).toBeInTheDocument();
});

test('opens the login sidebar from the navbar', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByLabelText('Địa chỉ email')).toBeInTheDocument();
  expect(screen.getByLabelText('Mật khẩu')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Tiếp tục với Google' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Tiếp tục với Facebook' })).toBeInTheDocument();
});

test('switches from sign in to the sign up form', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));
  fireEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
  expect(screen.getByRole('heading', { name: 'Tạo tài khoản' })).toBeInTheDocument();
  expect(screen.getByLabelText('Tên phụ huynh')).toBeInTheDocument();
  expect(screen.getByLabelText('Xác nhận mật khẩu')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Tạo tài khoản' })).toBeInTheDocument();
});

test('renders the learning map route', () => {
  window.history.pushState({}, '', '/learning');
  render(<App />);
  expect(
    screen.getByRole('button', { name: /đảo 1 an toàn cá nhân đang học/i })
  ).toBeInTheDocument();
  expect(screen.queryByText('Học hôm nay')).not.toBeInTheDocument();
  expect(screen.getByText('Minh Tuấn')).toBeInTheDocument();
  expect(screen.getByText('Level 1')).toBeInTheDocument();
  expect(screen.getByText('0 ngày')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /bài 1 vật tròn lấp lánh bắt đầu/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Chọn chủ đề khác' })).not.toBeInTheDocument();
});

test('opens the learning tip from the mascot button', () => {
  window.history.pushState({}, '', '/learning');
  render(<App />);

  const tipButton = screen.getByRole('button', { name: 'Mở gợi ý cho bé' });
  expect(tipButton).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(tipButton);

  expect(screen.getByRole('button', { name: 'Ẩn gợi ý cho bé' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
});
