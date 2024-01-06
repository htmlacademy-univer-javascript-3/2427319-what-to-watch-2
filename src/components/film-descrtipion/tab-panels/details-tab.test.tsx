import { render, screen } from '@testing-library/react';
import filmsMock from '../../../mocks/films-mock.ts';
import { DetailsTab } from './details-tab.tsx';

const mockFilm = filmsMock[0];

describe('FilmDetails Component', () => {
  it('should render film details correctly', () => {
    render(<DetailsTab film={mockFilm} />);

    expect(screen.getByText(/Director/)).toBeInTheDocument();
    expect(screen.getByText(/Starring/)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Released/)).toBeInTheDocument();
  });
});
