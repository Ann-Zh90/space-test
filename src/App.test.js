import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
});

test('renders banner title and all offers', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/expanses of space/i);
  expect(screen.getAllByRole('article')).toHaveLength(4);
});

test('burger toggles the navigation', () => {
  render(<App />);
  const burger = screen.getByRole('button', { name: /open menu/i });
  fireEvent.click(burger);
  expect(burger).toHaveAttribute('aria-expanded', 'true');
  expect(burger).toHaveAccessibleName(/close menu/i);
  expect(document.getElementById('main-nav')).toHaveClass('nav--open');
});
