import { render, screen } from '@testing-library/react';
import filmsMock from '../../../../mocks/films-mock.ts';
import { OverviewTab } from './overview-tab.tsx';

const mockFilm = filmsMock[0];


describe('Overview Component', () => {
  it('should render film overview correctly', () => {
    render(<OverviewTab film={mockFilm} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
  });
});
