import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Testing Spinner Component Functionality', () => {
  it('verifies rendering of spinner with default settings', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('spinner-container');
  });

  it('checks spinner rendering with full display mode activated', () => {
    render(<Spinner view='display' />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('spinner-display');
  });
});
