import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from './logo';

describe('Logo Component', () => {
  it('renders the logo with correct attributes, text, and checks for 3 letters', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveTextContent('WTW');

    const logoLetters = screen.getAllByTestId('logo-letter');
    expect(logoLetters).toHaveLength(3);
  });

  it('applies additional class name when provided', () => {
    render(
      <MemoryRouter>
        <Logo className="custom-logo-class" />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toHaveClass('custom-logo-class');
  });
});
