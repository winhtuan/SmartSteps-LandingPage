import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders the SmartSteps landing page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /build real-life skills through playful steps/i })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /get started/i }).length).toBeGreaterThan(0);
});

test('switches to Vietnamese and saves the selected language', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: 'Tiếng Việt' })[0]);
  expect(
    screen.getByRole('heading', { name: /rèn kỹ năng sống qua từng bước vui học/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/129k/)).toHaveTextContent('129k / tháng');
  expect(localStorage.getItem('smartsteps-language')).toBe('vi');
});

test('opens the login sidebar from the navbar', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continue with Facebook' })).toBeInTheDocument();
});

test('switches from sign in to the sign up form', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
  expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
  expect(screen.getByLabelText('Parent name')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
});
